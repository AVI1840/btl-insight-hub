import { useState } from 'react'
import { Bell, AlertTriangle, AlertCircle, Info, TrendingUp, Check, Settings, Plus, Mail, Trash2 } from 'lucide-react'
import { alerts, severityConfig, type Alert, type AlertSeverity } from '@/data/alerts'
import { ALL_DOMAINS } from '@/data/insights'

const severityIcons: Record<AlertSeverity, typeof AlertTriangle> = {
  critical: AlertTriangle,
  warning: AlertCircle,
  info: Info,
  positive: TrendingUp,
}

type FilterType = 'all' | AlertSeverity
type Tab = 'alerts' | 'settings'

interface AlertRule {
  id: string
  name: string
  email: string
  domains: string[]
  threshold: number
  frequency: string
  enabled: boolean
}

const defaultRules: AlertRule[] = [
  { id: 'rule-1', name: 'התרעות קריטיות', email: 'sara.r@btl.gov.il', domains: ['כל האגפים'], threshold: 20, frequency: 'מיידי', enabled: true },
  { id: 'rule-2', name: 'דוח שבועי — אבטלה', email: 'moshe.k@btl.gov.il', domains: ['אבטלה', 'מילואים'], threshold: 15, frequency: 'שבועי', enabled: true },
  { id: 'rule-3', name: 'מגמות חודשיות', email: 'team-leads@btl.gov.il', domains: ['כל האגפים'], threshold: 10, frequency: 'חודשי', enabled: false },
]

