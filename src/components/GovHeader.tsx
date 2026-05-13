import { Search, Calendar, Bell, Sparkles } from 'lucide-react'
import { alerts } from '@/data/alerts'

export function GovHeader() {
  const unreadCount = alerts.filter(a => !a.read).length

  return (
    <header style={{ background: 'linear-gradient(180deg, #0f1b2d 0%, #1a2e4a 100%)', position: 'relative' }}>
      <div className="flex items-center justify-between" style={{ padding: '14px 32px' }}>
        {/* Right: Logo + Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
              background: 'rgba(79,195,247,0.08)',
              border: '1.5px solid rgba(79,195,247,0.2)',
              boxShadow: '0 0 16px rgba(79,195,247,0.08)',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.6)' }}>הביטוח הלאומי</p>
              <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.35)' }}>לצדך. ברגעים החשובים</p>
            </div>
          </div>

          <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.08)', margin: '0 8px' }} />

          <div className="text-center">
            <div className="flex items-center gap-2 justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2" className="mt-0.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <h1 className="text-[17px] font-bold text-white">מצפן התובנות הלאומי</h1>
            </div>
            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>מערכת ניתוח פניות ציבור מבוססת AI</p>
          </div>
        </div>

        {/* Left: Actions */}
        <div className="flex items-center gap-4">
          {/* AI Summary badge */}
          <button className="flex items-center gap-1.5 rounded-lg transition-all"
            style={{
              padding: '7px 14px',
              background: 'rgba(79,195,247,0.08)',
              border: '1px solid rgba(79,195,247,0.15)',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(79,195,247,0.14)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(79,195,247,0.08)'}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#4fc3f7' }} />
            <span className="text-[10px] font-medium" style={{ color: '#4fc3f7' }}>סיכום AI מוכן</span>
          </button>

          {/* Search */}
          <div className="flex items-center gap-2 rounded-lg transition-all"
            style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', width: '220px' }}
          >
            <Search className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.35)' }} />
            <input type="text" placeholder="חיפוש..." dir="rtl" aria-label="חיפוש"
              className="flex-1 bg-transparent text-[11px] text-white placeholder:text-white/30 outline-none" />
          </div>

          {/* Period */}
          <div className="flex items-center gap-2 rounded-lg" style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Calendar className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.4)' }} />
            <div>
              <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.35)' }}>תקופת הדוח</p>
              <p className="text-[11px] font-medium text-white">אפריל 2026</p>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'}
            aria-label="התרעות"
          >
            <Bell className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.6)' }} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -left-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white pulse-badge"
                style={{ background: '#d32f2f' }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* User */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, rgba(79,195,247,0.2), rgba(26,111,181,0.3))',
              border: '2px solid rgba(79,195,247,0.25)',
              boxShadow: '0 0 12px rgba(79,195,247,0.1)',
            }}
          >
            א.י
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(79,195,247,0.3), #1a6fb5, rgba(79,195,247,0.3), transparent)',
      }} />
    </header>
  )
}
