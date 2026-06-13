// Central place to edit all your portfolio content.
// Change the values here and the whole site updates.

export const site = {
  name: "Frixos Nikoloulopoulos",
  role: "Full-Stack Developer",
  tagline:
    "I build fast, accessible web applications with clean, maintainable code.",
  email: "frixos.nik@hotmail.com",
  location: "Greece",
  socials: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
    twitter: "",
  },
};

// Rotating titles shown with a typing effect in the hero.
// Edit / reorder freely — the first one is also what shows without JS.
export const roles = [
  "Full Stack Developer",
  "WordPress Expert",
  "SEO Specialist",
  "Server Administrator",
  "Performance Engineer",
];

// Headline numbers in the hero. Each counts up from 0 when it scrolls in.
// 👉 Replace these with your real figures.
export type Stat = { value: number; suffix?: string; label: string };
export const stats: Stat[] = [
  { value: 10, suffix: "+", label: "Years experience" },
  { value: 60, suffix: "+", label: "Sites delivered" },
  { value: 100, label: "Best PageSpeed score" },
  { value: 100, suffix: "%", label: "Uptime focus" },
];

export const about = {
  // 👉 Drop your photo in public/about/ and set the path here
  // (e.g. "/about/frixos.jpg"). Leave "" to show a styled initials placeholder.
  photo: "",
  photoAlt: "Frixos Nikoloulopoulos",
  // Quick-facts card shown beside the bio on desktop.
  facts: [
    { label: "Education", value: "Electrical & Computer Eng. — NTUA" },
    { label: "Based in", value: "Greece & Cyprus" },
    { label: "Languages", value: "Greek · English" },
    { label: "Focus", value: "Development · SEO · DevOps" },
  ],
  paragraphs: [
    "I'm an Electrical & Computer Engineering graduate of the National Technical University of Athens (NTUA). I came to the web the practical way — by building real things. It started about ten years ago with inaek.com, a Greek news site I launched and still run, and grew from there into a career across development, SEO, and digital marketing.",
    "Since then I've taken projects from idea to traffic: Aigio Padel Club, now booked solid with the whole town playing and new courts on the way; the marketing of a family-run medical-equipment company that has led the Cypriot market for decades; and dozens of sites where I own the full chain — from server configuration to Core Web Vitals to search rankings.",
    "Today I work as a Tech Project Owner at a Cyprus-based digital marketing agency, sitting between business and engineering and turning strategy into fast, well-ranked products that ship. I work in Greek and English across Greece and Cyprus, and on select projects with international brands.",
  ],
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "WordPress",
    skills: [
      "WordPress",
      "Custom Plugin Development",
      "Elementor",
      "WooCommerce",
      "PHP",
      "MySQL",
    ],
  },
  {
    title: "SEO",
    skills: ["Technical SEO", "On-Page SEO", "Core Web Vitals"],
  },
  {
    title: "DevOps & Servers",
    skills: [
      "Server Administration",
      "Dedicated Servers",
      "Linux",
      "Nginx / Apache",
    ],
  },
  {
    title: "Performance & Security",
    skills: [
      "Performance Optimization",
      "Caching",
      "Web Security",
      "Server Hardening",
    ],
  },
  {
    title: "APIs & Headless",
    skills: ["REST APIs", "GraphQL", "Headless CMS", "Webhooks"],
  },
  {
    title: "Web Fundamentals",
    skills: ["JavaScript", "HTML & CSS", "Git"],
  },
];

// Tech shown as logos in the "Tech Stack" grid.
// `icon` is an Iconify name from the installed sets (logos / simple-icons).
// `color` is optional — used to tint monochrome (simple-icons) logos.
export type Tech = { name: string; icon: string; color?: string };

export const techStack: Tech[] = [
  { name: "WordPress", icon: "logos:wordpress-icon" },
  { name: "PHP", icon: "logos:php" },
  { name: "MySQL", icon: "logos:mysql-icon" },
  { name: "WooCommerce", icon: "logos:woocommerce-icon" },
  { name: "Elementor", icon: "simple-icons:elementor", color: "#C5234A" },
  { name: "JavaScript", icon: "logos:javascript" },
  { name: "HTML5", icon: "logos:html-5" },
  { name: "CSS3", icon: "logos:css-3" },
  { name: "Linux", icon: "logos:linux-tux" },
  { name: "Nginx", icon: "logos:nginx" },
  { name: "Docker", icon: "logos:docker-icon" },
  { name: "Git", icon: "logos:git-icon" },
  { name: "React", icon: "logos:react" },
  { name: "GraphQL", icon: "logos:graphql" },
  { name: "Astro", icon: "logos:astro-icon" },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  // Path to an image in /public (e.g. "/projects/my-app.png").
  // Drop your screenshot in public/projects/ and point here.
  image?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A short, punchy description of what this project does and why it matters. Highlight the problem it solves.",
    tech: ["Astro", "TypeScript", "Tailwind"],
    image: "/projects/project-one.svg",
    github: "https://github.com/your-username/project-one",
    demo: "https://project-one.example.com",
    featured: true,
  },
  {
    title: "Project Two",
    description:
      "Another project description. Keep it to one or two sentences focused on the impact and the tech used.",
    tech: ["React", "Node.js", "PostgreSQL"],
    image: "/projects/project-two.svg",
    github: "https://github.com/your-username/project-two",
    demo: "",
  },
  {
    title: "Project Three",
    description:
      "Describe a side project, an open-source contribution, or something you're proud of building.",
    tech: ["Next.js", "Prisma"],
    image: "/projects/project-three.svg",
    github: "https://github.com/your-username/project-three",
    demo: "https://project-three.example.com",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string; // e.g. "CEO, Acme Co."
  avatar?: string; // optional image path in /public; falls back to initials
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Delivered a complex WordPress build ahead of schedule. The custom plugin work was clean, well-documented, and rock solid in production.",
    name: "Client Name",
    role: "CEO, Company",
  },
  {
    quote:
      "Our site's Core Web Vitals went from red to green. Page load dropped dramatically and our search rankings followed. Highly recommended.",
    name: "Client Name",
    role: "Marketing Lead, Company",
  },
  {
    quote:
      "Migrated us to a hardened dedicated server with zero downtime. Knows the full stack — from WordPress internals down to the server config.",
    name: "Client Name",
    role: "Founder, Company",
  },
];

// Contact form: get a free access key at https://web3forms.com
// (it just asks for your email — submissions are sent straight to it).
// Paste the key here and the form starts working immediately.
export const contactFormAccessKey = "8ce15ae7-f675-4c86-98e1-2c66b5540bbc";
