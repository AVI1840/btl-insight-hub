import { FileText, Download, AlertTriangle, ArrowUp, BarChart3, Quote, CheckCircle, XCircle } from 'lucide-react'

export function ReportsView() {
  return (
    <div className="animate-in" style={{ maxWidth: '1000px' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#edf5fc' }}>
            <FileText className="w-4 h-4" style={{ color: '#1a6fb5' }} />
          </div>
          <h2 className="text-[15px] font-bold" style={{ color: '#1a2332' }}>דוחות ניתוח</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-medium transition-all"
            style={{ background: 'linear-gradient(135deg, #1a6fb5, #1557a0)', color: '#fff', boxShadow: '0 2px 8px rgba(26,111,181,0.2)' }}>
            <Download className="w-3 h-3" /> ייצוא PDF
          </button>
        </div>
      </div>

      {/* Report Card */}
      <div className="card-premium overflow-hidden animate-in-d1">
        {/* Report Header */}
        <div style={{
          padding: '22px 26px',
          background: 'linear-gradient(135deg, #f8f9fb, #f0f4f8)',
          borderBottom: '1px solid #e8ecf0',
        }}>
          <h3 className="text-[16px] font-bold mb-1" style={{ color: '#1a2332' }}>דוח ניתוח פניות אבטלה</h3>
          <p className="text-[11px]" style={{ color: '#8a9bb0' }}>1.3.26–31.3.26 · 7,240 פניות · 5,830 אזרחים ייחודיים · 22 ימי קבלה</p>
        </div>

        {/* KPI Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#e8ecf0' }}>
          <ReportKpi label="פניות" value="7,240" />
          <ReportKpi label="ביקוש כשל" value="15.3%" sub="987 פניות חוזרות" color="#d32f2f" />
          <ReportKpi label="נושא בוער" value="תשלומים" sub="37.8% מהפניות" color="#e67e22" />
          <ReportKpi label="מדד הפתעה" value="7/10" color="#d32f2f" />
        </div>

        {/* Content */}
        <div style={{ padding: '26px' }}>
          {/* Section 1: Pain Index */}
          <Section title="מדד הכאב וההפתעה" icon={<AlertTriangle className="w-3.5 h-3.5" />} iconBg="#fef5f5" iconColor="#d32f2f">
            <p className="text-[12px] leading-relaxed mb-3" style={{ color: '#4a5c6f' }}>
              מאחורי כל פנייה בנושא תשלומים מסתתרת תחושה אחת: <strong style={{ color: '#1a2332' }}>"קיבלתי פחות ממה שציפיתי — ואף אחד לא הסביר לי למה."</strong> קיזוזים בגין אי-התאמה בנתוני תעסוקה, ניכוי ימים בגלל עדכון מאוחר מהמעסיק, תשלום חלקי ללא הודעה מוקדמת.
            </p>

            <div className="mb-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              <SurpriseCard label="הפתעה מהמערכת" count={780} pct={10.8} desc="קיזוז אוטומטי, שינוי סטטוס, דחייה" />
              <SurpriseCard label="הפתעה מהמעסיק" count={415} pct={5.7} desc="טופס לא נשלח / עודכן באיחור" />
              <SurpriseCard label="הפתעה מהכללים" count={0} pct={0} desc="תנאי זכאות לא ברורים, דדליינים" />
            </div>

            <CitizenQuote text={'פוטרתי לפני חודשיים. נרשמתי בלשכה, הגשתי הכל. קיבלתי תשלום על 18 ימים במקום 24. אף אחד לא הודיע לי מראש שיהיה קיזוז. התקשרתי — אמרו לי לפנות למעסיק. המעסיק אומר שהוא שלח הכל. אני באמצע ואף אחד לא לוקח אחריות.'} />
          </Section>

          {/* Section 2: Failure Demand */}
          <Section title="כשלים בתהליך השירות" icon={<ArrowUp className="w-3.5 h-3.5" />} iconBg="#fef9f3" iconColor="#e67e22">
            <p className="text-[12px] mb-3" style={{ color: '#4a5c6f' }}>
              <strong style={{ color: '#d32f2f' }}>15.3% פניות חוזרות</strong> — 987 אזרחים פנו יותר מפעם אחת. כמעט 1 מכל 7.
            </p>

            <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <FailurePattern num={1} title="חסם הזדהות דיגיטלית" desc="פנייה ללא הזדהות מלאה → תשובה: להזדהות מחדש → פנייה שנייה. שתי פניות במקום אחת." />
              <FailurePattern num={2} title='הפניה ל"גורם חיצוני"' desc='"פנה ללשכה / למעסיק" — ללא בדיקה אם הבעיה אכן שם. האזרח חוזר עם אותה שאלה." ' />
              <FailurePattern num={3} title="מענה חלקי" desc="תשובה שעונה על חלק מהשאלה — האזרח פונה שוב על החלק שלא נענה." />
            </div>

            <div className="rounded-xl" style={{ padding: '14px 18px', background: '#fef9f3', border: '1px solid rgba(230,126,34,0.1)' }}>
              <p className="text-[11px] font-semibold mb-1" style={{ color: '#e67e22' }}>תופעה חריגה — "אפקט עדכון מעסיק"</p>
              <p className="text-[11px]" style={{ color: '#4a5c6f' }}>
                מאות פניות נוצרו בגלל עדכון שגוי שהמעסיק שלח. האזרח לא יודע שהעדכון שגוי, מקבל תשלום חלקי, פונה — ורק אז מגלה שהמעסיק הוא הבעיה. <strong>האזרח הפך למתווך בין המעסיק לביטוח הלאומי.</strong>
              </p>
            </div>
          </Section>

          {/* Section 3: Response Quality */}
          <Section title="בקרת איכות המענה" icon={<BarChart3 className="w-3.5 h-3.5" />} iconBg="#edf5fc" iconColor="#1a6fb5">
            <p className="text-[12px] mb-3" style={{ color: '#4a5c6f' }}>
              ציון איכות משוקלל: <strong style={{ color: '#1a2332' }}>6.2/10</strong> · 128 תשובות (1.8%) ריקות לחלוטין · 1,590 תשובות (22%) מפורטות עם כיוון פעולה
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="rounded-xl" style={{ padding: '14px 18px', background: '#f0faf4', border: '1px solid rgba(39,134,74,0.08)' }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <CheckCircle className="w-3.5 h-3.5" style={{ color: '#27864a' }} />
                  <span className="text-[10px] font-bold" style={{ color: '#27864a' }}>מענה שעובד</span>
                </div>
                <p className="text-[10px] italic leading-relaxed" style={{ color: '#4a5c6f' }}>
                  "מאחר שכבר היית בתקופת זכאות, אין צורך בהגשה מחדש. עליך לוודא שהמעסיק עדכן את הנתונים ושנרשמת בשירות התעסוקה. ברגע ששני הנתונים יתקבלו — הזכאות תחודש אוטומטית."
                </p>
              </div>
              <div className="rounded-xl" style={{ padding: '14px 18px', background: '#fef5f5', border: '1px solid rgba(211,47,47,0.08)' }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <XCircle className="w-3.5 h-3.5" style={{ color: '#d32f2f' }} />
                  <span className="text-[10px] font-bold" style={{ color: '#d32f2f' }}>מענה שנכשל</span>
                </div>
                <p className="text-[10px] mb-1" style={{ color: '#8a9bb0' }}>שאלה: "אני עובד במשרה חלקית, יש לי שני ילדים קטנים, רציתי לדעת מה הסטטוס..."</p>
                <p className="text-[10px] italic font-medium" style={{ color: '#d32f2f' }}>"יש להזדהות מחדש דרך הערוצים הדיגיטליים."</p>
              </div>
            </div>
          </Section>

          {/* Section 4: Recommendations */}
          <Section title="המלצות לפעולה" icon={<CheckCircle className="w-3.5 h-3.5" />} iconBg="#f0faf4" iconColor="#27864a">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <RecCategory title="הסברה" items={[
                'הודעה פרואקטיבית לאזרח כשמזוהה עדכון שגוי מהמעסיק',
                'ציר זמן ברור לאזרח אחרי הגשת תביעה: מה נבדק, מתי, מה חסר',
                'הבהרת תנאי זכאות ודדליינים ברגע קבלת הפנייה',
              ]} />
              <RecCategory title="מדיניות" items={[
                'ביטול חסם הזדהות כתנאי למענה ראשוני',
                'ביטוח לאומי פונה למעסיק ישירות כשהבעיה בצד שלו',
                'הקפאת קיזוז + הודעה מוקדמת לפני ביצוע',
              ]} />
              <RecCategory title="שיפור מענה" items={[
                'תקן מינימום: מה קרה, מה לעשות, מה יקרה אח"כ',
                'הכשרת זיהוי מצוקה — לא לדלג לפרוצדורה',
                'תבנית ייעודית לקיזוז עם הסבר + אפשרות ערעור',
              ]} />
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 26px', borderTop: '1px solid #e8ecf0', background: '#f8f9fb' }}>
          <p className="text-[10px]" style={{ color: '#8a9bb0' }}>
            דוח לדוגמה — נתונים סימולטיביים למטרות הדגמה בלבד. המבנה, השיטה והתובנות מייצגים את אופן הפעולה של המערכת על נתונים אמיתיים.
          </p>
        </div>
      </div>
    </div>
  )
}

function ReportKpi({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="transition-colors" style={{ padding: '16px 20px', background: '#ffffff' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f8f9fb'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#ffffff'}
    >
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
    <div className="mb-7 pb-7" style={{ borderBottom: '1px solid #f0f2f5' }}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: iconBg, color: iconColor }}>
          {icon}
        </div>
        <h4 className="text-[13px] font-bold" style={{ color: '#1a2332' }}>{title}</h4>
      </div>
      {children}
    </div>
  )
}

function SurpriseCard({ label, count, pct, desc }: { label: string; count: number; pct: number; desc: string }) {
  return (
    <div className="rounded-xl transition-all" style={{ padding: '12px 16px', background: '#f8f9fb', border: '1px solid #f0f2f5' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
    >
      <p className="text-[10px] font-semibold mb-0.5" style={{ color: '#1a2332' }}>{label}</p>
      {count > 0 && <p className="text-[14px] font-bold" style={{ color: '#d32f2f' }}>{count.toLocaleString()} <span className="text-[10px] font-normal" style={{ color: '#8a9bb0' }}>({pct}%)</span></p>}
      <p className="text-[10px]" style={{ color: '#8a9bb0' }}>{desc}</p>
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

function FailurePattern({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl transition-all" style={{ padding: '10px 14px', background: '#f8f9fb' }}>
      <span className="text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0"
        style={{ width: '20px', height: '20px', background: 'linear-gradient(135deg, #e67e22, #d35400)', color: '#fff' }}>{num}</span>
      <div>
        <p className="text-[11px] font-semibold" style={{ color: '#1a2332' }}>{title}</p>
        <p className="text-[10px]" style={{ color: '#4a5c6f' }}>{desc}</p>
      </div>
    </div>
  )
}

function RecCategory({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl transition-all" style={{ padding: '14px 16px', background: '#f8f9fb', border: '1px solid #f0f2f5' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
    >
      <p className="text-[11px] font-bold mb-2.5" style={{ color: '#1a2332' }}>{title}</p>
      <ul style={{ paddingInlineStart: '14px' }}>
        {items.map((item, i) => (
          <li key={i} className="text-[10px] mb-1.5 leading-relaxed" style={{ color: '#4a5c6f' }}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
