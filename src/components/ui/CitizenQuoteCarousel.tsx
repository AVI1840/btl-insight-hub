import { useState, useEffect, useCallback } from 'react'
import { Quote, ChevronRight, ChevronLeft } from 'lucide-react'

interface CitizenQuote {
  text: string
  domain: string
}

interface Props {
  quotes: CitizenQuote[]
  intervalMs?: number
}

export function CitizenQuoteCarousel({ quotes, intervalMs = 5000 }: Props) {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  const goTo = useCallback((idx: number) => {
    setFading(true)
    setTimeout(() => {
      setCurrent(idx)
      setFading(false)
    }, 180)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % quotes.length)
  }, [current, quotes.length, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + quotes.length) % quotes.length)
  }, [current, quotes.length, goTo])

  useEffect(() => {
    const timer = setInterval(next, intervalMs)
    return () => clearInterval(timer)
  }, [next, intervalMs])

  if (quotes.length === 0) return null
  const q = quotes[current]

  return (
    <div className="card-premium" style={{ padding: '18px 20px' }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#fef9f3' }}>
          <Quote className="w-3 h-3" style={{ color: '#e67e22' }} />
        </div>
        <span className="text-[11px] font-bold" style={{ color: '#1a2332' }}>קול האזרח</span>
      </div>

      <div
        style={{
          transition: 'opacity 0.18s ease',
          opacity: fading ? 0 : 1,
          minHeight: '80px',
        }}
      >
        <div className="rounded-lg mb-3" style={{
          padding: '12px 14px',
          background: '#fefcf3',
          borderInlineStart: '3px solid #e67e22',
        }}>
          <p className="text-[11px] italic leading-relaxed" style={{ color: '#1a2332' }}>
            &ldquo;{q.text.length > 140 ? q.text.slice(0, 140) + '...' : q.text}&rdquo;
          </p>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-md" style={{ background: '#f0f2f5', color: '#4a5c6f' }}>
          {q.domain}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-3 pt-2" style={{ borderTop: '1px solid #f0f2f5' }}>
        <div className="flex items-center gap-1">
          <button onClick={prev} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#f0f2f5] transition-colors" aria-label="ציטוט קודם">
            <ChevronRight className="w-3.5 h-3.5" style={{ color: '#8a9bb0' }} />
          </button>
          <button onClick={next} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#f0f2f5] transition-colors" aria-label="ציטוט הבא">
            <ChevronLeft className="w-3.5 h-3.5" style={{ color: '#8a9bb0' }} />
          </button>
        </div>
        {/* Dots */}
        <div className="flex items-center gap-1">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all"
              style={{
                width: i === current ? '14px' : '5px',
                height: '5px',
                background: i === current ? '#e67e22' : '#e8ecf0',
              }}
              aria-label={`ציטוט ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
