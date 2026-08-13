import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { PageHero } from '@/components/section-primitives'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return locale === 'ar'
    ? { title: 'سياسة ملفات الارتباط — أكاديمية EHP', description: 'كيف تستخدم أكاديمية EHP ملفات الارتباط والتقنيات المماثلة على موقع ehpacademy.com.' }
    : { title: 'Cookie Policy — EHP Academy', description: 'How EHP Academy uses cookies and similar technologies on ehpacademy.com.' }
}

export default async function CookiePolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const ar = locale === 'ar'

  return (
    <main dir={ar ? 'rtl' : 'ltr'}>
      <PageHero eyebrow={ar ? 'قانوني' : 'Legal'} title={ar ? 'سياسة ملفات الارتباط' : 'Cookie Policy'} />
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="space-y-2 text-xs uppercase tracking-luxury text-muted-foreground/60 mb-10">
            <p>{ar ? 'تاريخ السريان: 1 أغسطس 2026' : 'Effective date: 1 August 2026'}</p>
            <p>{ar ? 'آخر تحديث: 1 أغسطس 2026' : 'Last updated: 1 August 2026'}</p>
          </div>

          {ar ? <CookiesAr /> : <CookiesEn />}

          <p className="mt-12 text-xs text-muted-foreground/50 border-t border-border pt-8">
            {ar
              ? 'تخضع هذه السياسة لأنظمة المملكة العربية السعودية.'
              : 'This policy is governed by the laws of the Kingdom of Saudi Arabia.'}
          </p>
        </div>
      </section>
    </main>
  )
}

function CookiesEn() {
  return <>
    <Legal.Section title="1. What Are Cookies">
      <Legal.P>Cookies are small text files placed on your device by a website when you visit it. They are widely used to make websites function efficiently and to provide information to website operators. Cookies cannot execute programs or deliver viruses to your device.</Legal.P>
    </Legal.Section>
    <Legal.Section title="2. Cookies We Use">
      <Legal.P>EHP Academy uses a minimal set of cookies. We do not use advertising cookies, cross-site tracking cookies, or social media cookies.</Legal.P>
      <div className="mt-4 border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-accent text-left">
              <th className="px-4 py-3 font-medium text-primary text-xs uppercase tracking-luxury">Cookie</th>
              <th className="px-4 py-3 font-medium text-primary text-xs uppercase tracking-luxury">Type</th>
              <th className="px-4 py-3 font-medium text-primary text-xs uppercase tracking-luxury">Purpose</th>
              <th className="px-4 py-3 font-medium text-primary text-xs uppercase tracking-luxury">Duration</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground divide-y divide-border">
            <tr>
              <td className="px-4 py-3 font-mono text-xs">ehp_admin</td>
              <td className="px-4 py-3">Essential</td>
              <td className="px-4 py-3">Maintains the authenticated session for the admin panel. Only set when a user logs into the administrative interface — not set for general site visitors.</td>
              <td className="px-4 py-3">8 hours</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">NEXT_LOCALE</td>
              <td className="px-4 py-3">Essential</td>
              <td className="px-4 py-3">Remembers your preferred language (English or Arabic) so the site loads in your chosen language on return visits.</td>
              <td className="px-4 py-3">1 year</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Legal.Section>
    <Legal.Section title="3. Analytics">
      <Legal.P>This website uses <strong>Vercel Analytics</strong>, a privacy-first analytics service that collects aggregated, anonymised usage data (page views, referrers, device type). It does not use cookies and does not track individuals across sessions or websites. No personal data is transmitted to Vercel Analytics.</Legal.P>
    </Legal.Section>
    <Legal.Section title="4. Cookies We Do Not Use">
      <Legal.P>EHP Academy does not use any of the following:</Legal.P>
      <Legal.List items={['Advertising or retargeting cookies (e.g. Google Ads, Meta Pixel)','Social media tracking cookies (e.g. Facebook, LinkedIn, Twitter)','Third-party analytics cookies (e.g. Google Analytics)','Fingerprinting or persistent cross-site tracking technologies']} />
    </Legal.Section>
    <Legal.Section title="5. Managing Cookies">
      <Legal.P>You can control and manage cookies through your browser settings. Most browsers allow you to view, delete, or block cookies. Please note that disabling essential cookies may affect the admin interface. General visitors are not impacted.</Legal.P>
    </Legal.Section>
    <Legal.Section title="6. Changes to This Policy">
      <Legal.P>We may update this Cookie Policy from time to time. Any changes will be reflected on this page with an updated effective date.</Legal.P>
    </Legal.Section>
    <Legal.Section title="7. Contact">
      <Legal.P><strong>EHP Academy</strong><br />Riyadh, Kingdom of Saudi Arabia<br />Email: <a href="mailto:info@ehpacademy.com" className="text-primary underline underline-offset-2 hover:text-gold transition-colors">info@ehpacademy.com</a></Legal.P>
    </Legal.Section>
  </>
}