export function AlertsView() {
  const [tab, setTab] = useState<Tab>('alerts')
  const [filter, setFilter] = useState<FilterType>('all')
  const [readState, setReadState] = useState<Record<string, boolean>>(
    Object.fromEntries(alerts.map((a) => [a.id, a.read]))
  )
  const [rules, setRules] = useState<AlertRule[]>(defaultRules)
  const [showNewRule, setShowNewRule] = useState(false)

  const filtered = filter === 'all' ? alerts : alerts.filter((a) => a.severity === filter)
  const unreadCount = alerts.filter((a) => !readState[a.id]).length

  const markRead = (id: string) => setReadState((prev) => ({ ...prev, [id]: true }))
  const markAllRead = () => setReadState(Object.fromEntries(alerts.map((a) => [a.id, true])))
  const toggleRule = (id: string) => setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r))
  const deleteRule = (id: string) => setRules(rules.filter(r => r.id !== id))

  return (
    <section className="animate-in" style={{ maxWidth: '900px' }}>
      {/* Header with tabs */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#edf5fc' }}>
            <Bell className="w-4 h-4" style={{ color: '#1a6fb5' }} />
          </div>
          <h2 className="text-[15px] font-bold" style={{ color: '#1a2332' }}>התרעות</h2>
          {unreadCount > 0 && (
            <span className="flex items-center justify-center rounded-full text-[9px] font-bold pulse-badge"
              style={{ width: '18px', height: '18px', background: '#d32f2f', color: '#fff' }}>
              {unreadCount}
            </span>
          )}
        </div>
        {/* Pill tabs */}
        <div className="flex items-center gap-1 rounded-xl" style={{ background: '#f4f6f9', padding: '4px' }}>
          <button
            onClick={() => setTab('alerts')}
            className="rounded-lg text-[11px] font-medium px-4 py-2 transition-all"
            style={{
              background: tab === 'alerts' ? '#ffffff' : 'transparent',
              color: tab === 'alerts' ? '#1a6fb5' : '#8a9bb0',
              boxShadow: tab === 'alerts' ? 'var(--shadow-sm)' : 'none',
            }}
          >
            התרעות פעילות
          </button>
          <button
            onClick={() => setTab('settings')}
            className="rounded-lg text-[11px] font-medium px-4 py-2 transition-all flex items-center gap-1.5"
            style={{
              background: tab === 'settings' ? '#ffffff' : 'transparent',
              color: tab === 'settings' ? '#1a6fb5' : '#8a9bb0',
              boxShadow: tab === 'settings' ? 'var(--shadow-sm)' : 'none',
            }}
          >
            <Settings className="w-3 h-3" />
            הגדרות
          </button>
        </div>
      </div>

      {tab === 'alerts' && (
        <>
          {/* Filters — pill style */}
          <div className="flex items-center justify-between mb-4 animate-in-d1">
            <div className="flex items-center gap-1.5">
              {([
                { value: 'all' as FilterType, label: `הכל (${alerts.length})` },
                { value: 'critical' as FilterType, label: 'קריטי' },
                { value: 'warning' as FilterType, label: 'אזהרה' },
                { value: 'positive' as FilterType, label: 'שיפור' },
                { value: 'info' as FilterType, label: 'עדכון' },
              ]).map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className="rounded-lg text-[11px] font-medium transition-all"
                  style={{
                    padding: '6px 14px',
                    color: filter === f.value ? '#ffffff' : '#4a5c6f',
                    background: filter === f.value ? '#1a6fb5' : '#ffffff',
                    border: filter === f.value ? '1px solid #1a6fb5' : '1px solid #e8ecf0',
                    boxShadow: filter === f.value ? '0 2px 6px rgba(26,111,181,0.15)' : 'none',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead}
                className="text-[11px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: '#8a9bb0' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f4f6f9'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <Check className="w-3 h-3" /> סמן הכל כנקרא
              </button>
            )}
          </div>

          {/* Alert list */}
          <div className="animate-in-d2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filtered.map((alert) => (
              <AlertCard key={alert.id} alert={alert} isRead={readState[alert.id]} onMarkRead={() => markRead(alert.id)} />
            ))}
          </div>
        </>
      )}

      {tab === 'settings' && (
        <div className="animate-in-d1">
          <p className="text-[12px] mb-4" style={{ color: '#4a5c6f' }}>
            הגדר כללי התרעה — המערכת תשלח התראות למייל כשמזוהה חריגה מעל הסף שהגדרת.
          </p>

          {/* Existing rules */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} className="mb-4">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="card-premium flex items-center gap-4 transition-all"
                style={{ padding: '16px 20px', opacity: rule.enabled ? 1 : 0.55 }}
              >
                {/* Status dot */}
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: rule.enabled ? '#27864a' : '#c0c8d4' }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold" style={{ color: '#1a2332' }}>{rule.name}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-md font-medium" style={{
                      background: rule.enabled ? '#f0faf4' : '#f4f6f9',
                      color: rule.enabled ? '#27864a' : '#8a9bb0',
                    }}>
                      {rule.enabled ? 'פעיל' : 'מושבת'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] flex items-center gap-1" style={{ color: '#8a9bb0' }}>
                      <Mail className="w-3 h-3" /> {rule.email}
                    </span>
                    <span className="text-[10px]" style={{ color: '#8a9bb0' }}>· {rule.domains.join(', ')}</span>
                    <span className="text-[10px]" style={{ color: '#8a9bb0' }}>· סף: {rule.threshold}%</span>
                    <span className="text-[10px]" style={{ color: '#8a9bb0' }}>· {rule.frequency}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleRule(rule.id)}
                  className="text-[10px] px-3 py-1.5 rounded-lg transition-all font-medium"
                  style={{ border: '1px solid #e8ecf0', color: '#1a6fb5' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#edf5fc'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  {rule.enabled ? 'השבת' : 'הפעל'}
                </button>
                <button onClick={() => deleteRule(rule.id)}
                  className="p-2 rounded-lg transition-all"
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#fef5f5'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <Trash2 className="w-3.5 h-3.5" style={{ color: '#d32f2f' }} />
                </button>
              </div>
            ))}
          </div>

          {/* Add new rule */}
          {!showNewRule ? (
            <button
              onClick={() => setShowNewRule(true)}
              className="w-full py-3.5 rounded-xl text-[12px] font-medium flex items-center justify-center gap-2 transition-all"
              style={{ border: '2px dashed #e8ecf0', color: '#1a6fb5' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#edf5fc'; (e.currentTarget as HTMLElement).style.borderColor = '#1a6fb5' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = '#e8ecf0' }}
            >
              <Plus className="w-4 h-4" />
              הוסף כלל התרעה חדש
            </button>
          ) : (
            <NewRuleForm
              onSave={(rule) => { setRules([...rules, rule]); setShowNewRule(false) }}
              onCancel={() => setShowNewRule(false)}
            />
          )}
        </div>
      )}
    </section>
  )
}

