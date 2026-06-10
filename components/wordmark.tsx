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
      <svg
        viewBox="0 0 40 40"
        className="size-9 shrink-0"
        aria-hidden="true"
        fill="none"
      >
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="1"
          stroke="currentColor"
          strokeOpacity="0.35"
        />
        <path
          d="M20 6L31 12V20C31 27 26 31.5 20 34C14 31.5 9 27 9 20V12L20 6Z"
          stroke="var(--gold)"
          strokeWidth="1.25"
        />
        <path
          d="M20 13V27M14 20H26"
          stroke="var(--gold)"
          strokeWidth="1.25"
        />
      </svg>
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
