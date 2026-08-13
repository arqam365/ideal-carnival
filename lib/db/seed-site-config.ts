try { (process as any).loadEnvFile('.env.local') } catch {}

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
import { sql } from 'drizzle-orm'

const db = drizzle(neon(process.env.DATABASE_URL!), { schema })

const EN_SEED = [
  // ── Home ─────────────────────────────────────────────────────────────
  { key: 'home.hero.eyebrow',           label: 'Hero Eyebrow',              section: 'Home', value: 'House of Etiquette, Hospitality & Protocol' },
  { key: 'home.hero.heading',           label: 'Hero Heading',              section: 'Home', value: "Developing Saudi Arabia's Next Generation of Service Leaders" },
  { key: 'home.hero.body',              label: 'Hero Body Text',            section: 'Home', value: 'Global standards. Saudi values. Exceptional service. An executive institution shaping how the Kingdom is represented — in government, defense, hospitality, and on the world stage.' },
  { key: 'home.solutions.eyebrow',      label: 'Solutions Eyebrow',         section: 'Home', value: 'What We Build' },
  { key: 'home.solutions.title',        label: 'Solutions Title',           section: 'Home', value: 'Capabilities, not courses' },
  { key: 'home.solutions.intro',        label: 'Solutions Intro',           section: 'Home', value: 'EHP partners with institutions to elevate how they serve, represent, and lead. Each engagement is a strategic capability area, delivered with the rigor of executive education.' },
  { key: 'home.vision.eyebrow',         label: 'Vision Section Eyebrow',    section: 'Home', value: 'Vision 2030' },
  { key: 'home.vision.title',           label: 'Vision Section Title',      section: 'Home', value: 'Excellence in service is a national imperative' },
  { key: 'home.vision.body',            label: 'Vision Section Body',       section: 'Home', value: 'As the Kingdom opens to the world, the quality of how Saudi Arabia welcomes, hosts, and represents itself becomes a strategic asset. EHP Academy exists to ensure that asset is developed to its highest potential.' },
  { key: 'home.partners.body',          label: 'Partners Section Body',     section: 'Home', value: 'EHP is actively building alliances with world-leading hospitality schools, protocol bodies, and certification institutes — bringing internationally benchmarked standards to Saudi Arabia.' },

  // ── About ─────────────────────────────────────────────────────────────
  { key: 'about.hero.title',            label: 'About Hero Title',          section: 'About', value: "An institution built to elevate how Saudi Arabia serves and leads" },
  { key: 'about.hero.intro',            label: 'About Hero Intro',          section: 'About', value: 'EHP Academy is not a course marketplace. We are a house of excellence — developing the conduct, hospitality, and protocol competency that defines world-class representation.' },
  { key: 'about.story.p1',             label: 'Our Story – Paragraph 1',   section: 'About', value: "EHP Academy was conceived in response to Saudi Arabia's growing demand for highly qualified professionals in protocol, executive hospitality, etiquette and premium service. As Saudi Arabia welcomes international delegations and expands its hospitality, tourism and major-events sectors, organisations require professionals who can represent them with confidence, cultural awareness and internationally informed standards of conduct." },
  { key: 'about.story.p2',             label: 'Our Story – Paragraph 2',   section: 'About', value: 'EHP is designed as a centre of excellence, combining academic rigour, practical application and cultural intelligence. Our programmes serve government entities, diplomatic missions, private-sector executives, hospitality organisations and graduates seeking specialist professional qualifications.' },
  { key: 'about.story.p3',             label: 'Our Story – Paragraph 3',   section: 'About', value: "Aligned with Saudi Vision 2030's ambition for a diversified, world-class economy, EHP equips Saudi Arabia's professionals to represent the Kingdom with the highest standards of excellence." },
  { key: 'about.vision.text',          label: 'Vision Statement',          section: 'About', value: 'To become a leading regional centre of excellence for executive hospitality, protocol and etiquette education, recognised for developing professionals who represent Saudi Arabia and their organisations with distinction on the national and international stage.' },
  { key: 'about.mission.text',         label: 'Mission Statement',         section: 'About', value: 'To develop confident, culturally intelligent and highly capable professionals through specialised education in executive hospitality, protocol, etiquette and service excellence, combining international best practices with Saudi values and ambitions.' },
  { key: 'about.leadership.quote',     label: 'Leadership Quote',          section: 'About', value: 'We believe excellence is taught by example, sustained by culture, and proven in the moments that matter most.' },
  { key: 'about.leadership.body',      label: 'Leadership Body Text',      section: 'About', value: 'Our faculty are practitioners — protocol officers, hospitality leaders, and diplomats who have operated at the highest levels. They teach not theory, but mastery earned in service to nations and institutions.' },

  // ── Solutions ─────────────────────────────────────────────────────────
  { key: 'solutions.hero.title',        label: 'Solutions Hero Title',      section: 'Solutions', value: 'Strategic capabilities for institutions that represent the Kingdom' },
  { key: 'solutions.hero.intro',        label: 'Solutions Hero Intro',      section: 'Solutions', value: 'We engage with ministries, commands, authorities, and enterprises as a partner in excellence — not a vendor of courses. Each solution is a capability area, tailored to your mandate.' },

  // ── Industries ────────────────────────────────────────────────────────
  { key: 'industries.hero.title',       label: 'Industries Hero Title',     section: 'Industries', value: 'Tailored to the realities of every sector we serve' },
  { key: 'industries.hero.intro',       label: 'Industries Hero Intro',     section: 'Industries', value: 'Protocol and service excellence look different in a ministry, an airport, and a hospital. Explore how EHP adapts to the challenges of each sector.' },

  // ── Programs ──────────────────────────────────────────────────────────
  { key: 'programs.hero.title',         label: 'Programmes Hero Title',     section: 'Programmes', value: 'A premium curriculum for every level and every institution' },
  { key: 'programs.hero.intro',         label: 'Programmes Hero Intro',     section: 'Programmes', value: 'From one-day intensives to multi-day residential certifications, every EHP programme is designed with the rigour of executive education and the precision of institutional protocol.' },
  { key: 'programs.catalogTitle',       label: 'Catalogue Section Title',   section: 'Programmes', value: 'Select a programme to explore the curriculum' },
  { key: 'programs.ctaTitle',           label: 'Programmes CTA Title',      section: 'Programmes', value: 'Build a custom development pathway for your institution' },
  { key: 'programs.ctaBody',            label: 'Programmes CTA Body',       section: 'Programmes', value: 'Our advisors will combine the right programmes into a coherent, sustained journey — aligned with your objectives and your people.' },

  // ── Faculty ───────────────────────────────────────────────────────────
  { key: 'faculty.hero.title',          label: 'Faculty Hero Title',        section: 'Faculty', value: 'Practitioners who have operated at the highest levels' },
  { key: 'faculty.hero.intro',          label: 'Faculty Hero Intro',        section: 'Faculty', value: 'Every EHP faculty member has served in the field — as a protocol officer, diplomat, military commander, or hospitality director. They teach mastery earned in practice, not theory.' },
  { key: 'faculty.philosophyP1',        label: 'Faculty Philosophy Para 1', section: 'Faculty', value: 'At EHP, we do not appoint academics to teach protocol. We engage the people who have managed state visits, commanded ceremonial formations, and hosted royalty — the professionals for whom excellence was not a concept but a daily operational requirement.' },
  { key: 'faculty.philosophyP2',        label: 'Faculty Philosophy Para 2', section: 'Faculty', value: 'Our faculty bring decades of real-world authority to every programme. They teach with the quiet confidence of those who have performed flawlessly in the moments that define institutions.' },
  { key: 'faculty.ctaTitle',            label: 'Faculty CTA Title',         section: 'Faculty', value: 'Engage our faculty for your institution' },
  { key: 'faculty.ctaBody',             label: 'Faculty CTA Body',          section: 'Faculty', value: 'All EHP programmes are designed and delivered by senior practitioners. Speak to our advisory team about the right faculty for your engagement.' },

  // ── Partnerships ──────────────────────────────────────────────────────
  { key: 'partnerships.hero.title',     label: 'Partnerships Hero Title',   section: 'Partnerships', value: 'Seeking world-class international partners to advance excellence in Saudi Arabia' },
  { key: 'partnerships.hero.intro',     label: 'Partnerships Hero Intro',   section: 'Partnerships', value: 'EHP Academy is building strategic alliances with leading hospitality schools, protocol bodies, and certification institutes — to bring internationally recognised standards to Saudi professionals and institutions aligned with Vision 2030.' },
  { key: 'partnerships.whyP1',          label: 'Why Partner – Para 1',      section: 'Partnerships', value: "Vision 2030 is creating extraordinary demand for world-class service and protocol expertise across Saudi Arabia. EHP Academy is the Saudi institution positioned to deliver that expertise — with direct access to government ministries, defense commands, hospitality groups, and enterprises across the Kingdom." },
  { key: 'partnerships.whyP2',          label: 'Why Partner – Para 2',      section: 'Partnerships', value: 'We seek international partners who can validate our programmes, co-develop our curriculum, and bring internationally recognised certification to the professionals we develop. In return, we offer meaningful access to Saudi Arabia\'s most significant human-capability transformation programme.' },
  { key: 'partnerships.whyP3',          label: 'Why Partner – Para 3',      section: 'Partnerships', value: 'A partnership with EHP is not a licensing arrangement. It is an institutional alliance that extends your reach into a fast-growing market and builds lasting co-branded presence in the Kingdom.' },
  { key: 'partnerships.inquiryBody',    label: 'Partnership Inquiry Body',  section: 'Partnerships', value: 'We welcome conversations with international institutions whose expertise aligns with our mission. If your institution operates in hospitality education, protocol, certification, or executive development — we would welcome a confidential discussion.' },
  { key: 'partnerships.ctaTitle',       label: 'Partnerships CTA Title',    section: 'Partnerships', value: 'A partnership that advances excellence in Saudi Arabia' },
  { key: 'partnerships.ctaBody',        label: 'Partnerships CTA Body',     section: 'Partnerships', value: 'If your institution is looking for a meaningful presence in the Kingdom — and a serious Saudi partner committed to international standards — we would like to speak with you.' },

  // ── Case Studies ──────────────────────────────────────────────────────
  { key: 'caseStudies.hero.title',      label: 'Case Studies Hero Title',   section: 'Case Studies', value: 'Transformation documented with the rigour of institutional evidence' },
  { key: 'caseStudies.hero.intro',      label: 'Case Studies Hero Intro',   section: 'Case Studies', value: 'These are not testimonials. They are documented accounts of how EHP engaged with an institution, diagnosed its challenges, designed a strategy, and delivered measurable transformation.' },
  { key: 'caseStudies.ctaTitle',        label: 'Case Studies CTA Title',    section: 'Case Studies', value: 'Become the institution your partners expect you to be' },
  { key: 'caseStudies.ctaBody',         label: 'Case Studies CTA Body',     section: 'Case Studies', value: 'Every one of these engagements began with a conversation. Let us understand your challenge and design the right response.' },

  // ── Insights ──────────────────────────────────────────────────────────
  { key: 'insights.hero.title',         label: 'Insights Hero Title',       section: 'Insights', value: 'Thought leadership on service, protocol, and institutional excellence' },
  { key: 'insights.hero.intro',         label: 'Insights Hero Intro',       section: 'Insights', value: 'EHP faculty and advisors publish perspectives on the disciplines that define how organisations represent themselves — drawing on decades of practice at the highest levels.' },
  { key: 'insights.briefingTitle',      label: 'Briefing Section Title',    section: 'Insights', value: 'Receive EHP perspectives directly' },
  { key: 'insights.briefingBody',       label: 'Briefing Section Body',     section: 'Insights', value: 'Senior leaders engaged with EHP receive our quarterly Intelligence Briefing — in-depth perspectives on protocol, service excellence, and institutional representation. Available exclusively to consultation enquirers and programme alumni.' },
  { key: 'insights.ctaTitle',           label: 'Insights CTA Title',        section: 'Insights', value: 'Engage the institution that thinks deeply about excellence' },
  { key: 'insights.ctaBody',            label: 'Insights CTA Body',         section: 'Insights', value: 'These perspectives emerge from practice, not research alone. Speak to our advisors about how they apply to your institution.' },

  // ── Contact ───────────────────────────────────────────────────────────
  { key: 'contact.hero.title',          label: 'Contact Hero Title',        section: 'Contact', value: "Begin a conversation about your institution's excellence" },
  { key: 'contact.hero.intro',          label: 'Contact Hero Intro',        section: 'Contact', value: 'Our advisory team works exclusively with institutions — not individuals seeking personal enrichment. Tell us about your mandate and we will design the right engagement.' },
  { key: 'contact.discretionBody',      label: 'Discretion Note',           section: 'Contact', value: 'All institutional enquiries and engagement details are held in strict confidence. EHP does not publish client names without explicit authorization.' },

  // ── CTA ───────────────────────────────────────────────────────────────
  { key: 'cta.defaultTitle',            label: 'Consultation CTA Title',    section: 'CTA', value: 'Engage the institution that sets the standard' },
  { key: 'cta.defaultBody',             label: 'Consultation CTA Body',     section: 'CTA', value: "Whether you represent a ministry, a command, an authority, or an enterprise, our advisors will design an engagement around your mandate." },

  // ── Footer / Contact ──────────────────────────────────────────────────
  { key: 'footer.tagline',              label: 'Footer Tagline',            section: 'Footer & Contact', value: "The House of Etiquette, Hospitality & Protocol. Developing Saudi Arabia's next generation of service leaders through global standards and Saudi values, in alignment with Vision 2030." },
  { key: 'footer.address',              label: 'Address',                   section: 'Footer & Contact', value: 'Riyadh, Saudi Arabia' },
  { key: 'footer.email',                label: 'Contact Email',             section: 'Footer & Contact', value: 'info@ehpacademy.com' },
  { key: 'footer.phone',                label: 'Contact Phone',             section: 'Footer & Contact', value: '' },
]

async function seed() {
  console.log('Seeding site_config...')
  for (const row of EN_SEED) {
    await db.execute(sql`
      INSERT INTO site_config (key, locale, value, label, section)
      VALUES (${row.key}, 'en', ${row.value}, ${row.label}, ${row.section})
      ON CONFLICT (key, locale) DO NOTHING
    `)
  }
  console.log(`Seeded ${EN_SEED.length} rows.`)
  process.exit(0)
}

seed().catch((e) => { console.error(e); process.exit(1) })
