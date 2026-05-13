// Typed mock data layer — replace with API calls later

export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type ActionStatus = 'pending' | 'approved' | 'rejected'

export type Domain =
  | 'אבטלה'
  | 'מילואים'
  | 'מזונות'
  | 'נכות כללית'
  | 'ילד נכה'
  | 'נפגעי עבודה'
  | 'זקנה ושאירים'
  | 'סיעוד'
  | 'הבטחת הכנסה'
  | 'איבה'
  | 'שיקום'
  | 'ילדים'

export type Source = 'מפ"צ' | 'קש"ב' | 'קש"ר'

export const ALL_DOMAINS: Domain[] = [
  'אבטלה', 'מילואים', 'מזונות', 'נכות כללית', 'ילד נכה',
  'נפגעי עבודה', 'זקנה ושאירים', 'סיעוד', 'הבטחת הכנסה',
  'איבה', 'שיקום', 'ילדים',
]

export const ALL_SOURCES: Source[] = ['מפ"צ', 'קש"ב', 'קש"ר']

export interface SourceBreakdown {
  mipatz: number  // מפ"צ
  kashab: number  // קש"ב
  kashar: number  // קש"ר
}

export interface Insight {
  id: string
  title: string
  domain: Domain
  severity: Severity
  sources: SourceBreakdown
  volume: number
  failureDemandPct: number
  rootCause: string
  rootCausePct: number
  citizenVoice: string
  owner: string
  nextAction: string
  actionButtonText: string
  affectedCount: number
}

export interface ExecutiveSummary {
  month: string
  year: number
  totalAnalyzed: number
  narrative: string
  painIndex: number
  painIndexMax: number
  painKeywords: string[]
  failureDemandPct: number
  failureDemandCount: number
  voiceMinutes: string
  documentsCount: string
  domainBreakdown: DomainSummary[]
}

export interface DomainSummary {
  domain: Domain
  total: number
  sources: SourceBreakdown
  painIndex: number
  failureDemandPct: number
  topIssue: string
  trend: { direction: 'up' | 'down' | 'stable'; change: number }
  previousMonth: { total: number; painIndex: number; failureDemandPct: number }
}

export interface DataSource {
  name: string
  type: 'voice' | 'text' | 'system'
  source: Source
  status: 'connected' | 'pending' | 'planned'
  freshness: string
  confidence: number
  owner: string
  fields: string[]
}

export interface ProactiveAction {
  id: string
  description: string
  buttonText: string
  affectedCount: number
  severity: Severity
  status: ActionStatus
  domain: Domain
}

// --- Mock Data ---

