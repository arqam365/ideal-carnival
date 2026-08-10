import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

// NOTE: Run only on a fresh DB or after clearing faculty/programs tables. Uses onConflictDoNothing.
async function seed() {
  console.log('Seeding database...')

  // Insights
  await db.insert(schema.insights).values([
    { slug: 'protocol-soft-power', category: 'Diplomatic Protocol', title: 'Protocol is not ceremony — it is soft power', excerpt: 'How a nation conducts a state visit signals its values to the world more durably than any communiqué. The discipline of protocol is, at its core, a discipline of strategic communication.', readTime: '6 min read', date: 'April 2025', featured: true },
    { slug: 'vision-2030-service-imperative', category: 'Government Excellence', title: 'Vision 2030 and the service imperative: Why conduct is a national competency', excerpt: "As Saudi Arabia positions itself as a global destination for business, tourism, and diplomacy, the quality of human interaction becomes a strategic variable — not a soft skill.", readTime: '8 min read', date: 'March 2025' },
    { slug: 'executive-presence-misunderstood', category: 'Executive Presence', title: 'Executive presence is misunderstood — and that is why it is rarely developed', excerpt: 'Most organisations mistake confidence for presence, and appearance for authority. The truth is more nuanced, more teachable, and more consequential than is commonly understood.', readTime: '5 min read', date: 'February 2025' },
    { slug: 'military-protocol-global-stage', category: 'Military Protocol', title: 'Saudi defense on the global stage: The case for ceremonial precision', excerpt: 'When foreign military delegations visit the Kingdom, the quality of their ceremonial reception is observed and remembered. It reflects command culture more than any formal statement.', readTime: '7 min read', date: 'January 2025' },
    { slug: 'hospitality-culture-not-training', category: 'Hospitality Excellence', title: 'Hospitality excellence is a culture, not a training outcome', excerpt: 'You cannot train your way to a five-star service culture in a week. Culture is built over time, through leadership role-modeling, consistent reinforcement, and the patient refinement of behaviour.', readTime: '6 min read', date: 'December 2024' },
    { slug: 'vip-guest-management-principles', category: 'VIP Relations', title: 'Six principles for managing high-consequence guests without error', excerpt: 'When there is no margin for error, preparation is not enough. The highest standard of VIP guest management requires a specific mindset — anticipatory, discrete, and composed.', readTime: '5 min read', date: 'November 2024' },
    { slug: 'dining-as-diplomacy', category: 'Diplomatic Protocol', title: 'The formal table as a diplomatic instrument', excerpt: 'Who sits where, who is served first, how a conversation is steered — formal dining is one of the oldest and most reliable mechanisms for managing relationships between institutions.', readTime: '6 min read', date: 'October 2024' },
    { slug: 'customer-experience-public-sector', category: 'Government Excellence', title: 'Citizen experience is not a private sector concept', excerpt: "Saudi Arabia's public sector is being challenged to operate with the service consciousness of the best private institutions. Understanding why that shift matters is the first step toward making it happen.", readTime: '7 min read', date: 'September 2024' },
  ]).onConflictDoNothing()
  console.log('✓ Insights')

  // Faculty — confirmed founders only
  await db.insert(schema.faculty).values([
    {
      name: 'Dr. Saud bin Suleiman',
      title: 'Co-Founder',
      specialisation: ['Business Management', 'International Protocol', 'Diplomatic Conduct', 'Higher Education'],
      bio: 'Dr. Saud bin Suleiman holds a Doctorate in Business Administration and is a former diplomat who served at the Embassy of the Kingdom of Saudi Arabia in the United Kingdom. He currently works as a business development consultant and is a co-founder of EHP Academy in Saudi Arabia. Dr. Saud specialises in business management and development and has approximately 18 years of experience in higher education. His professional interests include quality management, strategy implementation, business analysis, performance evaluation, relationship development, international protocol, etiquette and diplomatic conduct.',
      credentials: ['Doctorate in Business Administration', 'Former Diplomat, Embassy of Saudi Arabia in the United Kingdom', '18 years of experience in higher education'],
      sortOrder: 1,
    },
    {
      name: 'Dr. Wafa Jilani',
      title: 'Co-Founder',
      specialisation: ['Quality Management', 'Healthcare Administration', 'Protocol & Etiquette'],
      bio: "Dr. Wafa Jilani is a general physician who holds a master's degree in quality management. She is a businesswoman and a co-founder of EHP Academy in Saudi Arabia. She manages a group of family-owned medical companies and specialises in quality management and healthcare administration. She also has a strong interest in protocol, etiquette and professional conduct. Her ambition is to introduce protocol and etiquette education across different sectors in Saudi Arabia, beginning with general education and continuing through higher education, professional development and employment.",
      credentials: ["General Physician", "Master's Degree in Quality Management", 'Co-founder, EHP Academy'],
      sortOrder: 2,
    },
  ]).onConflictDoNothing()
  console.log('✓ Faculty')

  // Case Studies
  await db.insert(schema.caseStudies).values([
    {
      slug: 'ministry-protocol-transformation', sector: 'Government', institution: 'Saudi Government Ministry',
      headline: 'Elevating reception protocol for a ministry receiving international delegations',
      challenge: "A senior Saudi ministry receiving an increasing volume of foreign ministerial visits found that its protocol procedures lacked consistency. Reception sequences varied by team, forms of address were applied incorrectly, and escort procedures were improvised. International partners noticed.",
      assessment: "EHP conducted a three-day protocol audit embedded within the ministry's official functions. We reviewed sixteen reception procedures, interviewed twelve protocol officers, and observed two live delegation arrivals. The assessment identified seventeen procedural gaps.",
      strategy: "A phased protocol standardisation programme was designed: foundational training for all 40+ reception staff, advanced certification for the eight senior protocol officers, and an in-house Protocol Standards Manual tailored to the ministry's specific mandate and partner countries.",
      implementation: "A five-day residential programme was delivered in two cohorts. Faculty included a former Saudi diplomatic protocol officer and a senior international hospitality faculty member. All participants completed scenario simulations of live delegation arrivals, formal receptions, and state luncheons.",
      transformation: 'By completion, the ministry had a unified protocol manual, a trained and certified protocol corps, and rehearsed procedures for 22 standard engagement scenarios. Senior officials described the shift as "from improvised to institutionalised."',
      results: ['Protocol procedures standardised across all 22 engagement scenarios', '100% of senior protocol staff certified to EHP standard', 'Zero protocol incidents reported in 14 months following delivery', 'International delegation satisfaction surveys improved markedly'],
      impact: 'The ministry now hosts international visits with the quiet confidence of an institution that has done it a thousand times. EHP continues to deliver annual refresher programmes and advises on new engagement scenarios.',
    },
    {
      slug: 'luxury-hotel-service-culture', sector: 'Hospitality', institution: 'Five-Star Luxury Hotel, Riyadh',
      headline: 'Building a service culture that matched a world-class property',
      challenge: "A newly opened flagship luxury property in Riyadh had invested enormously in architecture and amenity but found that guest experience scores were falling short of the brand's international benchmarks. The physical environment communicated luxury; the service interactions did not.",
      assessment: "EHP embedded a mystery guest assessment team across four stays over three weeks. We mapped 47 distinct service touchpoints from arrival to departure, graded each interaction against international five-star benchmarks, and identified behavioral patterns — not individual failures — as the root cause.",
      strategy: "A full-property service culture transformation programme was designed across three phases: leadership alignment, frontline behavioral excellence, and embedded culture reinforcement. The engagement treated service not as a skill but as an expression of institutional character.",
      implementation: "Phase one engaged 18 department heads in a two-day leadership programme. Phase two delivered five-day immersive programmes to 160 frontline staff in six cohorts. Phase three installed service champions in each department, equipped with tools to sustain the culture independently.",
      transformation: "Staff moved from performing service rituals to inhabiting a service identity. The distinction was observable: the pace slowed, eye contact became natural, and anticipatory behaviours appeared without instruction. Guest comments began mentioning individual staff members by name.",
      results: ['Guest satisfaction score improved from 72 to 91 within six months', 'TripAdvisor ranking advanced 14 positions in the city category', 'Repeat guest rate increased by 23%', 'Staff retention improved — turnover dropped by 18%'],
      impact: "The property now consistently benchmarks above the brand's international average in service delivery metrics. EHP is engaged annually to develop new joiners and reinforce the culture across expanding staff cohorts.",
    },
    {
      slug: 'military-ceremonial-excellence', sector: 'Defense', institution: 'Defense Command, Saudi Arabia',
      headline: 'Redesigning ceremonial protocol for national and international military occasions',
      challenge: "A defense command was tasked with hosting a significant multinational military ceremony involving delegations from 12 countries. The existing ceremonial team had not managed an event of this complexity, and the potential for protocol failures in front of international military leadership was significant.",
      assessment: "EHP's military protocol faculty conducted a rapid capability assessment over two days. We reviewed existing ceremonial standing orders, observed a training rehearsal, and benchmarked the team's capability against international military ceremonial standards. Critical gaps were identified in precedence management, flag protocol, and departure sequencing.",
      strategy: "A compressed but comprehensive preparation programme was designed across four weeks. The strategy combined skills training, procedure redesign, and intensive rehearsal — with EHP faculty embedded on-site throughout the preparation period.",
      implementation: "Faculty delivered a four-day Ceremonial Protocol intensive for 34 officers and warrant officers. Procedures were rewritten with EHP input. Two full dress rehearsals were conducted and supervised by the EHP military protocol faculty, with detailed debrief and correction at each stage.",
      transformation: "The ceremonial team entered the event with procedures they had rehearsed to precision and a command understanding of every contingency. The composure of the team shifted noticeably — from anxiety-driven to quietly authoritative.",
      results: ['Zero protocol incidents across a 6-hour multinational ceremony', 'Commendation from three international delegation commanders', 'Command issued new standing orders based on EHP-redesigned procedures', 'Team nominated for internal excellence recognition'],
      impact: 'The command has since engaged EHP for annual ceremonial protocol refresher training and has recommended the programme to two affiliated defense institutions.',
    },
  ]).onConflictDoNothing()
  console.log('✓ Case Studies')

  // Programs
  await db.insert(schema.programs).values([
    { slug: 'protocol-officer-certification', title: 'Protocol Officer Certification', category: 'International Protocol', industry: 'Government', level: 'Advanced', duration: '5 Days', format: 'In-Person', summary: 'A rigorous certification preparing professionals to manage official visits, ceremonies, and diplomatic engagements with precision.', outcomes: ['Manage precedence, seating, and flag protocol', 'Orchestrate official visits end to end', 'Apply diplomatic correspondence standards', 'Lead ceremonial sequencing with confidence'], audience: 'Protocol staff, chiefs of staff, and official-engagement coordinators.', modules: ['Foundations of Protocol', 'Precedence & Seating', 'Official Visit Management', 'Ceremonies & Honors', 'Assessment & Certification'], certification: 'EHP Certified Protocol Officer', impact: 'Institutions report markedly more confident, error-free official engagements.', sortOrder: 1 },
    { slug: 'executive-presence-intensive', title: 'Executive Presence Intensive', category: 'Executive Presence', industry: 'Financial Services', level: 'Executive', duration: '3 Days', format: 'Residential', summary: 'An immersive program developing the gravitas, composure, and communication that define credible leadership.', outcomes: ['Project authentic authority and poise', 'Master high-stakes communication', 'Refine personal conduct and bearing', 'Navigate cross-cultural executive settings'], audience: 'Senior leaders, board members, and high-potential executives.', modules: ['The Anatomy of Presence', 'Communication Under Pressure', 'Conduct & Bearing', 'Cross-Cultural Leadership'], certification: 'EHP Executive Presence Certificate', impact: 'Leaders command rooms and represent their institutions with assurance.', sortOrder: 2 },
    { slug: 'hospitality-excellence-academy', title: 'Hospitality Excellence Academy', category: 'Hospitality Excellence', industry: 'Hospitality', level: 'Foundation', duration: '10 Days', format: 'In-Person', summary: 'A comprehensive program establishing five-star service standards rooted in authentic Saudi hospitality.', outcomes: ['Deliver flawless five-star service sequences', 'Handle VIP and royal guests with grace', 'Apply cultural hosting traditions', 'Lead banquet and event hospitality'], audience: 'Hospitality teams, guest-relations staff, and service managers.', modules: ['Service Foundations', 'VIP & Royal Guest Handling', 'Saudi Hosting Traditions', 'Banquet & Event Service', 'Service Recovery'], certification: 'EHP Hospitality Excellence Diploma', impact: 'Properties achieve consistent, distinctive guest experiences.', sortOrder: 3 },
    { slug: 'military-protocol-command', title: 'Military Protocol & Ceremonial Command', category: 'Military Protocol', industry: 'Defense', level: 'Advanced', duration: '4 Days', format: 'In-Person', summary: 'Specialized training in ceremonial precision, honors, and command-level protocol for defense institutions.', outcomes: ['Command ceremonial sequencing and honors', 'Apply rank precedence and address', 'Manage visiting delegations', 'Lead commemorative events'], audience: 'Military protocol officers and ceremonial unit leaders.', modules: ['Ceremonial Foundations', 'Honors & Precedence', 'Delegation Protocol', 'Commemorative Command'], certification: 'EHP Military Protocol Certificate', impact: 'Defense institutions execute ceremonies with flawless discipline.', sortOrder: 4 },
    { slug: 'customer-experience-leadership', title: 'Customer Experience Leadership', category: 'Customer Experience', industry: 'Aviation', level: 'Advanced', duration: '5 Days', format: 'Hybrid', summary: 'A program for leaders responsible for designing and sustaining exceptional service journeys.', outcomes: ['Map journeys and moments of truth', 'Design service recovery systems', 'Set frontline behavioral standards', 'Measure and improve experience'], audience: 'CX leaders, service designers, and operations managers.', modules: ['Experience Strategy', 'Journey Design', 'Service Recovery', 'Measurement & Improvement'], certification: 'EHP CX Leadership Certificate', impact: 'Organizations lift satisfaction and loyalty measurably.', sortOrder: 5 },
    { slug: 'government-service-excellence', title: 'Government Service Excellence', category: 'Government Excellence', industry: 'Government', level: 'Foundation', duration: '6 Days', format: 'In-Person', summary: 'Building consistent, dignified public service standards across ministries and authorities.', outcomes: ['Standardize citizen-experience conduct', 'Apply official reception protocol', 'Coordinate inter-ministerial etiquette', 'Sustain service-culture standards'], audience: 'Public-sector service staff and department leaders.', modules: ['Public Service Foundations', 'Citizen Experience', 'Reception Protocol', 'Culture & Standards'], certification: 'EHP Government Service Certificate', impact: 'Ministries deliver consistent, trusted public service.', sortOrder: 6 },
  ]).onConflictDoNothing()
  console.log('✓ Programs')

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((e) => { console.error(e); process.exit(1) })
