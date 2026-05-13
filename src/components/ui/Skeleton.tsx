interface SkeletonProps {
  variant?: 'card' | 'text' | 'circle' | 'bar'
  width?: string
  height?: string
  count?: number
}

export function Skeleton({ variant = 'text', width, height, count = 1 }: SkeletonProps) {
  const baseClass = 'skeleton-pulse rounded'

  const getStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'card':
        return { width: width || '100%', height: height || '120px', borderRadius: '12px' }
      case 'circle':
        return { width: width || '40px', height: height || '40px', borderRadius: '50%' }
      case 'bar':
        return { width: width || '100%', height: height || '6px', borderRadius: '3px' }
      case 'text':
      default:
        return { width: width || '100%', height: height || '14px', borderRadius: '4px' }
    }
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={baseClass}
          style={{
            ...getStyle(),
            background: 'linear-gradient(90deg, #f0f5fa 25%, #e8f0f8 50%, #f0f5fa 75%)',
            backgroundSize: '200% 100%',
            animation: 'skeleton-shimmer 1.5s ease-in-out infinite',
          }}
        />
      ))}
    </>
  )
}
