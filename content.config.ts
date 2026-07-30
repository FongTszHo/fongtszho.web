import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  type: z.enum(['blog', 'wiki', 'project', 'page']).default('wiki'),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false)
})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: pageSchema
    })
  }
})
