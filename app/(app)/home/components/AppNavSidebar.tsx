"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Home,
  Inbox,
  Newspaper,
  Settings,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import { getAllNotes } from "@/services/notes.service";
import { Note } from "@/types/notes";
import AiCreditsCard from "./AiCreditsCard";

export type NavKey = "home" | "inbox" | "digest" | "notes";

const NAV_ITEMS: { key: NavKey; label: string; href: string; icon: LucideIcon }[] = [
  { key: "home", label: "Home", href: "/home", icon: Home },
  { key: "inbox", label: "Inbox", href: "/inbox", icon: Inbox },
  { key: "digest", label: "Digest", href: "/digest", icon: Newspaper },
  { key: "notes", label: "Notes", href: "/notes", icon: FileText },
];

const AppNavSidebar = () => {
  const pathname = usePathname();
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getAllNotes()
      .then((response) => {
        if (cancelled) return;
        const notes: Note[] = response.data.notes ?? [];
        setRecentNotes(notes.filter((note) => !note.isArchived).slice(0, 3));
      })
      .catch(() => {
        if (!cancelled) setRecentNotes([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <aside className="flex h-full w-[280px] shrink-0 flex-col border-r border-white/10 bg-[#252523]">
      <div className="border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#2A2A28] p-3">
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
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#2A2A28] text-white ring-1 ring-white/10"
                    : "text-[#9C9B96] hover:bg-[#2A2A28]/60 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-[#8B8A84]">
            Recent
          </p>

          {loading ? (
            <p className="px-2 text-sm text-[#8B8A84]">Loading…</p>
          ) : recentNotes.length > 0 ? (
            <div className="space-y-4">
              {recentNotes.map((note) => (
                <Link key={note.id} href="/notes" className="block px-2">
                  <p className="truncate text-sm font-bold text-white">
                    {note.title || "Untitled"}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-[#8B8A84]">
                    {note.previewText || "No content yet"}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="px-2 text-sm text-[#8B8A84]">No notes yet.</p>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="mb-3">
          <AiCreditsCard />
        </div>

        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg bg-[#2A2A28] p-3 transition-colors hover:bg-[#30302E]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1F1F1E] text-[#D9D6EA] ring-1 ring-white/10">
            <Settings className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              Curator Notes
            </p>
            <p className="text-xs text-[#8B8A84]">Personal knowledge base</p>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default AppNavSidebar;
