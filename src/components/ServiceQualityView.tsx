import { useState } from 'react'
import { Award, TrendingUp, TrendingDown, Minus, MapPin, Users, Clock, Star, Sparkles, ArrowUp, ArrowDown } from 'lucide-react'

/* ═══ DATA ═══ */

interface BranchData {
  id: string
  name: string
  type: 'מוקד' | 'סניף'
  region: string
  painIndex: number
  painTrend: 'up' | 'down' | 'stable'
  painDelta: number
  satisfactionScore: number
  avgHandleTime: number // minutes
  failureDemandPct: number
  issueDetectionTime: string // e.g. "2 שעות"
  totalCalls: number
  highlight?: 'excellent' | 'warning' | null
}

interface ExcellenceStory {
  id: string
  type: 'נציג' | 'מוקד' | 'אגף' | 'פקיד'
  name: string
  branch: string
  domain: string
  title: string
  story: string
  impact: string
  metric: string
  metricLabel: string
  aiInsight: string
  date: string
}

const branches: BranchData[] = [
  { id: 'b1', name: 'מוקד צפת', type: 'מוקד', region: 'צפון', painIndex: 5.4, painTrend: 'down', painDelta: 18, satisfactionScore: 88, avgHandleTime: 4.2, failureDemandPct: 7.1, issueDetectionTime: '2 שעות', totalCalls: 4200, highlight: 'excellent' },
  { id: 'b2', name: 'מוקד ירושלים', type: 'מוקד', region: 'מרכז', painIndex: 7.2, painTrend: 'stable', painDelta: 2, satisfactionScore: 72, avgHandleTime: 6.8, failureDemandPct: 13.4, issueDetectionTime: '12 שעות', totalCalls: 12800, highlight: null },
  { id: 'b3', name: 'מוקד מרכז', type: 'מוקד', region: 'מרכז', painIndex: 8.5, painTrend: 'up', painDelta: 23, satisfactionScore: 61, avgHandleTime: 8.1, failureDemandPct: 19.2, issueDetectionTime: '3 ימים', totalCalls: 18400, highlight: 'warning' },
  { id: 'b4', name: 'סניף באר שבע', type: 'סניף', region: 'דרום', painIndex: 6.8, painTrend: 'down', painDelta: 8, satisfactionScore: 76, avgHandleTime: 5.5, failureDemandPct: 11.3, issueDetectionTime: '6 שעות', totalCalls: 6100, highlight: null },
  { id: 'b5', name: 'מוקד חיפה', type: 'מוקד', region: 'צפון', painIndex: 6.1, painTrend: 'down', painDelta: 11, satisfactionScore: 82, avgHandleTime: 5.0, failureDemandPct: 9.8, issueDetectionTime: '4 שעות', totalCalls: 8900, highlight: null },
  { id: 'b6', name: 'סניף תל אביב', type: 'סניף', region: 'מרכז', painIndex: 7.9, painTrend: 'up', painDelta: 7, satisfactionScore: 65, avgHandleTime: 7.4, failureDemandPct: 16.7, issueDetectionTime: '2 ימים', totalCalls: 14200, highlight: 'warning' },
]

const domainQuality = [
  { domain: 'מילואים', score: 84, trend: 'up' as const, delta: 12, topIssue: 'שיפור ממשק צה"ל הוריד פניות חוזרות' },
  { domain: 'ילדים', score: 81, trend: 'stable' as const, delta: 1, topIssue: 'תהליך פשוט, מעט תלונות' },
  { domain: 'זקנה ושאירים', score: 74, trend: 'stable' as const, delta: 2, topIssue: 'אוכלוסייה מבוגרת — צריכה ערוץ טלפוני' },
  { domain: 'אבטלה', score: 58, trend: 'down' as const, delta: 8, topIssue: 'כשל סנכרון לשכת התעסוקה' },
  { domain: 'נכות כללית', score: 52, trend: 'down' as const, delta: 15, topIssue: 'עיכוב בוועדות רפואיות' },
  { domain: 'סיעוד', score: 48, trend: 'down' as const, delta: 23, topIssue: 'המתנה ארוכה לביקור הערכה' },
]

