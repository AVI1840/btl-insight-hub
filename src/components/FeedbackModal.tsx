import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface FeedbackModalProps {
  open: boolean
  onClose: () => void
}

const STORAGE_KEY = 'btl-insight-hub-feedback'
const APP_NAME = 'מצפן התובנות הלאומי'
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwD8CMFoP5XoOwRLwK_OxMMOFKF8fS2CRpbJkNdOHjbnJIepkOLzlGrg3GQNGRqbwB6bA/exec'
const NAME_KEY = 'btl-insight-hub-feedback-user-name'

type Category = '🐛 באג' | '💡 שיפור' | '📊 נתונים' | '🎨 עיצוב'
type Severity = 'קריטי' | 'שיפור' | 'קטן'

interface FeedbackEntry {
  id: number
  name: string
  category: Category | ''
  severity: Severity | ''
  text: string
  timestamp: string
  sent: boolean
}

async function sendToSheet(entry: FeedbackEntry, page: string): Promise<boolean> {
  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app: APP_NAME,
        name: entry.name || 'אנונימי',
        category: entry.category || 'כללי',
        severity: entry.severity || '—',
        text: entry.text,
        page,
      }),
    })
    return true
  } catch {
    return false
  }
}

const sevColor = (s: Severity | '') =>
  s === 'קריטי' ? 'border-red-400 bg-red-50 text-red-700' :
  s === 'שיפור' ? 'border-orange-400 bg-orange-50 text-orange-700' :
  s === 'קטן' ? 'border-green-400 bg-green-50 text-green-700' : ''

