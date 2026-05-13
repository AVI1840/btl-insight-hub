import type { ComponentType } from 'react'

interface EmptyStateProps {
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>
  title: string
  subtitle?: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ icon: Icon, title, subtitle, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: '#e8f3ff' }}
      >
        <Icon className="w-6 h-6" style={{ color: '#0368b0' }} />
      </div>
      <h3 className="text-[15px] font-semibold mb-1" style={{ color: '#0c3058' }}>{title}</h3>
      {subtitle && <p className="text-[13px] max-w-sm" style={{ color: '#6b8baa' }}>{subtitle}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-5 py-2 rounded-lg text-[12px] font-semibold transition-all hover:shadow-md"
          style={{ background: '#0368b0', color: '#ffffff' }}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
