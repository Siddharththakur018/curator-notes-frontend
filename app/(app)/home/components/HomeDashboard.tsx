"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/context/useAuth";
import { getAllNotes } from "@/services/notes.service";
import { Note } from "@/types/notes";
import AppNavSidebar from "./AppNavSidebar";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const HomeDashboard = () => {
  const { appUser } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getAllNotes()
      .then((response) => {
        if (!cancelled) setNotes(response.data.notes ?? []);
      })
      .catch(() => {
        if (!cancelled) setNotes([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const activeNotes = useMemo(
    () => notes.filter((note) => !note.isArchived),
    [notes],
  );
  const favoriteCount = useMemo(
    () => activeNotes.filter((note) => note.isFavorite).length,
    [activeNotes],
  );
  const mostRecentNote = activeNotes[0] ?? null;

  const firstName = appUser?.name?.split(" ")[0] || "there";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex h-full min-h-0">
      <AppNavSidebar />

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {getGreeting()}, {firstName}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-sm text-[#9C9B96]">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>
              {today}
              {!loading &&
                ` · ${activeNotes.length} note${activeNotes.length === 1 ? "" : "s"} in your workspace`}
            </span>
          </div>

          {!loading ? (
            <div className="mt-10 rounded-lg border border-white/10 bg-[#D9D6EA] p-8 text-[#2A2A50]">
              <p className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className="h-5 w-5" />
                Your notes at a glance
              </p>

              <ul className="mt-5 space-y-3 text-[15px]">
                <li className="flex gap-2">
                  <span aria-hidden>→</span>
                  <span>
                    You have <strong>{activeNotes.length}</strong> note
                    {activeNotes.length === 1 ? "" : "s"} in your workspace.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden>→</span>
                  <span>
                    <strong>{favoriteCount}</strong> marked as favorite
                    {favoriteCount === 1 ? "" : "s"}.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden>→</span>
                  <span>
                    {mostRecentNote ? (
                      <>
                        Last edited: <strong>{mostRecentNote.title || "Untitled"}</strong>
                      </>
                    ) : (
                      "Nothing saved yet — start your first note."
                    )}
                  </span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="mt-10 h-40 animate-pulse rounded-lg border border-white/10 bg-[#252523]" />
          )}

          <p className="mt-10 max-w-2xl text-lg leading-8 text-[#C6C4BD]">
            {activeNotes.length > 0 ? (
              <>
                You&apos;ve captured {activeNotes.length} note
                {activeNotes.length === 1 ? "" : "s"} so far. Head to{" "}
                <Link href="/notes" className="font-semibold text-[#D9D6EA] hover:underline">
                  Notes
                </Link>{" "}
                to keep writing.
              </>
            ) : (
              <>
                You haven&apos;t captured any notes yet. Head to{" "}
                <Link href="/notes" className="font-semibold text-[#D9D6EA] hover:underline">
                  Notes
                </Link>{" "}
                to write your first one.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