export function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) || '')
  const [category, setCategory] = useState<Category | ''>('')
  const [severity, setSeverity] = useState<Severity | ''>('')
  const [text, setText] = useState('')
  const [items, setItems] = useState<FeedbackEntry[]>([])
  const [sending, setSending] = useState(false)
  const [lastStatus, setLastStatus] = useState<'' | 'ok' | 'offline'>('')
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal()
      const s = localStorage.getItem(STORAGE_KEY)
      if (s) setItems(JSON.parse(s))
    } else {
      dialogRef.current?.close()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const unsent = items.filter((i) => !i.sent)
    if (!unsent.length) return
    Promise.all(unsent.map((i) => sendToSheet(i, window.location.pathname))).then((r) => {
      save(items.map((item) => {
        const idx = unsent.findIndex((u) => u.id === item.id)
        return idx >= 0 && r[idx] ? { ...item, sent: true } : item
      }))
    })
  }, [open])

  const save = (u: FeedbackEntry[]) => {
    setItems(u)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
  }

  const handleSubmit = async () => {
    if (!text.trim() || !name.trim()) return
    localStorage.setItem(NAME_KEY, name.trim())
    setSending(true)
    setLastStatus('')
    const entry: FeedbackEntry = {
      id: Date.now(),
      name: name.trim(),
      category,
      severity,
      text: text.trim(),
      timestamp: new Date().toISOString(),
      sent: false,
    }
    const ok = await sendToSheet(entry, window.location.pathname)
    entry.sent = ok
    save([entry, ...items])
    setCategory('')
    setSeverity('')
    setText('')
    setSending(false)
    setLastStatus(ok ? 'ok' : 'offline')
    setTimeout(() => setLastStatus(''), 3000)
  }

  const handleExport = () => {
    if (!items.length) return
    const lines = items.map((fb) =>
      `[${new Date(fb.timestamp).toLocaleString('he-IL')}] [${fb.name}] [${fb.category || '—'}] [${fb.severity || '—'}] ${fb.text}`
    )
    navigator.clipboard.writeText(`משובי פיילוט — ${APP_NAME}\n${'='.repeat(50)}\n\n${lines.join('\n\n')}`)
  }

  const handleClear = () => { save([]) }

  if (!open) return null

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 z-[100] m-auto w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-[rgba(0,0,0,0.12)] bg-white p-0 shadow-xl"
      style={{ color: '#1a2332' }}
      dir="rtl"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold" style={{ color: '#1a2332' }}>💬 משוב פיילוט</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#f8f9fb] transition-colors" aria-label="סגור">
            <X className="w-4 h-4" style={{ color: '#8896a6' }} />
          </button>
        </div>

        <div>
          <label className="text-[12px] font-medium block mb-1.5 text-right" style={{ color: '#4a5568' }}>שם</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="השם שלך"
            className="w-full rounded-lg px-3 py-2.5 text-[13px] border outline-none focus:border-[#2563a8] focus:ring-2 focus:ring-[#2563a8]/20"
            style={{ borderColor: 'rgba(0, 0, 0, 0.15)', color: '#1a2332' }}
            dir="rtl"
          />
        </div>

        <div>
          <p className="text-[12px] font-medium mb-1.5 text-right" style={{ color: '#4a5568' }}>קטגוריה</p>
          <div className="flex gap-2 flex-wrap justify-end">
            {(['🐛 באג', '💡 שיפור', '📊 נתונים', '🎨 עיצוב'] as Category[]).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(category === c ? '' : c)}
                className={`px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-colors ${
                  category === c
                    ? 'border-[#2563a8] bg-[#eef4fb] text-[#2563a8]'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-[#2563a8]/30'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[12px] font-medium mb-1.5 text-right" style={{ color: '#4a5568' }}>חומרה</p>
          <div className="flex gap-2 flex-wrap justify-end">
            {(['קריטי', 'שיפור', 'קטן'] as Severity[]).map((s) => (
              <button
                key={s}
                onClick={() => setSeverity(severity === s ? '' : s)}
                className={`px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-colors ${
                  severity === s ? `${sevColor(s)} border-2` : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[12px] font-medium block mb-1.5 text-right" style={{ color: '#4a5568' }}>תיאור</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="תאר את המשוב..."
            className="w-full rounded-lg px-3 py-2.5 text-[13px] border outline-none focus:border-[#2563a8] focus:ring-2 focus:ring-[#2563a8]/20 min-h-[80px] resize-y"
            style={{ borderColor: 'rgba(0, 0, 0, 0.15)', color: '#1a2332' }}
            dir="rtl"
          />
        </div>

        <div className="relative">
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || !name.trim() || sending}
            className="w-full py-2.5 rounded-lg text-[13px] font-semibold transition-all disabled:opacity-40 text-white"
            style={{ backgroundColor: '#1B3A5C' }}
          >
            {sending ? 'שולח...' : 'שלח משוב'}
          </button>
          {lastStatus === 'ok' && <p className="text-[11px] text-green-600 text-center mt-1">✅ נשלח בהצלחה</p>}
          {lastStatus === 'offline' && <p className="text-[11px] text-orange-500 text-center mt-1">📱 נשמר מקומית — יישלח כשיהיה חיבור</p>}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 pt-3 space-y-2">
            <div className="flex items-center justify-between">
              <button onClick={handleClear} className="text-[11px] text-red-500 hover:underline">מחק הכל</button>
              <div className="flex items-center gap-2">
                <span className="text-[11px]" style={{ color: '#8896a6' }}>{items.length} משובים</span>
                <button onClick={handleExport} className="text-[11px] px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 text-gray-600">📋 ייצוא ללוח</button>
              </div>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {items.map((fb) => (
                <div key={fb.id} className="bg-[#f8f9fb] rounded-lg p-3 text-right border border-[rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-1 flex-wrap justify-end">
                    {fb.category && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#eef4fb] text-[#2563a8] font-medium">{fb.category}</span>}
                    {fb.severity && <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${sevColor(fb.severity as Severity)}`}>{fb.severity}</span>}
                    {!fb.sent && <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-600">⏳</span>}
                    {fb.sent && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-600">✅</span>}
                    <span className="text-[10px]" style={{ color: '#8896a6' }}>{fb.name} · {new Date(fb.timestamp).toLocaleString('he-IL')}</span>
                  </div>
                  <p className="text-[12px]" style={{ color: '#4a5568' }}>{fb.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </dialog>
  )
}
