import { ArrowUp, ArrowDown, AlertTriangle, TrendingUp, Users, Activity, Flame, Heart, BarChart3, Sparkles, Clock } from 'lucide-react'
import { executiveSummary, insights, proactiveActions, ALL_DOMAINS } from '@/data/insights'
import { useState } from 'react'
import { MiniSparkline } from '@/components/ui/MiniSparkline'
import { DonutChart } from '@/components/ui/DonutChart'
import { CitizenQuoteCarousel } from '@/components/ui/CitizenQuoteCarousel'

export function DashboardView() {
  const [activeDomain, setActiveDomain] = useState('הכל')
  const [demoMode, setDemoMode] = useState(true)
  const domains = ['הכל', ...ALL_DOMAINS.slice(0, 9)]

  const filtered = activeDomain === 'הכל'
    ? insights.slice(0, 4)
    : insights.filter(i => i.domain === activeDomain).slice(0, 4)

  const citizenQuotes = insights.slice(0, 6).map(i => ({ text: i.citizenVoice, domain: i.domain }))

  const donutSegments = [
    { label: 'סנכרון מערכות', value: 40.4, color: '#d32f2f' },
    { label: 'חסם שירות', value: 22.1, color: '#e67e22' },
    { label: 'עיכוב תהליכי', value: 21.4, color: '#1a6fb5' },
    { label: 'מידע חסר', value: 16.1, color: '#27864a' },
  ]

  return (
    <div className="animate-in w-full max-w-[1100px]">
      {/* ═══ DEMO MODE BANNER ═══ */}
      <div className="mb-4 animate-in-d1 flex items-center justify-between rounded-xl" style={{
        padding: '10px 18px',
        background: demoMode ? 'linear-gradient(135deg, #fffbeb, #fef3c7)' : '#f8f9fb',
        border: demoMode ? '1px solid rgba(234,179,8,0.2)' : '1px solid #e8ecf0',
      }}>
        <div className="flex items-center gap-2.5">
          <span className="text-[14px]">{demoMode ? '🎬' : '📊'}</span>
          <div>
            <p className="text-[11px] font-bold" style={{ color: '#1a2332' }}>
              {demoMode ? 'מצב הדגמה — נתוני סימולציה' : 'מצב פרודקשן — נתונים אמיתיים'}
            </p>
            <p className="text-[9px]" style={{ color: '#8a9bb0' }}>
              {demoMode ? 'הנתונים מבוססים על דפוסים אמיתיים מ-82,450 פניות' : 'מחובר ל-Verint API · עדכון אחרון 09:00'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setDemoMode(!demoMode)}
          className="flex items-center gap-2 rounded-lg text-[10px] font-medium transition-all"
          style={{
            padding: '6px 14px',
            background: demoMode ? '#ffffff' : 'linear-gradient(135deg, #1a6fb5, #1557a0)',
            color: demoMode ? '#4a5c6f' : '#ffffff',
            border: demoMode ? '1px solid #e8ecf0' : '1px solid #1a6fb5',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          <div className="w-7 h-4 rounded-full relative" style={{ background: demoMode ? '#e67e22' : '#27864a' }}>
            <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all shadow-sm" style={{ [demoMode ? 'right' : 'left']: '2px' }} />
          </div>
          {demoMode ? 'הדגמה' : 'פרודקשן'}
        </button>
      </div>

      {/* ═══ HERO SUMMARY CARD ═══ */}
      <div className="card-premium mb-5 animate-in-d1 relative overflow-hidden" style={{ padding: '20px' }}>
        {/* Decorative gradient circle */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          left: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,111,181,0.06), transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="flex items-start justify-between relative">
          <div className="flex-1" style={{ maxWidth: '700px' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #edf5fc, #dbeafe)' }}>
                <Sparkles className="w-3.5 h-3.5" style={{ color: '#1a6fb5' }} />
              </div>
              <span className="text-[13px] font-bold" style={{ color: '#1a2332' }}>סיכום מנהלים — אפריל 2026</span>
            </div>
            <p className="text-[12px] leading-[1.9]" style={{ color: '#4a5c6f' }}>
              {executiveSummary.narrative}
            </p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0" style={{ background: '#f0f2f5', borderRadius: '8px', padding: '5px 10px' }}>
            <Clock className="w-3 h-3" style={{ color: '#8a9bb0' }} />
            <span className="text-[9px]" style={{ color: '#8a9bb0' }}>09:00 30/04/2026</span>
          </div>
        </div>

        {/* Mini stats row */}
        <div className="flex items-center gap-3 sm:gap-6 mt-4 pt-4 flex-wrap" style={{ borderTop: '1px solid #f0f2f5' }}>
          <HeroStat label="פניות שנותחו" value="82,450" color="#1a6fb5" />
          <div className="hidden sm:block" style={{ width: '1px', height: '24px', background: '#e8ecf0' }} />
          <HeroStat label="מדד כאב" value="7.8 / 10" color="#d32f2f" />
          <div className="hidden sm:block" style={{ width: '1px', height: '24px', background: '#e8ecf0' }} />
          <HeroStat label="ביקוש כשל" value="14.2%" color="#e67e22" />
          <div className="hidden sm:block" style={{ width: '1px', height: '24px', background: '#e8ecf0' }} />
          <HeroStat label="אגפים" value="12" color="#1a2332" />
        </div>
      </div>

      {/* ═══ KPI STRIP ═══ */}
      <div className="mb-5 animate-in-d2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <KpiCard icon={<Users className="w-[16px] h-[16px]" />} label="פניות שנותחו" value="82,450" sub="12 אגפים" accent="#1a6fb5"
          sparkData={[4, 6, 5, 8, 7, 9, 8]} />
        <KpiCard icon={<ArrowUp className="w-[16px] h-[16px]" />} label="שינוי מחודש קודם" value="+4.7%" sub="עלייה" accent="#d32f2f"
          sparkData={[3, 4, 3, 5, 6, 5, 7]} />
        <KpiCard icon={<Flame className="w-[16px] h-[16px]" />} label="מדד כאב ארגוני" value="7.8 / 10" accent="#d32f2f" highlight
          sparkData={[6, 7, 7, 8, 7, 8, 8]} />
        <KpiCard icon={<Activity className="w-[16px] h-[16px]" />} label="ביקוש כשל" value="14.2%" sub="11,708 מיותרות" accent="#e67e22"
          sparkData={[5, 6, 7, 5, 6, 7, 6]} />
        <KpiCard icon={<Heart className="w-[16px] h-[16px]" />} label="נושא מחריף" value="נכות כללית" sub="מדד כאב 9.1" accent="#d32f2f"
          sparkData={[4, 5, 6, 7, 8, 8, 9]} />
      </div>

      {/* ═══ MID SECTION — 3 columns ═══ */}
      <div className="mb-5 animate-in-d3 grid grid-cols-1 lg:grid-cols-[1fr_260px_260px] gap-3">
        {/* Executive Insights */}
        <div className="card-premium" style={{ padding: '20px 22px' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#fef5f5' }}>
                <AlertTriangle className="w-3.5 h-3.5" style={{ color: '#d32f2f' }} />
              </div>
              <span className="text-[12px] font-bold" style={{ color: '#1a2332' }}>החמרות הדורשות טיפול</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <InsightRow severity="critical" icon={<AlertTriangle className="w-3.5 h-3.5" />}
              text="עלייה של 23% בפניות חוזרות בסיעוד — בני משפחה מתקשרים שוב ושוב לבדוק סטטוס הערכה"
              domain="סיעוד" />
            <InsightRow severity="warning" icon={<ArrowUp className="w-3.5 h-3.5" />}
              text={'כשל סנכרון לשכת התעסוקה — זיהוי של 40.4% מהפניות החוזרות באבטלה. "אפקט טופס 100"'}
              domain="אבטלה" />
            <InsightRow severity="positive" icon={<ArrowDown className="w-3.5 h-3.5" />}
              text={'שיפור משמעותי בסיפור המילואים אחרי שיפור ממשק צה"ל — ירידה של 12% בביקוש כשל'}
              domain="מילואים" />
          </div>
        </div>

        {/* Donut Chart */}
        <div className="card-premium flex flex-col items-center justify-center" style={{ padding: '20px 16px' }}>
          <div className="flex items-center gap-2 mb-4 self-start">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#edf5fc' }}>
              <BarChart3 className="w-3.5 h-3.5" style={{ color: '#1a6fb5' }} />
            </div>
            <span className="text-[11px] font-bold" style={{ color: '#1a2332' }}>כשלים שורשיים</span>
          </div>
          <DonutChart
            segments={donutSegments}
            centerValue="11.7K"
            centerLabel="פניות כשל"
            size={120}
          />
        </div>

        {/* Citizen Quote Carousel */}
        <CitizenQuoteCarousel quotes={citizenQuotes} />
      </div>

      {/* ═══ TOPIC TABS + CARDS ═══ */}
      <div className="mb-5 animate-in-d4">
        <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-1">
          {domains.map(d => (
            <button key={d} onClick={() => setActiveDomain(d)}
              className="rounded-lg text-[11px] whitespace-nowrap transition-all"
              style={{
                padding: '7px 16px',
                color: activeDomain === d ? '#ffffff' : '#4a5c6f',
                background: activeDomain === d ? 'linear-gradient(135deg, #1a6fb5, #1557a0)' : '#ffffff',
                border: activeDomain === d ? '1px solid #1a6fb5' : '1px solid #e8ecf0',
                fontWeight: activeDomain === d ? 600 : 400,
                boxShadow: activeDomain === d ? '0 2px 8px rgba(26,111,181,0.2)' : 'var(--shadow-xs)',
              }}>
              {d}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map(ins => (
            <TopicCard key={ins.id} insight={ins} />
          ))}
        </div>
      </div>

      {/* ═══ ACTIONS ═══ */}
      <div className="animate-in-d5">
        <ActionsPanel />
      </div>

      {/* ═══ AI IMPACT PANEL ═══ */}
      <div className="animate-in-d5 mt-5">
        <ImpactPanel />
      </div>

      {/* ═══ AI PREDICTION ═══ */}
      <div className="animate-in-d5 mt-5">
        <PredictionPanel />
      </div>

      {/* ═══ ROI CALCULATOR ═══ */}
      <div className="animate-in-d5 mt-5">
        <ROIPanel />
      </div>
    </div>
  )
}

/* ─── Components ─── */

function HeroStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <p className="text-[10px]" style={{ color: '#8a9bb0' }}>{label}</p>
      <p className="text-[15px] font-bold" style={{ color }}>{value}</p>
    </div>
  )
}

function KpiCard({ icon, label, value, sub, accent, highlight, sparkData }: {
  icon: React.ReactNode; label: string; value: string; sub?: string; accent: string; highlight?: boolean; sparkData: number[]
}) {
  return (
    <div className="card-interactive" style={{
      padding: '18px 20px',
      background: highlight ? `linear-gradient(135deg, ${accent}06, ${accent}02)` : '#ffffff',
      border: highlight ? `1px solid ${accent}18` : '1px solid #e8ecf0',
    }}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}0a`, color: accent }}>
          {icon}
        </div>
        <MiniSparkline data={sparkData} color={accent} height={20} />
      </div>
      <p className="text-[22px] font-bold mb-0.5" style={{ color: accent }}>{value}</p>
      <p className="text-[10px]" style={{ color: '#8a9bb0' }}>{label}</p>
      {sub && <p className="text-[9px] mt-0.5" style={{ color: '#8a9bb0' }}>{sub}</p>}
    </div>
  )
}

function InsightRow({ severity, icon, text, domain }: { severity: string; icon: React.ReactNode; text: string; domain: string }) {
  const colors: Record<string, string> = { critical: '#d32f2f', warning: '#e67e22', positive: '#27864a' }
  const color = colors[severity] || '#8a9bb0'

  return (
    <div className="flex items-start gap-3 rounded-lg transition-colors" style={{
      paddingInlineStart: '14px',
      borderInlineStart: `3px solid ${color}`,
      padding: '8px 12px 8px 8px',
    }}
    >
      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded flex items-center justify-center" style={{ background: `${color}0d`, color }}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-[11px] leading-relaxed" style={{ color: '#1a2332' }}>{text}</p>
        <span className="text-[9px]" style={{ color: '#8a9bb0' }}>{domain}</span>
      </div>
    </div>
  )
}

function TopicCard({ insight }: { insight: typeof insights[0] }) {
  const sevColors: Record<string, string> = { critical: '#d32f2f', high: '#e67e22', medium: '#1a6fb5', low: '#27864a' }
  const color = sevColors[insight.severity]
  const sevLabels: Record<string, string> = { critical: 'קריטי', high: 'גבוה', medium: 'בינוני', low: 'נמוך' }

  return (
    <div className="card-interactive" style={{ padding: '20px 22px' }}>
      {/* Title row */}
      <div className="flex items-start gap-2.5 mb-2.5">
        <div className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}40` }} />
        <div className="flex-1">
          <p className="text-[13px] font-bold leading-snug" style={{ color: '#1a2332' }}>{insight.title}</p>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] px-2.5 py-0.5 rounded-md font-medium" style={{
          background: `${color}0d`,
          color,
        }}>
          {sevLabels[insight.severity]}
        </span>
        <span className="text-[10px]" style={{ color: '#8a9bb0' }}>ביקוש כשל <strong style={{ color }}>{insight.failureDemandPct}%</strong></span>
        <span className="text-[10px]" style={{ color: '#8a9bb0' }}>נפגעים <strong>{insight.affectedCount.toLocaleString()}</strong></span>
      </div>

      {/* Citizen quote */}
      <div className="rounded-lg mb-3" style={{ padding: '10px 14px', background: '#fefcf3', borderInlineStart: '2px solid #e67e22' }}>
        <p className="text-[10px] italic leading-relaxed" style={{ color: '#4a5c6f' }}>
          &ldquo;{insight.citizenVoice.slice(0, 100)}...&rdquo;
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <span className="text-[9px]" style={{ color: '#8a9bb0' }}>כשל שורשי</span>
        <div className="flex-1 h-2 rounded-full" style={{ background: '#f0f2f5' }}>
          <div className="h-full rounded-full transition-all" style={{
            width: `${insight.rootCausePct}%`,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          }} />
        </div>
        <span className="text-[10px] font-bold" style={{ color }}>{insight.rootCausePct}%</span>
      </div>
    </div>
  )
}

