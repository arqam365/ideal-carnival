'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const enquiryOptions = [
  'Institutional Partnership',
  'Programme Enquiry',
  'Executive Coaching',
  'Event Protocol',
  'Other',
]

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    // Simulate submission — wire to your preferred backend
    await new Promise((r) => setTimeout(r, 1200))
    setState('success')
  }

  if (state === 'success') {
    return (
      <div className="border border-gold/30 bg-primary p-10 text-center">
        <span className="font-heading text-3xl text-primary-foreground">
          Thank you.
        </span>
        <p className="mt-4 text-base leading-relaxed text-primary-foreground/70">
          Your enquiry has been received. A senior EHP advisor will be in touch
          within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full Name" id="name" type="text" required placeholder="H.E. Ahmed Al-Rashidi" />
        <Field label="Title / Position" id="title" type="text" required placeholder="Director General" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Institution / Organization" id="institution" type="text" required placeholder="Ministry of Tourism" />
        <Field label="Country" id="country" type="text" required placeholder="Saudi Arabia" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Email Address" id="email" type="email" required placeholder="name@institution.gov.sa" />
        <Field label="Phone Number" id="phone" type="tel" placeholder="+966 5X XXX XXXX" />
      </div>

      <div>
        <label
          htmlFor="type"
          className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground"
        >
          Nature of Enquiry
        </label>
        <select
          id="type"
          name="type"
          className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select an enquiry type
          </option>
          {enquiryOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground"
        >
          Tell us about your requirement
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Please describe your institution's current need, the scale of the engagement, and any timeline considerations."
          className="w-full resize-none border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={state === 'submitting'}
        className={cn(
          'group inline-flex items-center gap-2 bg-primary px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-luxury text-primary-foreground transition-colors',
          state === 'submitting'
            ? 'cursor-wait opacity-70'
            : 'hover:bg-gold hover:text-gold-foreground',
        )}
      >
        {state === 'submitting' ? 'Sending…' : 'Submit Enquiry'}
        {state !== 'submitting' && (
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        )}
      </button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        By submitting this form you agree that EHP Academy may contact you
        regarding your enquiry. All information is treated in strict confidence.
      </p>
    </form>
  )
}

function Field({
  label,
  id,
  type,
  required,
  placeholder,
}: {
  label: string
  id: string
  type: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-luxury text-muted-foreground"
      >
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        placeholder={placeholder}
        className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
      />
    </div>
  )
}
