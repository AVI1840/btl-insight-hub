import { Search, Calendar, Bell, Sparkles, CalendarClock, X, Save } from 'lucide-react'
import { useState, useRef } from 'react'
import { alerts } from '@/data/alerts'
import { ALL_DOMAINS } from '@/data/insights'

/* ─── Official NII Logo (vector recreation) ─── */
function BtlLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="nii-bg" cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#2485d4" />
          <stop offset="100%" stopColor="#0d5ba8" />
        </radialGradient>
      </defs>
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="url(#nii-bg)" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

      {/* NII Menorah symbol — 3 pairs of curved arms + central stem */}
      {/* Base platform */}
      <path d="M36 75 Q50 72 64 75" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <line x1="36" y1="75" x2="33" y2="79" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="64" y1="75" x2="67" y2="79" stroke="white" strokeWidth="3" strokeLinecap="round" />

      {/* Central stem */}
      <line x1="50" y1="75" x2="50" y2="30" stroke="white" strokeWidth="4" strokeLinecap="round" />

      {/* Arm pair 1 — lower (widest) */}
      <path d="M47.5 62 C40 62 30 58 26 50" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52.5 62 C60 62 70 58 74 50" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="25.5" cy="49" r="3" fill="white" />
      <circle cx="74.5" cy="49" r="3" fill="white" />

      {/* Arm pair 2 — middle */}
      <path d="M47.5 51 C40 51 28 46 24 38" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52.5 51 C60 51 72 46 76 38" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="23.5" cy="37" r="3" fill="white" />
      <circle cx="76.5" cy="37" r="3" fill="white" />

      {/* Arm pair 3 — upper (narrowest) */}
      <path d="M47.5 40 C42 40 32 36 30 30" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52.5 40 C58 40 68 36 70 30" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="29.5" cy="29" r="2.5" fill="white" />
      <circle cx="70.5" cy="29" r="2.5" fill="white" />

      {/* Center top flame */}
      <circle cx="50" cy="29" r="3" fill="white" />
    </svg>
  )
}

/* ─── Schedule Alert Modal ─── */
type ScheduleRule = {
  name: string
  eventType: string
  frequency: string
  email: string
  domains: string
  threshold: string
}

const EVENT_TYPES = [
  'כל סוגי האירועים',
  'קריטי — עלייה חדה בפניות (מעל סף)',
  'אזהרה — מגמת עלייה בנושא',
  'כשל מערכתי — ביקוש כשל גבוה',
  'עלייה בזמן המתנה',
  'אנומליה — שינוי חד לעומת חודש קודם',
  'דוח תקופתי — ללא תנאי',
]

const FREQUENCIES = ['מיידי (בזמן אמת)', 'שעתי', 'יומי — 08:00', 'שבועי — ראשון', 'חודשי — ה-1 לחודש', 'רבעוני']

function ScheduleModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<ScheduleRule>({
    name: '',
    eventType: 'כל סוגי האירועים',
    frequency: 'יומי — 08:00',
    email: '',
    domains: 'כל האגפים',
    threshold: '15',
  })
  const [saved, setSaved] = useState(false)

  const set = (field: keyof ScheduleRule, val: string) =>
    setForm(prev => ({ ...prev, [field]: val }))

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return
    setSaved(true)
    setTimeout(onClose, 1400)
  }

  const inputCls = "w-full rounded-lg px-3.5 py-2.5 text-[12px] outline-none transition-all bg-white"
  const inputStyle = { border: '1px solid #e8ecf0', color: '#1a2332' }

  return (
    <div
      className="animate-fade-scale"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(10,15,26,0.55)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="card-premium" style={{
        width: '520px', maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto',
        padding: '28px 32px',
      }}>
        {/* Modal header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#edf5fc' }}>
              <CalendarClock className="w-4 h-4" style={{ color: '#1a6fb5' }} />
            </div>
            <div>
              <h3 className="text-[15px] font-bold" style={{ color: '#1a2332' }}>תזמון התרעה</h3>
              <p className="text-[10px]" style={{ color: '#8a9bb0' }}>הגדר מתי, על מה ולאן לשלוח התרעה</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ color: '#8a9bb0' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f4f6f9'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {saved ? (
          <div className="text-center py-8 animate-fade-scale">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ background: '#f0faf4', border: '2px solid #27864a' }}>
              <span style={{ color: '#27864a', fontSize: '22px' }}>✓</span>
            </div>
            <p className="text-[13px] font-bold" style={{ color: '#27864a' }}>ההתרעה נוצרה בהצלחה!</p>
            <p className="text-[11px] mt-1" style={{ color: '#8a9bb0' }}>תישלח ל-{form.email}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Rule name */}
            <div>
              <label className="text-[10px] font-semibold block mb-1.5" style={{ color: '#4a5c6f' }}>שם ההתרעה *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)}
                placeholder='לדוגמה: התרעה שבועית — אבטלה'
                className={inputCls} style={inputStyle}
                onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = '#1a6fb5'}
                onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = '#e8ecf0'}
              />
            </div>

            {/* Event type */}
            <div>
              <label className="text-[10px] font-semibold block mb-1.5" style={{ color: '#4a5c6f' }}>סוג אירוע להתרעה</label>
              <select value={form.eventType} onChange={e => set('eventType', e.target.value)}
                className={inputCls} style={{ ...inputStyle, cursor: 'pointer' }}>
                {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
              <p className="text-[9px] mt-1" style={{ color: '#8a9bb0' }}>
                {form.eventType.includes('קריטי') && 'התרעה תישלח כשנפח פניות עולה מעל הסף שהגדרת'}
                {form.eventType.includes('אנומליה') && 'המערכת תזהה שינוי חד (מעל 20%) לעומת תקופה מקבילה'}
                {form.eventType.includes('דוח') && 'דוח תקופתי יישלח לפי התדירות שבחרת — ללא תנאי'}
              </p>
            </div>

            {/* Frequency + Domain row */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-[10px] font-semibold block mb-1.5" style={{ color: '#4a5c6f' }}>תדירות שליחה</label>
                <select value={form.frequency} onChange={e => set('frequency', e.target.value)}
                  className={inputCls} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {FREQUENCIES.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-semibold block mb-1.5" style={{ color: '#4a5c6f' }}>אגף / נושא</label>
                <select value={form.domains} onChange={e => set('domains', e.target.value)}
                  className={inputCls} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option>כל האגפים</option>
                  {ALL_DOMAINS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {/* Threshold — only if event-based */}
            {!form.eventType.includes('דוח') && (
              <div>
                <label className="text-[10px] font-semibold block mb-1.5" style={{ color: '#4a5c6f' }}>
                  סף חריגה — שלח התרעה כשביקוש כשל עולה מעל
                  <span className="font-bold ms-1" style={{ color: '#d32f2f' }}>{form.threshold}%</span>
                </label>
                <input type="range" min="5" max="50" step="5" value={form.threshold}
                  onChange={e => set('threshold', e.target.value)}
                  className="w-full" style={{ accentColor: '#1a6fb5' }}
                />
                <div className="flex justify-between text-[9px] mt-0.5" style={{ color: '#c0c8d4' }}>
                  <span>5%</span><span>25%</span><span>50%</span>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-[10px] font-semibold block mb-1.5" style={{ color: '#4a5c6f' }}>כתובת מייל לשליחה *</label>
              <input value={form.email} onChange={e => set('email', e.target.value)}
                placeholder="user@btl.gov.il" type="email" dir="ltr"
                className={inputCls} style={inputStyle}
                onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = '#1a6fb5'}
                onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = '#e8ecf0'}
              />
            </div>

            {/* Preview */}
            {form.name && form.email && (
              <div className="rounded-xl animate-in-d1" style={{
                padding: '14px 18px',
                background: '#f0f4f8',
                border: '1px solid #e8ecf0',
              }}>
                <p className="text-[10px] font-bold mb-1.5" style={{ color: '#4a5c6f' }}>תצוגה מקדימה</p>
                <p className="text-[11px]" style={{ color: '#1a2332' }}>
                  <strong>{form.name}</strong> — {form.eventType}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: '#8a9bb0' }}>
                  {form.frequency} · {form.domains}
                  {!form.eventType.includes('דוח') && ` · סף ${form.threshold}%`}
                  {' '}→ <span dir="ltr">{form.email}</span>
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button onClick={handleSave}
                disabled={!form.name.trim() || !form.email.trim()}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-[12px] font-semibold transition-all disabled:opacity-30"
                style={{
                  background: 'linear-gradient(135deg, #1a6fb5, #1557a0)',
                  color: '#fff',
                  boxShadow: '0 2px 10px rgba(26,111,181,0.25)',
                }}
                onMouseEnter={e => { if (form.name && form.email) (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(26,111,181,0.35)' }}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 10px rgba(26,111,181,0.25)'}
              >
                <Save className="w-3.5 h-3.5" />
                שמור התרעה
              </button>
              <button onClick={onClose}
                className="px-5 py-3 rounded-lg text-[12px] font-medium transition-all"
                style={{ border: '1px solid #e8ecf0', color: '#4a5c6f' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f4f6f9'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                ביטול
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Main Header ─── */
export function GovHeader() {
  const unreadCount = alerts.filter(a => !a.read).length
  const [showSchedule, setShowSchedule] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <header style={{ background: 'linear-gradient(180deg, #0f1b2d 0%, #1a2e4a 100%)', position: 'relative' }}>
        <div className="flex items-center justify-between" style={{ padding: '13px 32px' }}>

          {/* RIGHT: Official BTL Logo + System Title */}
          <div className="flex items-center gap-4">
            {/* Logo block */}
            <div className="flex items-center gap-3">
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1.5px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '4px',
              }}>
                <BtlLogo size={36} />
              </div>
              <div>
                <p className="text-[12px] font-bold" style={{ color: 'rgba(255,255,255,0.9)' }}>הביטוח הלאומי</p>
                <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.4)' }}>המוסד לביטוח לאומי</p>
              </div>
            </div>

            <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.1)', margin: '0 6px' }} />

            {/* System title */}
            <div>
              <div className="flex items-center gap-2">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <h1 className="text-[16px] font-bold text-white">מצפן התובנות הלאומי</h1>
              </div>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)', paddingInlineStart: '25px' }}>
                מערכת ניתוח פניות ציבור מבוססת AI
              </p>
            </div>
          </div>

          {/* LEFT: Controls */}
          <div className="flex items-center gap-2.5">

            {/* AI Summary */}
            <button
              className="flex items-center gap-1.5 rounded-lg transition-all"
              style={{ padding: '7px 13px', background: 'rgba(79,195,247,0.08)', border: '1px solid rgba(79,195,247,0.15)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(79,195,247,0.15)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(79,195,247,0.08)'}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: '#4fc3f7' }} />
              <span className="text-[10px] font-medium" style={{ color: '#4fc3f7' }}>סיכום AI מוכן</span>
            </button>

            {/* ★ Schedule Alert Button — prominent orange accent */}
            <button
              onClick={() => setShowSchedule(true)}
              className="flex items-center gap-1.5 rounded-lg transition-all"
              style={{
                padding: '7px 14px',
                background: 'rgba(230,126,34,0.15)',
                border: '1px solid rgba(230,126,34,0.4)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(230,126,34,0.25)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(230,126,34,0.6)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(230,126,34,0.15)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(230,126,34,0.4)'
              }}
              title="תזמן התרעה"
            >
              <CalendarClock className="w-3.5 h-3.5" style={{ color: '#f0a04b' }} />
              <span className="text-[10px] font-semibold" style={{ color: '#f0a04b' }}>תזמון התרעות</span>
            </button>

            {/* Search */}
            <div className="flex items-center gap-2 rounded-lg" style={{
              padding: '7px 13px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              width: '188px',
            }}>
              <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.35)' }} />
              <input ref={searchRef} type="text" placeholder="חיפוש..." dir="rtl" aria-label="חיפוש"
                className="flex-1 bg-transparent text-[11px] text-white placeholder:text-white/30 outline-none" />
            </div>

            {/* Period */}
            <div className="flex items-center gap-2 rounded-lg" style={{
              padding: '7px 13px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <Calendar className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.4)' }} />
              <div>
                <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.35)' }}>תקופת הדוח</p>
                <p className="text-[11px] font-medium text-white">אפריל 2026</p>
              </div>
            </div>

            {/* Notifications bell */}
            <button
              className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'}
              aria-label="התרעות"
            >
              <Bell className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.65)' }} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -left-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white pulse-badge"
                  style={{ background: '#d32f2f' }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Avatar */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, rgba(79,195,247,0.25), rgba(26,111,181,0.35))',
                border: '2px solid rgba(79,195,247,0.3)',
              }}>
              א.י
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(79,195,247,0.25), #1a6fb5, rgba(79,195,247,0.25), transparent)',
        }} />
      </header>

      {/* Schedule Modal */}
      {showSchedule && <ScheduleModal onClose={() => setShowSchedule(false)} />}
    </>
  )
}
