import type { Metadata } from 'next'
import { Building2, BookOpen, User, CalendarCheck } from 'lucide-react'
import { PageHero, SectionHeading, Eyebrow } from '@/components/section-primitives'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata: Metadata = {
  title: 'Request a Consultation',
  description:
    'Engage EHP Academy to develop protocol, etiquette, hospitality, and service excellence capabilities for your institution. Contact our advisory team in Riyadh.',
}

const enquiryTypes = [
  {
    label: 'Institutional Partnership',
    body: 'For ministries, commands, and large authorities seeking a strategic development mandate.',
    Icon: Building2,
  },
  {
    label: 'Programme Enquiry',
    body: 'For specific programme delivery — on-site, residential, or bespoke pathway.',
    Icon: BookOpen,
  },
  {
    label: 'Executive Coaching',
    body: 'For individual senior leaders seeking protocol and executive presence development.',
    Icon: User,
  },
  {
    label: 'Event Protocol',
    body: 'For ceremonies, state visits, summits, and formal events requiring protocol support.',
    Icon: CalendarCheck,
  },
]

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Request a Consultation"
        title="Begin a conversation about your institution's excellence"
        intro="Our advisory team works exclusively with institutions — not individuals seeking personal enrichment. Tell us about your mandate and we will design the right engagement."
        image="/images/executive-presence.png"
        imageAlt="EHP Academy advisory consultation"
      />

      {/* Enquiry types */}
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-14">
            <SectionHeading
              eyebrow="How We Engage"
              title="The right conversation starts with clarity"
              intro="EHP engagements take four forms. Understanding your need allows us to bring the right advisors to the conversation from the first meeting."
            />
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {enquiryTypes.map((type, i) => (
              <div
                key={type.label}
                className="reveal flex flex-col gap-5 bg-card p-8"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between">
                  <type.Icon className="size-5 text-gold" strokeWidth={1.5} />
                  <span className="font-mono text-xs text-muted-foreground/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-medium text-primary">
                  {type.label}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {type.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Office */}
      <section className="bg-accent/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="reveal lg:col-span-7">
              <SectionHeading
                eyebrow="Consultation Request"
                title="Tell us about your institution"
                intro="All enquiries are handled in strict confidence by a senior EHP advisor. We typically respond within one business day."
              />
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="reveal space-y-10 pt-2">
                <div>
                  <Eyebrow>Riyadh Office</Eyebrow>
                  <address className="mt-6 space-y-3 text-sm not-italic leading-relaxed text-muted-foreground">
                    <p className="font-medium text-foreground">EHP Academy</p>
                    <p>King Fahd Road, Olaya District</p>
                    <p>Riyadh, Saudi Arabia</p>
                  </address>
                </div>

                <div className="border-t border-border pt-10">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
                    Direct Contact
                  </p>
                  <div className="mt-5 space-y-4 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-luxury text-muted-foreground/70">
                        Enquiries
                      </p>
                      <a
                        href="mailto:engage@ehpacademy.sa"
                        className="mt-1 block font-medium text-primary transition-colors hover:text-gold"
                      >
                        engage@ehpacademy.sa
                      </a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-luxury text-muted-foreground/70">
                        Telephone
                      </p>
                      <a
                        href="tel:+966112000000"
                        className="mt-1 block font-medium text-primary transition-colors hover:text-gold"
                      >
                        +966 11 200 0000
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-10">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
                    Discretion Assured
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    All institutional enquiries and engagement details are held
                    in strict confidence. EHP does not publish client names
                    without explicit authorization.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
