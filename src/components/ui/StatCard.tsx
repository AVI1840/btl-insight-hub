import type { ComponentType } from 'react'
import { TrendIndicator } from './TrendIndicator'

interface StatCardProps {
  label: string
  value: string
  sub?: string
  color?: string
  icon?: ComponentType<{ className?: string; style?: React.CSSProperties }>
  trend?: { direction: 'up' | 'down' | 'stable'; value: number; positive?: boolean }
  size?: 'sm' | 'md' | 'lg'
}

export function StatCard({ label, value, sub, color = '#0368b0', icon: Icon, trend, size = 'md' }: StatCardProps) {
  const padding = size === 'sm' ? '14px 16px' : size === 'lg' ? '24px 28px' : '20px 22px'
  const valueSize = size === 'sm' ? '18px' : size === 'lg' ? '28px' : '22px'

  return (
    <div
      className="stat-card rounded-xl transition-all duration-200"
      style={{
        padding,
        background: '#ffffff',
        border: '1px solid rgba(6, 77, 173, 0.1)',
        boxShadow: '0 1px 4px rgba(6, 77, 173, 0.04)',
      }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-[11px]" style={{ color: '#6b8baa' }}>{label}</p>
        {Icon && <Icon className="w-4 h-4" style={{ color }} />}
      </div>
      <div className="flex items-end gap-2">
        <p className="font-bold" style={{ color, fontSize: valueSize }}>{value}</p>
        {trend && <TrendIndicator direction={trend.direction} value={trend.value} positive={trend.positive} />}
      </div>
      {sub && <p className="text-[11px] mt-1" style={{ color: '#266794' }}>{sub}</p>}
    </div>
  )
}
