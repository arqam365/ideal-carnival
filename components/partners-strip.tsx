import { Eyebrow } from '@/components/section-primitives'

const partners = [
  'International Protocol Council',
  'École Hôtelière Alliance',
  'Global Hospitality Institute',
  'Diplomatic Standards Board',
  'Royal Service Guild',
  'Aviation Excellence Network',
]

export function PartnersStrip() {
  return (
    <section className="border-y border-border bg-muted py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>In Partnership With</Eyebrow>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            EHP collaborates with leading international hospitality, protocol,
            and certification bodies to deliver globally benchmarked standards.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex min-h-[6rem] items-center justify-center bg-background px-4 py-6 text-center text-xs font-medium uppercase tracking-luxury text-muted-foreground"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
