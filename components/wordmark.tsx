import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Wordmark({
  className,
  showTagline = false,
}: {
  className?: string
  showTagline?: boolean
}) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <Image
        src="/images/ehp-icon.png"
        alt=""
        width={36}
        height={36}
        className="shrink-0"
        aria-hidden="true"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-xl font-semibold tracking-wide">
          EHP
          <span className="ml-1.5 text-[color:var(--gold)]">Academy</span>
        </span>
        {showTagline ? (
          <span className="mt-1 text-[0.6rem] uppercase tracking-luxury opacity-70">
            Etiquette · Hospitality · Protocol
          </span>
        ) : null}
      </span>
    </span>
  )
}
