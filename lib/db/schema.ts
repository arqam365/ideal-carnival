import { pgTable, serial, varchar, text, boolean, integer, timestamp, json } from 'drizzle-orm/pg-core'

export const insights = pgTable('insights', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  category: varchar('category', { length: 100 }).notNull(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content'),
  imageUrl: varchar('image_url', { length: 500 }),
  readTime: varchar('read_time', { length: 50 }).notNull(),
  date: varchar('date', { length: 50 }).notNull(),
  featured: boolean('featured').default(false).notNull(),
  published: boolean('published').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const faculty = pgTable('faculty', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  specialisation: json('specialisation').$type<string[]>().notNull(),
  bio: text('bio').notNull(),
  credentials: json('credentials').$type<string[]>().notNull(),
  imageUrl: varchar('image_url', { length: 500 }),
  sortOrder: integer('sort_order').default(0).notNull(),
})

export const caseStudies = pgTable('case_studies', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  sector: varchar('sector', { length: 100 }).notNull(),
  institution: varchar('institution', { length: 200 }).notNull(),
  headline: text('headline').notNull(),
  challenge: text('challenge').notNull(),
  assessment: text('assessment').notNull(),
  strategy: text('strategy').notNull(),
  implementation: text('implementation').notNull(),
  transformation: text('transformation').notNull(),
  results: json('results').$type<string[]>().notNull(),
  impact: text('impact').notNull(),
  published: boolean('published').default(true).notNull(),
})

export const programs = pgTable('programs', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  title: varchar('title', { length: 200 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  industry: varchar('industry', { length: 100 }).notNull(),
  level: varchar('level', { length: 50 }).notNull(),
  duration: varchar('duration', { length: 50 }).notNull(),
  format: varchar('format', { length: 50 }).notNull(),
  summary: text('summary').notNull(),
  outcomes: json('outcomes').$type<string[]>().notNull(),
  audience: text('audience').notNull(),
  modules: json('modules').$type<string[]>().notNull(),
  certification: varchar('certification', { length: 200 }).notNull(),
  impact: text('impact').notNull(),
  published: boolean('published').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
})

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  title: varchar('title', { length: 200 }),
  institution: varchar('institution', { length: 200 }),
  country: varchar('country', { length: 100 }),
  email: varchar('email', { length: 200 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  type: varchar('type', { length: 100 }),
  message: text('message'),
})

export type Insight = typeof insights.$inferSelect
export type Faculty = typeof faculty.$inferSelect
export type CaseStudy = typeof caseStudies.$inferSelect
export type Program = typeof programs.$inferSelect
export type Lead = typeof leads.$inferSelect
