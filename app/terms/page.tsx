import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for using Curator Notes, an AI note taking and personal knowledge management app.",
  alternates: {
    canonical: canonicalUrl("/terms"),
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#1F1F1E] px-5 py-20 text-white sm:px-8 lg:px-16">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-[#D9D6EA]">
          Terms
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
          Terms of Service
        </h1>
        <p className="mt-6 text-lg leading-8 text-[#C6C4BD]">
          These terms describe the basic conditions for using Curator Notes as
          an AI note taking app and personal knowledge base.
        </p>

        <section className="mt-10 space-y-6 text-[#C6C4BD]">
          <div>
            <h2 className="text-2xl font-bold text-white">Use of the product</h2>
            <p className="mt-3 leading-7">
              You are responsible for the notes, prompts, and content you add to
              your Curator Notes workspace.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI output</h2>
            <p className="mt-3 leading-7">
              AI-generated summaries, writing improvements, and extracted key
              points should be reviewed before relying on them.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Service changes</h2>
            <p className="mt-3 leading-7">
              Features, limits, credits, and pricing may change as the product
              develops.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