function NewRuleForm({ onSave, onCancel }: { onSave: (rule: AlertRule) => void; onCancel: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [threshold, setThreshold] = useState(15)
  const [frequency, setFrequency] = useState('שבועי')
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['כל האגפים'])

  const handleSave = () => {
    if (!name.trim() || !email.trim()) return
    onSave({
      id: `rule-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      domains: selectedDomains,
      threshold,
      frequency,
      enabled: true,
    })
  }

  return (
    <div className="card-premium animate-fade-scale" style={{ padding: '22px 26px' }}>
      <h4 className="text-[13px] font-bold mb-4" style={{ color: '#1a2332' }}>כלל התרעה חדש</h4>
      <div className="space-y-3">
        <div>
          <label className="text-[10px] font-medium block mb-1.5" style={{ color: '#8a9bb0' }}>שם הכלל</label>
          <input
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder="לדוגמה: התרעות קריטיות — נכות"
            className="w-full rounded-lg px-3.5 py-2.5 text-[12px] outline-none transition-all"
            style={{ border: '1px solid #e8ecf0', color: '#1a2332' }}
            onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = '#1a6fb5'}
            onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = '#e8ecf0'}
          />
        </div>
        <div>
          <label className="text-[10px] font-medium block mb-1.5" style={{ color: '#8a9bb0' }}>כתובת מייל לשליחה</label>
          <input
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="user@btl.gov.il"
            type="email" dir="ltr"
            className="w-full rounded-lg px-3.5 py-2.5 text-[12px] outline-none transition-all"
            style={{ border: '1px solid #e8ecf0', color: '#1a2332' }}
            onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = '#1a6fb5'}
            onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = '#e8ecf0'}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-[10px] font-medium block mb-1.5" style={{ color: '#8a9bb0' }}>סף חריגה (%)</label>
            <input
              type="number" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))}
              min={5} max={50}
              className="w-full rounded-lg px-3.5 py-2.5 text-[12px] outline-none transition-all"
              style={{ border: '1px solid #e8ecf0', color: '#1a2332' }}
              onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = '#1a6fb5'}
              onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = '#e8ecf0'}
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] font-medium block mb-1.5" style={{ color: '#8a9bb0' }}>תדירות</label>
            <select
              value={frequency} onChange={(e) => setFrequency(e.target.value)}
              className="w-full rounded-lg px-3.5 py-2.5 text-[12px] outline-none transition-all"
              style={{ border: '1px solid #e8ecf0', color: '#1a2332', background: '#fff' }}
            >
              <option>מיידי</option>
              <option>יומי</option>
              <option>שבועי</option>
              <option>חודשי</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-[10px] font-medium block mb-1.5" style={{ color: '#8a9bb0' }}>אגפים</label>
          <select
            value={selectedDomains[0]} onChange={(e) => setSelectedDomains([e.target.value])}
            className="w-full rounded-lg px-3.5 py-2.5 text-[12px] outline-none transition-all"
            style={{ border: '1px solid #e8ecf0', color: '#1a2332', background: '#fff' }}
          >
            <option>כל האגפים</option>
            {ALL_DOMAINS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handleSave}
            disabled={!name.trim() || !email.trim()}
            className="px-5 py-2 rounded-lg text-[12px] font-semibold text-white disabled:opacity-30 transition-all"
            style={{ background: 'linear-gradient(135deg, #1a6fb5, #1557a0)', boxShadow: '0 2px 8px rgba(26,111,181,0.2)' }}
          >
            שמור כלל
          </button>
          <button onClick={onCancel} className="px-4 py-2 rounded-lg text-[12px] font-medium transition-colors"
            style={{ color: '#8a9bb0' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f4f6f9'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            ביטול
          </button>
        </div>
      </div>
    </div>
  )
}

function AlertCard({ alert, isRead, onMarkRead }: { alert: Alert; isRead: boolean; onMarkRead: () => void }) {
  const config = severityConfig[alert.severity]
  const Icon = severityIcons[alert.severity]
  const time = new Date(alert.timestamp)
  const now = new Date('2026-05-01T12:00:00')
  const diffMs = now.getTime() - time.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const relativeTime = diffHours < 24 ? `לפני ${diffHours} שעות` : diffDays === 1 ? 'אתמול' : diffDays < 7 ? `לפני ${diffDays} ימים` : time.toLocaleDateString('he-IL')

  return (
    <div
      className="card-interactive"
      style={{
        padding: '16px 20px',
        borderInlineStart: `3px solid ${config.color}`,
        opacity: isRead ? 0.6 : 1,
      }}
      onClick={onMarkRead}
      role="button"
      tabIndex={0}
      aria-label={`${config.label}: ${alert.title}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: config.bgColor }}>
          <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md" style={{ color: config.color, background: config.bgColor }}>{config.label}</span>
            <span className="text-[10px]" style={{ color: '#8a9bb0' }}>{alert.domain}</span>
            {!isRead && <div className="w-2 h-2 rounded-full pulse-badge" style={{ backgroundColor: config.color }} />}
            <span className="text-[10px] mr-auto" style={{ color: '#8a9bb0' }}>{relativeTime}</span>
          </div>
          <h3 className="text-[12px] font-bold" style={{ color: '#1a2332' }}>{alert.title}</h3>
          <p className="text-[11px] mt-1 leading-relaxed" style={{ color: '#4a5c6f' }}>{alert.description}</p>
        </div>
      </div>
    </div>
  )
}