function ActionsPanel() {
  const [statuses, setStatuses] = useState<Record<string, string>>(
    Object.fromEntries(proactiveActions.slice(0, 3).map(a => [a.id, a.status]))
  )
  const [showImpact, setShowImpact] = useState<string | null>(null)

  const impactCalc: Record<string, { citizens: number; calls: number; hours: number; monthly: string }> = {
    'act-001': { citizens: 1200, calls: 840, hours: 2520, monthly: '~3,400 פניות/שנה יימנעו' },
    'act-002': { citizens: 206, calls: 145, hours: 435, monthly: '~580 פניות/שנה יימנעו' },
    'act-003': { citizens: 3200, calls: 2240, hours: 6720, monthly: '~9,000 פניות/שנה יימנעו' },
  }

  const approve = (id: string) => {
    setStatuses(prev => ({ ...prev, [id]: 'approved' }))
    setShowImpact(id)
    setTimeout(() => setShowImpact(null), 6000)
  }

  return (
    <div className="card-premium" style={{ padding: '20px 24px' }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#edf5fc' }}>
          <BarChart3 className="w-3.5 h-3.5" style={{ color: '#1a6fb5' }} />
        </div>
        <span className="text-[12px] font-bold" style={{ color: '#1a2332' }}>המלצות אופרטיביות</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {proactiveActions.slice(0, 3).map(action => {
          const sevColor = action.severity === 'critical' ? '#d32f2f' : '#e67e22'
          const impact = impactCalc[action.id]
          return (
            <div key={action.id}>
              <div className="flex items-center gap-3 rounded-xl transition-all" style={{
                padding: '14px 18px',
                background: statuses[action.id] === 'approved' ? '#f0fdf4' : '#f8f9fb',
                border: statuses[action.id] === 'approved' ? '1px solid rgba(39,134,74,0.15)' : '1px solid #f0f2f5',
              }}>
                <div className="w-1.5 self-stretch rounded-full flex-shrink-0" style={{ background: statuses[action.id] === 'approved' ? '#27864a' : sevColor }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] leading-relaxed" style={{ color: '#1a2332' }}>{action.description}</p>
                  <span className="text-[9px]" style={{ color: '#8a9bb0' }}>{action.affectedCount.toLocaleString()} אזרחים · {action.domain}</span>
                </div>
                {statuses[action.id] === 'pending' ? (
                  <button onClick={() => approve(action.id)}
                    className="text-[10px] font-semibold px-4 py-2 rounded-lg transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #1a6fb5, #1557a0)',
                      color: '#ffffff',
                      boxShadow: '0 2px 8px rgba(26,111,181,0.2)',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(26,111,181,0.3)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(26,111,181,0.2)'}
                  >
                    {action.buttonText}
                  </button>
                ) : (
                  <span className="text-[10px] font-semibold px-3.5 py-1.5 rounded-lg" style={{
                    background: 'linear-gradient(135deg, #f0faf4, #e6f7ed)',
                    color: '#27864a',
                  }}>
                    ✓ אושר
                  </span>
                )}
              </div>

              {/* Impact Animation — shows after approval */}
              {showImpact === action.id && impact && (
                <div className="mt-2 rounded-xl overflow-hidden animate-in" style={{
                  background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
                  border: '1px solid rgba(39,134,74,0.12)',
                  padding: '14px 18px',
                }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[14px]">⚡</span>
                    <span className="text-[11px] font-bold" style={{ color: '#27864a' }}>חישוב השפעה — AI Impact Calculator</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <ImpactMini icon="👨‍👩‍👧‍👦" value={impact.citizens.toLocaleString()} label="אזרחים מושפעים" />
                    <ImpactMini icon="📞" value={`~${impact.calls.toLocaleString()}`} label="פניות שיימנעו" />
                    <ImpactMini icon="⏱️" value={`~${impact.hours.toLocaleString()}`} label="שעות המתנה נחסכות" />
                    <ImpactMini icon="📈" value="60%" label="הפחתה צפויה" />
                  </div>
                  <p className="text-[9px] mt-2.5 text-center font-medium" style={{ color: '#27864a' }}>
                    🎯 {impact.monthly}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ImpactMini({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="rounded-lg text-center" style={{ padding: '8px 6px', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(39,134,74,0.08)' }}>
      <span className="text-[14px]">{icon}</span>
      <p className="text-[13px] font-bold" style={{ color: '#27864a' }}>{value}</p>
      <p className="text-[8px]" style={{ color: '#8a9bb0' }}>{label}</p>
    </div>
  )
}

/* ═══ AI IMPACT PANEL ═══ */
function ImpactPanel() {
  const impactData = {
    monthlyActions: 3,
    citizensHelped: 1847,
    callsPrevented: 1203,
    hoursWaitSaved: 3609,
    yearlyProjection: 22164,
  }

  return (
    <div className="card-premium" style={{ padding: '22px 24px' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)' }}>
            <TrendingUp className="w-4 h-4" style={{ color: '#27864a' }} />
          </div>
          <div>
            <h3 className="text-[13px] font-bold" style={{ color: '#1a2332' }}>מד השפעה — AI Impact</h3>
            <p className="text-[10px]" style={{ color: '#8a9bb0' }}>חישוב אוטומטי על בסיס נתוני עבר</p>
          </div>
        </div>
        <span className="text-[9px] px-2.5 py-1 rounded-full font-medium" style={{ background: '#ecfdf5', color: '#27864a', border: '1px solid rgba(39,134,74,0.15)' }}>
          AI Predictive
        </span>
      </div>

      {/* Impact metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <ImpactMetric icon="👨‍👩‍👧‍👦" value={impactData.citizensHelped.toLocaleString()} label="אזרחים הושפעו החודש" color="#27864a" />
        <ImpactMetric icon="📞" value={impactData.callsPrevented.toLocaleString()} label="פניות חוזרות נמנעו" color="#1a6fb5" />
        <ImpactMetric icon="⏱️" value={impactData.hoursWaitSaved.toLocaleString()} label="שעות המתנה נחסכו" color="#e67e22" />
        <ImpactMetric icon="📈" value={`~${(impactData.yearlyProjection / 1000).toFixed(0)}K`} label="צפי שנתי — אזרחים" color="#1a2332" />
      </div>

      {/* Yearly projection bar */}
      <div className="rounded-lg" style={{ padding: '14px 18px', background: '#f0faf4', border: '1px solid rgba(39,134,74,0.1)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold" style={{ color: '#27864a' }}>צפי אימפקט שנתי</span>
          <span className="text-[11px] font-bold" style={{ color: '#27864a' }}>22,164 אזרחים</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(39,134,74,0.1)' }}>
          <div className="h-full rounded-full transition-all duration-1000" style={{ width: '73%', background: 'linear-gradient(90deg, #27864a, #10b981)' }} />
        </div>
        <p className="text-[9px] mt-1.5" style={{ color: '#8a9bb0' }}>
          על בסיס 3 פעולות שאושרו החודש · חישוב AI מבוסס דפוסי עבר
        </p>
      </div>
    </div>
  )
}

function ImpactMetric({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  return (
    <div className="rounded-lg text-center" style={{ padding: '14px 10px', background: '#f8f9fb', border: '1px solid #f0f2f5' }}>
      <span className="text-[18px]">{icon}</span>
      <p className="text-[18px] font-bold mt-1" style={{ color }}>{value}</p>
      <p className="text-[9px] mt-0.5" style={{ color: '#8a9bb0' }}>{label}</p>
    </div>
  )
}

/* ═══ AI PREDICTION PANEL ═══ */
function PredictionPanel() {
  const predictions = [
    {
      id: 'pred-1',
      severity: 'critical',
      title: 'צפי: +800 פניות חוזרות בחודש הבא',
      condition: 'אם לא נטפל בכשל הסנכרון עם לשכת התעסוקה',
      recommendation: 'שליחת הודעה פרואקטיבית ל-1,200 אזרחים שנפגעו',
      impact: 'מניעת ~60% מהפניות הצפויות (~480 פניות)',
      confidence: 89,
    },
    {
      id: 'pred-2',
      severity: 'warning',
      title: 'מגמת עלייה בפניות סיעוד — +23% בשבועיים',
      condition: 'המתנה ממוצעת לביקור הערכה עלתה ל-8 שבועות',
      recommendation: 'הפעלת מעריכים ניידים באזור המרכז',
      impact: 'קיצור המתנה ל-4 שבועות, מניעת ~300 פניות חוזרות',
      confidence: 82,
    },
    {
      id: 'pred-3',
      severity: 'positive',
      title: 'שיפור צפוי במילואים — ירידה נוספת של 8%',
      condition: 'ממשק צה"ל המשופר ממשיך לתת תוצאות',
      recommendation: 'להמשיך מעקב — אין צורך בפעולה',
      impact: 'חיסכון של ~200 פניות/חודש ללא התערבות',
      confidence: 94,
    },
  ]

  const sevConfig: Record<string, { color: string; bg: string; icon: string }> = {
    critical: { color: '#d32f2f', bg: '#fef5f5', icon: '🔴' },
    warning: { color: '#e67e22', bg: '#fef9f3', icon: '🟡' },
    positive: { color: '#27864a', bg: '#f0fdf4', icon: '🟢' },
  }

  return (
    <div className="card-premium" style={{ padding: '22px 24px' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #edf5fc, #dbeafe)' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#1a6fb5' }} />
          </div>
          <div>
            <h3 className="text-[13px] font-bold" style={{ color: '#1a2332' }}>חיזוי AI — מה יקרה אם לא נפעל?</h3>
            <p className="text-[10px]" style={{ color: '#8a9bb0' }}>ניתוח מגמות + חיזוי על בסיס דפוסי עבר</p>
          </div>
        </div>
        <span className="text-[9px] px-2.5 py-1 rounded-full font-medium" style={{ background: '#edf5fc', color: '#1a6fb5', border: '1px solid rgba(26,111,181,0.15)' }}>
          Predictive AI
        </span>
      </div>

      {/* Predictions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {predictions.map(pred => {
          const sev = sevConfig[pred.severity]
          return (
            <div key={pred.id} className="rounded-lg overflow-hidden" style={{ border: `1px solid ${sev.color}15`, background: sev.bg }}>
              <div style={{ padding: '14px 18px' }}>
                {/* Title row */}
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-[14px] mt-0.5">{sev.icon}</span>
                  <div className="flex-1">
                    <p className="text-[12px] font-bold" style={{ color: '#1a2332' }}>{pred.title}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: '#4a5c6f' }}>{pred.condition}</p>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${sev.color}12`, color: sev.color }}>
                    ביטחון {pred.confidence}%
                  </span>
                </div>

                {/* Recommendation */}
                <div className="rounded-md" style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.04)' }}>
                  <p className="text-[10px] font-semibold mb-0.5" style={{ color: '#4a5c6f' }}>💡 המלצת AI:</p>
                  <p className="text-[11px]" style={{ color: '#1a2332' }}>{pred.recommendation}</p>
                  <p className="text-[10px] mt-1 font-medium" style={{ color: sev.color }}>⚡ אימפקט צפוי: {pred.impact}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ═══ ROI CALCULATOR PANEL ═══ */
function ROIPanel() {
  const roi = {
    costPerCall: 35, // ₪ עלות ממוצעת לפנייה
    callsPrevented: 1203,
    monthlySaving: 1203 * 35,
    yearlySaving: 1203 * 35 * 12,
    agentHoursSaved: 601, // שעות נציג
    citizenHoursSaved: 3609,
    satisfactionDelta: '+12%',
  }

  return (
    <div className="card-premium" style={{ padding: '22px 24px' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)' }}>
            <span className="text-[16px]">💰</span>
          </div>
          <div>
            <h3 className="text-[13px] font-bold" style={{ color: '#1a2332' }}>מחשבון ROI — החזר השקעה</h3>
            <p className="text-[10px]" style={{ color: '#8a9bb0' }}>חישוב אוטומטי על בסיס פעולות שאושרו</p>
          </div>
        </div>
        <span className="text-[9px] px-2.5 py-1 rounded-full font-medium" style={{ background: '#fef3c7', color: '#92400e', border: '1px solid rgba(146,64,14,0.15)' }}>
          Real-time ROI
        </span>
      </div>

      {/* Main ROI number */}
      <div className="rounded-xl mb-4 text-center" style={{ padding: '20px', background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)', border: '1px solid rgba(39,134,74,0.1)' }}>
        <p className="text-[10px] mb-1" style={{ color: '#8a9bb0' }}>חיסכון שנתי צפוי</p>
        <p className="text-[28px] font-bold" style={{ color: '#27864a' }}>₪{(roi.yearlySaving / 1000).toFixed(0)}K</p>
        <p className="text-[10px]" style={{ color: '#4a5c6f' }}>
          ({roi.callsPrevented.toLocaleString()} פניות × ₪{roi.costPerCall} × 12 חודשים)
        </p>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <ROIMetric icon="📞" value={`₪${(roi.monthlySaving / 1000).toFixed(0)}K`} label="חיסכון חודשי" sub="עלות פניות שנמנעו" />
        <ROIMetric icon="👨‍💼" value={`${roi.agentHoursSaved}`} label="שעות נציג/חודש" sub="זמן שהתפנה לשירות" />
        <ROIMetric icon="⏱️" value={`${(roi.citizenHoursSaved / 1000).toFixed(1)}K`} label="שעות המתנה" sub="נחסכו לאזרחים" />
        <ROIMetric icon="😊" value={roi.satisfactionDelta} label="שביעות רצון" sub="שיפור צפוי" />
      </div>

      {/* Bottom note */}
      <div className="mt-4 rounded-lg flex items-center gap-2" style={{ padding: '10px 14px', background: '#fffbeb', border: '1px solid rgba(234,179,8,0.15)' }}>
        <span className="text-[12px]">💡</span>
        <p className="text-[10px]" style={{ color: '#92400e' }}>
          <strong>הערה:</strong> החישוב מבוסס על עלות ממוצעת של ₪35 לפנייה (כולל זמן נציג, תשתיות, ותקורה). 
          בפרודקשן — הנתון יתעדכן אוטומטית מנתוני Verint.
        </p>
      </div>
    </div>
  )
}

function ROIMetric({ icon, value, label, sub }: { icon: string; value: string; label: string; sub: string }) {
  return (
    <div className="rounded-lg text-center" style={{ padding: '14px 10px', background: '#f8f9fb', border: '1px solid #f0f2f5' }}>
      <span className="text-[16px]">{icon}</span>
      <p className="text-[16px] font-bold mt-1" style={{ color: '#1a2332' }}>{value}</p>
      <p className="text-[9px] font-medium mt-0.5" style={{ color: '#4a5c6f' }}>{label}</p>
      <p className="text-[8px]" style={{ color: '#8a9bb0' }}>{sub}</p>
    </div>
  )
}
