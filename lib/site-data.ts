export type NavItem = {
  label: string
  href: string
  description?: string
}

export type NavGroup = {
  label: string
  href: string
  columns?: { heading: string; items: NavItem[] }[]
}

export const solutions: NavItem[] = [
  {
    label: 'Government Excellence',
    href: '/solutions#government-excellence',
    description: 'Service standards for ministries and public authorities.',
  },
  {
    label: 'Military Protocol',
    href: '/solutions#military-protocol',
    description: 'Ceremonial precision and command-level conduct.',
  },
  {
    label: 'Executive Presence',
    href: '/solutions#executive-presence',
    description: 'Gravitas, composure, and leadership bearing.',
  },
  {
    label: 'Customer Experience',
    href: '/solutions#customer-experience',
    description: 'Designing memorable, dignified service journeys.',
  },
  {
    label: 'Hospitality Excellence',
    href: '/solutions#hospitality-excellence',
    description: 'World-class standards rooted in Saudi generosity.',
  },
  {
    label: 'Corporate Service Culture',
    href: '/solutions#corporate-service-culture',
    description: 'Embedding excellence across organizations.',
  },
  {
    label: 'International Protocol',
    href: '/solutions#international-protocol',
    description: 'Diplomatic conduct on the global stage.',
  },
]

export const industries: NavItem[] = [
  { label: 'Government', href: '/industries#government' },
  { label: 'Defense', href: '/industries#defense' },
  { label: 'Hospitality', href: '/industries#hospitality' },
  { label: 'Tourism', href: '/industries#tourism' },
  { label: 'Airports', href: '/industries#airports' },
  { label: 'Aviation', href: '/industries#aviation' },
  { label: 'Healthcare', href: '/industries#healthcare' },
  { label: 'Education', href: '/industries#education' },
  { label: 'Financial Services', href: '/industries#financial-services' },
  { label: 'Luxury Retail', href: '/industries#luxury-retail' },
]

export const primaryNav: NavGroup[] = [
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Solutions',
    href: '/solutions',
    columns: [
      { heading: 'Practice Areas', items: solutions.slice(0, 4) },
      { heading: '', items: solutions.slice(4) },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    columns: [
      { heading: 'Sectors We Serve', items: industries.slice(0, 5) },
      { heading: '', items: industries.slice(5) },
    ],
  },
  { label: 'Programs', href: '/programs' },
  { label: 'Faculty', href: '/faculty' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Insights', href: '/insights' },
]
