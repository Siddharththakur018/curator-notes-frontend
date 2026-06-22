import type { Metadata } from "next";
import AuthAwareCta from "@/features/auth/components/AuthAwareCta";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start Curator Notes for free. Pricing for an AI notes app with smart summaries, writing assistance, and personal knowledge management.",
  alternates: {
    canonical: canonicalUrl("/pricing"),
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#1F1F1E] px-5 py-20 text-white sm:px-8 lg:px-16">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-wide text-[#D9D6EA]">
          Pricing
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
          Simple pricing for AI-powered notes
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#C6C4BD]">
          Curator Notes is currently focused on helping early users build a
          reliable AI note taking and second brain workflow.
        </p>

        <div className="mt-12 rounded-lg border border-white/10 bg-[#282826] p-8">
          <h2 className="text-2xl font-bold">Free to start</h2>
          <p className="mt-4 text-[#C6C4BD]">
            Create a workspace, capture notes, and try AI productivity features.
            Paid plans may be introduced as the product grows.
          </p>
          <AuthAwareCta
            className="mt-8 inline-flex rounded-lg bg-[#D9D6EA] px-5 py-3 text-sm font-bold text-[#373785]"
          >
            Get started free
          </AuthAwareCta>
        </div>
      </section>
    </main>
  );
}
