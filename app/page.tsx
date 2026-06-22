import AuthNavActions from "@/features/auth/components/AuthNavActions";
import AuthAwareCta from "@/features/auth/components/AuthAwareCta";
import type { Metadata } from "next";
import {
  ArrowRight,
  BrainCircuit,
  CalendarCheck,
  FileText,
  Layers3,
  Menu,
  Search,
  Sparkles,
  BookImage,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import { canonicalUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Note Taking App for Your Second Brain",
  description:
    "Curator Notes is an AI note taking app with rich text notes, AI summarization, writing improvement, key point extraction, and personal knowledge management.",
  alternates: {
    canonical: canonicalUrl("/"),
  },
  openGraph: {
    title: "Curator Notes | AI Note Taking App",
    description:
      "Capture ideas, summarize notes, improve writing, extract key points, and build a searchable personal knowledge base.",
    url: canonicalUrl("/"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Curator Notes | AI Note Taking App",
    description:
      "An AI notes app for students, developers, and knowledge workers building a second brain.",
  },
};

const data = [
  {
    icon: BookImage,
    title: "Universal capture",
    description:
      "Save links, screenshots, PDFs, quotes, and quick thoughts without breaking your flow.",
    stat: "Any format",
  },
  {
    icon: BrainCircuit,
    title: "Context that compounds",
    description:
      "Curator connects new saves to your older notes so useful ideas resurface when they matter.",
    stat: "Smart links",
  },
  {
    icon: WandSparkles,
    title: "Morning digests",
    description:
      "Wake up to a short brief of the few saved items worth reading, acting on, or archiving.",
    stat: "Daily brief",
  },
  {
    icon: Search,
    title: "Recall in seconds",
    description:
      "Search across notes and sources with natural language instead of remembering file names.",
    stat: "Fast retrieval",
  },
  {
    icon: CalendarCheck,
    title: "Action reminders",
    description:
      "Turn useful saves into gentle follow-ups, so research becomes progress instead of clutter.",
    stat: "Follow through",
  },
];

const steps = [
  {
    title: "Capture what you find",
    description:
      "Drop in links, PDFs, screenshots, voice notes, or quick thoughts from anywhere.",
  },
  {
    title: "Let Curator read it",
    description:
      "AI summarizes the important parts, tags the source, and connects it to related notes.",
  },
  {
    title: "Act on the useful bits",
    description:
      "Get a focused digest with reminders, follow-ups, and ideas worth revisiting.",
  },
];

const seoFeatures = [
  {
    title: "AI note taking for deep work",
    description:
      "Capture research, class notes, meeting ideas, and developer references in a focused smart notes app built for retrieval.",
  },
  {
    title: "Rich text notes with structure",
    description:
      "Use a clean rich text editor to organize headings, lists, drafts, links, and long-form notes without leaving your workspace.",
  },
  {
    title: "AI summarization and key point extraction",
    description:
      "Turn long notes into concise summaries and extract decisions, tasks, facts, dates, and important details.",
  },
  {
    title: "AI writing improvement",
    description:
      "Use Curator as an AI writing assistant to improve clarity, flow, grammar, and tone while preserving your original meaning.",
  },
  {
    title: "Personal knowledge management",
    description:
      "Build a personal knowledge base and second brain app that connects what you save with what you need to act on.",
  },
  {
    title: "Productivity for students and developers",
    description:
      "Create searchable study notes, project notes, learning logs, technical references, and daily knowledge workflows.",
  },
];

const faqItems = [
  {
    question: "What is Curator Notes?",
    answer:
      "Curator Notes is an AI-powered note taking app for capturing ideas, writing rich text notes, summarizing content, extracting key points, and building a personal knowledge base.",
  },
  {
    question: "Who is Curator Notes for?",
    answer:
      "Curator Notes is built for students, developers, founders, researchers, and knowledge workers who want a smarter second brain app.",
  },
  {
    question: "Can Curator Notes improve my writing?",
    answer:
      "Yes. Curator includes an AI writing assistant that can improve grammar, clarity, flow, and readability while keeping your original meaning.",
  },
  {
    question: "Are private notes indexed by search engines?",
    answer:
      "No. Authenticated workspace routes such as notes, settings, and private app pages are marked noindex and are blocked in robots.txt.",
  },
];

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "WebApplication"],
  name: siteConfig.name,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  url: siteConfig.url,
  description: siteConfig.description,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "AI note taking",
    "Rich text notes",
    "AI summarization",
    "AI writing improvement",
    "Key point extraction",
    "Personal knowledge management",
    "Second brain workspace",
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

// Pricing is temporarily hidden from the landing page.
// const pricingPlans = [
//   {
//     name: "Starter",
//     price: "Free",
//     description: "For light capture and personal note cleanup.",
//     features: ["25 captures per month", "Basic AI summaries", "Searchable notes"],
//     cta: "Start free",
//     href: "/signup",
//     highlighted: false,
//   },
//   {
//     name: "Pro",
//     price: "$12",
//     description: "For people who save ideas every day and want them to work.",
//     features: [
//       "Unlimited captures",
//       "Daily smart digest",
//       "AI connections across notes",
//       "Action reminders",
//     ],
//     cta: "Get started",
//     href: "/signup",
//     highlighted: true,
//   },
//   {
//     name: "Team",
//     price: "$29",
//     description: "For teams building a shared research and knowledge habit.",
//     features: [
//       "Shared workspaces",
//       "Team digests",
//       "Role-based access",
//       "Priority support",
//     ],
//     cta: "Create team",
//     href: "/signup",
//     highlighted: false,
//   },
// ];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header className="relative z-20 mx-auto flex w-full items-center justify-between bg-[#30302E] px-5 py-5 sm:px-8 lg:px-16 xl:px-32">
        <Link href="/" className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#D9D6EA] text-[#373785]">
            <FileText size={22} />
          </div>

          <span className="text-2xl font-semibold text-white">Curator</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-12 md:flex">
          <Link href="#features" className="text-lg font-medium text-white">
            Features
          </Link>

          <Link href="#how-it-works" className="text-lg font-medium text-white">
            How it works
          </Link>

          {/* <Link href="#pricing" className="text-lg font-medium text-white">
            Pricing
          </Link> */}
        </nav>

        {/* Actions */}
        <div className="hidden sm:block">
          <AuthNavActions />
        </div>

        <div className="flex items-center gap-3 sm:hidden">
          <AuthNavActions variant="avatar" />

          <details className="group">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white marker:hidden">
              <Menu size={22} />
            </summary>
            <div className="absolute left-5 right-5 top-[76px] rounded-lg border border-white/10 bg-[#252523] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
              <nav className="mb-4 grid gap-2">
                <Link
                  href="#features"
                  className="rounded-lg px-3 py-3 text-sm font-bold text-white hover:bg-white/5"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="rounded-lg px-3 py-3 text-sm font-bold text-white hover:bg-white/5"
                >
                  How it works
                </Link>
                {/* <Link
                  href="#pricing"
                  className="rounded-lg px-3 py-3 text-sm font-bold text-white hover:bg-white/5"
                >
                  Pricing
                </Link> */}
              </nav>
              <AuthNavActions variant="mobileMenu" />
            </div>
          </details>
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-84px)] w-full items-center justify-center gap-10 bg-[#1F1F1E] px-5 pb-12 pt-10 sm:px-8 lg:pb-16">
        <div className="flex w-full flex-col items-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#EEEDFE] px-3 py-2 text-sm font-bold text-slate-600 shadow-sm sm:text-base">
            <Sparkles size={16} className="text-amber-500" />
            AI notes app for your second brain
          </div>

          <h1 className="max-w-4xl text-center text-4xl font-bold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
            AI note taking for people who want to start knowing.
          </h1>

          <p className="mt-6 max-w-2xl text-center text-lg leading-8 text-white font-semibold">
            Curator Notes is a smart notes app for rich text notes, AI
            summaries, writing improvement, key point extraction, and personal
            knowledge management.
          </p>

          <div className="mt-9 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <AuthAwareCta
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1F1F1E] border px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20"
            >
              Start for free - no card needed
            </AuthAwareCta>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-[#1F1F1E] px-5 py-3 text-sm font-semibold text-white  shadow-sm"
            >
              See how it works
            </Link>
          </div>

          <p className="mt-6 max-w-2xl text-center text-lg leading-8 text-white font-semibold">
            Join 2,400+ people who stopped hoarding and started knowing
          </p>
        </div>
      </section>

      <section
        id="how-it-works"
        className="bg-[#1F1F1E] px-5 py-20 sm:px-8 lg:px-16"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="text-white">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#D9D6EA]">
              <Sparkles size={16} />
              How it works
            </div>
            <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
              From saved link to useful knowledge in minutes.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#C6C4BD]">
              Curator turns your messy stream of saved material into a small,
              readable workflow you can keep up with.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-lg border border-white/10 bg-[#282826] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
              >
                <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-lg bg-[#D9D6EA] text-base font-black text-[#373785]">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold leading-snug text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#B8B6AF]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[calc(100vh-110px)] items-center justify-center bg-[#1F1F1E] px-5 py-10">
        <div className="w-full max-w-7xl overflow-hidden rounded-lg border border-white/10 bg-[#252523] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          {/* Browser Bar */}
          <div className="flex h-16 items-center border-b border-white/10 px-4 sm:h-20 sm:px-8">
            <div className="flex gap-3">
              <span className="h-3 w-3 rounded-full bg-[#6A6964] sm:h-4 sm:w-4" />
              <span className="h-3 w-3 rounded-full bg-[#6A6964] sm:h-4 sm:w-4" />
              <span className="h-3 w-3 rounded-full bg-[#6A6964] sm:h-4 sm:w-4" />
            </div>

            <div className="flex flex-1 justify-center">
              <div className="rounded-full border border-white/10 bg-[#2C2C29] px-4 py-2 text-xs text-[#9C9B96] sm:px-8 sm:text-lg">
                curator.app/home
              </div>
            </div>
          </div>

          <div className="grid min-h-[680px] lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <aside className="hidden border-r border-white/10 bg-[#222220] px-6 py-6 lg:block">
              <nav className="space-y-2">
                {["Home", "Inbox", "Digest", "Notes"].map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center rounded-2xl px-4 py-4 text-xl ${
                      i === 0
                        ? "border border-white/10 bg-[#2B2B29] text-white"
                        : "text-[#C0BEB8]"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </nav>

              <div className="mt-14">
                <p className="mb-6 text-sm uppercase tracking-wider text-[#8B8A84]">
                  Recent
                </p>

                <div className="space-y-8">
                  <div>
                    <p className="text-2xl font-semibold text-white">
                      Product roadmap
                    </p>
                    <p className="text-[#9C9B96]">AI search, voice notes...</p>
                  </div>

                  <div>
                    <p className="text-2xl font-semibold text-white">
                      Freelance ideas
                    </p>
                    <p className="text-[#9C9B96]">Fiverr, Upwork, portfolio</p>
                  </div>

                  <div>
                    <p className="text-2xl font-semibold text-white">
                      SaaS pricing
                    </p>
                    <p className="text-[#9C9B96]">Free → Pro → Team...</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className="bg-[#2A2A28] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
              <h2 className="text-3xl font-bold text-white sm:text-5xl lg:text-6xl">
                Good morning, Siddharth
              </h2>

              <div className="mt-5 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <p className="text-base text-[#9D9C96] sm:text-2xl">
                  Friday, June 5 · Your digest is ready
                </p>
              </div>

              {/* Digest Card */}
              <div className="mt-10 max-w-4xl rounded-lg bg-[#D9D6EA] p-5 sm:p-8">
                <h3 className="text-xl font-semibold text-[#4A4699] sm:text-3xl">
                  ✦ This week&apos;s digest — 3 things that matter
                </h3>

                <div className="mt-6 space-y-5 text-base text-[#4A4699] sm:text-2xl">
                  <p>
                    → You saved 14 items. 4 are actually useful to you right
                    now.
                  </p>
                  <p>→ 2 tasks you said you&apos;d do — still pending.</p>
                  <p>
                    → Your note from March connects to something you saved
                    yesterday.
                  </p>
                </div>
              </div>

              <p className="mt-10 max-w-5xl text-xl leading-relaxed text-[#C6C4BD] sm:text-3xl">
                You captured 3 notes, 2 links, and 1 PDF this week. Curator read
                them so you don&apos;t have to.
              </p>
            </main>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="bg-[#1F1F1E] px-5 py-20 sm:px-8 lg:px-16"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
          <div className="flex flex-col gap-5 text-white lg:max-w-3xl">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#D9D6EA]">
              <Layers3 size={16} />
              Built for active knowledge
            </div>
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
              What makes Curator different
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-[#C6C4BD] sm:text-xl">
              Every other notes app is passive storage. Curator is designed to
              read, connect, and nudge your saved knowledge back into motion.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {data.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group flex min-h-[300px] flex-col justify-between rounded-lg border border-white/10 bg-[#282826] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-[#D9D6EA]/45 hover:bg-[#2F2F2C]"
                >
                  <div>
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-[#D9D6EA] text-[#373785] shadow-sm">
                        <Icon size={24} strokeWidth={2.2} />
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#9C9B96]">
                        {item.stat}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-[#B8B6AF]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#D9D6EA]">
                    <span>Learn more</span>
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#1F1F1E] px-5 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
          <div className="flex flex-col gap-5 text-white lg:max-w-3xl">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#D9D6EA]">
              <WandSparkles size={16} />
              AI productivity tool
            </div>
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
              Built for notes, writing, and personal knowledge management
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-[#C6C4BD] sm:text-xl">
              Curator combines a note taking app, AI writing assistant, and
              knowledge management app into one focused workspace.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {seoFeatures.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-white/10 bg-[#282826] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
              >
                <h3 className="text-xl font-bold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#B8B6AF]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1F1F1E] px-5 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
          <div className="flex flex-col gap-5 text-white lg:max-w-3xl">
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
              Frequently asked questions
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-[#C6C4BD] sm:text-xl">
              Quick answers about Curator Notes, AI note taking, and privacy.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <article
                key={item.question}
                className="rounded-lg border border-white/10 bg-[#282826] p-6"
              >
                <h3 className="text-xl font-bold text-white">
                  {item.question}
                </h3>
                <p className="mt-3 text-base leading-7 text-[#B8B6AF]">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* <section
        id="pricing"
        className="bg-[#1F1F1E] px-5 py-20 sm:px-8 lg:px-16"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
          <div className="flex flex-col gap-5 text-white lg:max-w-3xl">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#D9D6EA]">
              <CalendarCheck size={16} />
              Pricing
            </div>
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
              Simple plans for better follow-through
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-[#C6C4BD] sm:text-xl">
              Start free, then upgrade when your saved knowledge needs a real
              operating system.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`flex min-h-[460px] flex-col rounded-lg border p-7 shadow-[0_18px_50px_rgba(0,0,0,0.22)] ${
                  plan.highlighted
                    ? "border-[#D9D6EA]/60 bg-[#D9D6EA] text-[#232244]"
                    : "border-white/10 bg-[#282826] text-white"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p
                      className={`mt-3 text-base leading-7 ${
                        plan.highlighted ? "text-[#4A4699]" : "text-[#B8B6AF]"
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>
                  {plan.highlighted ? (
                    <span className="rounded-full bg-[#373785] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      Popular
                    </span>
                  ) : null}
                </div>

                <div className="mt-9 flex items-end gap-2">
                  <span className="text-5xl font-black">{plan.price}</span>
                  {plan.price !== "Free" ? (
                    <span
                      className={`pb-2 text-base font-semibold ${
                        plan.highlighted
                          ? "text-[#4A4699]"
                          : "text-[#9C9B96]"
                      }`}
                    >
                      / month
                    </span>
                  ) : null}
                </div>

                <ul className="mt-9 flex flex-1 flex-col gap-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-base">
                      <Check
                        size={19}
                        className={
                          plan.highlighted ? "text-[#373785]" : "text-[#D9D6EA]"
                        }
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`mt-9 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-bold transition ${
                    plan.highlighted
                      ? "bg-[#373785] text-white hover:bg-[#2E2E73]"
                      : "border border-white/10 bg-white/5 text-white hover:border-[#D9D6EA]/45"
                  }`}
                >
                  {plan.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section> */}
      <footer className="bg-[#1F1F1E] px-5 py-10 sm:px-8 lg:px-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-white/10 pt-8 text-sm text-[#9C9B96] md:flex-row md:items-center md:justify-between">
          <p>© 2026 Curator Notes. AI-powered notes for deep work.</p>
          <nav className="flex flex-wrap gap-4">
            <Link href="/features" className="hover:text-white">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
