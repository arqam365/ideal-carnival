import { requireAdmin } from '@/app/admin/auth-guard'
import { getSiteConfigRows } from '@/lib/site-config'
import { ContentEditor } from './content-editor'

export const dynamic = 'force-dynamic'

export default async function ContentPage() {
  await requireAdmin()
  const [enRows, arRows] = await Promise.all([
    getSiteConfigRows('en'),
    getSiteConfigRows('ar'),
  ])
  return <ContentEditor enRows={enRows} arRows={arRows} />
}