const excellenceStories: ExcellenceStory[] = [
  {
    id: 'ex-1',
    type: 'נציג',
    name: 'רונית כ.',
    branch: 'מוקד צפת',
    domain: 'אבטלה',
    title: 'פיתחה שיטה לזיהוי כשל סנכרון בשיחה הראשונה',
    story: 'רונית שמה לב שאזרחים שמתקשרים על "קיזוז לא מוסבר" — ב-80% מהמקרים הבעיה היא כשל סנכרון עם לשכת התעסוקה. היא פיתחה 3 שאלות סינון שמזהות את זה תוך 30 שניות ומפנות ישירות לפתרון.',
    impact: 'הפחיתה פניות חוזרות ב-34% בתחום שלה',
    metric: '-34%',
    metricLabel: 'פניות חוזרות',
    aiInsight: 'AI זיהה שהאזרחים שרונית טיפלה בהם חזרו 34% פחות מהממוצע. ניתוח השיחות חשף את שיטת 3 השאלות.',
    date: '04/2026',
  },
  {
    id: 'ex-2',
    type: 'מוקד',
    name: 'מוקד צפת',
    branch: 'מוקד צפת',
    domain: 'כללי',
    title: 'הטמיע "שעת למידה" שבועית מתוך ניתוח AI',
    story: 'מנהל המוקד החליט להקדיש שעה בשבוע לניתוח הפניות הכי כואבות שה-AI זיהה. הצוות ביחד מנתח את "קול האזרח" ומחפש פתרונות. תוך חודשיים — ירידה של 18% במדד הכאב.',
    impact: 'מדד כאב ירד מ-6.6 ל-5.4 תוך חודשיים',
    metric: '-18%',
    metricLabel: 'מדד כאב',
    aiInsight: 'AI זיהה שמוקד צפת הוא היחיד שבו מדד הכאב יורד בעקביות. ניתוח הפעילות חשף את מודל "שעת הלמידה".',
    date: '03/2026',
  },
  {
    id: 'ex-3',
    type: 'אגף',
    name: 'אגף מילואים',
    branch: 'ארצי',
    domain: 'מילואים',
    title: 'שיפור ממשק צה"ל — ירידה של 12% בביקוש כשל',
    story: 'אחרי שה-AI זיהה ש-38% מהפניות החוזרות במילואים נובעות מעיכוב באישורי שירות, אגף מילואים יזם שיפור ממשק עם צה"ל. תוך 6 שבועות — ירידה משמעותית.',
    impact: 'חיסכון של ~200 פניות/חודש + שביעות רצון עלתה ב-15%',
    metric: '-12%',
    metricLabel: 'ביקוש כשל',
    aiInsight: 'AI חיזה שללא התערבות, הפניות החוזרות יעלו ב-25% ברבעון הבא. הפעולה מנעה את ההחמרה.',
    date: '02/2026',
  },
  {
    id: 'ex-4',
    type: 'פקיד',
    name: 'משה ד.',
    branch: 'סניף באר שבע',
    domain: 'זקנה ושאירים',
    title: 'יצר "מדריך מצולם" לעדכון פרטי בנק לקשישים',
    story: 'משה ראה שקשישים מגיעים שוב ושוב לסניף כי לא מצליחים לעדכן פרטי בנק אונליין. הוא יצר מדריך מצולם פשוט (6 שלבים עם תמונות) שמחלקים בסניף. 40% מהקשישים הצליחו לבד בפעם הבאה.',
    impact: 'הפחית פניות חוזרות בנושא עדכון בנק ב-40%',
    metric: '-40%',
    metricLabel: 'פניות חוזרות',
    aiInsight: 'AI זיהה שסניף באר שבע הוא היחיד שבו פניות "עדכון פרטי בנק" יורדות. ניתוח חשף את המדריך של משה.',
    date: '04/2026',
  },
]

