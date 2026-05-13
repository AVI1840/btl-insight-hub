import type { Domain, Source } from './insights'

export type AlertSeverity = 'critical' | 'warning' | 'info' | 'positive'

export interface Alert {
  id: string
  severity: AlertSeverity
  title: string
  description: string
  domain: Domain
  source: Source
  timestamp: string
  read: boolean
}

export const alerts: Alert[] = [
  {
    id: 'alrt-001',
    severity: 'critical',
    title: 'קפיצה של 35% בפניות קוד סודי — אבטלה',
    description: 'זוהתה עלייה חדה של 35% בפניות בנושא חסם קוד סודי. 206 פניות נסגרו ללא מענה (קוד 026). נדרשת בדיקה מיידית.',
    domain: 'אבטלה',
    source: 'קש"ב',
    timestamp: '2026-04-28T09:14:00',
    read: false,
  },
  {
    id: 'alrt-002',
    severity: 'critical',
    title: 'סיעוד — עלייה של 23% בפניות חוזרות',
    description: 'בני משפחה מתקשרים שוב ושוב לבדוק סטטוס הערכת סיעוד. 2,800 אזרחים ממתינים מעל 8 שבועות. המגמה מחמירה.',
    domain: 'סיעוד',
    source: 'קש"ב',
    timestamp: '2026-04-27T14:32:00',
    read: false,
  },
  {
    id: 'alrt-003',
    severity: 'warning',
    title: 'נכות כללית — מדד כאב עלה ל-9.1',
    description: 'מדד הכאב של אגף נכות כללית עלה ל-9.1/10 — הגבוה ביותר בארגון. עלייה של 0.4 נקודות ממרץ. ביטויי מצוקה חריפים.',
    domain: 'נכות כללית',
    source: 'מפ"צ',
    timestamp: '2026-04-26T11:05:00',
    read: false,
  },
  {
    id: 'alrt-004',
    severity: 'warning',
    title: 'הבטחת הכנסה — 1,400 קיזוזים ללא הסבר',
    description: 'זוהו 1,400 מקבלי הבטחת הכנסה שקיבלו הודעת קיזוז ללא הנמקה מילולית. צפוי גל פניות.',
    domain: 'הבטחת הכנסה',
    source: 'קש"ר',
    timestamp: '2026-04-25T16:20:00',
    read: true,
  },
  {
    id: 'alrt-005',
    severity: 'positive',
    title: 'מילואים — ירידה של 12% בביקוש כשל',
    description: 'שיפור ממשק צה"ל הוביל לירידה של 12% בביקוש כשל באגף מילואים (מ-10.7% ל-9.5%). מגמה חיובית.',
    domain: 'מילואים',
    source: 'קש"ר',
    timestamp: '2026-04-24T10:45:00',
    read: true,
  },
  {
    id: 'alrt-006',
    severity: 'positive',
    title: 'נפגעי עבודה — שיפור 8% בזמני טיפול',
    description: 'תהליך הייעול שהחל בפברואר מניב תוצאות: ירידה של 8% בזמן טיפול ממוצע. ממוצע נוכחי: 12 דקות.',
    domain: 'נפגעי עבודה',
    source: 'קש"ר',
    timestamp: '2026-04-23T08:30:00',
    read: true,
  },
  {
    id: 'alrt-007',
    severity: 'info',
    title: 'דוח חודשי אפריל מוכן',
    description: 'דוח מנהלים חודשי לאפריל 2026 הופק בהצלחה. 82,450 פניות נותחו ב-12 אגפים. 5 המלצות לפעולה ממתינות לאישור.',
    domain: 'אבטלה',
    source: 'קש"ר',
    timestamp: '2026-05-01T08:00:00',
    read: true,
  },
]

export const severityConfig: Record<AlertSeverity, { color: string; bgColor: string; label: string }> = {
  critical: { color: '#c53030', bgColor: '#fef5f5', label: 'קריטי' },
  warning: { color: '#b7791f', bgColor: '#fefcf3', label: 'אזהרה' },
  info: { color: '#2563a8', bgColor: '#eef4fb', label: 'עדכון' },
  positive: { color: '#276749', bgColor: '#f0fdf4', label: 'שיפור' },
}