export const executiveSummary: ExecutiveSummary = {
  month: 'אפריל',
  year: 2026,
  totalAnalyzed: 82450,
  narrative: 'בחודש אפריל נותחו 82,450 פניות ב-12 אגפים. זוהתה חריגה קריטית באבטלה: 17% מהפניות הן \'ביקוש כשל\' (Failure Demand). באגף סיעוד נרשמה עלייה של 23% בפניות חוזרות. אגף נכות כללית מציג מדד כאב 9.1 — הגבוה ביותר. נפגעי עבודה מראים שיפור של 8% בזמני טיפול.',
  painIndex: 7.8,
  painIndexMax: 10,
  painKeywords: ['הלם', 'פתאום', 'קיזוז', 'חודשים', 'אין מענה'],
  failureDemandPct: 14.2,
  failureDemandCount: 11708,
  voiceMinutes: '6.8M',
  documentsCount: '42,300',
  domainBreakdown: [
    { domain: 'אבטלה', total: 10260, sources: { mipatz: 3800, kashab: 5200, kashar: 1260 }, painIndex: 8.5, failureDemandPct: 17, topIssue: 'כשל סנכרון לשכת התעסוקה', trend: { direction: 'up', change: 8 }, previousMonth: { total: 9500, painIndex: 8.1, failureDemandPct: 15.2 } },
    { domain: 'מילואים', total: 4200, sources: { mipatz: 1500, kashab: 2100, kashar: 600 }, painIndex: 6.2, failureDemandPct: 9.5, topIssue: 'עיכוב בתשלום תגמולים', trend: { direction: 'down', change: 12 }, previousMonth: { total: 4600, painIndex: 6.8, failureDemandPct: 10.7 } },
    { domain: 'מזונות', total: 3100, sources: { mipatz: 1200, kashab: 1400, kashar: 500 }, painIndex: 7.8, failureDemandPct: 15.3, topIssue: 'אי-עדכון פרטי חשבון', trend: { direction: 'stable', change: 2 }, previousMonth: { total: 3050, painIndex: 7.7, failureDemandPct: 15.1 } },
    { domain: 'נכות כללית', total: 12800, sources: { mipatz: 5600, kashab: 5400, kashar: 1800 }, painIndex: 9.1, failureDemandPct: 21.4, topIssue: 'עיכוב בוועדות רפואיות', trend: { direction: 'up', change: 15 }, previousMonth: { total: 11130, painIndex: 8.7, failureDemandPct: 19.2 } },
    { domain: 'ילד נכה', total: 4600, sources: { mipatz: 2000, kashab: 1800, kashar: 800 }, painIndex: 8.7, failureDemandPct: 18.2, topIssue: 'דחיית בקשות ללא הנמקה', trend: { direction: 'up', change: 5 }, previousMonth: { total: 4380, painIndex: 8.5, failureDemandPct: 17.4 } },
    { domain: 'נפגעי עבודה', total: 7200, sources: { mipatz: 2800, kashab: 3200, kashar: 1200 }, painIndex: 7.4, failureDemandPct: 12.8, topIssue: 'חוסר בהירות בטפסי תביעה', trend: { direction: 'down', change: 8 }, previousMonth: { total: 7830, painIndex: 7.9, failureDemandPct: 14.1 } },
    { domain: 'זקנה ושאירים', total: 15400, sources: { mipatz: 6200, kashab: 7000, kashar: 2200 }, painIndex: 6.8, failureDemandPct: 11.2, topIssue: 'בעיות עדכון פרטי בנק', trend: { direction: 'stable', change: 1 }, previousMonth: { total: 15250, painIndex: 6.7, failureDemandPct: 11.0 } },
    { domain: 'סיעוד', total: 9800, sources: { mipatz: 4200, kashab: 3800, kashar: 1800 }, painIndex: 8.9, failureDemandPct: 22.6, topIssue: 'המתנה ארוכה לביקור הערכה', trend: { direction: 'up', change: 23 }, previousMonth: { total: 7970, painIndex: 8.4, failureDemandPct: 19.8 } },
    { domain: 'הבטחת הכנסה', total: 6300, sources: { mipatz: 2500, kashab: 2800, kashar: 1000 }, painIndex: 8.3, failureDemandPct: 19.7, topIssue: 'קיזוזים לא מוסברים', trend: { direction: 'up', change: 4 }, previousMonth: { total: 6050, painIndex: 8.1, failureDemandPct: 18.9 } },
    { domain: 'איבה', total: 2100, sources: { mipatz: 800, kashab: 900, kashar: 400 }, painIndex: 7.1, failureDemandPct: 8.4, topIssue: 'עיכוב באישור סטטוס', trend: { direction: 'stable', change: 3 }, previousMonth: { total: 2040, painIndex: 7.0, failureDemandPct: 8.2 } },
    { domain: 'שיקום', total: 3200, sources: { mipatz: 1100, kashab: 1500, kashar: 600 }, painIndex: 6.5, failureDemandPct: 10.1, topIssue: 'מיעוט ספקי שירות באזורי פריפריה', trend: { direction: 'stable', change: 1 }, previousMonth: { total: 3170, painIndex: 6.5, failureDemandPct: 10.0 } },
    { domain: 'ילדים', total: 3490, sources: { mipatz: 1200, kashab: 1600, kashar: 690 }, painIndex: 4.2, failureDemandPct: 5.8, topIssue: 'עדכון פרטי חשבון לאחר גירושין', trend: { direction: 'down', change: 3 }, previousMonth: { total: 3600, painIndex: 4.4, failureDemandPct: 6.1 } },
  ],
}

