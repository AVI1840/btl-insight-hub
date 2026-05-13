interface Props {
  data: number[]
  color?: string
  height?: number
}

export function MiniSparkline({ data, color = '#1a6fb5', height = 24 }: Props) {
  const max = Math.max(...data)

  return (
    <div className="flex items-end gap-[2px]" style={{ height }}>
      {data.map((val, i) => (
        <div
          key={i}
          className="rounded-t-sm"
          style={{
            width: '3px',
            height: `${Math.max(3, (val / max) * height)}px`,
            background: color,
            opacity: 0.25 + (val / max) * 0.75,
            transition: 'height 0.3s ease',
          }}
        />
      ))}
    </div>
  )
}
