export function TrustBar() {
  const partners = [
    'Ministry of Hospitality',
    'General Authority of Civil Aviation',
    'Saudi Tourism Authority',
    'Saudi Railways',
    'Royal Commission for AlUla',
    'King Abdulaziz International Airport',
    'Diriyah Gate Development Authority',
  ]

  return (
    <div className="border-y border-border bg-background py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="mb-6 text-center text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
          Trusted by leading Saudi institutions
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map((p) => (
            <span
              key={p}
              className="text-xs font-medium uppercase tracking-widest text-muted-foreground/70"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
