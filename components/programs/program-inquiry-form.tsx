'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionHeading } from '@/components/section-primitives'

type State = 'idle' | 'submitting' | 'success' | 'error'

const PROGRAMS = [
  'Diplomatic Protocol',
  'Executive Presence',
  'Military Ceremonial',
  'Hospitality Excellence',
  'Government Service Excellence',
  'Customer Experience Design',
  'International Etiquette',
  'VIP & Royal Guest Handling',
  'Corporate Service Culture',
  'Bespoke Programme',
]

export function ProgramInquiryForm() {
  const t = useTranslations('programs.inquiry')
  const [state, setState] = useState<State>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    const data = { ...Object.fromEntries(new FormData(e.currentTarget)), type: 'Program Inquiry' }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    <section className="bg-background py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <SectionHeading eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
          </div>
          <div className="reveal lg:col-span-6 lg:col-start-7">
            {state === 'success' ? (
              <div className="border border-gold/30 bg-primary p-10 text-center">
                <p className="font-heading text-2xl text-primary-foreground">{t('success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="program" className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
                    {t('programLabel')}
                  </label>
                  <select
                    id="program"
                    name="program"
                    defaultValue=""
                    className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="" disabled>{t('programPlaceholder')}</option>
                    {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label={t('nameLabel')} type="text" required />
                  <Field id="email" label={t('emailLabel')} type="email" required />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="institution" label={t('institutionLabel')} type="text" />
                  <Field id="phone" label={t('phoneLabel')} type="tel" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
                    {t('messageLabel')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full resize-none border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                {state === 'error' && (
                  <p className="text-sm text-destructive">{t('error')}</p>
                )}
                <button
                  type="submit"
                  disabled={state === 'submitting'}
                  className={cn(
                    'group inline-flex items-center gap-2 bg-primary px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary-foreground transition-colors',
                    state === 'submitting' ? 'cursor-wait opacity-70' : 'hover:bg-gold hover:text-gold-foreground',
                  )}
                >
                  {state === 'submitting' ? '…' : t('submit')}
                  {state !== 'submitting' && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, type, required }: { id: string; label: string; type: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
        {label}{required && <span className="ms-1 text-gold">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
      />
    </div>
  )
}
