import { useState } from 'react'
import { FileText, Download, AlertTriangle, ArrowUp, BarChart3, Quote, CheckCircle, XCircle, Filter } from 'lucide-react'
import { executiveSummary, ALL_DOMAINS, type Domain } from '@/data/insights'

type Source = 'הכל' | 'מפ"צ' | 'קש"ב' | 'קש"ר'

const SOURCES: Source[] = ['הכל', 'מפ"צ', 'קש"ב', 'קש"ר']

// Domain-specific report content
const DOMAIN_REPORTS: Record<string, {
  title: string; period: string; kpis: { label: string; value: string; sub?: string; color?: string }[];
  insight: string; failureTitle: string; failureText: string; quoteText: string;
  recs: { title: string; items: string[] }[]
}> = {
  'אבטלה': {
    title: 'דוח ניתוח פניות אבטלה',
    period: '1.3.26–31.3.26 · 10,260 פניות · 8,200 אזרחים ייחודיים',
    kpis: [
      { label: 'פניות', value: '10,260' },
      { label: 'ביקוש כשל', value: '17%', sub: '1,744 פניות חוזרות', color: '#d32f2f' },
      { label: 'נושא בוער', value: 'טופס 100', sub: '40.4% מהפניות', color: '#e67e22' },
      { label: 'מדד כאב', value: '8.5/10', color: '#d32f2f' },
    ],
    insight: 'מאחורי כל פנייה בנושא תשלומים מסתתרת תחושה אחת: "קיבלתי פחות ממה שציפיתי — ואף אחד לא הסביר לי למה." כשל סנכרון ממשק לשכת התעסוקה אחראי ל-40.4% מהפניות החוזרות.',
    failureTitle: 'כשל סנכרון לשכת התעסוקה',
    failureText: 'מאות פניות נוצרו בגלל עדכון שגוי שהמעסיק שלח. האזרח הפך למתווך בין המעסיק לביטוח הלאומי.',
    quoteText: 'פוטרתי לפני חודשיים. נרשמתי בלשכה, הגשתי הכל. קיבלתי תשלום על 18 ימים במקום 24. אף אחד לא הודיע לי מראש שיהיה קיזוז.',
    recs: [
      { title: 'הסברה', items: ['הודעה פרואקטיבית לאזרח כשמזוהה עדכון שגוי', 'ציר זמן ברור אחרי הגשת תביעה'] },
      { title: 'מדיניות', items: ['ביטוח לאומי פונה למעסיק ישירות', 'הקפאת קיזוז + הודעה מוקדמת'] },
      { title: 'שיפור מענה', items: ['תקן מינימום: מה קרה, מה לעשות', 'תבנית ייעודית לקיזוז עם הסבר'] },
    ],
  },
  'נכות כללית': {
    title: 'דוח ניתוח פניות נכות כללית',
    period: '1.3.26–31.3.26 · 12,800 פניות · 10,200 אזרחים ייחודיים',
    kpis: [
      { label: 'פניות', value: '12,800' },
      { label: 'ביקוש כשל', value: '21.4%', sub: '2,739 פניות חוזרות', color: '#d32f2f' },
      { label: 'נושא בוער', value: 'ועדות רפואיות', sub: '37% מהפניות', color: '#e67e22' },
      { label: 'מדד כאב', value: '9.1/10', color: '#d32f2f' },
    ],
    insight: 'צוואר בקבוק קריטי בוועדות רפואיות — ממוצע 4.5 חודשי המתנה. 3,200 אזרחים ממתינים ללא הכנסה. מדד הכאב הגבוה ביותר מבין כל האגפים.',
    failureTitle: 'עיכוב בוועדות רפואיות',
    failureText: 'מחסור חמור בוועדות רפואיות. אזרחים ממתינים חודשים ארוכים ללא מענה, וחוזרים ושואלים על הסטטוס שוב ושוב.',
    quoteText: 'כבר 5 חודשים שאני ממתין לוועדה רפואית. אין לי הכנסה, אני חי על חסד של המשפחה. כל פעם שמתקשר אומרים "תמתין, אין תורים".',
    recs: [
      { title: 'תשתית', items: ['הקמת 3 ועדות רפואיות נוספות', 'מסלול מקוון לבדיקת סטטוס ועדה'] },
      { title: 'תקשורת', items: ['עדכון פרואקטיבי על מועד הוועדה', 'SMS אישור 48 שעות לפני הועדה'] },
      { title: 'מדיניות', items: ['מסלול מזורז לנכות זמנית', 'תמיכה כלכלית בתקופת ההמתנה'] },
    ],
  },
  'סיעוד': {
    title: 'דוח ניתוח פניות סיעוד',
    period: '1.3.26–31.3.26 · 9,800 פניות · 6,500 אזרחים ייחודיים',
    kpis: [
      { label: 'פניות', value: '9,800' },
      { label: 'ביקוש כשל', value: '22.6%', sub: '2,215 פניות חוזרות', color: '#d32f2f' },
      { label: 'עלייה', value: '+23%', sub: 'לעומת חודש קודם', color: '#d32f2f' },
      { label: 'מדד כאב', value: '8.9/10', color: '#d32f2f' },
    ],
    insight: 'עלייה חדה של 23% בפניות חוזרות — בני משפחה מתקשרים שוב ושוב לבדוק סטטוס הערכה. מחסור במעריכים מוסמכים גורם להמתנה של 8 שבועות בממוצע.',
    failureTitle: 'מחסור במעריכים מוסמכים',
    failureText: 'ביקוש גבוה לביקורי הערכה מול אספקה מצומצמת של מעריכים. 2,800 מבקשים ממתינים מעל 8 שבועות.',
    quoteText: 'אמא שלי בת 87 לא יכולה לזוז. הגשנו בקשה לפני חודשיים ואף אחד לא בא. כל יום אני לוקחת חופש מהעבודה כדי לטפל בה.',
    recs: [
      { title: 'כוח אדם', items: ['גיוס 12 מעריכים חדשים', 'הפעלת מנגנון מעריך-על-גלגלים'] },
      { title: 'תהליך', items: ['הקדמת ביקור לנסיבות דחופות', 'אפשרות הערכה וידאו לגיל הזהב'] },
      { title: 'תקשורת', items: ['עדכון שבועי על מיקום בתור', 'מוקד ייעודי לסיעוד'] },
    ],
  },
}