function CookiesAr() {
  return <>
    <Legal.Section title="1. ما هي ملفات الارتباط؟">
      <Legal.P>ملفات الارتباط (الكوكيز) هي ملفات نصية صغيرة تضعها المواقع الإلكترونية على جهازك عند زيارتها. تُستخدم على نطاق واسع لتشغيل المواقع بكفاءة وتزويد مشغّليها بالمعلومات. لا تستطيع هذه الملفات تنفيذ برامج أو نقل فيروسات إلى جهازك.</Legal.P>
    </Legal.Section>
    <Legal.Section title="2. ملفات الارتباط التي نستخدمها">
      <Legal.P>تستخدم أكاديمية EHP مجموعة محدودة من ملفات الارتباط. ولا نستخدم ملفات ارتباط إعلانية أو ملفات تتبّع عبر المواقع أو ملفات وسائل التواصل الاجتماعي.</Legal.P>
      <div className="mt-4 border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-accent text-right">
              <th className="px-4 py-3 font-medium text-primary text-xs uppercase tracking-luxury">ملف الارتباط</th>
              <th className="px-4 py-3 font-medium text-primary text-xs uppercase tracking-luxury">النوع</th>
              <th className="px-4 py-3 font-medium text-primary text-xs uppercase tracking-luxury">الغرض</th>
              <th className="px-4 py-3 font-medium text-primary text-xs uppercase tracking-luxury">المدة</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground divide-y divide-border">
            <tr>
              <td className="px-4 py-3 font-mono text-xs" dir="ltr">ehp_admin</td>
              <td className="px-4 py-3">أساسي</td>
              <td className="px-4 py-3">يحافظ على جلسة المصادقة للوحة الإدارة. يُعيَّن فحسب عند تسجيل دخول المستخدم إلى واجهة الإدارة، ولا يُعيَّن لزوار الموقع العاديين.</td>
              <td className="px-4 py-3">8 ساعات</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs" dir="ltr">NEXT_LOCALE</td>
              <td className="px-4 py-3">أساسي</td>
              <td className="px-4 py-3">يتذكّر اللغة المفضّلة (العربية أو الإنجليزية) لعرض الموقع بها عند الزيارات اللاحقة.</td>
              <td className="px-4 py-3">سنة واحدة</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Legal.Section>
    <Legal.Section title="3. التحليلات">
      <Legal.P>يستخدم هذا الموقع خدمة <strong>Vercel Analytics</strong>، وهي خدمة تحليلات تُولي الخصوصية الأولوية. تجمع بيانات استخدام إجمالية ومجهولة الهوية (مشاهدات الصفحات، والمصادر، ونوع الجهاز)، ولا تستخدم ملفات الارتباط ولا تتتبّع الأفراد عبر الجلسات أو المواقع. لا تُرسل أي بيانات شخصية إلى Vercel Analytics.</Legal.P>
    </Legal.Section>
    <Legal.Section title="4. ملفات الارتباط التي لا نستخدمها">
      <Legal.P>لا تستخدم أكاديمية EHP أياً مما يلي:</Legal.P>
      <Legal.List items={['ملفات الارتباط الإعلانية أو إعادة الاستهداف (مثل Google Ads أو Meta Pixel)','ملفات ارتباط تتبّع وسائل التواصل الاجتماعي (مثل Facebook أو LinkedIn أو Twitter)','ملفات الارتباط التحليلية الخارجية (مثل Google Analytics)','تقنيات البصمة الرقمية أو التتبّع المستمر عبر المواقع']} />
    </Legal.Section>
    <Legal.Section title="5. إدارة ملفات الارتباط">
      <Legal.P>يمكنك التحكم في ملفات الارتباط وإدارتها من خلال إعدادات متصفحك. لن يؤثر تعطيل ملفات الارتباط على تجربة الزوار العاديين، وقد يؤثر فقط على واجهة الإدارة.</Legal.P>
    </Legal.Section>
    <Legal.Section title="6. تعديلات السياسة">
      <Legal.P>قد نُحدِّث هذه السياسة من وقت لآخر. يعكس تاريخ السريان المُدرج في هذه الصفحة تاريخ آخر مراجعة.</Legal.P>
    </Legal.Section>
    <Legal.Section title="7. التواصل">
      <Legal.P><strong>أكاديمية EHP</strong><br />الرياض، المملكة العربية السعودية<br />البريد الإلكتروني: <a href="mailto:info@ehpacademy.com" className="text-primary underline underline-offset-2 hover:text-gold transition-colors">info@ehpacademy.com</a></Legal.P>
    </Legal.Section>
  </>
}

const Legal = {
  Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div className="mt-10 first:mt-0">
        <h2 className="font-heading text-lg font-medium text-primary mb-4">{title}</h2>
        {children}
      </div>
    )
  },
  P({ children }: { children: React.ReactNode }) {
    return <p className="text-sm leading-relaxed text-muted-foreground mb-3">{children}</p>
  },
  List({ items }: { items: string[] }) {
    return (
      <ul className="list-disc ps-5 space-y-1.5 text-sm text-muted-foreground mb-3">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    )
  },
}
