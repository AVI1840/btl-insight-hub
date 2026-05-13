import { LayoutDashboard, FileText, TrendingUp, MessageSquare, Bell, Settings, HelpCircle, Sparkles } from 'lucide-react'
import { alerts } from '@/data/alerts'

interface Props { activeNav: string; onNavChange: (id: string) => void }

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'תמונת מצב' },
  { id: 'reports', icon: FileText, label: 'דוחות' },
  { id: 'analytics', icon: TrendingUp, label: 'תובנות מגמות' },
  { id: 'queries', icon: MessageSquare, label: 'שאלות ותובנות AI' },
  { id: 'alerts', icon: Bell, label: 'התרעות' },
]

export function NavSidebar({ activeNav, onNavChange }: Props) {
  const unreadCount = alerts.filter(a => !a.read).length

  return (
    <aside
      className="w-[220px] flex-shrink-0 min-h-[calc(100vh-64px)] flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0a0f1a 0%, #111827 100%)' }}
    >
      {/* Brand */}
      <div style={{ padding: '22px 18px 16px' }}>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-3.5 h-3.5" style={{ color: '#4fc3f7' }} />
          <p className="text-[12px] font-bold" style={{ color: '#e2e8f0' }}>
            מצפן התובנות הלאומי
          </p>
        </div>
        <p className="text-[9px]" style={{ color: 'rgba(148,163,184,0.6)', paddingInlineStart: '22px' }}>
          מערכת ניתוח פניות ציבור
        </p>
      </div>

      {/* Nav */}
      <nav style={{ padding: '0 10px', flex: 1 }}>
        {navItems.map((item) => {
          const active = item.id === activeNav
          return (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              aria-current={active ? 'page' : undefined}
              className={`w-full flex items-center gap-2.5 rounded-lg text-[12px] mb-0.5 relative transition-all nav-item${active ? ' nav-item--active' : ''}`}
              style={{
                padding: '10px 14px',
                color: active ? '#ffffff' : 'rgba(148,163,184,0.8)',
                background: active ? 'rgba(26,111,181,0.18)' : 'transparent',
                fontWeight: active ? 600 : 400,
                borderInlineStart: active ? '3px solid #4fc3f7' : '3px solid transparent',
              }}
            >
              <item.icon
                className="w-[15px] h-[15px]"
                style={{ color: active ? '#4fc3f7' : 'rgba(148,163,184,0.5)' }}
              />
              <span>{item.label}</span>
              {item.id === 'alerts' && unreadCount > 0 && (
                <span
                  className="mr-auto text-[8px] font-bold rounded-full flex items-center justify-center pulse-badge"
                  style={{ width: '16px', height: '16px', background: '#d32f2f', color: '#fff' }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Divider */}
      <div style={{ margin: '0 18px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.12), transparent)' }} />

      {/* Bottom */}
      <div style={{ padding: '14px 18px 18px' }}>
        <button className="nav-item flex items-center gap-2 text-[10px] mb-2.5 w-full rounded-md transition-colors"
          style={{ color: 'rgba(148,163,184,0.55)', padding: '6px 8px' }}>
          <Settings className="w-3.5 h-3.5" /> הגדרות
        </button>
        <button className="nav-item flex items-center gap-2 text-[10px] w-full rounded-md transition-colors"
          style={{ color: 'rgba(148,163,184,0.55)', padding: '6px 8px' }}>
          <HelpCircle className="w-3.5 h-3.5" /> עזרה
        </button>
        <p className="text-[8px] mt-3" style={{ color: 'rgba(148,163,184,0.3)' }}>
          נתונים מעודכנים ל-09:00 30/04/2026
        </p>
        <p className="text-[8px]" style={{ color: 'rgba(148,163,184,0.3)' }}>
          ד"ר אגף מחקר ותכנון, ביטוח לאומי
        </p>
      </div>
    </aside>
  )
}
