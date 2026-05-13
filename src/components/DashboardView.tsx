import { ArrowUp, ArrowDown, AlertTriangle, TrendingUp, Users, Activity, Flame, Heart, BarChart3, Sparkles, Clock } from 'lucide-react'
import { executiveSummary, insights, proactiveActions, ALL_DOMAINS } from '@/data/insights'
import { useState } from 'react'
import { MiniSparkline } from '@/components/ui/MiniSparkline'
import { DonutChart } from '@/components/ui/DonutChart'
import { CitizenQuoteCarousel } from '@/components/ui/CitizenQuoteCarousel'

export function DashboardView() {
  const [activeDomain, setActiveDomain] = useState('הכל')
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
    <div className="animate-in" style={{ maxWidth: '1100px' }}>
      {/* ═══ HERO SUMMARY CARD ═══ */}
      <div className="card-premium mb-5 animate-in-d1 relative overflow-hidden" style={{ padding: '24px 28px' }}>
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
        <div className="flex items-center gap-6 mt-4 pt-4" style={{ borderTop: '1px solid #f0f2f5' }}>
          <HeroStat label="פניות שנותחו" value="82,450" color="#1a6fb5" />
          <div style={{ width: '1px', height: '24px', background: '#e8ecf0' }} />
          <HeroStat label="מדד כאב" value="7.8 / 10" color="#d32f2f" />
          <div style={{ width: '1px', height: '24px', background: '#e8ecf0' }} />
          <HeroStat label="ביקוש כשל" value="14.2%" color="#e67e22" />
          <div style={{ width: '1px', height: '24px', background: '#e8ecf0' }} />
          <HeroStat label="אגפים" value="12" color="#1a2332" />
        </div>
      </div>

      {/* ═══ KPI STRIP ═══ */}
      <div className="mb-5 animate-in-d2" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
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
      <div className="mb-5 animate-in-d3" style={{ display: 'grid', gridTemplateColumns: '1fr 260px 260px', gap: '12px' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {filtered.map(ins => (
            <TopicCard key={ins.id} insight={ins} />
          ))}
        </div>
      </div>

      {/* ═══ ACTIONS ═══ */}
      <div className="animate-in-d5">
        <ActionsPanel />
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
  const approve = (id: string) => setStatuses(prev => ({ ...prev, [id]: 'approved' }))

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
          return (
            <div key={action.id} className="flex items-center gap-3 rounded-xl transition-all" style={{
              padding: '14px 18px',
              background: '#f8f9fb',
              border: '1px solid #f0f2f5',
            }}>
              <div className="w-1.5 self-stretch rounded-full flex-shrink-0" style={{ background: sevColor }} />
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
          )
        })}
      </div>
    </div>
  )
}
