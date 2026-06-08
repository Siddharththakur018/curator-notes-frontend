import {
  ArrowRight,
  BookOpenText,
  FileText,
  Layers3,
  LockKeyhole,
  Search,
  Sparkles,
  BookImage,
} from "lucide-react";
import Link from "next/link";

const data = [
  {
    icon: BookImage,
    title: "Universal capture",
    description:
      "Paste a URL, screenshot, PDF, tweet or voice note. AI digests it instantly.",
  },
  {
    icon: BookImage,
    title: "Universal capture",
    description:
      "Paste a URL, screenshot, PDF, tweet or voice note. AI digests it instantly.",
  },
  {
    icon: BookImage,
    title: "Universal capture",
    description:
      "Paste a URL, screenshot, PDF, tweet or voice note. AI digests it instantly.",
  },
  {
    icon: BookImage,
    title: "Universal capture",
    description:
      "Paste a URL, screenshot, PDF, tweet or voice note. AI digests it instantly.",
  },
  {
    icon: BookImage,
    title: "Universal capture",
    description:
      "Paste a URL, screenshot, PDF, tweet or voice note. AI digests it instantly.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <header className="mx-auto flex w-full  items-center justify-between px-32 py-6 bg-[#30302E]">
        <Link href="/" className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
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

          <Link href="#pricing" className="text-lg font-medium text-white">
            Pricing
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="rounded-2xl border border-slate-300 px-8 py-4 text-lg font-semibold text-white"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            className="rounded-2xl border border-slate-300 px-8 py-4 text-lg font-semibold text-white"
          >
            Get started free
          </Link>
        </div>
      </header>

      <section className="mx-auto justify-center flex bg-[#1F1F1E] min-h-[calc(100vh-110px)] w-full  items-center gap-10 px-5 pb-12 pt-8 sm:px-8 lg:pb-16">
        <div className="w-full items-center flex flex-col">
          <div className="mb-6 inline-flex items-center gap-2 border font-bold border-slate-200 bg-[#EEEDFE] rounded-full px-3 py-2 text-md text-slate-600 shadow-sm">
            <Sparkles size={16} className="text-amber-500" />
            Your second brain, but it actually works
          </div>

          <h1 className="max-w-4xl text-2xl text-white font-bold leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
            Stop saving. <span className="text-[#373785]">Start knowing.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-center text-lg leading-8 text-white font-semibold">
            You bookmark 200 things and use none of them. Curator captures
            everything you save, digests it for you every morning, and reminds
            you to actually act on it.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1F1F1E] border px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20"
            >
              Start for free - no card needed
            </Link>
            <Link
              href="/login"
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

      <section className="flex min-h-[calc(100vh-110px)] items-center justify-center bg-[#1F1F1E] px-5 py-10">
        <div className="w-full max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-[#252523] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          {/* Browser Bar */}
          <div className="flex h-20 items-center border-b border-white/10 px-8">
            <div className="flex gap-3">
              <span className="h-4 w-4 rounded-full bg-[#6A6964]" />
              <span className="h-4 w-4 rounded-full bg-[#6A6964]" />
              <span className="h-4 w-4 rounded-full bg-[#6A6964]" />
            </div>

            <div className="flex flex-1 justify-center">
              <div className="rounded-full border border-white/10 bg-[#2C2C29] px-8 py-2 text-lg text-[#9C9B96]">
                curator.app/home
              </div>
            </div>
          </div>

          <div className="grid min-h-[680px] grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <aside className="border-r border-white/10 bg-[#222220] px-6 py-6">
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
            <main className="bg-[#2A2A28] px-12 py-12">
              <h1 className="text-6xl font-bold text-white">
                Good morning, Siddharth
              </h1>

              <div className="mt-5 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <p className="text-2xl text-[#9D9C96]">
                  Friday, June 5 · Your digest is ready
                </p>
              </div>

              {/* Digest Card */}
              <div className="mt-10 max-w-4xl rounded-[24px] bg-[#D9D6EA] p-8">
                <h3 className="text-3xl font-semibold text-[#4A4699]">
                  ✦ This week's digest — 3 things that matter
                </h3>

                <div className="mt-6 space-y-5 text-2xl text-[#4A4699]">
                  <p>
                    → You saved 14 items. 4 are actually useful to you right
                    now.
                  </p>
                  <p>→ 2 tasks you said you'd do — still pending.</p>
                  <p>
                    → Your note from March connects to something you saved
                    yesterday.
                  </p>
                </div>
              </div>

              <p className="mt-10 max-w-5xl text-3xl leading-relaxed text-[#C6C4BD]">
                You captured 3 notes, 2 links, and 1 PDF this week. Curator read
                them so you don't have to.
              </p>
            </main>
          </div>
        </div>
      </section>

      <section className="flex flex-col min-h-full items-center justify-center bg-[#1F1F1E] px-5 py-10">
        <div className="flex items-center flex-col text-white ">
          <p className="text-5xl font-bold mb-4">
            What makes Curator different
          </p>
          <p className="text-3xl">
            Every other notes app is passive storage. Curator is active.
          </p>
        </div>

        <div className="grid grid-cols-3">
          {data.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index}>
                <Icon size={64} />
                <h1>{item.title}</h1>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
