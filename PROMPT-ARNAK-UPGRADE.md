# שדרוג מקצה לקצה — ארנק זכויות ביטוח לאומי

---

## רקע

כלי "ארנק זכויות" הוא מערכת לאיתור זכויות נלוות עבור מקבלי קצבאות ביטוח לאומי.
הכלי מוצג להנהלה בכירה וצוות מקצועי. יש להפוך אותו מ-MVP למוצר שנראה ומרגיש "מוכן לשירות".

**מצב נוכחי:** React 18 + TS + Vite + Tailwind + shadcn/ui + Framer Motion. 98 זכויות, 15 קצבאות, 8 קטגוריות. יש wizard, דוח, משוב, dark mode.

---

## עקרונות מנחים

1. **ערך ללקוח** — כל אלמנט חייב לשרת את המשתמש, לא להרשים טכנולוגית
2. **מערכת עיצוב BTL** — עמידה מלאה בהנחיות ביטוח לאומי (צבעים, טיפוגרפיה, קומפוננטות)
3. **הנגשה** — תקן ישראלי 5568 + WCAG 2.1 AA (חובה חוקית)
4. **מובייל-ראשון** — רוב משתמשי ביטוח לאומי גולשים מהטלפון
5. **עברית מושלמת** — RTL, ניסוחים ברורים, טון מקצועי-אנושי

---

## 1. עיצוב — מערכת עיצוב ביטוח לאומי

### צבעים
- Primary: `#0368b0` (כחול BTL)
- Dark: `#025a8f`
- Text Primary: `#0c3058`
- Text Secondary: `#266794`
- Background: `#f5f9ff`
- Success: `#10B981`, Warning: `#F59E0B`, Error: `#EF4444`

### טיפוגרפיה
- כותרות: Arial/Rubik Bold, 24px+
- גוף: Arial/Assistant Regular, 16px
- כיוון: RTL עם `dir="rtl" lang="he-IL"`

