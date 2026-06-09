import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { wordpressLoader } from "./loaders/wordpress";

// Διακόπτης πηγής: αν υπάρχει WP_API_URL στο .env → τραβάμε από WordPress.
// Αλλιώς μένουμε στα Markdown. Το schema είναι ίδιο και για τις δύο πηγές.
const WP_API_URL = import.meta.env.WP_API_URL;

// Κάθε πεδίο εδώ αντιστοιχεί 1:1 σε ένα πεδίο του WP REST API (/wp-json/wp/v2/posts?_embed).
// Όταν αλλάξουμε τον loader σε WordPress, μόνο αυτό το mapping αλλάζει — οι σελίδες μένουν ίδιες.
const blog = defineCollection({
  loader: WP_API_URL
    ? wordpressLoader({
        endpoint: WP_API_URL,
        defaultAuthor: import.meta.env.WP_DEFAULT_AUTHOR,
      })
    : glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(), //              ← title.rendered
    description: z.string(), //        ← excerpt.rendered (strip <p>) ή Yoast/RankMath meta
    pubDate: z.coerce.date(), //       ← date
    tags: z.array(z.string()).default([]), // ← _embedded["wp:term"] (taxonomy: post_tag)
    heroImage: z.string().optional(), //      ← _embedded["wp:featuredmedia"][0].source_url
    heroImageAlt: z.string().optional(), //   ← _embedded["wp:featuredmedia"][0].alt_text
    author: z.string().optional(), //         ← _embedded.author[0].name
  }),
});

export const collections = { blog };
