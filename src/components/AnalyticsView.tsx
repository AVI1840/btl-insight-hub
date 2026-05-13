import { useState } from 'react'
import { ChevronDown, ChevronUp, ArrowUp, ArrowDown, Minus, TrendingUp, Users, Flame, Activity } from 'lucide-react'
import { executiveSummary, insights, type DomainSummary } from '@/data/insights'
import { MiniSparkline } from '@/components/ui/MiniSparkline'

export function AnalyticsView() {
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null)
  const sorted = [...executiveSummary.domainBreakdown].sort((a, b) => b.painIndex - a.painIndex)

  return (
    <section className="animate-in" style={{ maxWidth: '1000px' }}>
      {/* Summary Cards */}
      <div className="mb-5 animate-in-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        <SummaryCard icon={<Users className="w-4 h-4" />} label="סה״כ פניות" value="82,450" accent="#1a6fb5" />
        <SummaryCard icon={<Flame className="w-4 h-4" />} label="ממוצע כאב" value="7.8" accent="#d32f2f" />
        <SummaryCard icon={<Activity className="w-4 h-4" />} label="ממוצע כשל" value="14.2%" accent="#e67e22" />
        <SummaryCard icon={<TrendingUp className="w-4 h-4" />} label="אגפים" value="12" accent="#1a2332" />
      </div>

      {/* Column Headers */}
      <div className="flex items-center gap-3 px-5 mb-2 animate-in-d2" style={{ color: '#8a9bb0' }}>
        <span className="text-[9px]" style={{ width: '12px' }} />
        <span className="text-[9px] font-medium" style={{ width: '100px' }}>אגף</span>
        <span className="text-[9px] font-medium" style={{ width: '70px' }}>פניות</span>
        <span className="text-[9px] font-medium" style={{ width: '50px' }}>כאב</span>
        <span className="text-[9px] font-medium" style={{ width: '50px' }}>כשל</span>
        <span className="text-[9px] font-medium" style={{ width: '60px' }}>מגמה</span>
        <span className="text-[9px] font-medium flex-1">נושא מוביל</span>
      </div>

      {/* Domain list */}
      <div className="animate-in-d2" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {sorted.map((ds) => (
          <DomainRow key={ds.domain} ds={ds} expanded={expandedDomain === ds.domain}
            onToggle={() => setExpandedDomain(expandedDomain === ds.domain ? null : ds.domain)} />
        ))}
      </div>
    </section>
  )
}

function SummaryCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent: string }) {
  return (
    <div className="card-premium" style={{ padding: '16px 20px' }}>
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}0a`, color: accent }}>
          {icon}
        </div>
      </div>
      <p className="text-[18px] font-bold" style={{ color: accent }}>{value}</p>
      <p className="text-[10px]" style={{ color: '#8a9bb0' }}>{label}</p>
    </div>
  )
}

function DomainRow({ ds, expanded, onToggle }: { ds: DomainSummary; expanded: boolean; onToggle: () => void }) {
  const painColor = ds.painIndex >= 8.5 ? '#d32f2f' : ds.painIndex >= 7 ? '#e67e22' : '#27864a'
  const TrendIcon = ds.trend.direction === 'up' ? ArrowUp : ds.trend.direction === 'down' ? ArrowDown : Minus
  const trendColor = ds.trend.direction === 'up' ? '#d32f2f' : ds.trend.direction === 'down' ? '#27864a' : '#8a9bb0'
  const domainInsight = insights.find(i => i.domain === ds.domain)

  // Generate pseudo-sparkline data from pain/failure
  const sparkData = [
    ds.previousMonth.painIndex * 0.8,
    ds.previousMonth.painIndex * 0.9,
    ds.previousMonth.painIndex,
    (ds.previousMonth.painIndex + ds.painIndex) / 2,
    ds.painIndex * 0.95,
    ds.painIndex,
    ds.painIndex * 1.02,
  ]

  return (
    <div className="card-interactive overflow-hidden" style={{
      border: expanded ? '1px solid #1a6fb520' : '1px solid #f0f2f5',
    }}>
      <button onClick={onToggle} className="w-full flex items-center gap-3 text-right transition-colors"
        style={{ padding: '12px 18px' }} aria-expanded={expanded}>
        {/* Pain bar */}
        <div className="w-1.5 self-stretch rounded-full flex-shrink-0" style={{ background: painColor }} />

        <span className="text-[12px] font-semibold" style={{ color: '#1a2332', width: '100px' }}>{ds.domain}</span>
        <span className="text-[11px]" style={{ color: '#8a9bb0', width: '70px' }}>{ds.total.toLocaleString()}</span>

        {/* Pain with visual indicator */}
        <div style={{ width: '50px' }}>
          <span className="text-[12px] font-bold" style={{ color: painColor }}>{ds.painIndex}</span>
        </div>

        <span className="text-[11px] font-medium" style={{ color: '#e67e22', width: '50px' }}>{ds.failureDemandPct}%</span>

        <span className="flex items-center gap-0.5 text-[10px] font-medium" style={{ color: trendColor, width: '60px' }}>
          <TrendIcon className="w-3 h-3" />{ds.trend.change}%
        </span>

        <span className="text-[11px] flex-1 truncate" style={{ color: '#8a9bb0' }}>{ds.topIssue}</span>

        <MiniSparkline data={sparkData} color={painColor} height={18} />

        <div className="w-5 flex items-center justify-center flex-shrink-0">
          {expanded ? <ChevronUp className="w-3.5 h-3.5" style={{ color: '#8a9bb0' }} /> : <ChevronDown className="w-3.5 h-3.5" style={{ color: '#8a9bb0' }} />}
        </div>
      </button>

      {expanded && (
        <div className="animate-slide-down" style={{ padding: '4px 18px 16px', marginInlineStart: '22px' }}>
          <div className="rounded-xl" style={{ padding: '14px 18px', background: 'linear-gradient(135deg, #f4f6f9, #f0f4f8)' }}>
            <div className="flex items-center gap-4 mb-2">
              <div>
                <span className="text-[9px]" style={{ color: '#8a9bb0' }}>חודש קודם</span>
                <p className="text-[12px] font-medium" style={{ color: '#4a5c6f' }}>
                  {ds.previousMonth.total.toLocaleString()} פניות, כאב {ds.previousMonth.painIndex}
                </p>
              </div>
              <div style={{ width: '1px', height: '24px', background: '#e8ecf0' }} />
              <div>
                <span className="text-[9px]" style={{ color: '#8a9bb0' }}>נושא מוביל</span>
                <p className="text-[12px] font-medium" style={{ color: '#1a2332' }}>{ds.topIssue}</p>
              </div>
            </div>

            {/* Pain progress bar */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[9px]" style={{ color: '#8a9bb0' }}>מדד כאב</span>
              <div className="flex-1 h-2 rounded-full" style={{ background: '#e8ecf0' }}>
                <div className="h-full rounded-full transition-all" style={{
                  width: `${(ds.painIndex / 10) * 100}%`,
                  background: `linear-gradient(90deg, ${painColor}, ${painColor}cc)`,
                }} />
              </div>
              <span className="text-[10px] font-bold" style={{ color: painColor }}>{ds.painIndex}/10</span>
            </div>
          </div>

          {domainInsight && (
            <div className="mt-3 rounded-lg" style={{ padding: '10px 14px', background: '#fefcf3', borderInlineStart: '2px solid #e67e22' }}>
              <p className="text-[10px] italic leading-relaxed" style={{ color: '#4a5c6f' }}>
                &ldquo;{domainInsight.citizenVoice.slice(0, 120)}...&rdquo;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
