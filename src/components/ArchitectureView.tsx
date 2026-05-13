import { Cloud, Shield, Database, Cpu, ArrowRight, Server, Lock, Zap, Globe, Layers } from 'lucide-react'

export function ArchitectureView() {
  return (
    <div className="animate-in w-full max-w-[1100px]">
      {/* Header */}
      <div className="card-premium mb-5 animate-in-d1" style={{ padding: '22px 24px' }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ff9900, #ff6600)' }}>
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold" style={{ color: '#1a2332' }}>ארכיטקטורת מערכת — AWS Cloud</h2>
            <p className="text-[11px]" style={{ color: '#8a9bb0' }}>On-Premise Ready · רובד 3 · ISO 27001 · SOC2</p>
          </div>
        </div>
        <p className="text-[11px] leading-relaxed" style={{ color: '#4a5c6f' }}>
          המערכת מתוכננת לפריסה בענן פרטי (VPC מבודד) בתוך תשתית AWS Gov-Cloud של ביטוח לאומי.
          אין יציאת מידע מהארגון — כל העיבוד מתבצע בתוך הרשת הפנימית.
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="card-premium mb-5 animate-in-d2" style={{ padding: '24px' }}>
        <div className="flex items-center gap-2 mb-5">
          <Layers className="w-4 h-4" style={{ color: '#1a6fb5' }} />
          <span className="text-[12px] font-bold" style={{ color: '#1a2332' }}>דיאגרמת ארכיטקטורה</span>
        </div>

        {/* Visual Architecture */}
        <div className="space-y-4">
          {/* Layer 1: Data Sources */}
          <ArchLayer
            title="שכבת מקורות מידע"
            color="#27864a"
            items={[
              { icon: '📞', label: 'Verint — שיחות קוליות', sub: '6.8M דקות/חודש' },
              { icon: '📝', label: 'מפ"צים — פניות כתובות', sub: '42,300/חודש' },
              { icon: '🖥️', label: 'CRM — קש"ר', sub: 'סטטוסים + היסטוריה' },
            ]}
          />

          {/* Arrow */}
          <FlowArrow label="ETL Pipeline — AWS Glue" />

          {/* Layer 2: Processing */}
          <ArchLayer
            title="שכבת עיבוד AI"
            color="#1a6fb5"
            items={[
              { icon: '🧠', label: 'Amazon Bedrock — Claude', sub: 'ניתוח NLP + סנטימנט' },
              { icon: '⚡', label: 'AWS Lambda', sub: 'עיבוד אסינכרוני' },
              { icon: '📊', label: 'Amazon SageMaker', sub: 'מודלים מותאמים' },
            ]}
          />

          {/* Arrow */}
          <FlowArrow label="API Gateway — REST + WebSocket" />

          {/* Layer 3: Application */}
          <ArchLayer
            title="שכבת אפליקציה"
            color="#e67e22"
            items={[
              { icon: '🖥️', label: 'React Dashboard', sub: 'מצפן התובנות הלאומי' },
              { icon: '🤖', label: 'AI Copilot לנציג', sub: 'הצעות בזמן אמת' },
              { icon: '📈', label: 'מנוע דוחות', sub: 'דוחות אוטומטיים + התראות' },
            ]}
          />

          {/* Arrow */}
          <FlowArrow label="CloudFront CDN — HTTPS Only" />

          {/* Layer 4: Users */}
          <ArchLayer
            title="שכבת משתמשים"
            color="#7c3aed"
            items={[
              { icon: '👔', label: 'מנהלי מוקד', sub: 'דשבורד + התראות' },
              { icon: '👨‍💼', label: 'הנהלה בכירה', sub: 'דוחות מנהלים' },
              { icon: '🎧', label: 'נציגי שירות', sub: 'AI Copilot (שלב ב\')' },
            ]}
          />
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5 animate-in-d3">
        <div className="card-premium" style={{ padding: '20px 22px' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#fef5f5' }}>
              <Shield className="w-4 h-4" style={{ color: '#d32f2f' }} />
            </div>
            <span className="text-[12px] font-bold" style={{ color: '#1a2332' }}>אבטחה ופרטיות</span>
          </div>
          <div className="space-y-2.5">
            <SecurityItem icon={<Lock className="w-3.5 h-3.5" />} text="VPC מבודד — אין גישה מהאינטרנט" />
            <SecurityItem icon={<Shield className="w-3.5 h-3.5" />} text="הצפנה AES-256 at rest + TLS 1.3 in transit" />
            <SecurityItem icon={<Database className="w-3.5 h-3.5" />} text="אין שמירת PII — רק מזהים אנונימיים" />
            <SecurityItem icon={<Server className="w-3.5 h-3.5" />} text="On-Premise Ready — פריסה בתוך הארגון" />
            <SecurityItem icon={<Zap className="w-3.5 h-3.5" />} text="Guardrails — מניעת הזיות AI + תשובות לא מורשות" />
          </div>
        </div>

        <div className="card-premium" style={{ padding: '20px 22px' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#edf5fc' }}>
              <Cpu className="w-4 h-4" style={{ color: '#1a6fb5' }} />
            </div>
            <span className="text-[12px] font-bold" style={{ color: '#1a2332' }}>שירותי AWS</span>
          </div>
          <div className="space-y-2.5">
            <AWSService name="Amazon Bedrock" desc="מודלי שפה (Claude) — ניתוח פניות" status="active" />
            <AWSService name="AWS Lambda" desc="עיבוד serverless — אירועים אסינכרוניים" status="active" />
            <AWSService name="Amazon S3" desc="אחסון נתונים מוצפן" status="active" />
            <AWSService name="Amazon RDS" desc="בסיס נתונים — PostgreSQL" status="active" />
            <AWSService name="AWS Glue" desc="ETL Pipeline — טרנספורמציית נתונים" status="planned" />
            <AWSService name="Amazon SageMaker" desc="מודלים מותאמים — חיזוי מגמות" status="planned" />
            <AWSService name="CloudWatch" desc="ניטור + התראות + לוגים" status="active" />
            <AWSService name="AWS WAF" desc="חומת אש אפליקטיבית" status="active" />
          </div>
        </div>
      </div>

      {/* Deployment Timeline */}
      <div className="card-premium animate-in-d4" style={{ padding: '22px 24px' }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #edf5fc, #dbeafe)' }}>
            <Globe className="w-4 h-4" style={{ color: '#1a6fb5' }} />
          </div>
          <span className="text-[12px] font-bold" style={{ color: '#1a2332' }}>תוכנית פריסה — 90 יום</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PhaseCard
            phase="1"
            title="שבועות 1-4"
            subtitle="הקמת תשתית"
            items={['הקמת VPC + IAM', 'חיבור Verint API', 'ETL Pipeline ראשוני', 'דשבורד MVP']}
            color="#27864a"
          />
          <PhaseCard
            phase="2"
            title="שבועות 5-8"
            subtitle="AI + אנליטיקות"
            items={['Bedrock Integration', 'מודל ניתוח פניות', 'מנוע חיזוי', 'דוחות אוטומטיים']}
            color="#1a6fb5"
          />
          <PhaseCard
            phase="3"
            title="שבועות 9-12"
            subtitle="הרחבה + מדידה"
            items={['Copilot לנציג (POC)', 'מדידת ROI', 'אופטימיזציה', 'הכנה להרחבה']}
            color="#7c3aed"
          />
        </div>
      </div>

      {/* Value Proposition — from meeting with Jin */}
      <div className="card-premium animate-in-d5 mt-5" style={{ padding: '22px 24px' }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)' }}>
            <Zap className="w-4 h-4" style={{ color: '#92400e' }} />
          </div>
          <div>
            <span className="text-[12px] font-bold" style={{ color: '#1a2332' }}>ערך מוסף — למה הפתרון הזה?</span>
            <p className="text-[9px]" style={{ color: '#8a9bb0' }}>על בסיס ניתוח 82,450 פניות בחודש</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ValueCard
            icon="🔍"
            title="מבין את ה'למה'"
            desc="לא רק כמה פניות — אלא למה אזרחים חוזרים. זיהוי שורש הבעיה."
            metric="40.4% כשל סנכרון"
          />
          <ValueCard
            icon="🛡️"
            title="Read-Only — אפס סיכון"
            desc="המערכת רק קוראת ומנתחת. לא נוגעת במערכות ליבה. IT לא צריך לאשר."
            metric="0 אינטגרציות כתיבה"
          />
          <ValueCard
            icon="⚡"
            title="ערך תוך שבועות"
            desc="דשבורד תובנות עובד תוך 4 שבועות. לא פרויקט של שנים."
            metric="4 שבועות ל-MVP"
          />
          <ValueCard
            icon="🎯"
            title="מציע — לא מבצע"
            desc="AI מציע פעולה, מנהל מאשר. שקיפות מלאה, אחריות אנושית."
            metric="Human-in-the-loop"
          />
          <ValueCard
            icon="📈"
            title="ROI מדיד"
            desc="כל פעולה שמאושרת — מחושבת ההשפעה. חיסכון שנתי צפוי: ₪505K."
            metric="₪505K/שנה"
          />
          <ValueCard
            icon="🏛️"
            title="On-Premise Ready"
            desc="פריסה בתוך הארגון. אין יציאת מידע. רובד 3. ISO 27001."
            metric="Gov-Cloud Compatible"
          />
        </div>
      </div>
    </div>
  )
}

/* ─── Sub-components ─── */

function ArchLayer({ title, color, items }: { title: string; color: string; items: { icon: string; label: string; sub: string }[] }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${color}20`, background: `${color}04` }}>
      <div className="px-4 py-2.5" style={{ background: `${color}0a`, borderBottom: `1px solid ${color}15` }}>
        <span className="text-[11px] font-bold" style={{ color }}>{title}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-lg" style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <span className="text-[16px]">{item.icon}</span>
            <div>
              <p className="text-[10px] font-semibold" style={{ color: '#1a2332' }}>{item.label}</p>
              <p className="text-[9px]" style={{ color: '#8a9bb0' }}>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #e8ecf0, transparent)' }} />
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: '#f8f9fb', border: '1px solid #e8ecf0' }}>
        <ArrowRight className="w-3 h-3 rotate-90" style={{ color: '#8a9bb0' }} />
        <span className="text-[9px] font-medium" style={{ color: '#8a9bb0' }}>{label}</span>
      </div>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #e8ecf0, transparent)' }} />
    </div>
  )
}

function SecurityItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg" style={{ padding: '8px 12px', background: '#f8f9fb', border: '1px solid #f0f2f5' }}>
      <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ color: '#27864a', background: 'rgba(39,134,74,0.08)' }}>
        {icon}
      </div>
      <span className="text-[10px]" style={{ color: '#1a2332' }}>{text}</span>
    </div>
  )
}

function AWSService({ name, desc, status }: { name: string; desc: string; status: 'active' | 'planned' }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg" style={{ padding: '8px 12px', background: '#f8f9fb', border: '1px solid #f0f2f5' }}>
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: status === 'active' ? '#27864a' : '#e67e22' }} />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold" style={{ color: '#1a2332' }}>{name}</p>
        <p className="text-[9px]" style={{ color: '#8a9bb0' }}>{desc}</p>
      </div>
      <span className="text-[8px] px-2 py-0.5 rounded-full font-medium" style={{
        background: status === 'active' ? '#ecfdf5' : '#fef9f3',
        color: status === 'active' ? '#27864a' : '#e67e22',
      }}>
        {status === 'active' ? 'פעיל' : 'מתוכנן'}
      </span>
    </div>
  )
}

function PhaseCard({ phase, title, subtitle, items, color }: { phase: string; title: string; subtitle: string; items: string[]; color: string }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${color}20` }}>
      <div className="px-4 py-3" style={{ background: `${color}08`, borderBottom: `1px solid ${color}15` }}>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: color }}>
            {phase}
          </span>
          <div>
            <p className="text-[11px] font-bold" style={{ color: '#1a2332' }}>{title}</p>
            <p className="text-[9px]" style={{ color }}>{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
            <span className="text-[10px]" style={{ color: '#4a5c6f' }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ValueCard({ icon, title, desc, metric }: { icon: string; title: string; desc: string; metric: string }) {
  return (
    <div className="rounded-xl" style={{ padding: '16px 18px', background: '#f8f9fb', border: '1px solid #f0f2f5' }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[18px]">{icon}</span>
        <p className="text-[11px] font-bold" style={{ color: '#1a2332' }}>{title}</p>
      </div>
      <p className="text-[10px] leading-relaxed mb-2" style={{ color: '#4a5c6f' }}>{desc}</p>
      <span className="text-[9px] font-semibold px-2.5 py-1 rounded-full" style={{ background: '#edf5fc', color: '#1a6fb5' }}>
        {metric}
      </span>
    </div>
  )
}
