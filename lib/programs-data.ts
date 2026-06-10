export type Program = {
  slug: string
  title: string
  category: string
  industry: string
  level: 'Foundation' | 'Advanced' | 'Executive'
  duration: string
  format: 'In-Person' | 'Hybrid' | 'Residential'
  summary: string
  outcomes: string[]
  audience: string
  modules: string[]
  certification: string
  impact: string
}

export const programs: Program[] = [
  {
    slug: 'protocol-officer-certification',
    title: 'Protocol Officer Certification',
    category: 'International Protocol',
    industry: 'Government',
    level: 'Advanced',
    duration: '5 Days',
    format: 'In-Person',
    summary:
      'A rigorous certification preparing professionals to manage official visits, ceremonies, and diplomatic engagements with precision.',
    outcomes: [
      'Manage precedence, seating, and flag protocol',
      'Orchestrate official visits end to end',
      'Apply diplomatic correspondence standards',
      'Lead ceremonial sequencing with confidence',
    ],
    audience:
      'Protocol staff, chiefs of staff, and official-engagement coordinators.',
    modules: [
      'Foundations of Protocol',
      'Precedence & Seating',
      'Official Visit Management',
      'Ceremonies & Honors',
      'Assessment & Certification',
    ],
    certification: 'EHP Certified Protocol Officer',
    impact:
      'Institutions report markedly more confident, error-free official engagements.',
  },
  {
    slug: 'executive-presence-intensive',
    title: 'Executive Presence Intensive',
    category: 'Executive Presence',
    industry: 'Financial Services',
    level: 'Executive',
    duration: '3 Days',
    format: 'Residential',
    summary:
      'An immersive program developing the gravitas, composure, and communication that define credible leadership.',
    outcomes: [
      'Project authentic authority and poise',
      'Master high-stakes communication',
      'Refine personal conduct and bearing',
      'Navigate cross-cultural executive settings',
    ],
    audience: 'Senior leaders, board members, and high-potential executives.',
    modules: [
      'The Anatomy of Presence',
      'Communication Under Pressure',
      'Conduct & Bearing',
      'Cross-Cultural Leadership',
    ],
    certification: 'EHP Executive Presence Certificate',
    impact: 'Leaders command rooms and represent their institutions with assurance.',
  },
  {
    slug: 'hospitality-excellence-academy',
    title: 'Hospitality Excellence Academy',
    category: 'Hospitality Excellence',
    industry: 'Hospitality',
    level: 'Foundation',
    duration: '10 Days',
    format: 'In-Person',
    summary:
      'A comprehensive program establishing five-star service standards rooted in authentic Saudi hospitality.',
    outcomes: [
      'Deliver flawless five-star service sequences',
      'Handle VIP and royal guests with grace',
      'Apply cultural hosting traditions',
      'Lead banquet and event hospitality',
    ],
    audience: 'Hospitality teams, guest-relations staff, and service managers.',
    modules: [
      'Service Foundations',
      'VIP & Royal Guest Handling',
      'Saudi Hosting Traditions',
      'Banquet & Event Service',
      'Service Recovery',
    ],
    certification: 'EHP Hospitality Excellence Diploma',
    impact: 'Properties achieve consistent, distinctive guest experiences.',
  },
  {
    slug: 'military-protocol-command',
    title: 'Military Protocol & Ceremonial Command',
    category: 'Military Protocol',
    industry: 'Defense',
    level: 'Advanced',
    duration: '4 Days',
    format: 'In-Person',
    summary:
      'Specialized training in ceremonial precision, honors, and command-level protocol for defense institutions.',
    outcomes: [
      'Command ceremonial sequencing and honors',
      'Apply rank precedence and address',
      'Manage visiting delegations',
      'Lead commemorative events',
    ],
    audience: 'Military protocol officers and ceremonial unit leaders.',
    modules: [
      'Ceremonial Foundations',
      'Honors & Precedence',
      'Delegation Protocol',
      'Commemorative Command',
    ],
    certification: 'EHP Military Protocol Certificate',
    impact: 'Defense institutions execute ceremonies with flawless discipline.',
  },
  {
    slug: 'customer-experience-leadership',
    title: 'Customer Experience Leadership',
    category: 'Customer Experience',
    industry: 'Aviation',
    level: 'Advanced',
    duration: '5 Days',
    format: 'Hybrid',
    summary:
      'A program for leaders responsible for designing and sustaining exceptional service journeys.',
    outcomes: [
      'Map journeys and moments of truth',
      'Design service recovery systems',
      'Set frontline behavioral standards',
      'Measure and improve experience',
    ],
    audience: 'CX leaders, service designers, and operations managers.',
    modules: [
      'Experience Strategy',
      'Journey Design',
      'Service Recovery',
      'Measurement & Improvement',
    ],
    certification: 'EHP CX Leadership Certificate',
    impact: 'Organizations lift satisfaction and loyalty measurably.',
  },
  {
    slug: 'government-service-excellence',
    title: 'Government Service Excellence',
    category: 'Government Excellence',
    industry: 'Government',
    level: 'Foundation',
    duration: '6 Days',
    format: 'In-Person',
    summary:
      'Building consistent, dignified public service standards across ministries and authorities.',
    outcomes: [
      'Standardize citizen-experience conduct',
      'Apply official reception protocol',
      'Coordinate inter-ministerial etiquette',
      'Sustain service-culture standards',
    ],
    audience: 'Public-sector service staff and department leaders.',
    modules: [
      'Public Service Foundations',
      'Citizen Experience',
      'Reception Protocol',
      'Culture & Standards',
    ],
    certification: 'EHP Government Service Certificate',
    impact: 'Ministries deliver consistent, trusted public service.',
  },
]

export const programFilters = {
  industry: [
    'All',
    'Government',
    'Defense',
    'Hospitality',
    'Aviation',
    'Financial Services',
  ],
  level: ['All', 'Foundation', 'Advanced', 'Executive'],
  format: ['All', 'In-Person', 'Hybrid', 'Residential'],
}
