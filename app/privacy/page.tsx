import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy information for Curator Notes, including account data, notes, and AI-powered productivity features.",
  alternates: {
    canonical: canonicalUrl("/privacy"),
  },
};

const LAST_UPDATED = "July 24, 2026";

const SECTIONS = [
  {
    title: "1. Overview",
    body: [
      `This Privacy Policy explains what information ${siteConfig.name} collects, how we use it, and the choices you have. It applies to the Curator Notes website and application (the "Service"). By using the Service, you agree to the practices described here.`,
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "Account information: when you sign up, we (via Firebase Authentication) collect your name, email address, and a unique authentication ID. Our backend stores a corresponding user record including your role and AI credit balance.",
      "Your content: the notes you create, including titles, rich text content, and derived preview/search text, are stored so your workspace can be retrieved across sessions.",
      "AI feature inputs: when you use an AI action (summarize, improve writing, extract key points), the text you select is sent to our backend and forwarded to our AI model provider to generate a response.",
      "Usage and device information: standard technical data such as browser type, device information, and general usage patterns, collected to keep the Service secure and reliable.",
    ],
  },
  {
    title: "3. How we use information",
    body: [
      "To provide the Service: authenticating you, storing and syncing your notes, and rendering your workspace.",
      "To power AI features: processing the text you explicitly submit through an AI action and returning the result to you.",
      "To maintain and improve the Service: diagnosing errors, understanding feature usage in aggregate, and enforcing fair use of AI credits.",
      "To communicate with you: service-related notices (for example, security alerts or changes to these policies) and, only if you opt in from Settings, product updates or reminder emails.",
    ],
  },
  {
    title: "4. AI processing and third parties",
    body: [
      "AI features are powered by a third-party AI model provider. Text you submit through an AI action is sent to that provider solely to generate the requested output, subject to that provider's own data handling terms.",
      "We also rely on infrastructure providers (such as Firebase for authentication) to operate the Service. These providers process data on our behalf and are not permitted to use it for their own purposes.",
      "We do not sell your personal information or your note content.",
    ],
  },
  {
    title: "5. Data retention",
    body: [
      "We retain your account and note data for as long as your account is active. If you delete a note, it is removed from your active workspace; residual copies may persist briefly in backups before being purged in the ordinary course.",
      "If you delete your account, we will delete or anonymize your personal data within a reasonable period, except where retention is required for legal, security, or fraud-prevention purposes.",
    ],
  },
  {
    title: "6. Your choices and rights",
    body: [
      "You can review and update your account details, notification preferences, and appearance settings at any time from Settings.",
      "You can export a copy of your account data from Settings, and you can request deletion of your account and associated data by contacting us.",
      "Depending on your location, you may have additional rights under applicable law (such as GDPR or CCPA) to access, correct, or delete your personal information, or to object to certain processing. Contact us to exercise these rights.",
    ],
  },
  {
    title: "7. Security",
    body: [
      "We use industry-standard safeguards, including authenticated API access and encrypted transport (HTTPS), to protect your information. No method of storage or transmission is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "8. Children's privacy",
    body: [
      "The Service is not directed to children under 13, and we do not knowingly collect personal information from them. If you believe a child has provided us with personal information, please contact us so we can remove it.",
    ],
  },
  {
    title: "9. Private and public pages",
    body: [
      "Authenticated pages — your notes, workspace, and settings — are private to your account and are marked noindex so they are not shown in search engine results.",
    ],
  },
  {
    title: "10. Changes to this policy",
    body: [
      'We may update this Privacy Policy from time to time. If we make material changes, we will update the "last updated" date below and, where appropriate, provide additional notice.',
    ],
  },
  {
    title: "11. Contact",
    body: [
      "Questions about this Privacy Policy or requests regarding your data can be sent to support@curatornotes.com.",
    ],
  },
];

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
          knowledge management. This policy explains what we collect, why, and
          the choices you have.
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
            <Link href="/terms" className="font-semibold text-[#D9D6EA] hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
