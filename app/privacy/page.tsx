import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy information for Curator Notes, including account data, notes, and AI-powered productivity features.",
  alternates: {
    canonical: canonicalUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#1F1F1E] px-5 py-20 text-white sm:px-8 lg:px-16">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-[#D9D6EA]">
          Privacy
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-lg leading-8 text-[#C6C4BD]">
          Curator Notes is a productivity app for private notes and personal
          knowledge management. This page summarizes the privacy principles for
          the product.
        </p>

        <section className="mt-10 space-y-6 text-[#C6C4BD]">
          <div>
            <h2 className="text-2xl font-bold text-white">Account data</h2>
            <p className="mt-3 leading-7">
              We use account information such as name, email, authentication ID,
              role, and AI credit usage to provide and secure the service.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Notes and AI usage</h2>
            <p className="mt-3 leading-7">
              Notes and selected text may be processed to provide AI
              summarization, writing improvement, and key point extraction.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Private pages</h2>
            <p className="mt-3 leading-7">
              Authenticated notes, workspace, and settings pages are private and
              are marked noindex for search engines.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
