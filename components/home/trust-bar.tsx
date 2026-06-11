import { getTranslations } from 'next-intl/server'

export async function TrustBar() {
  const t = await getTranslations('home.trust')
  const partners = t.raw('partners') as string[]

  return (
    <div className="border-y border-border bg-background py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="mb-6 text-center text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
          {t('label')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map((p) => (
            <span key={p} className="text-xs font-medium uppercase tracking-widest text-muted-foreground/70">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
