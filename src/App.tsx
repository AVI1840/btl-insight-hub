import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { GovHeader } from '@/components/GovHeader'
import { NavSidebar } from '@/components/NavSidebar'
import { DashboardView } from '@/components/DashboardView'
import { ReportsView } from '@/components/ReportsView'
import { AnalyticsView } from '@/components/AnalyticsView'
import { QueriesView } from '@/components/QueriesView'
import { AlertsView } from '@/components/AlertsView'
import { FeedbackModal } from '@/components/FeedbackModal'

function App() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: '#f4f6f9' }} dir="rtl">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-[200] focus:px-3 focus:py-1.5 focus:rounded focus:bg-[#1a6fb5] focus:text-white focus:text-[12px]">
        דלג לתוכן הראשי
      </a>

      <GovHeader />

      <div className="flex">
        <NavSidebar activeNav={activeNav} onNavChange={setActiveNav} />

        <main id="main-content" className="flex-1 min-w-0" style={{ padding: '24px 28px 60px' }}>
          {activeNav === 'dashboard' && <DashboardView />}
          {activeNav === 'reports' && <ReportsView />}
          {activeNav === 'analytics' && <AnalyticsView />}
          {activeNav === 'queries' && <QueriesView />}
          {activeNav === 'alerts' && <AlertsView />}
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
