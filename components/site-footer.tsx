import Link from 'next/link'
import { Wordmark } from '@/components/wordmark'
import { solutions, industries } from '@/lib/site-data'

const company = [
  { label: 'About EHP', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Faculty', href: '/faculty' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 border-b border-gold/15 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark className="text-primary-foreground" showTagline />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/60">
              The House of Etiquette, Hospitality &amp; Protocol. Developing
              Saudi Arabia&apos;s next generation of service leaders through
              global standards and Saudi values, in alignment with Vision 2030.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 border border-gold bg-gold px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-luxury text-gold-foreground transition-colors hover:bg-transparent hover:text-gold"
            >
              Request Consultation
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            <FooterColumn title="Solutions" items={solutions.slice(0, 6)} />
            <FooterColumn title="Industries" items={industries.slice(0, 6)} />
            <FooterColumn title="Institution" items={company} />
            <div>
              <h4 className="text-[0.72rem] font-semibold uppercase tracking-luxury text-gold">
                Riyadh
              </h4>
              <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-primary-foreground/60">
                <p>King Fahd Road, Olaya District, Riyadh, Saudi Arabia</p>
                <p>
                  <a
                    href="mailto:engage@ehpacademy.sa"
                    className="hover:text-gold"
                  >
                    engage@ehpacademy.sa
                  </a>
                </p>
                <p>
                  <a href="tel:+966112000000" className="hover:text-gold">
                    +966 11 200 0000
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-primary-foreground/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} EHP Academy. All rights reserved.
          </p>
          <p className="uppercase tracking-luxury">
            Aligned with Saudi Vision 2030
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  items,
}: {
  title: string
  items: { label: string; href: string }[]
}) {
  return (
    <div>
      <h4 className="text-[0.72rem] font-semibold uppercase tracking-luxury text-gold">
        {title}
      </h4>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-primary-foreground/60 transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
