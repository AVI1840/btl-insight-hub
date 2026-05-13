import type { Domain, Source, SourceBreakdown } from './insights'

export interface ReportInsight {
  title: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  metric: number
  trend: 'up' | 'down' | 'stable'
}

export interface RootCause {
  title: string
  percentage: number
  description: string
  affectedCount: number
}

export interface Report {
  id: string
  title: string
  period: string
  domain: Domain | 'כל האגפים'
  summary: string
  totalVolume: number
  painIndex: number
  failureDemandPct: number
  sources: SourceBreakdown
  insights: ReportInsight[]
  rootCauses: RootCause[]
  generatedAt: string
}

export const reports: Report[] = [
  {
    id: 'rpt-001',
    title: 'דוח חודשי — אבטלה — אפריל 2026',
    period: 'אפריל 2026',
    domain: 'אבטלה',
    summary: 'באפריל נותחו 10,260 פניות באגף אבטלה. 17% מהן זוהו כביקוש כשל. הבעיה המרכזית נותרה כשל סנכרון עם לשכת התעסוקה (40.4%) וחסם קוד סודי (22.1%). נרשמה עלייה של 8% בפניות לעומת מרץ, בעיקר בגלל גל פיטורים בהייטק. מדד הכאב עלה ל-8.5.',
    totalVolume: 10260,
    painIndex: 8.5,
    failureDemandPct: 17,
    sources: { mipatz: 3800, kashab: 5200, kashar: 1260 },
    insights: [
      { title: 'עלייה של 8% בפניות', description: 'גל פיטורים בהייטק הגדיל את נפח הפניות', severity: 'high', metric: 8, trend: 'up' },
      { title: 'ביקוש כשל 17%', description: '1,172 אזרחים נאלצו לפנות שוב בגלל כשל שלנו', severity: 'critical', metric: 17, trend: 'up' },
      { title: 'זמן טיפול ממוצע ירד', description: 'ממוצע 12 דקות — ירידה של 6% ממרץ', severity: 'low', metric: -6, trend: 'down' },
    ],
    rootCauses: [
      { title: 'כשל סנכרון ממשק לשכת התעסוקה', percentage: 40.4, description: 'נתוני תעסוקה לא מתעדכנים → קיזוזים שגויים → פניות חוזרות', affectedCount: 1200 },
      { title: 'חסם קוד סודי', percentage: 22.1, description: 'אזרחים נחסמים מגישה לחשבון בגלל קוד שגוי', affectedCount: 206 },
      { title: 'חוסר בהירות הודעות SMS', percentage: 15.3, description: 'הודעות מערכת לא ברורות — אזרחים מתקשרים לבירור', affectedCount: 580 },
    ],
    generatedAt: '2026-05-01T08:00:00',
  },
  {
    id: 'rpt-002',
    title: 'דוח חודשי — נכות כללית — אפריל 2026',
    period: 'אפריל 2026',
    domain: 'נכות כללית',
    summary: 'באפריל נותחו 12,800 פניות באגף נכות כללית — האגף עם הנפח הגבוה ביותר. מדד הכאב הגיע ל-9.1 — הגבוה בארגון. 21.4% ביקוש כשל. הבעיה המרכזית: ועדות רפואיות — 3,200 אזרחים ממתינים מעל 4 חודשים. זוהתה מגמת הידרדרות רבעונית.',
    totalVolume: 12800,
    painIndex: 9.1,
    failureDemandPct: 21.4,
    sources: { mipatz: 5600, kashab: 5400, kashar: 1800 },
    insights: [
      { title: 'מדד כאב 9.1 — הגבוה בארגון', description: 'שימוש במילים "ייאוש", "אין תקווה", "נטישה"', severity: 'critical', metric: 9.1, trend: 'up' },
      { title: 'עלייה של 15% בפניות חוזרות', description: 'אזרחים מתקשרים שוב ושוב לבירור סטטוס', severity: 'high', metric: 15, trend: 'up' },
      { title: '21.4% ביקוש כשל', description: '2,739 פניות שאפשר היה למנוע', severity: 'critical', metric: 21.4, trend: 'up' },
    ],
    rootCauses: [
      { title: 'עיכוב בוועדות רפואיות', percentage: 37.0, description: 'תורים ארוכים — ממוצע 4.5 חודשים המתנה', affectedCount: 3200 },
      { title: 'מכתבי דחייה גנריים', percentage: 24.2, description: 'אזרחים לא מבינים למה נדחו ופונים שוב', affectedCount: 1840 },
      { title: 'חוסר עדכון סטטוס', percentage: 18.5, description: 'אין מערכת עדכון אוטומטית — אזרחים מתקשרים לבדוק', affectedCount: 1200 },
    ],
    generatedAt: '2026-05-01T08:00:00',
  },
  {
    id: 'rpt-003',
    title: 'דוח חודשי — סיעוד — אפריל 2026',
    period: 'אפריל 2026',
    domain: 'סיעוד',
    summary: 'באפריל נותחו 9,800 פניות סיעוד. עלייה של 23% בפניות חוזרות — הגבוהה בין כל האגפים. 22.6% ביקוש כשל. המתנה ממוצעת לביקור הערכה: 8 שבועות. 2,800 אזרחים ממתינים. מדד כאב 8.9 עם ציטוטים של מצוקה אמיתית מבני משפחה.',
    totalVolume: 9800,
    painIndex: 8.9,
    failureDemandPct: 22.6,
    sources: { mipatz: 4200, kashab: 3800, kashar: 1800 },
    insights: [
      { title: 'עלייה של 23% בפניות חוזרות', description: 'בני משפחה מתקשרים שוב ושוב לבדוק סטטוס הערכה', severity: 'critical', metric: 23, trend: 'up' },
      { title: '22.6% ביקוש כשל', description: '2,213 פניות שנגרמו מכשל שלנו', severity: 'critical', metric: 22.6, trend: 'up' },
      { title: 'ירידה בשביעות רצון', description: 'ציון ממוצע 2.1 מתוך 5 בסקר שביעות רצון', severity: 'high', metric: 2.1, trend: 'down' },
    ],
    rootCauses: [
      { title: 'מחסור במעריכים מוסמכים', percentage: 40.8, description: '8 שבועות המתנה ממוצעת לביקור הערכה', affectedCount: 2800 },
      { title: 'תהליך ערעור ממושך', percentage: 25.3, description: 'ערעור לוקח 3 חודשים נוספים', affectedCount: 900 },
      { title: 'חוסר תיאום עם קופות חולים', percentage: 14.7, description: 'מסמכים רפואיים לא מגיעים', affectedCount: 650 },
    ],
    generatedAt: '2026-05-01T08:00:00',
  },
  {
    id: 'rpt-004',
    title: 'דוח חודשי — זקנה ושאירים — אפריל 2026',
    period: 'אפריל 2026',
    domain: 'זקנה ושאירים',
    summary: 'באפריל נותחו 15,400 פניות — הנפח הגדול ביותר בין כל האגפים. 11.2% ביקוש כשל, בעיקר בגלל קשיים בעדכון פרטי בנק דיגיטלית. מדד כאב 6.8 — מתון יחסית. אוכלוסייה מבוגרת מתקשה בשירותים מקוונים.',
    totalVolume: 15400,
    painIndex: 6.8,
    failureDemandPct: 11.2,
    sources: { mipatz: 6200, kashab: 7000, kashar: 2200 },
    insights: [
      { title: 'נפח פניות הגבוה ביותר', description: '15,400 פניות — 18.7% מכלל הפניות בארגון', severity: 'medium', metric: 15400, trend: 'stable' },
      { title: 'בעיית דיגיטציה', description: '35% מהאוכלוסייה לא מסוגלת לבצע פעולות מקוונות', severity: 'high', metric: 35, trend: 'stable' },
    ],
    rootCauses: [
      { title: 'מערכת עדכון פרטים לא נגישה', percentage: 35.7, description: 'אוכלוסייה מבוגרת לא יכולה לעדכן פרטים אונליין', affectedCount: 4200 },
      { title: 'הודעות מורכבות מדי', percentage: 22.1, description: 'מכתבים בירוקרטיים שלא מובנים לאזרח', affectedCount: 2400 },
    ],
    generatedAt: '2026-05-01T08:00:00',
  },
  {
    id: 'rpt-005',
    title: 'דוח חודשי — הבטחת הכנסה — אפריל 2026',
    period: 'אפריל 2026',
    domain: 'הבטחת הכנסה',
    summary: 'באפריל נותחו 6,300 פניות באגף הבטחת הכנסה. 19.7% ביקוש כשל — גבוה. הבעיה הבולטת: קיזוזים ללא הסבר. 1,400 אזרחים קיבלו הודעת קיזוז ללא הנמקה מילולית. מדד כאב 8.3 עם ביטויים של תסכול וחוסר אונים.',
    totalVolume: 6300,
    painIndex: 8.3,
    failureDemandPct: 19.7,
    sources: { mipatz: 2500, kashab: 2800, kashar: 1000 },
    insights: [
      { title: '19.7% ביקוש כשל', description: '1,241 פניות שנגרמו מכשל תהליכי', severity: 'high', metric: 19.7, trend: 'up' },
      { title: 'מדד כאב 8.3', description: 'אוכלוסייה פגיעה עם ביטויי מצוקה', severity: 'high', metric: 8.3, trend: 'stable' },
    ],
    rootCauses: [
      { title: 'הודעות קיזוז ללא הסבר', percentage: 38.7, description: 'האזרח לא מבין למה קוצצה הגמלה', affectedCount: 1400 },
      { title: 'תנאי זכאות לא ברורים', percentage: 27.4, description: 'שינויים תכופים בתנאים ללא הודעה', affectedCount: 800 },
    ],
    generatedAt: '2026-05-01T08:00:00',
  },
  {
    id: 'rpt-006',
    title: 'דוח חודשי — נפגעי עבודה — אפריל 2026',
    period: 'אפריל 2026',
    domain: 'נפגעי עבודה',
    summary: 'באפריל נותחו 7,200 פניות באגף נפגעי עבודה. מדד כאב 7.4. 12.8% ביקוש כשל. הבעיה המרכזית: 60% מטפסי התביעה מוגשים עם שגיאות בגלל מורכבות. שיפור של 8% בזמני טיפול לעומת מרץ.',
    totalVolume: 7200,
    painIndex: 7.4,
    failureDemandPct: 12.8,
    sources: { mipatz: 2800, kashab: 3200, kashar: 1200 },
    insights: [
      { title: '60% טפסים עם שגיאות', description: 'מורכבות הטפסים גורמת לשגיאות שחוזרות', severity: 'high', metric: 60, trend: 'stable' },
      { title: 'שיפור 8% בזמני טיפול', description: 'תהליך ייעול שהחל בפברואר מתחיל לתת תוצאות', severity: 'low', metric: -8, trend: 'down' },
    ],
    rootCauses: [
      { title: 'טפסי תביעה מורכבים', percentage: 36.1, description: 'ניסוח לא ברור, שדות מיותרים, חוסר הנחיות', affectedCount: 1560 },
      { title: 'עיכוב באישורי מעסיק', percentage: 28.3, description: 'מעסיקים לא ממלאים טופס תאונה בזמן', affectedCount: 920 },
    ],
    generatedAt: '2026-05-01T08:00:00',
  },
  {
    id: 'rpt-007',
    title: 'דוח חודשי — ילד נכה — אפריל 2026',
    period: 'אפריל 2026',
    domain: 'ילד נכה',
    summary: 'באפריל נותחו 4,600 פניות באגף ילד נכה. מדד כאב 8.7 — מהגבוהים בארגון. 18.2% ביקוש כשל. הבעיה הבולטת: מכתבי דחייה גנריים ללא הנמקה. הורים לילדים נכים מדווחים על תחושת חוסר אונים.',
    totalVolume: 4600,
    painIndex: 8.7,
    failureDemandPct: 18.2,
    sources: { mipatz: 2000, kashab: 1800, kashar: 800 },
    insights: [
      { title: 'מדד כאב 8.7', description: 'הורים משתמשים במילים "ייאוש", "אי-צדק", "אכזריות"', severity: 'critical', metric: 8.7, trend: 'up' },
      { title: 'שיעור דחייה 32%', description: 'כשליש מהבקשות נדחות — רבות מוגשות שוב', severity: 'high', metric: 32, trend: 'stable' },
    ],
    rootCauses: [
      { title: 'מכתבי דחייה גנריים', percentage: 35.4, description: 'אין התייחסות ספציפית למסמכים שהוגשו', affectedCount: 840 },
      { title: 'ועדות רפואיות לא מתואמות', percentage: 24.8, description: 'הורים מקבלים תורים בשעות עבודה ללא אפשרות גמישות', affectedCount: 520 },
    ],
    generatedAt: '2026-05-01T08:00:00',
  },
  {
    id: 'rpt-008',
    title: 'דוח חודשי — מילואים — אפריל 2026',
    period: 'אפריל 2026',
    domain: 'מילואים',
    summary: 'באפריל נותחו 4,200 פניות מילואים. מדד כאב 6.2 — מתון. 9.5% ביקוש כשל. הבעיה העיקרית: עיכוב בקבלת אישורי שירות מצה"ל. שיפור ב-12% לעומת מרץ לאחר הגברת קשר עם צה"ל.',
    totalVolume: 4200,
    painIndex: 6.2,
    failureDemandPct: 9.5,
    sources: { mipatz: 1500, kashab: 2100, kashar: 600 },
    insights: [
      { title: 'שיפור 12% בביקוש כשל', description: 'ירד מ-10.7% ל-9.5% — תוצאה של שיפור ממשק', severity: 'low', metric: -12, trend: 'down' },
      { title: 'עיכוב תשלומים', description: '600 משרתים מחכים מעל חודש לתגמול', severity: 'medium', metric: 600, trend: 'stable' },
    ],
    rootCauses: [
      { title: 'עיכוב אישורי שירות מצה"ל', percentage: 38.1, description: 'ממוצע 3 שבועות עד קבלת אישור', affectedCount: 600 },
      { title: 'טעויות בחישוב ימי שירות', percentage: 19.5, description: 'אי-התאמה בין דיווח צה"ל לבין התביעה', affectedCount: 280 },
    ],
    generatedAt: '2026-05-01T08:00:00',
  },
  {
    id: 'rpt-009',
    title: 'דוח חודשי — מזונות — אפריל 2026',
    period: 'אפריל 2026',
    domain: 'מזונות',
    summary: 'באפריל נותחו 3,100 פניות מזונות. 15.3% ביקוש כשל. הבעיה הבולטת: אי-עדכון פרטי חשבון. מדד כאב 7.8 — פניות רגשיות סביב סכסוכי גירושין.',
    totalVolume: 3100,
    painIndex: 7.8,
    failureDemandPct: 15.3,
    sources: { mipatz: 1200, kashab: 1400, kashar: 500 },
    insights: [
      { title: '15.3% ביקוש כשל', description: 'בעיקר אי-עדכון כתובת וחשבון בנק', severity: 'medium', metric: 15.3, trend: 'stable' },
    ],
    rootCauses: [
      { title: 'אי-עדכון פרטי חשבון', percentage: 41.9, description: 'אזרחים לא מעדכנים שינויים — תשלום חוזר', affectedCount: 470 },
    ],
    generatedAt: '2026-05-01T08:00:00',
  },
  {
    id: 'rpt-010',
    title: 'דוח חודשי — איבה — אפריל 2026',
    period: 'אפריל 2026',
    domain: 'איבה',
    summary: 'באפריל נותחו 2,100 פניות איבה. מדד כאב 7.1. 8.4% ביקוש כשל — נמוך יחסית. הבעיה הבולטת: תהליך הכרה ממושך — 6 חודשים בממוצע. אוכלוסייה רגישה עם צרכים דחופים.',
    totalVolume: 2100,
    painIndex: 7.1,
    failureDemandPct: 8.4,
    sources: { mipatz: 800, kashab: 900, kashar: 400 },
    insights: [
      { title: 'תהליך הכרה ממושך', description: '6 חודשים ממוצע עד אישור סטטוס', severity: 'medium', metric: 6, trend: 'stable' },
    ],
    rootCauses: [
      { title: 'תהליך הכרה ממושך', percentage: 37.5, description: 'ועדות הכרה מתכנסות אחת לחודש', affectedCount: 180 },
    ],
    generatedAt: '2026-05-01T08:00:00',
  },
  {
    id: 'rpt-011',
    title: 'דוח חודשי — שיקום — אפריל 2026',
    period: 'אפריל 2026',
    domain: 'שיקום',
    summary: 'באפריל נותחו 3,200 פניות שיקום. מדד כאב 6.5. 10.1% ביקוש כשל. הבעיה הבולטת: מיעוט ספקי שירות בפריפריה — אזרחים מתחנכים מגיעים לשירות.',
    totalVolume: 3200,
    painIndex: 6.5,
    failureDemandPct: 10.1,
    sources: { mipatz: 1100, kashab: 1500, kashar: 600 },
    insights: [
      { title: 'פערי פריפריה', description: 'אזרחים בנגב ובגליל נוסעים 2+ שעות לטיפול', severity: 'medium', metric: 2, trend: 'stable' },
    ],
    rootCauses: [
      { title: 'מיעוט ספקי שירות בפריפריה', percentage: 32.7, description: 'אין ספקים מוכרים בערד, ירוחם, קריית שמונה', affectedCount: 320 },
    ],
    generatedAt: '2026-05-01T08:00:00',
  },
  {
    id: 'rpt-012',
    title: 'דוח חודשי — ילדים — אפריל 2026',
    period: 'אפריל 2026',
    domain: 'ילדים',
    summary: 'באפריל נותחו 3,490 פניות קצבת ילדים. מדד כאב 4.2 — הנמוך ביותר. 5.8% ביקוש כשל. האגף המתפקד ביותר מבחינת שביעות רצון. הבעיה היחידה: עדכון פרטי חשבון לאחר גירושין.',
    totalVolume: 3490,
    painIndex: 4.2,
    failureDemandPct: 5.8,
    sources: { mipatz: 1200, kashab: 1600, kashar: 690 },
    insights: [
      { title: 'מדד כאב 4.2 — הנמוך ביותר', description: 'שביעות רצון גבוהה, פניות רוטיניות בעיקר', severity: 'low', metric: 4.2, trend: 'stable' },
    ],
    rootCauses: [
      { title: 'עדכון פרטים לאחר גירושין', percentage: 48.3, description: 'תהליך שינוי מוטב לא ברור', affectedCount: 200 },
    ],
    generatedAt: '2026-05-01T08:00:00',
  },
]