// Default report (for departments without specific data)
function getReport(domain: string) {
  if (DOMAIN_REPORTS[domain]) return DOMAIN_REPORTS[domain]
  const ds = executiveSummary.domainBreakdown.find(d => d.domain === domain)
  if (!ds) return DOMAIN_REPORTS['אבטלה']
  return {
    title: `דוח ניתוח פניות ${domain}`,
    period: `1.3.26–31.3.26 · ${ds.total.toLocaleString()} פניות`,
    kpis: [
      { label: 'פניות', value: ds.total.toLocaleString() },
      { label: 'ביקוש כשל', value: `${ds.failureDemandPct}%`, color: '#d32f2f' },
      { label: 'נושא מוביל', value: ds.topIssue.slice(0, 14) + '...', color: '#e67e22' },
      { label: 'מדד כאב', value: `${ds.painIndex}/10`, color: ds.painIndex >= 8 ? '#d32f2f' : '#e67e22' },
    ],
    insight: `בחודש מרץ 2026 נרשמו ${ds.total.toLocaleString()} פניות בנושא ${domain}. הנושא המוביל: ${ds.topIssue}. ${ds.failureDemandPct}% מהפניות מוגדרות כ"ביקוש כשל".`,
    failureTitle: ds.topIssue,
    failureText: `${ds.failureDemandPct}% מהפניות חוזרות — אזרחים פנו יותר מפעם אחת על אותו עניין. נדרשת טיפול מערכתי בשורש הבעיה.`,
    quoteText: 'פניתי כבר כמה פעמים ועדיין לא קיבלתי מענה ברור. אני לא מבין מה קורה עם הבקשה שלי.',
    recs: [
      { title: 'הסברה', items: ['הודעה פרואקטיבית על עדכוני סטטוס', 'מדריך פשוט לתהליך הטיפול'] },
      { title: 'מדיניות', items: ['קיצור זמני עיבוד', 'ערוץ ישיר לבירורים'] },
      { title: 'שיפור מענה', items: ['תקן מינימום לאיכות מענה', 'בקרת איכות תקופתית'] },
    ],
  }
}

// Source-aware KPI filtering
function getSourceKpis(
  kpis: { label: string; value: string; sub?: string; color?: string }[],
  source: Source,
  domain: string
) {
  if (source === 'הכל') return kpis
  const ds = executiveSummary.domainBreakdown.find(d => d.domain === domain)
  if (!ds) return kpis
  const sourceVal = source === 'מפ"צ' ? ds.sources.mipatz :
    source === 'קש"ב' ? ds.sources.kashab : ds.sources.kashar
  const pct = Math.round((sourceVal / ds.total) * 100)
  return [
    { label: `פניות (${source})`, value: sourceVal.toLocaleString() },
    { label: 'מתוך סה"כ אגף', value: `${pct}%`, color: '#1a6fb5' },
    ...kpis.slice(2),
  ]
}

