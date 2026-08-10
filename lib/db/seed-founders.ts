import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

async function run() {
  console.log('Clearing existing faculty...')
  await db.delete(schema.faculty)

  console.log('Inserting real founders...')
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
  ])

  console.log('Done. Faculty table now has 2 founders.')
  process.exit(0)
}

run().catch(e => { console.error(e); process.exit(1) })