/* ═══ MAIN COMPONENT ═══ */

export function ServiceQualityView() {
  const [activeTab, setActiveTab] = useState<'branches' | 'domains' | 'excellence'>('branches')

  return (
    <div className="animate-in w-full max-w-[1100px]">
      {/* Header */}
      <div className="card-premium mb-5 animate-in-d1" style={{ padding: '20px 24px' }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)' }}>
            <Award className="w-5 h-5" style={{ color: '#27864a' }} />
          </div>
          <div>
            <h2 className="text-[15px] font-bold" style={{ color: '#1a2332' }}>איכות שירות — ראיית רוחב</h2>
            <p className="text-[11px]" style={{ color: '#8a9bb0' }}>השוואת מוקדים, סניפים ואגפים · זיהוי חריגות · למידה חיובית</p>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="flex items-center gap-4 sm:gap-8 mt-4 pt-3 flex-wrap" style={{ borderTop: '1px solid #f0f2f5' }}>
          <QualityKPI label="זמן זיהוי תקלה (ממוצע)" value="4.2 שעות" sub="לפני: 18 ימים" color="#27864a" />
          <div className="hidden sm:block" style={{ width: '1px', height: '28px', background: '#e8ecf0' }} />
          <QualityKPI label="מוקדים בשיפור" value="3 / 6" sub="צפת, חיפה, באר שבע" color="#1a6fb5" />
          <div className="hidden sm:block" style={{ width: '1px', height: '28px', background: '#e8ecf0' }} />
          <QualityKPI label="מצטיין החודש" value="מוקד צפת" sub="מדד כאב 5.4 ↓18%" color="#27864a" />
          <div className="hidden sm:block" style={{ width: '1px', height: '28px', background: '#e8ecf0' }} />
          <QualityKPI label="חריגה שלילית" value="מוקד מרכז" sub="מדד כאב 8.5 ↑23%" color="#d32f2f" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-5 animate-in-d2">
        <TabButton active={activeTab === 'branches'} onClick={() => setActiveTab('branches')} label="מוקדים וסניפים" icon={<MapPin className="w-3.5 h-3.5" />} />
        <TabButton active={activeTab === 'domains'} onClick={() => setActiveTab('domains')} label="אגפים" icon={<Users className="w-3.5 h-3.5" />} />
        <TabButton active={activeTab === 'excellence'} onClick={() => setActiveTab('excellence')} label="מצטיינים ולמידה" icon={<Star className="w-3.5 h-3.5" />} />
      </div>

      {/* Content */}
      {activeTab === 'branches' && <BranchesTab />}
      {activeTab === 'domains' && <DomainsTab />}
      {activeTab === 'excellence' && <ExcellenceTab />}
    </div>
  )
}

/* ═══ TABS ═══ */

function BranchesTab() {
  return (
    <div className="animate-in-d3 space-y-3">
      {branches.map(branch => (
        <BranchCard key={branch.id} branch={branch} />
      ))}
    </div>
  )
}

function DomainsTab() {
  return (
    <div className="animate-in-d3 space-y-3">
      {domainQuality.map(d => (
        <DomainQualityCard key={d.domain} data={d} />
      ))}
    </div>
  )
}

function ExcellenceTab() {
  return (
    <div className="animate-in-d3 space-y-4">
      {/* Intro */}
      <div className="rounded-xl" style={{ padding: '14px 18px', background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '1px solid rgba(234,179,8,0.15)' }}>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4" style={{ color: '#92400e' }} />
          <span className="text-[11px] font-bold" style={{ color: '#92400e' }}>למידה חיובית — AI מזהה הצלחות</span>
        </div>
        <p className="text-[10px] leading-relaxed" style={{ color: '#78350f' }}>
          המערכת מזהה אוטומטית נציגים, מוקדים ואגפים שמשיגים תוצאות יוצאות דופן — ומנתחת מה הם עושים אחרת. 
          הסיפורים האלה הופכים לידע ארגוני שאפשר להעתיק.
        </p>
      </div>

      {/* Stories */}
      {excellenceStories.map(story => (
        <ExcellenceCard key={story.id} story={story} />
      ))}
    </div>
  )
}

