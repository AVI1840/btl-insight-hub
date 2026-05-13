# BTL Insight Hub — פרומפט שדרוג מקצה לקצה

## מי אתה
אתה מפתח React בכיר עם ניסיון ב-Design Systems ממשלתיים. אתה בונה מערכת תובנות AI למוקד השירות של ביטוח לאומי — פלטפורמה שמנתחת 82,450 פניות אזרחים ב-12 אגפים ומגישה תובנות להנהלה בכירה.

## סטאק טכני
- React 19 + TypeScript strict + Vite 6
- Tailwind CSS 4 (עם `@theme` ב-index.css)
- Lucide React לאייקונים
- פונט Heebo מ-Google Fonts
- SPA — ניווט view-based ב-state, ללא router
- Path alias: `@/` → `src/`
- Build: `tsc -b && vite build --configLoader native`

## מבנה קבצים נוכחי

```
src/
├── App.tsx                    # ניווט ראשי בין 5 views + FeedbackModal
├── index.css                  # Tailwind @theme + אנימציות + הנגשה
├── main.tsx                   # Entry point
├── components/
│   ├── Sidebar.tsx            # סרגל צד — 5 פריטי ניווט + badge התרעות
│   ├── Header.tsx             # כותרת + חיפוש + פרופיל משתמש
│   ├── Briefing.tsx           # סיכום AI + 4 כרטיסי KPI
│   ├── Workbench.tsx          # תובנות פעילות — 12 כרטיסים מתרחבים + סינון אגפים
│   ├── ActionCenter.tsx       # המלצות לפעולה — 5 פעולות עם כפתורי אישור
│   ├── DataReadiness.tsx      # מוכנות דאטה — 4 מקורות מידע
│   ├── ReportsView.tsx        # דוחות אגפים — 12 דוחות + סינון + drill-down
│   ├── AnalyticsView.tsx      # ניתוח מגמות — טבלה ניתנת למיון + הרחבה
│   ├── QueriesView.tsx        # שאל את הדאטה — חיפוש + שאלות מוצעות
│   ├── AlertsView.tsx         # התרעות — 7 התרעות + סינון חומרה
│   └── FeedbackModal.tsx      # משוב פיילוט — שליחה ל-Google Sheets (לא לגעת!)
├── data/
│   ├── insights.ts            # מודל נתונים מרכזי — types + mock data ל-12 אגפים
│   ├── reports.ts             # 12 דוחות חודשיים עם SourceBreakdown
│   ├── queries.ts             # 10 שאלות מוצעות + 6 תשובות mock
│   └── alerts.ts              # 7 התרעות + severityConfig
```

## עיצוב נוכחי — BTL Light Theme

### פלטת צבעים (מוגדרת ב-index.css `@theme`)
| Token | ערך | שימוש |
|-------|-----|-------|
| btl-primary | `#0368b0` | כפתורים, לינקים, אייקונים פעילים |
| btl-dark | `#025a8f` | gradient בלוגו |
| btl-light | `#e8f3ff` | רקע פריט פעיל, badges |
| btl-bg | `#f5f9ff` | רקע כללי של העמוד |
| btl-white | `#ffffff` | רקע כרטיסים |
| btl-text | `#0c3058` | טקסט ראשי |
| btl-text-secondary | `#266794` | טקסט משני |
| btl-text-muted | `#6b8baa` | labels, metadata |
| danger | `#EF4444` | קריטי, שגיאות |
| warning | `#F59E0B` | אזהרות |
| success | `#10B981` | חיובי, מחובר |

### עקרונות עיצוב
- רקע `#f5f9ff`, כרטיסים `#ffffff` עם `border: 1px solid rgba(6,77,173,0.1)`
- Shadow: `0 1px 4px rgba(6,77,173,0.04)` רגיל, `0 2px 12px rgba(6,77,173,0.06)` מורם
- Border radius: `rounded-xl` (12px)
- פילטרים: `rounded-full` pills עם גבול כחול כשפעיל
- טקסט: Heebo, גדלים 10-16px, RTL מלא
- הנגשה: `focus-visible`, `aria-label`, `aria-expanded`, `sr-only`, `prefers-reduced-motion`

---

## משימות שדרוג

### 1. שדרוג ויזואלי — "מ-MVP למוצר SaaS ברמה עולמית"

#### 1.1 Sidebar
- הוסף `border-inline-start: 3px solid #0368b0` לפריט פעיל
- הוסף מספר ליד "דוחות אגפים" שמציג `(12)`
- הוסף divider עדין בין קבוצות ניווט
- הוסף אנימציית transition חלקה בין מצבים

