---
title: "Getting Started with Astro"
description: "Why Astro is my go-to framework for building fast, content-focused websites."
pubDate: 2026-05-20
tags: ["astro", "web", "performance"]
heroImage: "https://picsum.photos/seed/astro/1200/630"
heroImageAlt: "Abstract gradient artwork"
author: "Frixos"
---

Astro ships **zero JavaScript by default**, which makes it perfect for content
sites and portfolios where performance matters.

## Why I like it

- **Islands architecture** — interactive components only hydrate when needed.
- **Bring your own framework** — React, Vue, Svelte, or just plain HTML.
- **Content collections** — type-safe Markdown with a great DX.

```ts
const posts = await getCollection("blog");
```

That's all it takes to load every post in a fully typed array. 🚀
