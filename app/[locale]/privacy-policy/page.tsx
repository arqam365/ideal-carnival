import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { PageHero } from '@/components/section-primitives'

export const metadata: Metadata = {
  title: 'Privacy Policy — EHP Academy',
  description: 'How EHP Academy collects, uses, and protects your personal data in accordance with the Saudi Personal Data Protection Law (PDPL).',
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="space-y-2 text-xs uppercase tracking-luxury text-muted-foreground/60 mb-10">
            <p>Effective date: 1 August 2026</p>
            <p>Last updated: 1 August 2026</p>
          </div>

          <Legal.Section title="1. About This Policy">
            <Legal.P>EHP Academy (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a professional training and consultancy institution headquartered in Riyadh, Kingdom of Saudi Arabia. This Privacy Policy explains how we collect, use, store, and protect personal data you provide when visiting <strong>ehpacademy.com</strong> or contacting us for our services.</Legal.P>
            <Legal.P>We comply with the Saudi Personal Data Protection Law (PDPL), issued by Royal Decree M/19 dated 9/2/1443H, and its implementing regulations.</Legal.P>
          </Legal.Section>

          <Legal.Section title="2. Data We Collect">
            <Legal.P>We collect personal data only when you voluntarily submit it through our contact or enquiry forms. This includes:</Legal.P>
            <Legal.List items={[
              'Full name',
              'Email address',
              'Phone number (if provided)',
              'Organisation or institution name (if provided)',
              'Message content and enquiry details',
            ]} />
            <Legal.P>We do not collect sensitive personal data (as defined under PDPL Article 2) and we do not collect data from individuals under 18 years of age.</Legal.P>
          </Legal.Section>

          <Legal.Section title="3. How We Use Your Data">
            <Legal.P>We use the data you provide solely for the following purposes:</Legal.P>
            <Legal.List items={[
              'Responding to your enquiry or consultation request',
              'Providing information about EHP Academy programmes, services, and events you have expressed interest in',
              'Internal record-keeping and administration',
              'Sending follow-up communications directly related to your enquiry',
            ]} />
            <Legal.P>We do not use your data for automated decision-making or profiling. We do not sell, rent, or trade your personal data to third parties for marketing purposes.</Legal.P>
          </Legal.Section>

          <Legal.Section title="4. Legal Basis for Processing">
            <Legal.P>Under the PDPL, we process your personal data on the following bases:</Legal.P>
            <Legal.List items={[
              'Consent — when you voluntarily submit a contact form or request information',
              'Legitimate interest — to respond to and administer professional enquiries',
              'Contractual necessity — where a training or consultancy engagement is in progress',
            ]} />
          </Legal.Section>

          <Legal.Section title="5. Data Retention">
            <Legal.P>We retain enquiry data for a maximum of three (3) years from the date of last contact, after which it is securely deleted unless a contractual or regulatory obligation requires longer retention. Active client engagement records are retained for the duration of the engagement plus five (5) years in accordance with Saudi commercial law.</Legal.P>
          </Legal.Section>

          <Legal.Section title="6. Third-Party Service Providers">
            <Legal.P>We engage the following third-party processors who may handle your data on our behalf, each under appropriate data processing agreements:</Legal.P>
            <Legal.List items={[
              'Vercel Inc. — website hosting and infrastructure (United States)',
              'Resend Inc. — transactional email delivery (United States)',
              'Neon Inc. — cloud database hosting (United States)',
              'Google LLC — lead data logging via Google Sheets (United States)',
            ]} />
            <Legal.P>Data transferred to processors outside the Kingdom of Saudi Arabia is subject to appropriate safeguards as required under PDPL Chapter 6.</Legal.P>
          </Legal.Section>

          <Legal.Section title="7. Your Rights">
            <Legal.P>Under the PDPL, you have the right to:</Legal.P>
            <Legal.List items={[
              'Be informed of what personal data we hold about you',
              'Access a copy of your personal data',
              'Request correction of inaccurate data',
              'Request deletion of your data where no legitimate basis for retention exists',
              'Object to processing where processing is based on legitimate interest',
              'Withdraw consent at any time without affecting the lawfulness of prior processing',
            ]} />
            <Legal.P>To exercise any of these rights, contact us at <strong>info@ehpacademy.com</strong>. We will respond within 30 days.</Legal.P>
          </Legal.Section>

          <Legal.Section title="8. Data Security">
            <Legal.P>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or disclosure. These include encrypted data transmission (HTTPS/TLS), access controls, and regular security reviews.</Legal.P>
          </Legal.Section>

          <Legal.Section title="9. Cookies">
            <Legal.P>This website uses essential cookies only. Please refer to our <a href="/cookie-policy" className="text-primary underline underline-offset-2 hover:text-gold transition-colors">Cookie Policy</a> for full details.</Legal.P>
          </Legal.Section>

          <Legal.Section title="10. Changes to This Policy">
            <Legal.P>We may update this Privacy Policy from time to time. The effective date at the top of this page will reflect the date of the most recent revision. Continued use of our website after any changes constitutes acceptance of the updated policy.</Legal.P>
          </Legal.Section>

          <Legal.Section title="11. Contact">
            <Legal.P>For any questions, data requests, or concerns regarding this Privacy Policy:</Legal.P>
            <Legal.P>
              <strong>EHP Academy</strong><br />
              Riyadh, Kingdom of Saudi Arabia<br />
              Email: <a href="mailto:info@ehpacademy.com" className="text-primary underline underline-offset-2 hover:text-gold transition-colors">info@ehpacademy.com</a>
            </Legal.P>
          </Legal.Section>

          <p className="mt-12 text-xs text-muted-foreground/50 border-t border-border pt-8">
            This policy is governed by the laws of the Kingdom of Saudi Arabia. In the event of any conflict between language versions, the Arabic version shall prevail.
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
