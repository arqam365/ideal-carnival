import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// ponytail: null when DATABASE_URL missing; callers all use try/catch
const url = process.env.DATABASE_URL
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db: ReturnType<typeof drizzle> = url ? drizzle(neon(url), { schema }) : null as any
