import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { PageHero } from '@/components/section-primitives'

export const metadata: Metadata = {
  title: 'Terms & Conditions — EHP Academy',
  description: 'Terms and conditions governing the use of EHP Academy\'s website and professional training services.',
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="space-y-2 text-xs uppercase tracking-luxury text-muted-foreground/60 mb-10">
            <p>Effective date: 1 August 2026</p>
            <p>Last updated: 1 August 2026</p>
          </div>

          <Legal.Section title="1. About EHP Academy">
            <Legal.P>EHP Academy is a professional training and consultancy institution registered and operating in the Kingdom of Saudi Arabia, specialising in etiquette, hospitality, and protocol. These Terms &amp; Conditions govern your use of our website at <strong>ehpacademy.com</strong> and your engagement with our services.</Legal.P>
            <Legal.P>By accessing this website or engaging our services, you agree to be bound by these Terms. If you do not agree, please discontinue use of this website immediately.</Legal.P>
          </Legal.Section>

          <Legal.Section title="2. Use of This Website">
            <Legal.P>You may use this website for lawful purposes only. You agree not to:</Legal.P>
            <Legal.List items={[
              'Use the website in any way that violates applicable Saudi or international law',
              'Transmit unsolicited commercial communications',
              'Attempt to gain unauthorised access to any part of the website or its supporting systems',
              'Introduce malicious code, viruses, or other harmful material',
              'Reproduce, distribute, or commercially exploit any content without prior written consent from EHP Academy',
            ]} />
          </Legal.Section>

          <Legal.Section title="3. Intellectual Property">
            <Legal.P>All content on this website — including text, graphics, logos, images, programme descriptions, and course materials — is the intellectual property of EHP Academy or its licensors and is protected under Saudi intellectual property law.</Legal.P>
            <Legal.P>Nothing on this website shall be construed as granting any licence or right to use any intellectual property without the express written permission of EHP Academy.</Legal.P>
          </Legal.Section>

          <Legal.Section title="4. Training Programmes and Services">
            <Legal.P>Information on this website regarding programmes, curricula, pricing, and availability is provided for guidance only and is subject to change without notice.</Legal.P>
            <Legal.P>All training engagements are subject to a separate service agreement or letter of engagement. Enrolment is confirmed only upon receipt of a signed agreement and, where applicable, payment of the agreed fee.</Legal.P>
            <Legal.P><strong>Cancellations and refunds</strong> are governed by the terms set out in the applicable service agreement. In the absence of a specific agreement, the following defaults apply:</Legal.P>
            <Legal.List items={[
              'Cancellation more than 14 days before programme start: full refund minus an administration fee',
              'Cancellation 7–14 days before programme start: 50% refund',
              'Cancellation less than 7 days before programme start: no refund',
              'EHP Academy reserves the right to reschedule or cancel any programme; in such cases, a full refund or credit will be offered',
            ]} />
          </Legal.Section>

          <Legal.Section title="5. Limitation of Liability">
            <Legal.P>To the maximum extent permitted by applicable Saudi law, EHP Academy shall not be liable for any indirect, incidental, consequential, or punitive damages arising from:</Legal.P>
            <Legal.List items={[
              'Your use of or inability to use this website',
              'Any errors, inaccuracies, or omissions in website content',
              'Unauthorised access to or alteration of your transmissions or data',
              'Any third-party conduct or content',
            ]} />
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
            <Legal.P>
              <strong>EHP Academy</strong><br />
              Riyadh, Kingdom of Saudi Arabia<br />
              Email: <a href="mailto:info@ehpacademy.com" className="text-primary underline underline-offset-2 hover:text-gold transition-colors">info@ehpacademy.com</a>
            </Legal.P>
          </Legal.Section>

          <p className="mt-12 text-xs text-muted-foreground/50 border-t border-border pt-8">
            In the event of any conflict between language versions of these Terms, the Arabic version shall prevail.
          </p>
        </div>
      </section>
    </main>
  )
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
