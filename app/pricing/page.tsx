import type { Metadata } from "next";
import { Check } from "lucide-react";
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

type Plan = {
  name: string;
  price: string;
  cadence?: string;
  description: string;
  features: string[];
  cta: "free" | "waitlist";
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    description:
      "Everything you need to start a reliable AI note taking workflow.",
    features: [
      "Unlimited notes",
      "Rich text editor with formatting",
      "1,000 AI credits to start (summarize, improve, extract key points)",
      "Full-text search across your workspace",
      "Available on web, synced to your account",
    ],
    cta: "free",
  },
  {
    name: "Pro",
    price: "TBD",
    description:
      "For people who live in Curator Notes every day and want more AI headroom.",
    features: [
      "Everything in Free",
      "Higher monthly AI credit allowance",
      "Priority AI response times",
      "Digest and Inbox features as they launch",
      "Priority support",
    ],
    cta: "waitlist",
    highlighted: true,
  },
  {
    name: "Team",
    price: "TBD",
    description: "For small teams sharing a knowledge base.",
    features: [
      "Everything in Pro",
      "Shared team workspace",
      "Centralized billing and admin controls",
      "Team-wide AI credit pool",
    ],
    cta: "waitlist",
  },
];

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
          Curator Notes is free to use today while we build out the product
          with early users. Pro and Team plans are in the works — join the
          waitlist to be notified when they launch.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-lg border p-8 ${
                plan.highlighted
                  ? "border-[#D9D6EA]/60 bg-[#282826] ring-1 ring-[#D9D6EA]/30"
                  : "border-white/10 bg-[#282826]"
              }`}
            >
              {plan.highlighted ? (
                <p className="mb-4 inline-flex w-fit rounded-full bg-[#D9D6EA] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#373785]">
                  Most anticipated
                </p>
              ) : null}

              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price === "$0" ? (
                  <span className="text-sm text-[#8B8A84]">/ forever</span>
                ) : (
                  <span className="text-sm text-[#8B8A84]">/ month, pricing coming soon</span>
                )}
              </p>
              <p className="mt-4 text-sm leading-6 text-[#C6C4BD]">
                {plan.description}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-[#C6C4BD]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D9D6EA]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.cta === "free" ? (
                <AuthAwareCta className="mt-8 inline-flex justify-center rounded-lg bg-[#D9D6EA] px-5 py-3 text-sm font-bold text-[#373785]">
                  Get started free
                </AuthAwareCta>
              ) : (
                <a
                  href="mailto:support@curatornotes.com?subject=Curator%20Notes%20waitlist"
                  className="mt-8 inline-flex justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Join the waitlist
                </a>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-[#8B8A84]">
          Have questions about pricing? Email us at{" "}
          <a href="mailto:support@curatornotes.com" className="font-semibold text-[#D9D6EA] hover:underline">
            support@curatornotes.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
