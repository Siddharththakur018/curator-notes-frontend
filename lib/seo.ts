export const siteConfig = {
  name: "Curator Notes",
  shortName: "Curator",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://curator-notes.vercel.app",
  description:
    "Curator Notes is an AI note taking app for capturing ideas, summarizing notes, improving writing, extracting key points, and building a personal knowledge base.",
  keywords: [
    "AI notes app",
    "AI note taking app",
    "smart notes app",
    "AI writing assistant",
    "personal knowledge base",
    "second brain app",
    "AI productivity tool",
    "knowledge management app",
    "note taking app for students",
    "note taking app for developers",
  ],
};

export const publicRoutes = [
  "",
  "/features",
  "/pricing",
  "/about",
  "/privacy",
  "/terms",
];

export const canonicalUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteConfig.url}${normalizedPath === "/" ? "" : normalizedPath}`;
};
