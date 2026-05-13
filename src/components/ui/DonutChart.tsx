interface Segment {
  label: string
  value: number
  color: string
}

interface Props {
  segments: Segment[]
  centerLabel?: string
  centerValue?: string
  size?: number
}

export function DonutChart({ segments, centerLabel, centerValue, size = 130 }: Props) {
  const total = segments.reduce((s, seg) => s + seg.value, 0)

  // Build conic-gradient stops
  let accumulated = 0
  const stops = segments.map(seg => {
    const start = accumulated
    const pct = (seg.value / total) * 100
    accumulated += pct
    return `${seg.color} ${start}% ${accumulated}%`
  }).join(', ')

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Donut ring */}
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="rounded-full"
          style={{
            width: '100%',
            height: '100%',
            background: `conic-gradient(${stops})`,
            mask: 'radial-gradient(circle, transparent 55%, black 56%)',
            WebkitMask: 'radial-gradient(circle, transparent 55%, black 56%)',
          }}
        />
        {/* Center text */}
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerValue && (
              <span className="text-[18px] font-bold" style={{ color: '#1a2332' }}>
                {centerValue}
              </span>
            )}
            {centerLabel && (
              <span className="text-[9px]" style={{ color: '#8a9bb0' }}>
                {centerLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
        {segments.map(seg => (
          <div key={seg.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: seg.color }} />
            <span className="text-[9px]" style={{ color: '#4a5c6f' }}>
              {seg.label} ({Math.round((seg.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
