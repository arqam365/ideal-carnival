import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/section-primitives'

const partners = [
  { name: 'International Protocol Council', abbr: 'IPC' },
  { name: 'École Hôtelière Alliance', abbr: 'EHA' },
  { name: 'Global Hospitality Institute', abbr: 'GHI' },
  { name: 'Diplomatic Standards Board', abbr: 'DSB' },
  { name: 'Royal Service Guild', abbr: 'RSG' },
  { name: 'Aviation Excellence Network', abbr: 'AEN' },
]

export async function PartnersStrip() {
  const t = await getTranslations('home.partners')

  return (
    <section className="border-y border-border bg-muted py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t('body')}
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex min-h-[7rem] flex-col items-center justify-center gap-2 bg-background px-4 py-6 text-center transition-colors hover:bg-accent"
            >
              <span className="font-heading text-2xl font-medium text-gold/60">
                {partner.abbr}
              </span>
              <span className="text-[0.6rem] font-medium uppercase tracking-luxury text-muted-foreground">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
