import { useState, useEffect } from 'react'
import { MessageCircle, Menu, X } from 'lucide-react'
import { GovHeader } from '@/components/GovHeader'
import { NavSidebar } from '@/components/NavSidebar'
import { DashboardView } from '@/components/DashboardView'
import { ServiceQualityView } from '@/components/ServiceQualityView'
import { ReportsView } from '@/components/ReportsView'
import { AnalyticsView } from '@/components/AnalyticsView'
import { QueriesView } from '@/components/QueriesView'
import { AlertsView } from '@/components/AlertsView'
import { ArchitectureView } from '@/components/ArchitectureView'
import { FeedbackModal } from '@/components/FeedbackModal'

const liveAlerts = [
  { id: 1, text: 'AI זיהה עלייה חריגה של 15% בפניות סיעוד בשעה האחרונה — ייתכן כשל מערכתי', severity: 'critical' as const, time: '09:42' },
  { id: 2, text: 'מוקד צפת — ירידה של 8% נוספת בפניות חוזרות. "שעת הלמידה" ממשיכה לתת תוצאות', severity: 'positive' as const, time: '09:38' },
  { id: 3, text: 'זוהו 340 אזרחים חדשים שנפגעו מכשל סנכרון לשכת התעסוקה — ממתינים לאישור פעולה', severity: 'warning' as const, time: '09:35' },
]

function App() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [currentAlert, setCurrentAlert] = useState(0)

  // Show live alert after 25 seconds, cycle every 40 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => setAlertVisible(true), 25000)
    return () => clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    if (!alertVisible) return
    const hideTimer = setTimeout(() => setAlertVisible(false), 8000)
    return () => clearTimeout(hideTimer)
  }, [alertVisible, currentAlert])

  useEffect(() => {
    const cycleTimer = setInterval(() => {
      setCurrentAlert(prev => (prev + 1) % liveAlerts.length)
      setAlertVisible(true)
    }, 40000)
    return () => clearInterval(cycleTimer)
  }, [])

  const handleNavChange = (id: string) => {
    setActiveNav(id)
    setMobileMenuOpen(false)
  }

  const alert = liveAlerts[currentAlert]
  const sevStyles = {
    critical: { bg: '#fef5f5', border: '#d32f2f', icon: '🔴', color: '#d32f2f' },
    warning: { bg: '#fef9f3', border: '#e67e22', icon: '🟡', color: '#e67e22' },
    positive: { bg: '#f0fdf4', border: '#27864a', icon: '🟢', color: '#27864a' },
  }
  const sev = sevStyles[alert.severity]

  return (
    <div className="min-h-screen" style={{ background: '#f4f6f9' }} dir="rtl">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-[200] focus:px-3 focus:py-1.5 focus:rounded focus:bg-[#1a6fb5] focus:text-white focus:text-[12px]">
        דלג לתוכן הראשי
      </a>

      {/* Live AI Alert Banner */}
      {alertVisible && (
        <div
          className="fixed top-2 left-1/2 z-[100] -translate-x-1/2 w-[90%] max-w-[600px] rounded-xl shadow-lg transition-all"
          style={{
            padding: '12px 18px',
            background: sev.bg,
            border: `1px solid ${sev.border}30`,
            animation: 'alertSlideIn 0.4s ease-out',
          }}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-[14px] flex-shrink-0">{sev.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${sev.color}15`, color: sev.color }}>AI Alert · {alert.time}</span>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: '#1a2332' }}>{alert.text}</p>
            </div>
            <button
              onClick={() => setAlertVisible(false)}
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'rgba(0,0,0,0.05)' }}
              aria-label="סגור התראה"
            >
              <X className="w-3.5 h-3.5" style={{ color: '#8a9bb0' }} />
            </button>
          </div>
        </div>
      )}

      <GovHeader />

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-[70px] right-3 z-50 w-9 h-9 rounded-lg flex items-center justify-center lg:hidden"
        style={{ background: '#ffffff', border: '1px solid #e8ecf0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        aria-label="תפריט"
      >
        {mobileMenuOpen ? <X className="w-4 h-4" style={{ color: '#1a2332' }} /> : <Menu className="w-4 h-4" style={{ color: '#1a2332' }} />}
      </button>

      <div className="flex">
        {/* Sidebar — hidden on mobile, overlay when open */}
        <div className={`${mobileMenuOpen ? 'fixed inset-0 z-40' : 'hidden'} lg:block lg:relative lg:inset-auto lg:z-auto`}>
          {mobileMenuOpen && <div className="absolute inset-0 bg-black/20 lg:hidden" onClick={() => setMobileMenuOpen(false)} />}
          <div className={`relative z-10 ${mobileMenuOpen ? 'block' : ''}`}>
            <NavSidebar activeNav={activeNav} onNavChange={handleNavChange} />
          </div>
        </div>

        <main id="main-content" className="flex-1 min-w-0 px-4 py-5 lg:px-7 lg:py-6 pb-16">
          {activeNav === 'dashboard' && <DashboardView />}
          {activeNav === 'quality' && <ServiceQualityView />}
          {activeNav === 'reports' && <ReportsView />}
          {activeNav === 'analytics' && <AnalyticsView />}
          {activeNav === 'queries' && <QueriesView />}
          {activeNav === 'alerts' && <AlertsView />}
          {activeNav === 'architecture' && <ArchitectureView />}
        </main>
      </div>

      <button
        onClick={() => setFeedbackOpen(true)}
        className="fixed bottom-5 left-5 z-50 flex items-center gap-1.5 px-3.5 py-2.5 rounded-full shadow-lg text-white text-[11px] font-medium transition-transform hover:scale-105"
        style={{ backgroundColor: '#1a2e4a' }}
        aria-label="משוב פיילוט"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">משוב</span>
      </button>
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  )
}

export default App