export const insights: Insight[] = [
  {
    id: 'ins-001',
    title: 'אפקט טופס 100 — כשל סנכרון לשכת התעסוקה',
    domain: 'אבטלה',
    severity: 'critical',
    sources: { mipatz: 1300, kashab: 1800, kashar: 378 },
    volume: 3478,
    failureDemandPct: 40.4,
    rootCause: 'כשל סנכרון ממשק לשכת התעסוקה',
    rootCausePct: 40.4,
    citizenVoice: 'הוציאו אותי לחל״ת, עדכנתי בלשכה, פתאום אני מגלה שקוזז לי התשלום ואומרים לי לשלוח שוב עם קוד סודי. אני אב ל-2 בלי משכורת!',
    owner: 'ראש תחום אבטלה',
    nextAction: 'שליחת SMS הבהרה פרואקטיבי ל-1,200 אזרחים ומעסיקים',
    actionButtonText: 'אשר ושגר קמפיין SMS',
    affectedCount: 1200,
  },
  {
    id: 'ins-002',
    title: 'חסם קוד סודי — סגירת פניות פיקטיבית',
    domain: 'אבטלה',
    severity: 'high',
    sources: { mipatz: 700, kashab: 1003, kashar: 200 },
    volume: 1903,
    failureDemandPct: 22.1,
    rootCause: 'חסם שירות: חסימת אזרחים בגלל טעות בקוד סודי',
    rootCausePct: 22.1,
    citizenVoice: 'כבר שלושה שבועות שאני מנסה להיכנס לאזור האישי. אומרים לי שהקוד לא תקין. הלכתי לסניף, אמרו לי לנסות שוב מחר. אין לי כוח יותר.',
    owner: 'מנהל מוקד ארצי',
    nextAction: 'פתיחה מחדש של 206 פניות שנסגרו ללא מענה והעברה לבקרת איכות',
    actionButtonText: 'העבר לטיפול ממוקד',
    affectedCount: 206,
  },
  {
    id: 'ins-003',
    title: 'עיכוב בוועדות רפואיות — צוואר בקבוק קריטי',
    domain: 'נכות כללית',
    severity: 'critical',
    sources: { mipatz: 2100, kashab: 1800, kashar: 840 },
    volume: 4740,
    failureDemandPct: 21.4,
    rootCause: 'חוסר בוועדות רפואיות ותורים ארוכים (ממוצע 4.5 חודשים)',
    rootCausePct: 37.0,
    citizenVoice: 'כבר 5 חודשים שאני ממתין לוועדה רפואית. אין לי הכנסה, אני חי על חסד של המשפחה. כל פעם שמתקשר אומרים "תמתין, אין תורים".',
    owner: 'מנהלת אגף נכות',
    nextAction: 'הקמת 3 ועדות רפואיות נוספות באזור המרכז',
    actionButtonText: 'העבר לאישור סמנכ"ל',
    affectedCount: 3200,
  },
  {
    id: 'ins-004',
    title: 'המתנה ארוכה לביקור הערכת סיעוד',
    domain: 'סיעוד',
    severity: 'critical',
    sources: { mipatz: 1800, kashab: 1500, kashar: 700 },
    volume: 4000,
    failureDemandPct: 22.6,
    rootCause: 'מחסור במעריכים מוסמכים — ממוצע 8 שבועות המתנה',
    rootCausePct: 40.8,
    citizenVoice: 'אמא שלי בת 87 לא יכולה לזוז. הגשנו בקשה לפני חודשיים ואף אחד לא בא. כל יום אני לוקחת חופש מהעבודה כדי לטפל בה.',
    owner: 'מנהלת אגף סיעוד',
    nextAction: 'גיוס 12 מעריכים חדשים + הפעלת מנגנון מעריך-על-גלגלים',
    actionButtonText: 'אשר תוכנית גיוס',
    affectedCount: 2800,
  },
  {
    id: 'ins-005',
    title: 'קיזוזים לא מוסברים בהבטחת הכנסה',
    domain: 'הבטחת הכנסה',
    severity: 'high',
    sources: { mipatz: 900, kashab: 1100, kashar: 440 },
    volume: 2440,
    failureDemandPct: 19.7,
    rootCause: 'הודעות קיזוז ללא הסבר מילולי — האזרח לא מבין למה קוצצה הגמלה',
    rootCausePct: 38.7,
    citizenVoice: 'קיבלתי הודעה שקיזזו לי 800 שקל מהגמלה. אין שום הסבר למה. התקשרתי 4 פעמים ואף אחד לא יודע להגיד.',
    owner: 'ראש תחום הבטחת הכנסה',
    nextAction: 'שליחת מכתב הסבר מפורט ל-1,400 מקבלי קיזוז',
    actionButtonText: 'אשר שליחת הסברים',
    affectedCount: 1400,
  },
  {
    id: 'ins-006',
    title: 'דחיית בקשות ילד נכה ללא הנמקה מספקת',
    domain: 'ילד נכה',
    severity: 'high',
    sources: { mipatz: 750, kashab: 600, kashar: 280 },
    volume: 1630,
    failureDemandPct: 18.2,
    rootCause: 'מכתבי דחייה גנריים ללא התייחסות למסמכים שהוגשו',
    rootCausePct: 35.4,
    citizenVoice: 'דחו את הבקשה של הבן שלי בלי להסביר למה. הגשנו את כל המסמכים מהרופא. עכשיו צריך לערער ולחכות עוד חצי שנה?',
    owner: 'ראש תחום ילד נכה',
    nextAction: 'עדכון תבנית מכתבי דחייה עם הנמקה פרטנית',
    actionButtonText: 'העבר לצוות תוכן',
    affectedCount: 840,
  },
  {
    id: 'ins-007',
    title: 'עיכוב בתשלום תגמולי מילואים',
    domain: 'מילואים',
    severity: 'medium',
    sources: { mipatz: 500, kashab: 800, kashar: 300 },
    volume: 1600,
    failureDemandPct: 9.5,
    rootCause: 'עיכוב בקבלת אישורי שירות מצה"ל — ממוצע 3 שבועות',
    rootCausePct: 38.1,
    citizenVoice: 'שירתתי 45 יום מילואים וכבר חודשיים לא קיבלתי תשלום. המעסיק לא משלם כי הוא מחכה לביטוח לאומי. אני בין הפטיש לסדן.',
    owner: 'ראש תחום מילואים',
    nextAction: 'הקמת ממשק אוטומטי לקבלת אישורי שירות מצה"ל',
    actionButtonText: 'אשר פרויקט ממשק',
    affectedCount: 600,
  },
  {
    id: 'ins-008',
    title: 'בעיות עדכון פרטי בנק — זקנה ושאירים',
    domain: 'זקנה ושאירים',
    severity: 'medium',
    sources: { mipatz: 2200, kashab: 2500, kashar: 800 },
    volume: 5500,
    failureDemandPct: 11.2,
    rootCause: 'מערכת עדכון פרטי בנק מקוונת לא נגישה לאוכלוסייה מבוגרת',
    rootCausePct: 35.7,
    citizenVoice: 'אני בן 82 ואומרים לי לעדכן פרטי בנק באינטרנט. אין לי מחשב ואין לי מי שיעזור. הלכתי לסניף ואמרו שסגור ליום קבלה.',
    owner: 'מנהלת אגף זקנה ושאירים',
    nextAction: 'הפעלת קו ייעודי לעדכון פרטי בנק בטלפון + שליחת טופס בדואר',
    actionButtonText: 'אשר הפעלת קו',
    affectedCount: 4200,
  },
  {
    id: 'ins-009',
    title: 'חוסר בהירות בטפסי תביעה — נפגעי עבודה',
    domain: 'נפגעי עבודה',
    severity: 'medium',
    sources: { mipatz: 1000, kashab: 1200, kashar: 400 },
    volume: 2600,
    failureDemandPct: 12.8,
    rootCause: 'טפסי תביעה מורכבים מדי — 60% מהטפסים מוגשים עם שגיאות',
    rootCausePct: 36.1,
    citizenVoice: 'נפלתי בעבודה ושברתי את היד. מילאתי את הטופס אבל דחו אותו בגלל "חוסר פרטים". אף אחד לא הסביר לי מה חסר.',
    owner: 'ראש תחום נפגעי עבודה',
    nextAction: 'עיצוב מחדש של טופס תביעה עם הנחיות מילוי מובנות',
    actionButtonText: 'העבר לצוות UX',
    affectedCount: 1560,
  },
  {
    id: 'ins-010',
    title: 'אי-עדכון פרטי חשבון — מזונות',
    domain: 'מזונות',
    severity: 'medium',
    sources: { mipatz: 500, kashab: 600, kashar: 200 },
    volume: 1300,
    failureDemandPct: 15.3,
    rootCause: 'אזרחים לא מעדכנים שינוי כתובת/חשבון — תשלום חוזר',
    rootCausePct: 41.9,
    citizenVoice: 'עברתי דירה לפני 3 חודשים ולא ידעתי שצריך לעדכן. עכשיו אומרים שהכסף הלך לחשבון הישן ולא יכולים לשחזר.',
    owner: 'ראש תחום מזונות',
    nextAction: 'שליחת תזכורת SMS רבעונית לעדכון פרטים',
    actionButtonText: 'אשר קמפיין תזכורות',
    affectedCount: 470,
  },
  {
    id: 'ins-011',
    title: 'מיעוט ספקי שירות באזורי פריפריה — שיקום',
    domain: 'שיקום',
    severity: 'low',
    sources: { mipatz: 400, kashab: 500, kashar: 200 },
    volume: 1100,
    failureDemandPct: 10.1,
    rootCause: 'חוסר בספקי שיקום מוכרים בנגב ובגליל — אזרחים נוסעים 2+ שעות',
    rootCausePct: 32.7,
    citizenVoice: 'אני גר בערד ואומרים לי שהמרפאה הקרובה שמוכרת לביטוח לאומי היא בבאר שבע. אני נכה 60%, איך אני אגיע לשם כל שבוע?',
    owner: 'ראש תחום שיקום',
    nextAction: 'מכרז לגיוס ספקי שיקום בפריפריה',
    actionButtonText: 'פתח מכרז',
    affectedCount: 320,
  },
  {
    id: 'ins-012',
    title: 'עיכוב באישור סטטוס — איבה',
    domain: 'איבה',
    severity: 'medium',
    sources: { mipatz: 300, kashab: 350, kashar: 150 },
    volume: 800,
    failureDemandPct: 8.4,
    rootCause: 'תהליך הכרה ממושך — ממוצע 6 חודשים עד אישור',
    rootCausePct: 37.5,
    citizenVoice: 'נפצעתי באירוע איבה לפני 8 חודשים ועדיין לא הכירו בי. אני לא עובד, אין לי הכנסה, אין לי כלום.',
    owner: 'ראש תחום איבה',
    nextAction: 'יצירת מסלול מזורז לפניות עם אישור רפואי ראשוני',
    actionButtonText: 'אשר מסלול מזורז',
    affectedCount: 180,
  },
]

