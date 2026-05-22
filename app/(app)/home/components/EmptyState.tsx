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
    <div className="mx-auto flex min-h-full max-w-7xl flex-col items-center px-8 py-10">
      <div className="max-w-lg text-center">
        <h1 className="text-4xl font-extrabold mb-4">
          Your thinking starts here.
        </h1>
        <p className="text-lg">
          Capture ideas, organize knowledge, and build your personal
          intellectual workspace. Experience the clarity of a quiet interface
          designed for deep work.
        </p>
        <div className="w-full flex justify-around mt-10">
          <button
            onClick={onCreateNote}
            className="bg-blue-800 text-white font-bold px-8 py-4 rounded-md cursor-pointer flex items-center gap-4 text-lg"
          >
            <NotebookPen /> Create First Note
          </button>
          <button className="font-bold px-8 py-2 border flex items-center gap-4 rounded-md cursor-pointer text-lg">
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
              className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm"
            >
              <div className="bg-blue-100 w-fit p-4 rounded-2xl mb-5">
                <Icon className="w-6 h-6 text-blue-700" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {item.title}
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmptyState;