/* ═══ SUB-COMPONENTS ═══ */

function QualityKPI({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div>
      <p className="text-[9px]" style={{ color: '#8a9bb0' }}>{label}</p>
      <p className="text-[14px] font-bold" style={{ color }}>{value}</p>
      <p className="text-[9px]" style={{ color: '#8a9bb0' }}>{sub}</p>
    </div>
  )
}

function TabButton({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: React.ReactNode }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 rounded-lg text-[11px] transition-all" style={{
      padding: '9px 18px',
      color: active ? '#ffffff' : '#4a5c6f',
      background: active ? 'linear-gradient(135deg, #1a6fb5, #1557a0)' : '#ffffff',
      border: active ? '1px solid #1a6fb5' : '1px solid #e8ecf0',
      fontWeight: active ? 600 : 400,
      boxShadow: active ? '0 2px 8px rgba(26,111,181,0.2)' : '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      {icon}
      {label}
    </button>
  )
}

function BranchCard({ branch }: { branch: BranchData }) {
  const trendIcon = branch.painTrend === 'down' ? <ArrowDown className="w-3 h-3" /> : branch.painTrend === 'up' ? <ArrowUp className="w-3 h-3" /> : <Minus className="w-3 h-3" />
  const trendColor = branch.painTrend === 'down' ? '#27864a' : branch.painTrend === 'up' ? '#d32f2f' : '#8a9bb0'
  
  const borderColor = branch.highlight === 'excellent' ? 'rgba(39,134,74,0.2)' : branch.highlight === 'warning' ? 'rgba(211,47,47,0.15)' : '#f0f2f5'
  const bgColor = branch.highlight === 'excellent' ? '#f0fdf4' : branch.highlight === 'warning' ? '#fef5f5' : '#ffffff'

  return (
    <div className="card-interactive" style={{ padding: '18px 22px', background: bgColor, border: `1px solid ${borderColor}` }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {branch.highlight === 'excellent' && (
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: '#ecfdf5', color: '#27864a', border: '1px solid rgba(39,134,74,0.15)' }}>⭐ מצטיין</span>
          )}
          {branch.highlight === 'warning' && (
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: '#fef5f5', color: '#d32f2f', border: '1px solid rgba(211,47,47,0.15)' }}>⚠️ חריגה</span>
          )}
          <span className="text-[13px] font-bold" style={{ color: '#1a2332' }}>{branch.name}</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: '#f0f2f5', color: '#8a9bb0' }}>{branch.type} · {branch.region}</span>
        </div>
        <div className="flex items-center gap-1" style={{ color: trendColor }}>
          {trendIcon}
          <span className="text-[10px] font-semibold">{branch.painDelta}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <MetricCell label="מדד כאב" value={branch.painIndex.toString()} color={branch.painIndex > 7.5 ? '#d32f2f' : branch.painIndex > 6 ? '#e67e22' : '#27864a'} />
        <MetricCell label="שביעות רצון" value={`${branch.satisfactionScore}%`} color={branch.satisfactionScore > 80 ? '#27864a' : branch.satisfactionScore > 70 ? '#e67e22' : '#d32f2f'} />
        <MetricCell label="זמן טיפול ממוצע" value={`${branch.avgHandleTime} דק'`} color="#1a6fb5" />
        <MetricCell label="ביקוש כשל" value={`${branch.failureDemandPct}%`} color={branch.failureDemandPct > 15 ? '#d32f2f' : '#e67e22'} />
        <MetricCell label="זמן זיהוי תקלה" value={branch.issueDetectionTime} color={branch.issueDetectionTime.includes('יום') ? '#d32f2f' : '#27864a'} />
      </div>
    </div>
  )
}

