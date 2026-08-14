import Image from 'next/image'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { programs as programsTable } from '@/lib/db/schema'
import { PageHero, SectionHeading } from '@/components/section-primitives'
import { ConsultationCTA } from '@/components/consultation-cta'
import { ProgramCatalog } from '@/components/programs/program-catalog'
import { ProgramInquiryForm } from '@/components/programs/program-inquiry-form'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'programs.meta' })
  return { title: t('title'), description: t('description') }
}

export default async function ProgramsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('programs')

  const modes = t.raw('modes') as { mode: string; desc: string }[]
  const modeImages = ['/images/about-leadership.png', '/images/hospitality.png', '/images/ceremony.png', '/images/executive-presence.png']

  let dbPrograms: typeof programsTable.$inferSelect[] = []
  try { dbPrograms = await db.select().from(programsTable).where(eq(programsTable.published, true)).orderBy(asc(programsTable.sortOrder)) } catch {}
  const catalogPrograms = dbPrograms.map((p) => ({
    id: p.slug,
    title: p.title,
    category: p.category,
    level: p.level as 'Foundation' | 'Professional' | 'Advanced' | 'Executive',
    duration: p.duration,
    format: p.format,
    overview: p.summary,
    outcomes: p.outcomes,
    audience: p.audience,
    modules: p.modules,
    certification: p.certification,
    impact: p.impact,
  }))

  return (
    <main>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        intro={t('hero.intro')}
        image="/images/about-leadership.png"
        imageAlt="EHP Academy programme delivery session"
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 reveal">
            <SectionHeading eyebrow={t('catalogEyebrow')} title={t('catalogTitle')} intro={t('catalogIntro')} />
          </div>
          <ProgramCatalog programs={catalogPrograms.length ? catalogPrograms : undefined} />
        </div>
      </section>

      <section className="bg-accent/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-14">
            <SectionHeading eyebrow={t('deliveryEyebrow')} title={t('deliveryTitle')} />
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {modes.map((item, i) => (
              <div key={item.mode} className="reveal flex flex-col bg-background" style={{ transitionDelay: `${i * 30}ms` }}>
                <div className="relative aspect-[16/9] overflow-hidden bg-accent">
                  <Image src={modeImages[i]} alt={item.mode} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover opacity-70" />
                </div>
                <div className="flex flex-col gap-4 p-8">
                  <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-heading text-xl font-medium text-primary">{item.mode}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProgramInquiryForm />

      <ConsultationCTA title={t('ctaTitle')} body={t('ctaBody')} />
    </main>
  )
}
