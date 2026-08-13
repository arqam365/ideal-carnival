try { (process as any).loadEnvFile('.env.local') } catch {}

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
import { sql } from 'drizzle-orm'

const db = drizzle(neon(process.env.DATABASE_URL!), { schema })

const EN_SEED = [
  // ── Home ─────────────────────────────────────────────────────────────
  { key: 'home.hero.eyebrow',  label: 'Hero Eyebrow',         section: 'Home', value: 'House of Etiquette, Hospitality & Protocol' },
  { key: 'home.hero.heading',  label: 'Hero Heading',          section: 'Home', value: "Developing Saudi Arabia's Next Generation of Service Leaders" },
  { key: 'home.hero.body',     label: 'Hero Body Text',        section: 'Home', value: 'Global standards. Saudi values. Exceptional service. An executive institution shaping how the Kingdom is represented — in government, defense, hospitality, and on the world stage.' },

  // ── About ─────────────────────────────────────────────────────────────
  { key: 'about.hero.title',         label: 'About Hero Title',      section: 'About', value: "An institution built to elevate how Saudi Arabia serves and leads" },
  { key: 'about.hero.intro',         label: 'About Hero Intro',      section: 'About', value: 'EHP Academy is not a course marketplace. We are a house of excellence — developing the conduct, hospitality, and protocol competency that defines world-class representation.' },
  { key: 'about.story.p1',           label: 'Our Story – Paragraph 1', section: 'About', value: "EHP Academy was conceived in response to Saudi Arabia's growing demand for highly qualified professionals in protocol, executive hospitality, etiquette and premium service. As Saudi Arabia welcomes international delegations and expands its hospitality, tourism and major-events sectors, organisations require professionals who can represent them with confidence, cultural awareness and internationally informed standards of conduct." },
  { key: 'about.story.p2',           label: 'Our Story – Paragraph 2', section: 'About', value: 'EHP is designed as a centre of excellence, combining academic rigour, practical application and cultural intelligence. Our programmes serve government entities, diplomatic missions, private-sector executives, hospitality organisations and graduates seeking specialist professional qualifications.' },
  { key: 'about.story.p3',           label: 'Our Story – Paragraph 3', section: 'About', value: "Aligned with Saudi Vision 2030's ambition for a diversified, world-class economy, EHP equips Saudi Arabia's professionals to represent the Kingdom with the highest standards of excellence." },
  { key: 'about.vision.text',        label: 'Vision Statement',      section: 'About', value: 'To become a leading regional centre of excellence for executive hospitality, protocol and etiquette education, recognised for developing professionals who represent Saudi Arabia and their organisations with distinction on the national and international stage.' },
  { key: 'about.mission.text',       label: 'Mission Statement',     section: 'About', value: 'To develop confident, culturally intelligent and highly capable professionals through specialised education in executive hospitality, protocol, etiquette and service excellence, combining international best practices with Saudi values and ambitions.' },
  { key: 'about.leadership.quote',   label: 'Leadership Quote',      section: 'About', value: 'We believe excellence is taught by example, sustained by culture, and proven in the moments that matter most.' },
  { key: 'about.leadership.body',    label: 'Leadership Body Text',  section: 'About', value: 'Our faculty are practitioners — protocol officers, hospitality leaders, and diplomats who have operated at the highest levels. They teach not theory, but mastery earned in service to nations and institutions.' },

  // ── CTA ───────────────────────────────────────────────────────────────
  { key: 'cta.defaultTitle', label: 'Consultation CTA Title', section: 'CTA', value: 'Engage the institution that sets the standard' },
  { key: 'cta.defaultBody',  label: 'Consultation CTA Body',  section: 'CTA', value: "Whether you represent a ministry, a command, an authority, or an enterprise, our advisors will design an engagement around your mandate." },

  // ── Footer / Contact ──────────────────────────────────────────────────
  { key: 'footer.tagline', label: 'Footer Tagline',   section: 'Footer & Contact', value: "The House of Etiquette, Hospitality & Protocol. Developing Saudi Arabia's next generation of service leaders through global standards and Saudi values, in alignment with Vision 2030." },
  { key: 'footer.address', label: 'Address',          section: 'Footer & Contact', value: 'Riyadh, Saudi Arabia' },
  { key: 'footer.email',   label: 'Contact Email',    section: 'Footer & Contact', value: 'info@ehpacademy.com' },
  { key: 'footer.phone',   label: 'Contact Phone',    section: 'Footer & Contact', value: '' },
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