function MetricCell({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg" style={{ padding: '8px 10px', background: 'rgba(248,249,251,0.8)' }}>
      <p className="text-[8px] mb-0.5" style={{ color: '#8a9bb0' }}>{label}</p>
      <p className="text-[13px] font-bold" style={{ color }}>{value}</p>
    </div>
  )
}

function DomainQualityCard({ data }: { data: typeof domainQuality[0] }) {
  const trendIcon = data.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : data.trend === 'down' ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />
  const trendColor = data.trend === 'up' ? '#27864a' : data.trend === 'down' ? '#d32f2f' : '#8a9bb0'
  const scoreColor = data.score > 75 ? '#27864a' : data.score > 60 ? '#e67e22' : '#d32f2f'

  return (
    <div className="card-interactive" style={{ padding: '16px 22px' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${scoreColor}0a` }}>
            <span className="text-[14px] font-bold" style={{ color: scoreColor }}>{data.score}</span>
          </div>
          <div>
            <p className="text-[12px] font-bold" style={{ color: '#1a2332' }}>{data.domain}</p>
            <p className="text-[10px]" style={{ color: '#8a9bb0' }}>{data.topIssue}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Score bar */}
          <div className="w-24 h-2 rounded-full hidden sm:block" style={{ background: '#f0f2f5' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${data.score}%`, background: scoreColor }} />
          </div>
          {/* Trend */}
          <div className="flex items-center gap-1" style={{ color: trendColor }}>
            {trendIcon}
            <span className="text-[10px] font-semibold">{data.delta}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExcellenceCard({ story }: { story: ExcellenceStory }) {
  const typeColors: Record<string, string> = { 'נציג': '#1a6fb5', 'מוקד': '#27864a', 'אגף': '#7c3aed', 'פקיד': '#e67e22' }
  const color = typeColors[story.type] || '#1a6fb5'

  return (
    <div className="card-premium" style={{ padding: '20px 22px', borderInlineStart: `4px solid ${color}` }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${color}0d`, color }}>
            <Star className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold" style={{ color: '#1a2332' }}>{story.name}</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${color}0d`, color }}>{story.type}</span>
            </div>
            <p className="text-[9px]" style={{ color: '#8a9bb0' }}>{story.branch} · {story.domain} · {story.date}</p>
          </div>
        </div>
        {/* Metric badge */}
        <div className="text-center rounded-lg" style={{ padding: '6px 12px', background: '#ecfdf5', border: '1px solid rgba(39,134,74,0.1)' }}>
          <p className="text-[16px] font-bold" style={{ color: '#27864a' }}>{story.metric}</p>
          <p className="text-[8px]" style={{ color: '#8a9bb0' }}>{story.metricLabel}</p>
        </div>
      </div>

      {/* Title */}
      <p className="text-[12px] font-bold mb-2" style={{ color: '#1a2332' }}>{story.title}</p>

      {/* Story */}
      <p className="text-[11px] leading-relaxed mb-3" style={{ color: '#4a5c6f' }}>{story.story}</p>

      {/* Impact */}
      <div className="rounded-lg mb-3" style={{ padding: '10px 14px', background: '#f0fdf4', border: '1px solid rgba(39,134,74,0.08)' }}>
        <p className="text-[10px] font-semibold" style={{ color: '#27864a' }}>📊 אימפקט: {story.impact}</p>
      </div>

      {/* AI Insight */}
      <div className="rounded-lg" style={{ padding: '10px 14px', background: '#edf5fc', border: '1px solid rgba(26,111,181,0.08)' }}>
        <div className="flex items-center gap-1.5 mb-1">
          <Sparkles className="w-3 h-3" style={{ color: '#1a6fb5' }} />
          <span className="text-[9px] font-bold" style={{ color: '#1a6fb5' }}>איך AI זיהה את זה:</span>
        </div>
        <p className="text-[10px] leading-relaxed" style={{ color: '#4a5c6f' }}>{story.aiInsight}</p>
      </div>
    </div>
  )
}
