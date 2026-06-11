'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const t = useTranslations('contact')
  const [state, setState] = useState<FormState>('idle')

  const enquiryTypes = t.raw('enquiryTypes') as { label: string; body: string }[]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    await new Promise((r) => setTimeout(r, 1200))
    setState('success')
  }

  if (state === 'success') {
    return (
      <div className="border border-gold/30 bg-primary p-10 text-center">
        <span className="font-heading text-3xl text-primary-foreground">Thank you.</span>
        <p className="mt-4 text-base leading-relaxed text-primary-foreground/70">
          Your enquiry has been received. A senior EHP advisor will be in touch within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t('form.yourName')} id="name" type="text" required />
        <Field label={t('form.title')} id="title" type="text" required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t('form.institutionName')} id="institution" type="text" required />
        <Field label="Country" id="country" type="text" required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t('form.email')} id="email" type="email" required />
        <Field label={t('form.phone')} id="phone" type="tel" />
      </div>

      <div>
        <label htmlFor="type" className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
          {t('form.enquiryType')}
        </label>
        <select
          id="type"
          name="type"
          className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>{t('form.selectType')}</option>
          {enquiryTypes.map((o) => (
            <option key={o.label} value={o.label}>{o.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
          {t('form.message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full resize-none border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={state === 'submitting'}
        className={cn(
          'group inline-flex items-center gap-2 bg-primary px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary-foreground transition-colors',
          state === 'submitting' ? 'cursor-wait opacity-70' : 'hover:bg-gold hover:text-gold-foreground',
        )}
      >
        {state === 'submitting' ? '…' : t('form.submit')}
        {state !== 'submitting' && (
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 rtl:group-hover:translate-x-0" />
        )}
      </button>
    </form>
  )
}

function Field({ label, id, type, required }: { label: string; id: string; type: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground">
        {label}
        {required && <span className="ms-1 text-gold">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
      />
    </div>
  )
}
