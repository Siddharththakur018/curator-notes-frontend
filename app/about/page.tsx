import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Curator Notes, an AI productivity tool for note taking, writing assistance, and personal knowledge management.",
  alternates: {
    canonical: canonicalUrl("/about"),
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#1F1F1E] px-5 py-20 text-white sm:px-8 lg:px-16">
      <section className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-[#D9D6EA]">
          About
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
          A calmer way to build your second brain
        </h1>
        <p className="mt-6 text-lg leading-8 text-[#C6C4BD]">
          Curator Notes is an AI notes app for people who save information,
          study, write, research, and build knowledge every day. The goal is to
          turn scattered notes into a useful personal knowledge base.
        </p>
        <p className="mt-5 text-lg leading-8 text-[#C6C4BD]">
          The product combines rich text note taking, AI summarization, writing
          improvement, and key point extraction so students, developers, and
          knowledge workers can spend less time organizing and more time
          thinking.
        </p>
        <Link
          href="/features"
          className="mt-10 inline-flex rounded-lg border border-white/10 px-5 py-3 text-sm font-bold text-white"
        >
          Explore features
        </Link>
      </section>
    </main>
  );
}
