import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { PageHero } from '@/components/section-primitives'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return locale === 'ar'
    ? { title: 'الشروط والأحكام — أكاديمية EHP', description: 'الشروط والأحكام التي تحكم استخدام موقع أكاديمية EHP والخدمات التدريبية الاحترافية.' }
    : { title: 'Terms & Conditions — EHP Academy', description: "Terms and conditions governing the use of EHP Academy's website and professional training services." }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const ar = locale === 'ar'

  return (
    <main dir={ar ? 'rtl' : 'ltr'}>
      <PageHero eyebrow={ar ? 'قانوني' : 'Legal'} title={ar ? 'الشروط والأحكام' : 'Terms & Conditions'} />
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="space-y-2 text-xs uppercase tracking-luxury text-muted-foreground/60 mb-10">
            <p>{ar ? 'تاريخ السريان: 1 أغسطس 2026' : 'Effective date: 1 August 2026'}</p>
            <p>{ar ? 'آخر تحديث: 1 أغسطس 2026' : 'Last updated: 1 August 2026'}</p>
          </div>

          {ar ? <TermsAr /> : <TermsEn />}

          <p className="mt-12 text-xs text-muted-foreground/50 border-t border-border pt-8">
            {ar
              ? 'في حال وجود تعارض بين النسختين، تسود النسخة العربية.'
              : 'In the event of any conflict between language versions of these Terms, the Arabic version shall prevail.'}
          </p>
        </div>
      </section>
    </main>
  )
}

function TermsEn() {
  return <>
    <Legal.Section title="1. About EHP Academy">
      <Legal.P>EHP Academy is a professional training and consultancy institution registered and operating in the Kingdom of Saudi Arabia, specialising in etiquette, hospitality, and protocol. These Terms &amp; Conditions govern your use of our website at <strong>ehpacademy.com</strong> and your engagement with our services.</Legal.P>
      <Legal.P>By accessing this website or engaging our services, you agree to be bound by these Terms. If you do not agree, please discontinue use of this website immediately.</Legal.P>
    </Legal.Section>
    <Legal.Section title="2. Use of This Website">
      <Legal.P>You may use this website for lawful purposes only. You agree not to:</Legal.P>
      <Legal.List items={['Use the website in any way that violates applicable Saudi or international law','Transmit unsolicited commercial communications','Attempt to gain unauthorised access to any part of the website or its supporting systems','Introduce malicious code, viruses, or other harmful material','Reproduce, distribute, or commercially exploit any content without prior written consent from EHP Academy']} />
    </Legal.Section>
    <Legal.Section title="3. Intellectual Property">
      <Legal.P>All content on this website — including text, graphics, logos, images, programme descriptions, and course materials — is the intellectual property of EHP Academy or its licensors and is protected under Saudi intellectual property law.</Legal.P>
      <Legal.P>Nothing on this website shall be construed as granting any licence or right to use any intellectual property without the express written permission of EHP Academy.</Legal.P>
    </Legal.Section>
    <Legal.Section title="4. Training Programmes and Services">
      <Legal.P>Information on this website regarding programmes, curricula, pricing, and availability is provided for guidance only and is subject to change without notice.</Legal.P>
      <Legal.P>All training engagements are subject to a separate service agreement or letter of engagement. Enrolment is confirmed only upon receipt of a signed agreement and, where applicable, payment of the agreed fee.</Legal.P>
      <Legal.P><strong>Cancellations and refunds</strong> are governed by the terms set out in the applicable service agreement. In the absence of a specific agreement, the following defaults apply:</Legal.P>
      <Legal.List items={['Cancellation more than 14 days before programme start: full refund minus an administration fee','Cancellation 7–14 days before programme start: 50% refund','Cancellation less than 7 days before programme start: no refund','EHP Academy reserves the right to reschedule or cancel any programme; in such cases, a full refund or credit will be offered']} />
    </Legal.Section>
    <Legal.Section title="5. Limitation of Liability">
      <Legal.P>To the maximum extent permitted by applicable Saudi law, EHP Academy shall not be liable for any indirect, incidental, consequential, or punitive damages arising from:</Legal.P>
      <Legal.List items={['Your use of or inability to use this website','Any errors, inaccuracies, or omissions in website content','Unauthorised access to or alteration of your transmissions or data','Any third-party conduct or content']} />
      <Legal.P>EHP Academy&apos;s total liability to you for any direct damages shall not exceed the amount paid by you to EHP Academy in the twelve (12) months preceding the claim.</Legal.P>
    </Legal.Section>
    <Legal.Section title="6. No Warranties">
      <Legal.P>This website and its content are provided &ldquo;as is&rdquo; without warranty of any kind, express or implied. EHP Academy does not warrant that the website will be uninterrupted, error-free, or free of harmful components.</Legal.P>
    </Legal.Section>
    <Legal.Section title="7. Third-Party Links">
      <Legal.P>This website may contain links to third-party websites for reference or convenience. EHP Academy does not endorse, control, or accept responsibility for the content or practices of any linked sites.</Legal.P>
    </Legal.Section>
    <Legal.Section title="8. Confidentiality">
      <Legal.P>Any proprietary materials, methodologies, frameworks, or programme content shared by EHP Academy during a training engagement are confidential and may not be shared, reproduced, or distributed without prior written authorisation.</Legal.P>
    </Legal.Section>
    <Legal.Section title="9. Governing Law and Dispute Resolution">
      <Legal.P>These Terms are governed by the laws of the Kingdom of Saudi Arabia. Any disputes arising from these Terms or your use of this website shall be subject to the exclusive jurisdiction of the competent courts of Riyadh, Kingdom of Saudi Arabia.</Legal.P>
      <Legal.P>EHP Academy encourages resolution of disputes through good-faith negotiation before initiating formal proceedings.</Legal.P>
    </Legal.Section>
    <Legal.Section title="10. Amendments">
      <Legal.P>EHP Academy reserves the right to amend these Terms at any time. The most current version will always be published on this page with the effective date updated accordingly. Your continued use of the website following any amendment constitutes acceptance of the revised Terms.</Legal.P>
    </Legal.Section>
    <Legal.Section title="11. Contact">
      <Legal.P><strong>EHP Academy</strong><br />Riyadh, Kingdom of Saudi Arabia<br />Email: <a href="mailto:info@ehpacademy.com" className="text-primary underline underline-offset-2 hover:text-gold transition-colors">info@ehpacademy.com</a></Legal.P>
    </Legal.Section>
  </>
}

