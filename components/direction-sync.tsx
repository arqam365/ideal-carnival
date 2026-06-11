'use client'

import { useParams } from 'next/navigation'
import { useLayoutEffect } from 'react'

export function DirectionSync() {
  const params = useParams()
  const locale = params?.locale as string | undefined

  useLayoutEffect(() => {
    if (!locale) return
    const isRtl = locale === 'ar'
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
  }, [locale])

  return null
}