#### 1.2 Header
- הוסף כפתור notification bell עם badge אדום (unread count מ-alerts)
- הוסף dropdown לבחירת תקופה (מרץ / אפריל / מאי) — סטאטי, ללא API

#### 1.3 Briefing — סיכום AI
- הוסף gradient border עדין לכרטיס הסיכום
- הוסף "עודכן לפני 2 שעות" עם tooltip timestamp
- כרטיסי KPI: הוסף חץ מגמה (↑↓) + צבע לפי כיוון
- הוסף hover glow effect עדין לכרטיסי KPI

#### 1.4 Workbench — תובנות פעילות
- סרגל סינון: שנה ל-scrollable horizontal strip עם חצי גלילה בקצוות
- הוסף badge מספרי ליד כל אגף בסינון (מספר תובנות)
- כרטיס סגור: הוסף שורת preview של הכשל השורשי
- הוסף אנימציית expand/collapse חלקה (height transition)
- הוסף כפתור "הצג עוד" אם יש מעל 5 תובנות

#### 1.5 ActionCenter — המלצות לפעולה
- הוסף progress indicator: "2 מתוך 5 אושרו"
- כפתור "אושר" — הוסף micro-animation (CSS only)
- הוסף urgency bar בצד ימין של כל כרטיס לפי חומרה

#### 1.6 DataReadiness
- הוסף progress bar כללי: "2 מתוך 4 מחוברים (50%)"
- כרטיס מחובר: הוסף pulse dot ירוק

---

### 2. שדרוג מסכים קיימים