function TermsAr() {
  return <>
    <Legal.Section title="1. حول أكاديمية EHP">
      <Legal.P>أكاديمية EHP مؤسسة مرخَّصة ومُسجَّلة في المملكة العربية السعودية، متخصصة في الآداب العامة والضيافة والبروتوكول. تحكم هذه الشروط والأحكام استخدامك لموقع <strong>ehpacademy.com</strong> وتعاملك مع خدماتنا.</Legal.P>
      <Legal.P>بدخولك إلى هذا الموقع أو تعاملك مع خدماتنا، فإنك تُقرّ بالالتزام بهذه الشروط. إن كنت لا توافق عليها، يُرجى التوقف فوراً عن استخدام الموقع.</Legal.P>
    </Legal.Section>
    <Legal.Section title="2. استخدام الموقع">
      <Legal.P>يُسمح باستخدام هذا الموقع للأغراض المشروعة فحسب. تلتزم بعدم:</Legal.P>
      <Legal.List items={['استخدام الموقع بأي طريقة تنتهك الأنظمة السعودية أو الدولية المعمول بها','إرسال أي اتصالات تجارية غير مرغوب فيها','محاولة الوصول غير المصرَّح به إلى أي جزء من الموقع أو الأنظمة الداعمة له','إدخال شفرات ضارة أو فيروسات أو أي مواد مُلحِقة للضرر','إعادة إنتاج أي محتوى أو توزيعه أو استغلاله تجارياً دون الحصول على إذن كتابي مسبق من أكاديمية EHP']} />
    </Legal.Section>
    <Legal.Section title="3. الملكية الفكرية">
      <Legal.P>جميع محتويات هذا الموقع — بما تشمل النصوص والرسومات والشعارات والصور ووصف البرامج والمواد التدريبية — هي ملك فكري لأكاديمية EHP أو مُرخِّصيها، وتخضع لحماية أنظمة الملكية الفكرية في المملكة العربية السعودية.</Legal.P>
      <Legal.P>لا يُفسَّر أي شيء في هذا الموقع على أنه منحٌ لأي ترخيص أو حق لاستخدام الملكية الفكرية دون الحصول على إذن كتابي صريح من أكاديمية EHP.</Legal.P>
    </Legal.Section>
    <Legal.Section title="4. البرامج التدريبية والخدمات">
      <Legal.P>المعلومات المُدرجة في هذا الموقع بشأن البرامج والمناهج والأسعار والتوافر هي للإرشاد فحسب، وقابلة للتغيير في أي وقت دون إشعار مسبق.</Legal.P>
      <Legal.P>تخضع جميع التعاقدات التدريبية لاتفاقية خدمة أو خطاب تعاقد منفصل. لا يُعدّ التسجيل مؤكَّداً إلا بعد استلام الاتفاقية الموقَّعة وسداد الرسوم المتفق عليها عند الاقتضاء.</Legal.P>
      <Legal.P><strong>الإلغاء واسترداد المبالغ</strong> يخضعان لشروط اتفاقية الخدمة المعمول بها. وفي غياب اتفاقية محددة، تُطبَّق الشروط الافتراضية التالية:</Legal.P>
      <Legal.List items={['الإلغاء قبل أكثر من 14 يوماً من بدء البرنامج: استرداد كامل المبلغ مع خصم رسوم إدارية','الإلغاء قبل 7 إلى 14 يوماً من بدء البرنامج: استرداد 50% من المبلغ','الإلغاء قبل أقل من 7 أيام من بدء البرنامج: لا يُسترد أي مبلغ','تحتفظ أكاديمية EHP بحق إعادة جدولة أي برنامج أو إلغائه؛ وفي هذه الحالة يُعرض الاسترداد الكامل أو رصيد مماثل']} />
    </Legal.Section>
    <Legal.Section title="5. تحديد المسؤولية">
      <Legal.P>بأقصى قدر تُجيزه الأنظمة السعودية المعمول بها، لا تتحمل أكاديمية EHP أي مسؤولية عن أضرار غير مباشرة أو عرضية أو تبعية أو عقابية ناجمة عن:</Legal.P>
      <Legal.List items={['استخدامك للموقع أو عدم تمكّنك من استخدامه','أي أخطاء أو معلومات غير دقيقة أو إغفالات في محتوى الموقع','الوصول غير المصرَّح به إلى بياناتك أو تغييرها','أي تصرفات أو محتوى صادر عن طرف ثالث']} />
      <Legal.P>لا تتجاوز المسؤولية الإجمالية لأكاديمية EHP تجاهك عن الأضرار المباشرة إجمالي المبالغ التي دفعتها للأكاديمية خلال الاثني عشر (12) شهراً السابقة للمطالبة.</Legal.P>
    </Legal.Section>
    <Legal.Section title="6. إخلاء المسؤولية">
      <Legal.P>يُقدَّم هذا الموقع ومحتوياته &quot;كما هو&quot; دون أي ضمانات صريحة أو ضمنية. لا تضمن أكاديمية EHP أن يكون الموقع متاحاً دون انقطاع أو خالياً من الأخطاء أو العناصر الضارة.</Legal.P>
    </Legal.Section>
    <Legal.Section title="7. روابط الأطراف الثالثة">
      <Legal.P>قد يحتوي الموقع على روابط لمواقع خارجية للإرشاد أو التسهيل. لا تُقرّ أكاديمية EHP بهذه المواقع ولا تتحكم بها ولا تتحمل مسؤولية محتواها أو ممارساتها.</Legal.P>
    </Legal.Section>
    <Legal.Section title="8. السرية">
      <Legal.P>تُعدّ أي مواد أو منهجيات أو أطر عمل أو محتوى برامج تُشاركها أكاديمية EHP خلال جلسات التدريب معلومات سرية، ولا يجوز مشاركتها أو إعادة إنتاجها أو توزيعها دون إذن كتابي مسبق.</Legal.P>
    </Legal.Section>
    <Legal.Section title="9. النظام الحاكم وتسوية النزاعات">
      <Legal.P>تخضع هذه الشروط لأنظمة المملكة العربية السعودية. تختص المحاكم المختصة في مدينة الرياض بالفصل في أي نزاعات تنشأ عن هذه الشروط أو استخدام الموقع.</Legal.P>
      <Legal.P>تُشجّع أكاديمية EHP على حل النزاعات عبر التفاوض بحسن نية قبل اللجوء إلى الإجراءات الرسمية.</Legal.P>
    </Legal.Section>
    <Legal.Section title="10. التعديلات">
      <Legal.P>تحتفظ أكاديمية EHP بحق تعديل هذه الشروط في أي وقت. تُنشر النسخة الأحدث دائماً في هذه الصفحة مع تحديث تاريخ السريان. استمرارك في استخدام الموقع بعد أي تعديل يُعدّ قبولاً للشروط المُعدَّلة.</Legal.P>
    </Legal.Section>
    <Legal.Section title="11. التواصل">
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