export function ReportsView() {
  const [selectedDomain, setSelectedDomain] = useState<Domain>('אבטלה')
  const [selectedSource, setSelectedSource] = useState<Source>('הכל')

  const report = getReport(selectedDomain)
  const kpis = getSourceKpis(report.kpis, selectedSource, selectedDomain)

  return (
    <div className="animate-in" style={{ maxWidth: '1060px' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#edf5fc' }}>
            <FileText className="w-4 h-4" style={{ color: '#1a6fb5' }} />
          </div>
          <h2 className="text-[15px] font-bold" style={{ color: '#1a2332' }}>דוחות ניתוח</h2>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-medium transition-all"
          style={{ background: 'linear-gradient(135deg, #1a6fb5, #1557a0)', color: '#fff', boxShadow: '0 2px 8px rgba(26,111,181,0.2)' }}>
          <Download className="w-3 h-3" /> ייצוא PDF
        </button>
      </div>

      {/* ── FILTER BAR 1: by אגף ── */}
      <div className="card-premium mb-3 animate-in-d1" style={{ padding: '14px 18px' }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Filter className="w-3.5 h-3.5" style={{ color: '#8a9bb0' }} />
            <span className="text-[10px] font-semibold" style={{ color: '#8a9bb0' }}>אגף:</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {ALL_DOMAINS.map(d => (
              <button key={d} onClick={() => setSelectedDomain(d)}
                className="rounded-lg text-[10px] transition-all"
                style={{
                  padding: '4px 12px',
                  color: selectedDomain === d ? '#fff' : '#4a5c6f',
                  background: selectedDomain === d ? '#1a6fb5' : '#f4f6f9',
                  fontWeight: selectedDomain === d ? 600 : 400,
                  border: selectedDomain === d ? '1px solid #1a6fb5' : '1px solid transparent',
                }}>
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTER BAR 2: by מקור ── */}
      <div className="card-premium mb-4 animate-in-d1" style={{ padding: '12px 18px' }}>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold flex-shrink-0" style={{ color: '#8a9bb0' }}>מקור הניתוח:</span>
          <div className="flex items-center gap-1.5">
            {SOURCES.map(s => (
              <button key={s} onClick={() => setSelectedSource(s)}
                className="rounded-lg text-[10px] transition-all"
                style={{
                  padding: '5px 14px',
                  color: selectedSource === s ? '#fff' : '#4a5c6f',
                  background: selectedSource === s ? 'linear-gradient(135deg, #1a6fb5, #1557a0)' : '#f4f6f9',
                  fontWeight: selectedSource === s ? 600 : 400,
                  border: selectedSource === s ? '1px solid #1a6fb5' : '1px solid transparent',
                  boxShadow: selectedSource === s ? '0 2px 8px rgba(26,111,181,0.18)' : 'none',
                }}>
                {s}
              </button>
            ))}
            <button
              disabled
              className="rounded-lg text-[10px]"
              style={{ padding: '5px 14px', color: '#c0c8d4', background: '#f8f9fb', border: '1px solid transparent', cursor: 'not-allowed' }}
              title="בקרוב">
               פניות טלפוניות
            </button>
          </div>
          {selectedSource !== 'הכל' && (
            <span className="text-[9px] px-2 py-0.5 rounded-md" style={{ background: '#edf5fc', color: '#1a6fb5' }}>
              מציג נתוני {selectedSource} בלבד
            </span>
          )}
        </div>
      </div>

      {/* Report Card */}
      <div className="card-premium overflow-hidden animate-in-d2">
        {/* Report Header */}
        <div style={{ padding: '22px 26px', background: 'linear-gradient(135deg, #f8f9fb, #f0f4f8)', borderBottom: '1px solid #e8ecf0' }}>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[16px] font-bold" style={{ color: '#1a2332' }}>{report.title}</h3>
            {selectedSource !== 'הכל' && (
              <span className="text-[10px] px-2.5 py-0.5 rounded-md font-medium" style={{ background: '#1a6fb5', color: '#fff' }}>
                {selectedSource}
              </span>
            )}
          </div>
          <p className="text-[11px]" style={{ color: '#8a9bb0' }}>{report.period}</p>
        </div>

        {/* KPI Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#e8ecf0' }}>
          {kpis.map((kpi, i) => (
            <ReportKpi key={i} label={kpi.label} value={kpi.value} sub={kpi.sub} color={kpi.color} />
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: '26px' }}>
          <Section title="ניתוח עיקרי" icon={<AlertTriangle className="w-3.5 h-3.5" />} iconBg="#fef5f5" iconColor="#d32f2f">
            <p className="text-[12px] leading-relaxed mb-3" style={{ color: '#4a5c6f' }}>{report.insight}</p>
            <CitizenQuote text={report.quoteText} />
          </Section>

          <Section title={report.failureTitle} icon={<ArrowUp className="w-3.5 h-3.5" />} iconBg="#fef9f3" iconColor="#e67e22">
            <p className="text-[12px] mb-3" style={{ color: '#4a5c6f' }}>{report.failureText}</p>

            {/* Source breakdown bar */}
            {(() => {
              const ds = executiveSummary.domainBreakdown.find(d => d.domain === selectedDomain)
              if (!ds) return null
              const total = ds.sources.mipatz + ds.sources.kashab + ds.sources.kashar
              return (
                <div className="rounded-xl mb-3" style={{ padding: '14px 18px', background: '#f8f9fb', border: '1px solid #f0f2f5' }}>
                  <p className="text-[10px] font-semibold mb-2" style={{ color: '#4a5c6f' }}>פילוח לפי מקור</p>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] w-12" style={{ color: '#8a9bb0' }}>מפ"צ</span>
                    <div className="flex-1 h-2 rounded-full" style={{ background: '#e8ecf0' }}>
                      <div className="h-full rounded-full" style={{ width: `${(ds.sources.mipatz / total) * 100}%`, background: '#1a6fb5' }} />
                    </div>
                    <span className="text-[10px] font-bold" style={{ color: '#1a6fb5' }}>{ds.sources.mipatz.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] w-12" style={{ color: '#8a9bb0' }}>קש"ב</span>
                    <div className="flex-1 h-2 rounded-full" style={{ background: '#e8ecf0' }}>
                      <div className="h-full rounded-full" style={{ width: `${(ds.sources.kashab / total) * 100}%`, background: '#27864a' }} />
                    </div>
                    <span className="text-[10px] font-bold" style={{ color: '#27864a' }}>{ds.sources.kashab.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] w-12" style={{ color: '#8a9bb0' }}>קש"ר</span>
                    <div className="flex-1 h-2 rounded-full" style={{ background: '#e8ecf0' }}>
                      <div className="h-full rounded-full" style={{ width: `${(ds.sources.kashar / total) * 100}%`, background: '#e67e22' }} />
                    </div>
                    <span className="text-[10px] font-bold" style={{ color: '#e67e22' }}>{ds.sources.kashar.toLocaleString()}</span>
                  </div>
                </div>
              )
            })()}
          </Section>

          <Section title="המלצות לפעולה" icon={<CheckCircle className="w-3.5 h-3.5" />} iconBg="#f0faf4" iconColor="#27864a">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {report.recs.map(rec => (
                <RecCategory key={rec.title} title={rec.title} items={rec.items} />
              ))}
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 26px', borderTop: '1px solid #e8ecf0', background: '#f8f9fb' }}>
          <p className="text-[10px]" style={{ color: '#8a9bb0' }}>
            דוח מבוסס נתוני {selectedSource === 'הכל' ? 'כלל המקורות' : selectedSource} · אגף {selectedDomain} · אפריל 2026
          </p>
        </div>
      </div>
    </div>
  )
}

function ReportKpi({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="transition-colors" style={{ padding: '16px 20px', background: '#ffffff' }}>
      <p className="text-[10px]" style={{ color: '#8a9bb0' }}>{label}</p>
      <p className="text-[18px] font-bold" style={{ color: color || '#1a2332' }}>{value}</p>
      {sub && <p className="text-[10px]" style={{ color: '#8a9bb0' }}>{sub}</p>}
    </div>
  )
}

function Section({ title, icon, iconBg, iconColor, children }: {
  title: string; icon: React.ReactNode; iconBg: string; iconColor: string; children: React.ReactNode
}) {
  return (
    <div className="mb-6 pb-6" style={{ borderBottom: '1px solid #f0f2f5' }}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: iconBg, color: iconColor }}>
          {icon}
        </div>
        <h4 className="text-[13px] font-bold" style={{ color: '#1a2332' }}>{title}</h4>
      </div>
      {children}
    </div>
  )
}

function CitizenQuote({ text }: { text: string }) {
  return (
    <div className="rounded-xl" style={{ padding: '14px 18px', background: '#fefcf3', borderInlineStart: '3px solid #e67e22' }}>
      <div className="flex items-center gap-1.5 mb-2">
        <Quote className="w-3.5 h-3.5" style={{ color: '#e67e22' }} />
        <span className="text-[10px] font-bold" style={{ color: '#8a9bb0' }}>קול האזרח</span>
      </div>
      <p className="text-[11px] italic leading-relaxed" style={{ color: '#1a2332' }}>&ldquo;{text}&rdquo;</p>
    </div>
  )
}

function RecCategory({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl" style={{ padding: '14px 16px', background: '#f8f9fb', border: '1px solid #f0f2f5' }}>
      <p className="text-[11px] font-bold mb-2.5" style={{ color: '#1a2332' }}>{title}</p>
      <ul style={{ paddingInlineStart: '14px' }}>
        {items.map((item, i) => (
          <li key={i} className="text-[10px] mb-1.5 leading-relaxed" style={{ color: '#4a5c6f' }}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