export const proactiveActions: ProactiveAction[] = [
  {
    id: 'act-001',
    description: 'זוהו 1,200 אזרחים שנפגעו מדיווח שגוי של המעסיק. האם לשלוח להם ולמעסיק SMS הבהרה פרואקטיבי?',
    buttonText: 'אשר ושגר קמפיין SMS',
    affectedCount: 1200,
    severity: 'critical',
    status: 'pending',
    domain: 'אבטלה',
  },
  {
    id: 'act-002',
    description: 'זוהו 206 פניות שנסגרו ללא מענה (קוד 026). האם לפתוח מחדש ולהעביר לבקרת איכות?',
    buttonText: 'העבר לטיפול ממוקד',
    affectedCount: 206,
    severity: 'high',
    status: 'pending',
    domain: 'אבטלה',
  },
  {
    id: 'act-003',
    description: 'זוהו 3,200 אזרחים הממתינים מעל 4 חודשים לוועדה רפואית. האם לפתוח ועדות חירום?',
    buttonText: 'אשר ועדות חירום',
    affectedCount: 3200,
    severity: 'critical',
    status: 'pending',
    domain: 'נכות כללית',
  },
  {
    id: 'act-004',
    description: 'זוהו 2,800 מבקשי סיעוד הממתינים מעל 8 שבועות לביקור הערכה. האם להפעיל מעריכים ניידים?',
    buttonText: 'אשר תוכנית מעריכים',
    affectedCount: 2800,
    severity: 'critical',
    status: 'pending',
    domain: 'סיעוד',
  },
  {
    id: 'act-005',
    description: 'זוהו 1,400 מקבלי הבטחת הכנסה שקיבלו קיזוז ללא הסבר. האם לשלוח מכתב הסבר?',
    buttonText: 'אשר שליחת הסברים',
    affectedCount: 1400,
    severity: 'high',
    status: 'pending',
    domain: 'הבטחת הכנסה',
  },
]

