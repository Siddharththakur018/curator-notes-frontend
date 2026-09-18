import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for using Curator Notes, an AI note taking and personal knowledge management app.",
  alternates: {
    canonical: canonicalUrl("/terms"),
  },
};

const LAST_UPDATED = "July 24, 2026";

const SECTIONS = [
  {
    title: "1. Acceptance of these terms",
    body: [
      `These Terms of Service ("Terms") are a binding agreement between you and ${siteConfig.name} governing your access to and use of the Curator Notes website, application, and related services (the "Service"). By creating an account or otherwise using the Service, you agree to these Terms. If you do not agree, do not use the Service.`,
      "If you are using the Service on behalf of an organization, you are agreeing to these Terms for that organization and confirming you have the authority to do so.",
    ],
  },
  {
    title: "2. Eligibility and accounts",
    body: [
      "You must be at least 13 years old (or the minimum age of digital consent in your jurisdiction) to use the Service. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.",
      "You agree to provide accurate account information and to notify us promptly at support@curatornotes.com if you suspect unauthorized use of your account.",
    ],
  },
  {
    title: "3. Your content",
    body: [
      'Notes, text, files, and other material you create or upload to Curator Notes ("Your Content") remain yours. We do not claim ownership over Your Content.',
      "By using the Service, you grant us a limited license to host, store, process, and display Your Content solely to operate, maintain, and improve the Service — including running the AI features described below. This license ends when Your Content is deleted from your account, subject to routine backups being purged in the ordinary course.",
      "You are solely responsible for Your Content and for having the necessary rights to store and process it through the Service.",
    ],
  },
  {
    title: "4. AI-powered features",
    body: [
      "Curator Notes offers optional AI features (such as summarization, writing improvement, and key point extraction) that send selected text to a third-party AI model provider for processing. Do not submit content through these features that you are not permitted to share with a third-party processor.",
      "AI output is generated automatically and may be inaccurate, incomplete, or unsuitable for your purpose. You should review AI-generated content before relying on it, and you remain responsible for how you use it.",
      "AI features are metered using AI credits shown in your workspace. Credit allotments, reset schedules, and limits may change as the product develops; we will make reasonable efforts to communicate material changes in advance.",
    ],
  },
  {
    title: "5. Acceptable use",
    body: [
      "You agree not to use the Service to: violate any law or third-party right; upload malware or attempt to gain unauthorized access to the Service or other accounts; interfere with or disrupt the integrity or performance of the Service; or use automated means to scrape or extract data beyond your own account without our written permission.",
      "We may suspend or terminate accounts that violate this section or that we reasonably believe pose a security or legal risk to the Service or other users.",
    ],
  },
  {
    title: "6. Plans, pricing, and billing",
    body: [
      "Curator Notes currently offers a free plan. Paid plans, when introduced, will be described on our Pricing page along with their features and billing terms at that time. We will provide notice before charging for any feature that is currently free.",
      "Prices, feature availability, and usage limits may change; we will not apply price changes retroactively to a billing period you have already paid for.",
    ],
  },
  {
    title: "7. Intellectual property",
    body: [
      "The Service, including its design, branding, and underlying software, is owned by us or our licensors and is protected by intellectual property laws. Except for the rights expressly granted to you in these Terms, we reserve all rights in the Service.",
    ],
  },
  {
    title: "8. Termination",
    body: [
      "You may stop using the Service and delete your account at any time from Settings. We may suspend or terminate your access if you breach these Terms, or discontinue the Service (or parts of it) with reasonable notice where practicable.",
      "Upon termination, your right to use the Service ends immediately; provisions of these Terms that by their nature should survive (ownership, disclaimers, limitation of liability) will continue to apply.",
    ],
  },
  {
    title: "9. Disclaimers",
    body: [
      'The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or that AI output will be accurate.',
    ],
  },
  {
    title: "10. Limitation of liability",
    body: [
      "To the maximum extent permitted by law, we will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, profits, or revenue, arising from your use of the Service. Our total liability for any claim arising out of these Terms or the Service will not exceed the amount you paid us, if any, in the twelve months preceding the claim.",
    ],
  },
  {
    title: "11. Changes to these terms",
    body: [
      'We may update these Terms from time to time. If we make material changes, we will update the "last updated" date below and, where appropriate, provide additional notice. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.',
    ],
  },
  {
    title: "12. Governing law",
    body: [
      "These Terms are governed by the laws of the jurisdiction in which the operator of Curator Notes is established, without regard to conflict-of-law principles, unless a different jurisdiction is required by applicable consumer protection law.",
    ],
  },
  {
    title: "13. Contact",
    body: ["Questions about these Terms can be sent to support@curatornotes.com."],
  },
];

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
          These terms explain the rules for using Curator Notes, an AI note
          taking app and personal knowledge base. Please read them carefully.
        </p>
        <p className="mt-4 text-sm text-[#8B8A84]">
          Last updated: {LAST_UPDATED}
        </p>

        <nav className="mt-10 rounded-lg border border-white/10 bg-[#252523] p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8B8A84]">
            On this page
          </p>
          <ol className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-[#C6C4BD] sm:grid-cols-2">
            {SECTIONS.map((section) => (
              <li key={section.title}>
                <a
                  href={`#${section.title.split(". ")[0]}`}
                  className="hover:text-white hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section className="mt-10 space-y-10 text-[#C6C4BD]">
          {SECTIONS.map((section) => (
            <div key={section.title} id={section.title.split(". ")[0]}>
              <h2 className="text-2xl font-bold text-white">
                {section.title}
              </h2>
              {section.body.map((paragraph, index) => (
                <p key={index} className="mt-3 leading-7">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </section>

        <div className="mt-14 flex flex-col gap-3 rounded-lg border border-white/10 bg-[#252523] p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#9C9B96]">
            Related reading: our{" "}
            <Link href="/privacy" className="font-semibold text-[#D9D6EA] hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/pricing" className="font-semibold text-[#D9D6EA] hover:underline">
              Pricing
            </Link>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
