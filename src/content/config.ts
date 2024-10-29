// Import utilities from 'astro:content'
import { z, defineCollection } from "astro:content";

// Define a `type` and `schema` for each collection
const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        publishedAt: z.coerce.date(),
        summary: z.string(),
    }),
});

// Export a single `collection` object to your collection(s)
export const collections = { blog };