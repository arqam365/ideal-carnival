import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { db } from '@/lib/db'
import { customPages } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { PageHero } from '@/components/section-primitives'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const [page] = await db.select().from(customPages).where(eq(customPages.slug, slug))
  if (!page || !page.published) return {}
  return { title: locale === 'ar' ? (page.titleAr || page.titleEn) : page.titleEn }
}

export default async function CustomPageRoute({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const ar = locale === 'ar'

  const [page] = await db.select().from(customPages).where(eq(customPages.slug, slug))
  if (!page || !page.published) notFound()

  const title = ar ? (page.titleAr || page.titleEn) : page.titleEn
  const eyebrow = ar ? (page.eyebrowAr || page.eyebrowEn) : page.eyebrowEn
  const content = ar ? (page.contentAr || page.contentEn) : page.contentEn

  const paragraphs = content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)

  return (
    <main dir={ar ? 'rtl' : 'ltr'}>
      <PageHero eyebrow={eyebrow || ''} title={title} />
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-6">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted-foreground">{para}</p>
          ))}
        </div>
      </section>
    </main>
  )
}
