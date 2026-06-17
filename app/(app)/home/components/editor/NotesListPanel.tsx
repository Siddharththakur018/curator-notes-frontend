import { useMemo, useState } from "react";
import {
  ArchiveRestore,
  BookOpenText,
  FileText,
  LogOut,
  Settings,
  Sparkles,
  Star,
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
  onToggleArchive: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onCreateNote: () => void;
  search: string;
  setSearch: (value: string) => void;
};

type NoteFilter = "all" | "favorites" | "archived";

const filterOptions: { label: string; value: NoteFilter }[] = [
  { label: "All", value: "all" },
  { label: "Favorites", value: "favorites" },
  { label: "Archived", value: "archived" },
];

const NotesListPanel: React.FC<Props> = ({
  notes,
  loading,
  onSelectNote,
  onToggleArchive,
  onToggleFavorite,
  onCreateNote,
  search,
  setSearch,
}) => {
  const router = useRouter();
  const { logout } = useAuth();
  const [activeFilter, setActiveFilter] = useState<NoteFilter>("all");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error(error);
      showErrorToast(error, { fallback: "Could not log you out." });
      setIsLoggingOut(false);
    }
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return activeFilter === "favorites"
        ? note.isFavorite
        : activeFilter === "archived"
          ? note.isArchived
          : !note.isArchived;
    });
  }, [activeFilter, notes]);

  const visibleCount = filteredNotes.length;

  return (
    <section className="flex h-full min-h-0 flex-col bg-[#252523]">
      <div className="border-b border-white/10 bg-[#252523] px-5 py-4">
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

        <div className="mt-4 grid grid-cols-3 gap-1 rounded-lg bg-[#1F1F1E] p-1">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setActiveFilter(option.value)}
                className={`rounded-md px-2 py-2 text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-[#D9D6EA] text-[#373785] shadow-sm"
                    : "text-[#8B8A84] hover:text-white"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-[#D9D6EA]" />
        </div>
      ) : notes.length > 0 ? (
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          <div className="mb-3 flex items-center justify-between px-2">
            <p className="text-xs font-semibold uppercase text-[#8B8A84]">
              {activeFilter === "favorites"
                ? "Favorite notes"
                : activeFilter === "archived"
                  ? "Archived notes"
                : "Recent notes"}
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
                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                onToggleFavorite(note.id);
                              }}
                              aria-label={
                                note.isFavorite
                                  ? "Remove from favorites"
                                  : "Add to favorites"
                              }
                              title={
                                note.isFavorite
                                  ? "Remove from favorites"
                                  : "Add to favorites"
                              }
                              className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                                note.isFavorite
                                  ? "bg-amber-400/10 text-amber-300"
                                  : "text-[#8B8A84] hover:bg-white/5 hover:text-amber-300"
                              }`}
                            >
                              <Star
                                className="h-4 w-4"
                                fill={note.isFavorite ? "currentColor" : "none"}
                              />
                            </button>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                onToggleArchive(note.id);
                              }}
                              aria-label={
                                note.isArchived
                                  ? "Restore note"
                                  : "Archive note"
                              }
                              title={
                                note.isArchived
                                  ? "Restore note"
                                  : "Archive note"
                              }
                              className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                                note.isArchived
                                  ? "bg-[#D9D6EA]/10 text-[#D9D6EA]"
                                  : "text-[#8B8A84] hover:bg-white/5 hover:text-[#D9D6EA]"
                              }`}
                            >
                              <ArchiveRestore className="h-4 w-4" />
                            </button>
                          </div>
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
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            aria-label="Log out"
            title="Log out"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#1F1F1E] text-[#8B8A84] ring-1 ring-white/10 transition-colors hover:bg-red-400/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotesListPanel;
