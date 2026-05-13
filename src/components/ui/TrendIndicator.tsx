import { ArrowUp, ArrowDown, Minus } from 'lucide-react'

interface TrendIndicatorProps {
  direction: 'up' | 'down' | 'stable'
  value: number
  positive?: boolean // true = up is green, false = up is red
}

export function TrendIndicator({ direction, value, positive = true }: TrendIndicatorProps) {
  const isGood = positive ? direction === 'down' : direction === 'up'
  const isBad = positive ? direction === 'up' : direction === 'down'

  const color = direction === 'stable' ? '#6b8baa' : isGood ? '#10B981' : isBad ? '#EF4444' : '#6b8baa'
  const bg = direction === 'stable' ? '#f5f9ff' : isGood ? '#ecfdf5' : isBad ? '#fef2f2' : '#f5f9ff'

  const Icon = direction === 'up' ? ArrowUp : direction === 'down' ? ArrowDown : Minus

  return (
    <span
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[11px] font-bold"
      style={{ color, background: bg }}
    >
      <Icon className="w-3 h-3" />
      {value}%
    </span>
  )
}
