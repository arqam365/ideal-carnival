import { requireAdmin } from '@/app/admin/auth-guard'
import { BookOpen, FileText, GraduationCap, Users, Briefcase, BarChart2, CheckCircle, AlertCircle, Info } from 'lucide-react'

export default async function GuidePage() {
  await requireAdmin()
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Content Management Guide</h1>
        <p className="mt-2 text-sm text-gray-500">Step-by-step instructions for the EHP Academy team. Keep this page bookmarked.</p>
      </div>

      {/* Quick overview */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { icon: BarChart2, label: 'Dashboard', desc: 'View enquiry leads', href: '/admin' },
          { icon: FileText, label: 'Insights', desc: 'Publish articles', href: '/admin/insights' },
          { icon: GraduationCap, label: 'Programmes', desc: 'Training programmes', href: '/admin/programs' },
          { icon: Users, label: 'Faculty', desc: 'Team profiles', href: '/admin/faculty' },
          { icon: Briefcase, label: 'Case Studies', desc: 'Success stories', href: '/admin/case-studies' },
        ].map(({ icon: Icon, label, desc, href }) => (
          <a key={href} href={href} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:border-[#B8995D] transition-colors">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fdf6ec]">
              <Icon className="h-4 w-4 text-[#B8995D]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{label}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          </a>
        ))}
      </div>

      <hr className="border-gray-200" />

      {/* Section: Insights */}
      <Section icon={FileText} title="Publishing an Insight Article">
        <Note type="info">Insights appear on the <strong>/insights</strong> page. They are thought-leadership articles on protocol, etiquette, and hospitality topics. Aim for 400–1200 words per article.</Note>

        <Steps steps={[
          { n: 1, title: 'Go to Insights → New Article', body: 'Click the gold "New Article" button in the top-right corner of the Insights list.' },
          { n: 2, title: 'Fill in the Title', body: 'Write the full article title. The URL slug is auto-generated from the title — you can edit it in the Slug field. Slugs must be lowercase, hyphen-separated, no spaces (e.g. protocol-soft-power).' },
          { n: 3, title: 'Choose a Category', body: 'Select the most relevant category from the dropdown:\n• Diplomatic Protocol\n• Government Excellence\n• Executive Presence\n• Military Protocol\n• Hospitality Excellence\n• VIP Relations' },
          { n: 4, title: 'Write the Excerpt', body: 'The excerpt is the short preview shown on the insights listing page. Write 1–3 compelling sentences (50–120 words) that summarise the article\'s key argument. This also serves as the SEO description.' },
          { n: 5, title: 'Write the Full Article', body: 'Paste or type the full article content in the "Full Article Content" field. Plain paragraphs work best. The article is displayed on its own page when a reader clicks through.' },
          { n: 6, title: 'Set Read Time and Date', body: 'Enter the estimated read time (e.g. "6 min read") and the publication date. Use the format shown on existing articles.' },
          { n: 7, title: 'Featured toggle', body: 'Only one article should be Featured at a time. The featured article appears prominently at the top of the Insights page with a larger layout. Unfeature the current one before featuring a new one.' },
          { n: 8, title: 'Publish', body: 'Toggle "Published" ON (green). Save Changes. The article appears on the website immediately — no further steps required.' },
        ]} />

        <Note type="warning">If Published is OFF, the article is saved as a Draft and is invisible to website visitors. Use this to prepare articles in advance.</Note>
      </Section>

      <hr className="border-gray-200" />

      {/* Section: Programs */}
      <Section icon={GraduationCap} title="Adding a Training Programme">
        <Note type="info">Programmes appear on the <strong>/programs</strong> page. Each programme has a full detail page with outcomes, modules, and target audience.</Note>

        <Steps steps={[
          { n: 1, title: 'Go to Programmes → New Programme', body: 'Click the gold "New Programme" button.' },
          { n: 2, title: 'Fill in Title and Slug', body: 'Title is the full programme name (e.g. "Executive Dining & Table Protocol"). The slug auto-generates — verify it\'s clean and descriptive.' },
          { n: 3, title: 'Category, Industry, Level, Duration, Format', body: 'Category: the thematic group (e.g. Protocol, Hospitality, Etiquette).\nIndustry: the target sector (e.g. Government, Luxury Hospitality, Military).\nLevel: Foundation / Professional / Advanced / Executive.\nDuration: e.g. "2 days", "4 hours".\nFormat: e.g. "In-person", "Online", "Hybrid".' },
          { n: 4, title: 'Summary', body: 'One paragraph (50–100 words) describing what the programme covers and who it is for.' },
          { n: 5, title: 'Outcomes', body: 'List learning outcomes, one per line. These appear as bullet points on the programme page. Example:\n• Understand the principles of formal dining protocol\n• Conduct multi-course hosted dinners with confidence' },
          { n: 6, title: 'Modules', body: 'List the programme modules, one per line. These show the curriculum structure.' },
          { n: 7, title: 'Audience, Certification, Impact', body: 'Audience: who the programme is designed for.\nCertification: the credential awarded on completion.\nImpact: one sentence on the business/professional outcome.' },
          { n: 8, title: 'Publish', body: 'Toggle Published ON and Save.' },
        ]} />
      </Section>

      <hr className="border-gray-200" />

      {/* Section: Faculty */}
      <Section icon={Users} title="Managing Faculty Profiles">
        <Note type="info">Faculty profiles appear on the <strong>/faculty</strong> page. Only add confirmed faculty members — do not add placeholder or prospective staff.</Note>

        <Steps steps={[
          { n: 1, title: 'Go to Faculty → New Faculty Member', body: 'Click the gold button to create a new profile.' },
          { n: 2, title: 'Name and Title', body: 'Full name (e.g. "Dr. Saud bin Suleiman") and professional title (e.g. "Founder & Chairman").' },
          { n: 3, title: 'Bio', body: 'Write a professional biography (100–250 words). Focus on relevant expertise, career history, and contributions to the field.' },
          { n: 4, title: 'Specialisations', body: 'Enter areas of expertise, one per line. These appear as tags on the profile card. Example:\n• Diplomatic Protocol\n• State Ceremony\n• VIP Guest Management' },
          { n: 5, title: 'Credentials', body: 'List academic or professional credentials, one per line. Example:\n• PhD, University of Paris\n• Certified Protocol Professional (CPP)' },
          { n: 6, title: 'Photo', body: 'Paste the URL of the faculty member\'s professional headshot. The image should be square or portrait format, high resolution. Upload the image to a hosting service (e.g. Cloudinary) and paste the URL here. Minimum 400×400px.' },
          { n: 7, title: 'Sort Order', body: 'Lower numbers appear first. Use 1 for the most senior faculty member, 2 for the next, and so on.' },
          { n: 8, title: 'Save', body: 'Click Save. Faculty profiles are always visible once saved — there is no draft mode for faculty.' },
        ]} />
      </Section>

      <hr className="border-gray-200" />

      {/* Section: Case Studies */}
      <Section icon={Briefcase} title="Publishing a Case Study">
        <Note type="info">Case Studies appear on the <strong>/case-studies</strong> page. They are detailed accounts of EHP Academy engagements. Only publish case studies with explicit client permission.</Note>

        <Steps steps={[
          { n: 1, title: 'Go to Case Studies → New Case Study', body: 'Click the gold "New Case Study" button.' },
          { n: 2, title: 'Sector and Institution', body: 'Sector: the client industry (e.g. "Government", "Luxury Hospitality", "Military").\nInstitution: the client organisation name — only include if client has given permission. Otherwise use a generic descriptor (e.g. "GCC Government Ministry").' },
          { n: 3, title: 'Headline', body: 'A single compelling sentence that describes the engagement outcome.' },
          { n: 4, title: 'Challenge, Assessment, Strategy, Implementation, Transformation', body: 'Each field is a section of the case study narrative. Write 1–3 paragraphs per section. These tell the story of the engagement from problem to result.' },
          { n: 5, title: 'Results', body: 'List measurable outcomes, one per line. Use specific numbers where possible.' },
          { n: 6, title: 'Impact', body: 'One paragraph summarising the broader significance of the engagement.' },
          { n: 7, title: 'Publish', body: 'Toggle Published ON. The case study appears on the website immediately.' },
        ]} />
      </Section>

      <hr className="border-gray-200" />

      {/* Section: Dashboard / Leads */}
      <Section icon={BarChart2} title="Viewing Enquiry Leads">
        <Steps steps={[
          { n: 1, title: 'Go to Dashboard', body: 'The Dashboard is the first page you see after logging in. It shows all enquiries submitted through the website\'s contact form.' },
          { n: 2, title: 'Read the lead details', body: 'Each row shows: name, organisation, email, phone, enquiry type, country, and message. Click any row to expand the full message.' },
          { n: 3, title: 'Follow up', body: 'Respond to leads directly by emailing the enquirer. All leads are also automatically saved to the EHP Academy Google Sheet for tracking.' },
        ]} />
        <Note type="info">Leads are stored in the database and the Google Sheet simultaneously. The Google Sheet is at: <strong>docs.google.com/spreadsheets/d/15X_9a0G…</strong> — share it with team members who need access.</Note>
      </Section>

      <hr className="border-gray-200" />

      {/* What requires developer */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm font-bold text-amber-900">Changes that require the developer</h2>
            <p className="mt-1 text-xs text-amber-700 mb-3">The following changes cannot be made through this admin panel and require a code update:</p>
            <ul className="space-y-1 text-xs text-amber-800">
              {[
                'Homepage hero text, section headings, or body copy',
                'About page content (story, values, timeline, vision, mission)',
                'Contact details (address, phone number)',
                'Navigation menu items',
                'Partnerships page content',
                'Logo or brand colours',
                'Adding new pages',
                'Changing the domain or email settings',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-amber-700">Contact the development team at <strong>connect@revzion.in</strong> for any of the above.</p>
          </div>
        </div>
      </div>

      {/* Image guidelines */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Info className="h-4 w-4 text-[#B8995D]" />
          Image Guidelines
        </h2>
        <ul className="space-y-2 text-xs text-gray-600">
          {[
            'Insights cover images: 16:9 ratio, minimum 1200×675px. Use high-quality professional photography.',
            'Faculty headshots: square or portrait, minimum 400×400px. Professional attire, neutral background preferred.',
            'Use a free image host such as Cloudinary (cloudinary.com) or Uploadcare to get a public URL.',
            'Avoid images with visible branding, watermarks, or identifiable clients without consent.',
            'All images used must be licensed for commercial use or owned by EHP Academy.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-[#B8995D] shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fdf6ec] shrink-0">
          <Icon className="h-5 w-5 text-[#B8995D]" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Steps({ steps }: { steps: { n: number; title: string; body: string }[] }) {
  return (
    <ol className="space-y-4">
      {steps.map(({ n, title, body }) => (
        <li key={n} className="flex gap-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#B8995D] text-xs font-bold text-white mt-0.5">{n}</div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500 whitespace-pre-line">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function Note({ type, children }: { type: 'info' | 'warning'; children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
  }
  return (
    <div className={`rounded-lg border px-4 py-3 text-xs leading-relaxed ${styles[type]}`}>
      {children}
    </div>
  )
}
