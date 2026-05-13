import type { SourceBreakdown } from '@/data/insights'

interface SourceBreakdownBarProps {
  sources: SourceBreakdown
  showLabels?: boolean
  showNumbers?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sourceColors = {
  mipatz: '#0368b0',
  kashab: '#10B981',
  kashar: '#F59E0B',
}

const sourceLabels = {
  mipatz: 'מפ"צ',
  kashab: 'קש"ב',
  kashar: 'קש"ר',
}

export function SourceBreakdownBar({ sources, showLabels = false, showNumbers = false, size = 'md' }: SourceBreakdownBarProps) {
  const total = sources.mipatz + sources.kashab + sources.kashar
  if (total === 0) return null

  const height = size === 'sm' ? '4px' : size === 'lg' ? '10px' : '6px'

  const segments = [
    { key: 'mipatz' as const, value: sources.mipatz },
    { key: 'kashab' as const, value: sources.kashab },
    { key: 'kashar' as const, value: sources.kashar },
  ]

  return (
    <div>
      <div className="flex rounded-full overflow-hidden" style={{ height, background: 'rgba(6, 77, 173, 0.04)' }}>
        {segments.map((seg) => {
          const pct = (seg.value / total) * 100
          return (
            <div
              key={seg.key}
              style={{ width: `${pct}%`, backgroundColor: sourceColors[seg.key] }}
              title={`${sourceLabels[seg.key]}: ${seg.value.toLocaleString()} (${Math.round(pct)}%)`}
            />
          )
        })}
      </div>
      {(showLabels || showNumbers) && (
        <div className="flex items-center gap-3 mt-1.5">
          {segments.map((seg) => (
            <div key={seg.key} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: sourceColors[seg.key] }} />
              <span className="text-[10px]" style={{ color: '#6b8baa' }}>
                {showLabels && sourceLabels[seg.key]}
                {showNumbers && ` ${seg.value.toLocaleString()}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
