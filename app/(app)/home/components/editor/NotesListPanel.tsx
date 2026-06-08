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
    <section className="flex h-full min-h-0 flex-col bg-[#F7F7FB]">
      <div className="border-b border-gray-200 bg-white px-5 py-4">
        <div className="mb-5 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-700 shadow-sm">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-bold leading-6 text-gray-950">
              Curator
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Notes workspace
            </p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-blue-700">
              Library
            </p>
            <h1 className="mt-1 text-2xl font-bold text-gray-950">Notes</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onCreateNote} className="cursor-pointer">
              New Note
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
              <BookOpenText className="h-5 w-5 text-blue-700" />
            </div>
          </div>
        </div>

        <Searchbar search={search} setSearch={setSearch}/>

        <div className="mt-4 grid grid-cols-3 gap-1 rounded-lg bg-gray-100 p-1">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setActiveFilter(option.value)}
                className={`rounded-md px-2 py-2 text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-white text-blue-700 shadow-sm ring-1 ring-gray-200"
                    : "text-gray-500 hover:text-gray-900"
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
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-blue-800" />
        </div>
      ) : notes.length > 0 ? (
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          <div className="mb-3 flex items-center justify-between px-2">
            <p className="text-xs font-semibold uppercase text-gray-500">
              {activeFilter === "favorites"
                ? "Favorite notes"
                : activeFilter === "archived"
                  ? "Archived notes"
                  : "Recent notes"}
            </p>
            <span className="rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-500 ring-1 ring-gray-200">
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
                    className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50/40"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors group-hover:bg-blue-100 group-hover:text-blue-700">
                        <FileText className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-start gap-2">
                          <h2 className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-950">
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
                                  ? "bg-amber-50 text-amber-500"
                                  : "text-gray-400 hover:bg-white hover:text-amber-500"
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
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-400 hover:bg-white hover:text-blue-700"
                              }`}
                            >
                              <ArchiveRestore className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm leading-5 text-gray-500">
                          {note.previewText}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-gray-200 bg-white px-6 text-center">
              <p className="text-sm leading-6 text-gray-500">
                No notes match this view yet.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center px-8">
          <div className="mx-auto max-w-64 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
              <BookOpenText className="h-8 w-8 text-blue-700" />
            </div>
            <p className="text-base font-semibold text-gray-950">
              No notes yet
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Your collection of thoughts will appear here once you start
              writing.
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 bg-white px-5 py-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <Link
            href="/settings"
            aria-label="Settings"
            title="Settings"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-700 ring-1 ring-gray-200 transition-colors hover:bg-blue-50"
          >
            <Settings className="h-4 w-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900">
              Curator Notes
            </p>
            <p className="text-xs text-gray-500">Personal knowledge base</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            aria-label="Log out"
            title="Log out"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-white text-gray-500 ring-1 ring-gray-200 transition-colors hover:bg-red-50 hover:text-red-700 hover:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotesListPanel;
