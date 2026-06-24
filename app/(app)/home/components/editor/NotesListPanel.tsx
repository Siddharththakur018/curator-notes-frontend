import { useMemo, useState } from "react";
import {
  BookOpenText,
  Coins,
  FileText,
  LogOut,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/useAuth";
import { Note } from "@/types/notes";
import Searchbar from "./Searchbar";
import { showErrorToast } from "@/utils/toast";

type Props = {
  notes: Note[];
  loading: boolean;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
  search: string;
  setSearch: (value: string) => void;
  onCloseSidebar?: () => void;
};

const NotesListPanel: React.FC<Props> = ({
  notes,
  loading,
  onSelectNote,
  onCreateNote,
  search,
  setSearch,
  onCloseSidebar,
}) => {
  const { appUser } = useAuth();
  const totalAiCredits = 1000;
  const remainingAiCredits = Math.max(0, appUser?.aiCredits ?? 0);
  const usedAiCredits = Math.max(0, totalAiCredits - remainingAiCredits);
  const creditPercent = Math.min(
    100,
    Math.max(0, (remainingAiCredits / totalAiCredits) * 100),
  );

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => !note.isArchived);
  }, [notes]);

  const visibleCount = filteredNotes.length;

  return (
    <section className="flex h-full min-h-0 flex-col bg-[#252523]">
      <div className="border-b border-white/10 bg-[#252523] px-5 py-4">
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <p className="text-sm font-bold uppercase tracking-wide text-[#D9D6EA]">
            Workspace
          </p>
          <button
            type="button"
            aria-label="Close notes sidebar"
            onClick={onCloseSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#C6C4BD] transition hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-5 flex items-center gap-3 rounded-lg border border-white/10 bg-[#2A2A28] p-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#D9D6EA] shadow-sm">
            <Sparkles className="h-5 w-5 text-[#373785]" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-bold leading-6 text-white">
              Curator
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8B8A84]">
              Notes workspace
            </p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-[#D9D6EA]">
              Library
            </p>
            <h1 className="mt-1 text-2xl font-bold text-white">Notes</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onCreateNote}
              className="cursor-pointer rounded-lg bg-[#D9D6EA] px-3 py-2 text-sm font-bold text-[#373785] transition hover:bg-[#C9C5E8]"
            >
              New Note
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <BookOpenText className="h-5 w-5 text-[#D9D6EA]" />
            </div>
          </div>
        </div>

        <Searchbar search={search} setSearch={setSearch} />
      </div>

      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-[#D9D6EA]" />
        </div>
      ) : notes.length > 0 ? (
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          <div className="mb-3 flex items-center justify-between px-2">
            <p className="text-xs font-semibold uppercase text-[#8B8A84]">
              Recent notes
            </p>
            <span className="rounded-md bg-[#2A2A28] px-2 py-1 text-xs font-medium text-[#B8B6AF] ring-1 ring-white/10">
              {visibleCount}
            </span>
          </div>

          {filteredNotes.length > 0 ? (
            <div className="space-y-2">
              {filteredNotes.map((note) => {
                return (
                  <article
                    key={note.id}
                    onClick={() => onSelectNote(note.id)}
                    className="group cursor-pointer rounded-lg border border-white/10 bg-[#2A2A28] p-3 shadow-sm transition-colors hover:border-[#D9D6EA]/45 hover:bg-[#30302E]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1F1F1E] text-[#8B8A84] transition-colors group-hover:bg-[#D9D6EA] group-hover:text-[#373785]">
                        <FileText className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-start gap-2">
                          <h2 className="min-w-0 flex-1 truncate text-sm font-semibold text-white">
                            {note.title || "Untitled"}
                          </h2>
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm leading-5 text-[#9C9B96]">
                          {note.previewText}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-white/10 bg-[#2A2A28] px-6 text-center">
              <p className="text-sm leading-6 text-[#9C9B96]">
                No notes match this view yet.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center px-8">
          <div className="mx-auto max-w-64 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg border border-white/10 bg-[#2A2A28] shadow-sm">
              <BookOpenText className="h-8 w-8 text-[#D9D6EA]" />
            </div>
            <p className="text-base font-semibold text-white">
              No notes yet
            </p>
            <p className="mt-2 text-sm leading-6 text-[#9C9B96]">
              Your collection of thoughts will appear here once you start
              writing.
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-white/10 bg-[#252523] px-5 py-4">
        <div className="mb-3 rounded-lg border border-white/10 bg-[#2A2A28] p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D9D6EA] text-[#373785]">
                <Coins className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI credits</p>
                <p className="text-xs text-[#8B8A84]">{usedAiCredits} used</p>
              </div>
            </div>
            <p className="text-sm font-bold text-[#D9D6EA]">
              {remainingAiCredits}/{totalAiCredits}
            </p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#1F1F1E]">
            <div
              className="h-full rounded-full bg-[#D9D6EA] transition-all"
              style={{ width: `${creditPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-[#2A2A28] p-3">
          <Link
            href="/settings"
            aria-label="Settings"
            title="Settings"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1F1F1E] text-[#D9D6EA] ring-1 ring-white/10 transition-colors hover:bg-[#D9D6EA] hover:text-[#373785]"
          >
            <Settings className="h-4 w-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              Curator Notes
            </p>
            <p className="text-xs text-[#8B8A84]">Personal knowledge base</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotesListPanel;