#### 2.1 ReportsView
- הוסף כרטיס סיכום בראש: סה"כ פניות, ממוצע כאב, ממוצע ביקוש כשל
- הוסף כפתורי "ייצוא PDF" ו-"ייצוא Excel" (disabled, tooltip "בקרוב")
- הוסף סינון לפי מקור (מפ"צ/קש"ב/קש"ר) בנוסף לסינון אגף
- הוסף כפתור "השווה לתקופה קודמת" (disabled, tooltip "בקרוב")

#### 2.2 AnalyticsView
- הוסף heat map מינימלי: grid של 12 אגפים × 3 מקורות, צבע לפי נפח (CSS only)
- הוסף "Top 3 + Bottom 3" cards בראש — אגפים בעייתיים/טובים
- הוסף toggle בין מיון לפי כאב/נפח כ-segmented control
- בהרחבת שורה: הוסף "ציטוט אזרח מייצג" מתוך insights.ts

#### 2.3 QueriesView
- הוסף typing animation לתשובה (typewriter effect, CSS)
- הוסף "העתק תשובה" כפתור עם toast
- הוסף confidence meter ויזואלי (progress bar צבעוני)
- שאלות מוצעות: הוסף קטגוריה (ביצועים / כשלים / מגמות)
- אנימציית loading: skeleton loader במקום נקודה

#### 2.4 AlertsView
- הוסף timeline ויזואלי — קו אנכי שמחבר התרעות לפי תאריך
- הוסף "זמן יחסי": "לפני 3 ימים" במקום תאריך מלא
- הוסף grouping לפי יום: "היום", "אתמול", "השבוע"
- הוסף empty state יפה כשאין התרעות

---

### 3. קומפוננטות משותפות חדשות — src/components/ui/

#### 3.1 StatCard
כרטיס סטטיסטיקה אחיד לכל המסכים:
```typescript
interface StatCardProps {
  label: string
  value: string
  sub?: string
  color?: string
  icon?: LucideIcon
  trend?: { direction: 'up' | 'down' | 'stable'; value: number; positive?: boolean }
  size?: 'sm' | 'md' | 'lg'
}
```

#### 3.2 TrendIndicator
אינדיקטור מגמה קומפקטי:
```typescript
interface TrendIndicatorProps {
  direction: 'up' | 'down' | 'stable'
  value: number        // אחוז שינוי
  positive?: boolean   // true = up=ירוק, false = up=אדום
}
```
- חץ ↑ ירוק/אדום, חץ ↓, קו ישר אפור
- פונט 11px bold

#### 3.3 SourceBreakdownBar
תצוגת stacked bar של חלוקת מקורות:
```typescript
interface SourceBreakdownBarProps {
  sources: SourceBreakdown
  showLabels?: boolean
  showNumbers?: boolean
  size?: 'sm' | 'md' | 'lg'
}
```
- צבעים: מפ"צ=#0368b0, קש"ב=#10B981, קש"ר=#F59E0B
- CSS-only stacked horizontal bar

#### 3.4 EmptyState
```typescript
interface EmptyStateProps {
  icon: LucideIcon
  title: string
  subtitle?: string
  action?: { label: string; onClick: () => void }
}
```

#### 3.5 Skeleton
Skeleton loader component:
```typescript
interface SkeletonProps {
  variant: 'card' | 'text' | 'circle' | 'bar'
  width?: string
  height?: string
  count?: number
}
```

---

### 4. הרחבת מודל נתונים

#### 4.1 הוסף מגמות ל-DomainSummary (insights.ts)
```typescript
// הוסף לממשק DomainSummary:
trend: { direction: 'up' | 'down' | 'stable'; change: number }
previousMonth: { total: number; painIndex: number; failureDemandPct: number }
```
עדכן את mock data עם נתוני מגמה הגיוניים לכל 12 אגפים.

#### 4.2 הוסף ל-Report (reports.ts)
```typescript
// הוסף לממשק Report:
previousPeriod?: { totalVolume: number; painIndex: number; failureDemandPct: number }
recommendations: string[]  // 2-3 המלצות
```
עדכן את 12 הדוחות עם המלצות ונתוני תקופה קודמת.

---

### 5. הנגשה — תקן 5568 + WCAG 2.1 AA

#### ניווט מקלדת
- כל כרטיס מתרחב: `Enter` ו-`Space` פותחים/סוגרים
- Tab order: Sidebar → Header → Content
- Escape סוגר modals
- Arrow keys בתוך Sidebar

#### Screen Reader
- כל section עם `aria-label` תיאורי בעברית
- `aria-live="polite"` על תוצאות חיפוש ושאילתות
- `role="status"` על badges ו-counters
- `aria-describedby` על כרטיסי תובנה

#### ניגודיות
- Contrast ratio מינימלי 4.5:1 לטקסט, 3:1 ל-UI
- אל תסתמך על צבע בלבד — תמיד אייקון+טקסט
- badges חומרה: אייקון ייחודי לכל רמה בנוסף לצבע

#### Responsive
- Sidebar: icons-only ב-< 1280px
- Header search: נסתר ב-< 1024px (נפתח ב-click)
- KPI cards: 2 עמודות ב-< 1024px, 1 ב-< 640px
- טבלת Analytics: גלילה אופקית ב-< 1024px
- Font size מינימלי 14px על מובייל

---

### 6. אנימציות — CSS only

#### Page transitions
- מעבר בין views: fade-in + slide-up (0.3s ease-out)
- Sidebar active item: slide indicator

#### Card interactions
- Hover: shadow elevation + subtle scale(1.005)
- Expand: smooth height animation (max-height transition)
- Approve: ripple effect + status change

#### Data loading
- Skeleton loaders בצורת הכרטיסים (pulse animation)
- כל view: 300ms skeleton → fade to content
- "שאל את הדאטה": typing dots → typewriter text

**כל האנימציות CSS-only.** אין ספריות חיצוניות.

---

## מגבלות

### ❌ לא לעשות
1. לא להוסיף ספריות מעבר לסטאק (לא charts, לא animation libs, לא UI kits)
2. לא לשנות מבנה נתונים קיים — רק להרחיב (backward compatible)
3. לא לשנות תוכן עברי קיים
4. לא לשנות build command
5. לא routing (react-router) — state-based views
6. לא לגעת ב-FeedbackModal.tsx
7. לא גרפים/charts — narrative-based
8. לא לשבור RTL

### ✅ כן לעשות
1. להשתמש בכל Tailwind CSS 4 (@theme, @apply, variants)
2. ליצור sub-components ב-src/components/ui/
3. להוסיף types חדשים ב-src/data/
4. להוסיף CSS animations ב-index.css
5. להשתמש ב-CSS custom properties

---

## Acceptance Criteria

### Build
- `npm run build` ללא שגיאות
- TypeScript strict ללא errors

### Visual
- 5 מסכים מקצועיים ועובדים
- RTL מלא
- עובד ב-1366px ו-1920px
- אנימציות חלקות

### Interaction
- סינון אגפים עובד
- חיפוש בזמן אמת
- אישור פעולות עובד
- שאלות מוצעות מחזירות תשובות
- התרעות — סימון נקרא עובד

### הנגשה
- Tab navigation מלא
- Screen reader labels בעברית
- Focus visible
- prefers-reduced-motion

---

## Verification

1. `npm run build` — 0 errors
2. `npm run dev` — פתח בדפדפן
3. עבור על 5 מסכים
4. בדוק RTL
5. בדוק viewport 1366px
6. בדוק Tab navigation
7. ודא FeedbackModal עובד

---

## עקרון מנחה

> "מנהל בכיר שפותח את המערכת צריך להרגיש שהוא מביט על מוצר SaaS ברמה עולמית — לא על פרויקט ניסיוני. כל פיקסל, כל אנימציה, כל מעבר — ברמת Notion / Linear / Vercel Dashboard."