### קומפוננטות
- כפתורים: primary (#0368b0 → hover #025a8f), secondary (border #0368b0)
- כרטיסים: shadow-sm, border-radius 12px, hover עדין
- Badges: status colors + domain colors
- Inputs: focus ring כחול BTL

### מה לשנות
- [ ] החלפת הצבעים הנוכחיים (navy #1B3A5C → BTL blue #0368b0)
- [ ] עדכון index.css CSS variables
- [ ] עדכון tailwind.config.ts
- [ ] Header — הוספת לוגו מנורה (SVG) בפינה ימנית עליונה
- [ ] Footer — קרדיט "אביעד יצחקי, מינהל גמלאות" + גרסה

---

## 2. חוויית משתמש (UX) — שדרוג תהליך מקצה לקצה

### 2.1 Onboarding
- [ ] מסך פתיחה קצר (3 שניות) עם הסבר "מה הכלי עושה" ב-3 נקודות
- [ ] כפתור "דלג" למשתמשים חוזרים (localStorage flag)
- [ ] Progress indicator ברור: שלב 1 בחירה → שלב 2 מיקוד → שלב 3 תוצאות

### 2.2 בחירת קצבאות (BenefitSelector)
- [ ] חלוקה ויזואלית לקבוצות: אזרח ותיק | נכות | שארים | אחר
- [ ] אנימציית בחירה ברורה (checkmark + גבול כחול)
- [ ] Counter: "בחרת X קצבאות" + הערכה "~Y זכויות רלוונטיות"
- [ ] כפתור "המשך" sticky בתחתית המסך (מובייל)

### 2.3 אשף מיקוד (RefinementWizard)
- [ ] Progress bar עם מספר שאלה / סה"כ
- [ ] הסבר קצר לכל שאלה (למה שואלים + מה זה פותח)
- [ ] כפתור "דלג" לכל שאלה (ברירת מחדל סבירה)
- [ ] אנימציית מעבר חלקה בין שאלות
- [ ] סיכום לפני שליחה: "על סמך הנתונים שהזנת, נמצאו X זכויות"

### 2.4 תצוגת תוצאות
- [ ] כותרת דינמית: "נמצאו X זכויות עבורך" עם אנימציית כניסה
- [ ] StatsBar בולט: סה"כ זכויות | אוטומטיות | דורשות פנייה | חיסכון מוערך
- [ ] תצוגת כרטיסים משופרת:
  - Badge "אוטומטי ✓" בירוק / "דורש פנייה" בכתום
  - ערך מוערך בולט (₪ + תדירות)
  - שם הספק (עירייה/קופ"ח/חברת חשמל)
  - אייקון לפי domain
- [ ] סינון: לפי domain (tabs), לפי סוג (אוטומטי/ידני), חיפוש חופשי
- [ ] מיון: רלוונטיות | ערך כספי | קלות מימוש | פופולריות

### 2.5 פרטי זכות (RightDetailModal)
- [ ] תצוגה מלאה: כותרת, ספק, ערך, פירוט זכאות, אופן מימוש
- [ ] כפתור "העתק למייל" — מכין טקסט מוכן לשליחה
- [ ] כפתור "פתח באתר" — קישור ישיר לספק (אם קיים)
- [ ] הערות ודגשים (אם רלוונטי)
- [ ] Badge "תלוי רשות מקומית" בולט

### 2.6 דוח מסכם (RecommendationReport)
- [ ] עיצוב מקצועי עם header BTL
- [ ] חלוקה: אוטומטיות / דורשות פנייה / תלויות רשות
- [ ] טבלת סיכום: זכות | ספק | ערך | סטטוס
- [ ] Disclaimer בולט
- [ ] ייצוא: PDF מעוצב + Excel + העתקה ללוח
- [ ] "שתף עם עו"ד / עובד סוציאלי" — יצירת קישור

---

## 3. הנגשה — תקן 5568 + WCAG 2.1 AA

### חובה
- [ ] `<html lang="he-IL" dir="rtl">`
- [ ] Skip-to-content link: "דלג לתוכן הראשי"
- [ ] כל אזור אינטראקטיבי — מינימום 44x44px
- [ ] ניגודיות צבע: 4.5:1 טקסט רגיל, 3:1 טקסט גדול
- [ ] Focus visible על כל אלמנט אינטראקטיבי (ring 2px כחול)
- [ ] `aria-live="polite"` על אזור התוצאות (הודעה לקורא מסך כשמתעדכן)
- [ ] Labels מלאים לכל input (לא רק placeholder)
- [ ] Reduced motion: `@media (prefers-reduced-motion: reduce)` — ביטול אנימציות
- [ ] Error messages: aria-describedby + aria-invalid
- [ ] ניווט מקלדת מלא: Tab/Shift+Tab/Enter/Space/Escape

### מומלץ
- [ ] כפתור הגדלת טקסט (A+ / A-)
- [ ] כפתור ניגודיות גבוהה (high contrast mode)
- [ ] הסבר קולי (tooltip) על אייקונים שאינם טקסט

---

## 4. ביצועים ואיכות

- [ ] Lighthouse score: 90+ בכל הקטגוריות
- [ ] First Contentful Paint < 1.5s
- [ ] Lazy loading לקומפוננטות כבדות (RecommendationReport, RightDetailModal)
- [ ] Service Worker לשימוש offline (הזכויות הן סטטיות)
- [ ] Error boundary עם הודעה ידידותית בעברית

---

## 5. פיצ'רים להנהלה (Demo Mode)

### 5.1 דוחות לדוגמה (מוכנים מראש)
- [ ] "אזרח ותיק + השלמת הכנסה" — 22 זכויות, חיסכון ~₪15,000/שנה
- [ ] "נכות כללית 75% + ניידות" — 31 זכויות, חיסכון ~₪25,000/שנה
- [ ] "שארים + הבטחת הכנסה" — 18 זכויות, חיסכון ~₪12,000/שנה
- [ ] כפתור "צפה בדוגמה" בדף הבית שמפעיל תרחיש מוכן

### 5.2 סטטיסטיקות כלי
- [ ] Dashboard קטן (נסתר, נגיש עם ?admin=true):
  - כמות זכויות במאגר: 98
  - כמות קצבאות נתמכות: 15
  - קטגוריות: 8
  - ממוצע זכויות לקצבה
  - כיסוי: % זכויות אוטומטיות vs ידניות
  - סטטיסטיקות משוב (מ-localStorage)

---

## 6. תשתית ובדיקות

- [ ] Unit tests לפונקציות ליבה (getEligibleRights, sortRights)
- [ ] Component tests ל-BenefitSelector, RefinementWizard
- [ ] E2E test: flow מלא — בחירה → מיקוד → תוצאות → דוח
- [ ] Accessibility audit: axe-core + manual keyboard test
- [ ] Build verification: `npm run build` ללא warnings

---

## 7. Mobile-First UX

- [ ] Bottom sheet לבחירת קצבאות (במקום grid גדול)
- [ ] Swipe בין כרטיסי זכויות
- [ ] Floating action button "צור דוח" כשיש תוצאות
- [ ] Safe area padding (notch)
- [ ] Touch feedback על כל כפתור (active state)
- [ ] Font size מינימלי 14px (קריאות בעברית)

---

## 8. Content & Copywriting

- [ ] כל הטקסטים: עברית תקנית, טון מקצועי-אנושי, משפטים קצרים
- [ ] CTA ברור: "גלה את הזכויות שלך" (לא "התחל")
- [ ] Empty states: הודעות מעודדות ("לא מצאנו? נסה להוסיף קצבה")
- [ ] Tooltips: הסבר קצר על כל מושג מקצועי
- [ ] Disclaimer: נוסח משפטי מדויק, בולט אך לא מפחיד

---

## אילוצים חשובים

- **אל תשנה** את rightsDatabase.ts (הנתונים מאומתים)
- **אל תשנה** קרדיט "אביעד יצחקי, מינהל גמלאות"
- **אל תשבור** את RefinementWizard (הלוגיקה עובדת)
- שמור על הסטאק הנוכחי (React + Vite + Tailwind + shadcn)
- בדוק build תקין אחרי כל שינוי

---

## סדר עדיפויות

1. 🔴 עיצוב BTL + הנגשה (חובה חוקית + ויזואלי להנהלה)
2. 🟠 UX flow + mobile (חוויה חלקה בהדגמה)
3. 🟡 דוחות לדוגמה + demo mode (להנהלה)
4. 🟢 ביצועים + בדיקות (שקט נפשי)

---

## Verification

- Run `npm run build` — no errors
- Test in browser: full flow (select benefits → wizard → results → report)
- Test mobile viewport (375px width)
- Run axe accessibility audit in DevTools
- Verify RTL layout correct throughout
- Check color contrast with WebAIM contrast checker