export const dataSources: DataSource[] = [
  {
    name: 'שיחות קשב (קול)',
    type: 'voice',
    source: 'קש"ב',
    status: 'connected',
    freshness: 'יומי',
    confidence: 94,
    owner: 'צוות BI',
    fields: ['תמלול', 'סנטימנט', 'נושא', 'אגף', 'משך', 'נציג'],
  },
  {
    name: 'מפ"צים (טקסט)',
    type: 'text',
    source: 'מפ"צ',
    status: 'connected',
    freshness: 'יומי',
    confidence: 97,
    owner: 'צוות BI',
    fields: ['תוכן', 'קטגוריה', 'סטטוס', 'תאריך', 'אגף', 'חומרה'],
  },
  {
    name: 'CRM מוקד (קש"ר)',
    type: 'system',
    source: 'קש"ר',
    status: 'pending',
    freshness: 'שבועי',
    confidence: 78,
    owner: 'IT מרכזי',
    fields: ['קוד סגירה', 'זמן טיפול', 'נציג', 'חזרות', 'סטטוס'],
  },
  {
    name: 'ממשק לשכת התעסוקה',
    type: 'system',
    source: 'קש"ר',
    status: 'planned',
    freshness: 'טרם מחובר',
    confidence: 0,
    owner: 'אגף טכנולוגיות',
    fields: ['סטטוס תעסוקה', 'תאריך עדכון', 'קוד מעסיק'],
  },
]

// Utility functions
export function getSourceTotal(s: SourceBreakdown): number {
  return s.mipatz + s.kashab + s.kashar
}

export function formatSourceBreakdown(s: SourceBreakdown): string {
  return `מפ"צ: ${s.mipatz.toLocaleString()} | קש"ב: ${s.kashab.toLocaleString()} | קש"ר: ${s.kashar.toLocaleString()}`
}
