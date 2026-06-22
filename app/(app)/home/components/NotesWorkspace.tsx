"use client";

import { useEffect, useState } from "react";
import EditorArea from "./editor/EditorArea";
import NotesListPanel from "./editor/NotesListPanel";
import { getAllNotes, getNoteById } from "@/services/notes.service";
import { Note } from "@/types/notes";
import { showErrorToast } from "@/utils/toast";
import { Menu } from "lucide-react";

const NotesWorkspace = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newNoteTrigger, setNewNoteTrigger] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsCreatingNote(true);
    setNewNoteTrigger((prev) => prev + 1);
    setIsSidebarOpen(false);
  };

  const handleUpdateNote = async (id: string) => {
    try {
      const response = await getNoteById(id);
      setIsCreatingNote(false);
      setSelectedNote(response.data.note);
      setIsSidebarOpen(false);
    } catch (error) {
      console.error(error);
      showErrorToast(error, { fallback: "Could not open this note." });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);

      try {
        const response = await getAllNotes(debouncedSearch);
        setNotes(response.data.notes ?? []);
      } catch (error) {
        console.error(error);
        showErrorToast(error, { fallback: "Could not load your notes." });
      } finally {
        setLoading(false);
      }
    };

    void loadNotes();
  }, [debouncedSearch]);

  useEffect(() => {}, [isCreatingNote]);
  return (
    <div className="relative flex h-full min-h-0 bg-[#1F1F1E]">
      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Close notes sidebar"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <button
        type="button"
        aria-label="Open notes sidebar"
        onClick={() => setIsSidebarOpen(true)}
        className="fixed left-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#252523] text-white shadow-lg shadow-black/30 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-[min(86vw,400px)] border-r border-white/10 bg-[#252523] transition-transform duration-300 lg:static lg:z-auto lg:w-[400px] lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <NotesListPanel
          notes={notes}
          loading={loading}
          onSelectNote={handleUpdateNote}
          onCreateNote={handleCreateNote}
          search={search}
          setSearch={setSearch}
          onCloseSidebar={() => setIsSidebarOpen(false)}
        />
      </div>
      <div className="min-w-0 flex-1 bg-[#1F1F1E]">
        <EditorArea
          setNotes={setNotes}
          selectedNote={selectedNote}
          isCreatingNote={isCreatingNote}
          newNoteTrigger={newNoteTrigger}
        />
      </div>
    </div>
  );
};

export default NotesWorkspace;
