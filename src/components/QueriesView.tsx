import { useState } from 'react'
import { Search, Sparkles, BookOpen, Copy, Check } from 'lucide-react'
import { suggestedQueries, findQueryResult, type QueryResult } from '@/data/queries'

export function QueriesView() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<QueryResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSearch = (q: string) => {
    if (!q.trim()) return
    setLoading(true)
    setTimeout(() => { setResult(findQueryResult(q)); setLoading(false) }, 500)
  }

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(result.answer)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="animate-in" style={{ maxWidth: '800px' }}>
      {/* Search */}
      <div className="card-premium mb-5 animate-in-d1 transition-all" style={{ padding: '18px 22px' }}
        onFocusCapture={e => (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-glow-accent)'}
        onBlurCapture={e => (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'}
      >
        <div className="flex items-center gap-3">
          <Search className="w-4 h-4 flex-shrink-0" style={{ color: '#8a9bb0' }} />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
            placeholder="שאל שאלה על הנתונים..." dir="rtl" aria-label="שאילתה"
            className="flex-1 bg-transparent text-[13px] placeholder:text-[#8a9bb0] outline-none" style={{ color: '#1a2332' }} />
          <button onClick={() => handleSearch(query)} disabled={!query.trim() || loading}
            className="rounded-lg text-[11px] font-medium px-4 py-2 transition-all disabled:opacity-30"
            style={{
              background: 'linear-gradient(135deg, #1a6fb5, #1557a0)',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(26,111,181,0.2)',
            }}>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="card-premium p-6 animate-fade-scale">
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-3 rounded-md skeleton-shimmer" style={{ width: `${95 - i * 18}%` }} />
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="card-premium animate-fade-scale" style={{ padding: '22px 26px', borderTop: '3px solid #1a6fb5' }}>
          <p className="text-[13px] font-bold mb-3" style={{ color: '#1a2332' }}>{result.question}</p>
          <div className="rounded-xl mb-4" style={{ padding: '16px 20px', background: '#f4f6f9' }}>
            <p className="text-[12px] whitespace-pre-line leading-relaxed" style={{ color: '#1a2332', lineHeight: '1.9' }}>{result.answer}</p>
          </div>
          <div className="flex items-center gap-3">
            {result.sources.length > 0 && (
              <div className="flex items-center gap-2">
                <BookOpen className="w-3 h-3" style={{ color: '#8a9bb0' }} />
                {result.sources.map(s => (
                  <span key={s.type} className="text-[10px] px-2.5 py-1 rounded-md" style={{ background: '#f0f2f5', color: '#4a5c6f' }}>{s.type}: {s.count.toLocaleString()}</span>
                ))}
              </div>
            )}
            <button onClick={handleCopy} className="mr-auto flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-md transition-colors"
              style={{ color: copied ? '#27864a' : '#1a6fb5', background: copied ? '#f0faf4' : 'transparent' }}>
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'הועתק' : 'העתק'}
            </button>
          </div>
          {result.relatedQuestions.length > 0 && (
            <div className="mt-4 pt-4" style={{ borderTop: '1px solid #f0f2f5' }}>
              <p className="text-[10px] font-medium mb-2" style={{ color: '#8a9bb0' }}>שאלות קשורות</p>
              <div className="flex flex-wrap gap-2">
                {result.relatedQuestions.map(rq => (
                  <button key={rq} onClick={() => { setQuery(rq); handleSearch(rq) }}
                    className="text-[10px] px-3 py-1.5 rounded-lg transition-all"
                    style={{ background: '#f4f6f9', color: '#1a6fb5', border: '1px solid #e8ecf0' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#edf5fc'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#f4f6f9'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
                  >{rq}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Suggestions */}
      {!result && !loading && (
        <div className="grid gap-3 animate-in-d2" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {suggestedQueries.slice(0, 6).map(sq => (
            <button key={sq} onClick={() => { setQuery(sq); handleSearch(sq) }}
              className="card-interactive text-right text-[12px]"
              style={{ padding: '16px 20px', color: '#4a5c6f' }}>
              {sq}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
