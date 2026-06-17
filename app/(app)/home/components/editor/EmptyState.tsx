import {
  NotebookPen,
  Sparkles,
  FileText,
  Blocks,
  SearchCode,
  Pencil,
} from "lucide-react";

const data = [
  {
    title: "AI Summaries",
    description:
      "Instant synthesis of your longest thoughts into actionable insights.",
    icon: FileText,
  },
  {
    title: "Smart Organization",
    description: "Automatic tagging and linking between related concepts.",
    icon: Blocks,
  },
  {
    title: "Semantic Search",
    description: "Find what you mean, not just what you wrote.",
    icon: SearchCode,
  },
  {
    title: "Rich Experience",
    description: "A distraction-free editor with markdown and LaTeX support.",
    icon: Pencil,
  },
];

type EmptyStateProps = {
  onCreateNote: () => void;
};

const EmptyState = ({ onCreateNote }: EmptyStateProps) => {
  return (
    <>
      <div className="flex items-center justify-between border-b border-white/10 bg-[#252523] px-6 py-4">
        <div className="text-4xl font-bold text-white">
          Editor Workspace
        </div>
      </div>
      <div className="mx-auto flex min-h-full max-w-7xl flex-col items-center bg-[#1F1F1E] px-8 py-10 text-white">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-extrabold mb-4">
            Your thinking starts here.
          </h1>
          <p className="text-lg leading-8 text-[#C6C4BD]">
            Capture ideas, organize knowledge, and build your personal
            intellectual workspace. Experience the clarity of a quiet interface
            designed for deep work.
          </p>
          <div className="w-full flex justify-around mt-10">
            <button
              onClick={onCreateNote}
              className="flex cursor-pointer items-center gap-4 rounded-lg bg-[#D9D6EA] px-8 py-4 text-lg font-bold text-[#373785] transition hover:bg-[#C9C5E8]"
            >
              <NotebookPen /> Create First Note
            </button>
            <button className="flex cursor-pointer items-center gap-4 rounded-lg border border-white/10 px-8 py-2 text-lg font-bold text-white transition hover:border-[#D9D6EA]/45 hover:bg-white/5">
              <Sparkles />
              Generate with AI
            </button>
          </div>
        </div>

        <div className="mt-16 grid w-full grid-cols-4 gap-6">
          {data.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-lg border border-white/10 bg-[#282826] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
              >
                <div className="mb-5 w-fit rounded-lg bg-[#D9D6EA] p-4">
                  <Icon className="h-6 w-6 text-[#373785]" />
                </div>

                <h2 className="mb-3 text-2xl font-bold text-white">
                  {item.title}
                </h2>

                <p className="text-lg leading-relaxed text-[#B8B6AF]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EmptyState;
