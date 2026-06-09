import type { Loader } from "astro/loaders";

// Το σχήμα που επιστρέφει το WP REST API (/wp-json/wp/v2/posts?_embed).
// Κρατάμε μόνο όσα πεδία χρειαζόμαστε.
interface WPPost {
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
    "wp:term"?: { taxonomy: string; name: string }[][];
    // Έγκυρος χρήστης ({ name }) ή error object ({ code }) αν το users endpoint είναι κλειστό.
    author?: ({ name: string } | { code: string })[];
  };
}

const stripHtml = (s: string) => s.replace(/<[^>]+>/g, "").trim();

// Το standard WP REST δίνει ISO 8601 (2026-06-09T12:07:00). Κάποια sites όμως
// έχουν plugin που το αλλάζει σε MM/DD/YYYY HH:mm:ss — το κανονικοποιούμε σε ISO.
function parseWpDate(raw: string): string {
  if (/^\d{4}-\d{2}-\d{2}T/.test(raw)) return raw; // ήδη ISO
  const m = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})$/);
  if (m) {
    const [, mm, dd, yyyy, hh, min, ss] = m;
    return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
  }
  return raw; // fallback: ας προσπαθήσει το z.coerce.date()
}

// Όταν το users endpoint είναι κλειστό, το _embedded.author[0] είναι error object
// ({ code, message }) αντί για χρήστη. Επιστρέφουμε όνομα μόνο αν είναι έγκυρος χρήστης.
function authorName(embed: WPPost["_embedded"], fallback?: string): string | undefined {
  const a = embed?.author?.[0];
  if (a && !("code" in a) && a.name) return a.name;
  return fallback;
}

// Το WP επιστρέφει HTML entities (’ “ … &) — τα κάνουμε κανονικούς χαρακτήρες.
const decode = (s: string) =>
  s
    .replace(/&#8217;|&#x2019;/g, "’")
    .replace(/&#8216;|&#x2018;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&amp;/g, "&");

/**
 * Content Layer loader που τραβάει posts από WordPress REST API.
 * Κάνει 1:1 map στο ίδιο schema που χρησιμοποιεί και ο Markdown (glob) loader,
 * οπότε οι σελίδες του blog δεν χρειάζονται καμία αλλαγή.
 */
export function wordpressLoader({
  endpoint,
  defaultAuthor,
}: {
  endpoint: string;
  /** Όνομα που μπαίνει όταν το WP δεν δίνει author (κλειστό users endpoint). */
  defaultAuthor?: string;
}): Loader {
  return {
    name: "wordpress-loader",
    async load({ store, parseData, generateDigest, logger }) {
      const base = endpoint.replace(/\/$/, "");
      const url = `${base}/wp-json/wp/v2/posts?_embed&per_page=100`;
      logger.info(`Fetching posts from ${url}`);

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`WordPress fetch failed: ${res.status} ${res.statusText}`);
      }
      const posts: WPPost[] = await res.json();

      store.clear();
      for (const post of posts) {
        const terms = (post._embedded?.["wp:term"] ?? []).flat();
        const media = post._embedded?.["wp:featuredmedia"]?.[0];

        const data = await parseData({
          id: post.slug,
          data: {
            title: decode(post.title.rendered),
            description: decode(stripHtml(post.excerpt.rendered)),
            pubDate: parseWpDate(post.date),
            tags: terms.filter((t) => t.taxonomy === "post_tag").map((t) => t.name),
            heroImage: media?.source_url,
            heroImageAlt: media?.alt_text,
            author: authorName(post._embedded, defaultAuthor),
          },
        });

        // rendered.html → το <Content /> στις σελίδες το αποδίδει αυτούσιο.
        store.set({
          id: post.slug,
          data,
          rendered: { html: post.content.rendered },
          digest: generateDigest(data),
        });
      }

      logger.info(`Loaded ${posts.length} post(s) from WordPress`);
    },
  };
}
