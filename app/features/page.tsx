import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Curator Notes features: AI note taking, rich text notes, AI summarization, writing improvement, key point extraction, and personal knowledge management.",
  alternates: {
    canonical: canonicalUrl("/features"),
  },
};

const features = [
  "AI summarization for long notes and research",
  "AI writing improvement for clearer drafts",
  "Key point extraction for facts, tasks, and decisions",
  "Rich text notes for structured thinking",
  "Searchable personal knowledge base",
  "Second brain workflows for students and developers",
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#1F1F1E] px-5 py-20 text-white sm:px-8 lg:px-16">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-wide text-[#D9D6EA]">
          Features
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
          AI note taking features for a smarter personal knowledge base
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#C6C4BD]">
          Curator Notes helps you capture ideas, write rich text notes,
          summarize research, improve writing, and extract key points from your
          knowledge workflow.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature}
              className="rounded-lg border border-white/10 bg-[#282826] p-6"
            >
              <h2 className="text-xl font-bold text-white">{feature}</h2>
            </article>
          ))}
        </div>

        <Link
          href="/signup"
          className="mt-10 inline-flex rounded-lg bg-[#D9D6EA] px-5 py-3 text-sm font-bold text-[#373785]"
        >
          Start taking smarter notes
        </Link>
      </section>
    </main>
  );
}
