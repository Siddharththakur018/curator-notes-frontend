"use client";

import { useEffect, useState } from "react";
import EditorArea from "./editor/EditorArea";
import NotesListPanel from "./editor/NotesListPanel";
import { getAllNotes, getNoteById, updateNote } from "@/services/notes.service";
import { Note } from "@/types/notes";

const NotesWorkspace = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newNoteTrigger, setNewNoteTrigger] = useState(0)

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsCreatingNote(true);
    setNewNoteTrigger(prev => prev + 1)
  };

  const handleUpdateNote = async (id: string) => {
    try {
      const response = await getNoteById(id);
      setIsCreatingNote(false);
      setSelectedNote(response.data.note);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    const note = notes.find((item) => item.id === id);
    if (!note) return;

    const nextNote = {
      ...note,
      isFavorite: !note.isFavorite,
    };

    setNotes((prev) => prev.map((item) => (item.id === id ? nextNote : item)));
    if (selectedNote?.id === id) setSelectedNote(nextNote);

    try {
      const response = await updateNote(id, {
        title: nextNote.title,
        content: nextNote.content,
        previewText: nextNote.previewText,
        isFavorite: nextNote.isFavorite,
        isArchived: nextNote.isArchived,
      });
      const updatedNote = {
        ...nextNote,
        ...(response.data.note ?? {}),
      };

      setNotes((prev) =>
        prev.map((item) => (item.id === id ? updatedNote : item)),
      );
      if (selectedNote?.id === id) setSelectedNote(updatedNote);
    } catch (error) {
      console.error(error);
      setNotes((prev) => prev.map((item) => (item.id === id ? note : item)));
      if (selectedNote?.id === id) setSelectedNote(note);
    }
  };

  const handleToggleArchive = async (id: string) => {
    const note = notes.find((item) => item.id === id);
    if (!note) return;

    const nextNote = {
      ...note,
      isArchived: !note.isArchived,
    };

    setNotes((prev) => prev.map((item) => (item.id === id ? nextNote : item)));
    if (selectedNote?.id === id) setSelectedNote(nextNote);

    try {
      const response = await updateNote(id, {
        title: nextNote.title,
        content: nextNote.content,
        previewText: nextNote.previewText,
        isFavorite: nextNote.isFavorite,
        isArchived: nextNote.isArchived,
      });
      const updatedNote = {
        ...nextNote,
        ...(response.data.note ?? {}),
      };

      setNotes((prev) =>
        prev.map((item) => (item.id === id ? updatedNote : item)),
      );
      if (selectedNote?.id === id) setSelectedNote(updatedNote);
    } catch (error) {
      console.error(error);
      setNotes((prev) => prev.map((item) => (item.id === id ? note : item)));
      if (selectedNote?.id === id) setSelectedNote(note);
    }
  };

  useEffect(() => {
    getAllNotes()
      .then((response) => {
        setNotes(response.data.notes ?? []);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
}, [isCreatingNote]);
  return (
    <div className="flex h-full min-h-0">
      <div className="w-[400px] border-r border-gray-200 bg-[#FAFAFB]">
        <NotesListPanel
          notes={notes}
          loading={loading}
          onSelectNote={handleUpdateNote}
          onToggleArchive={handleToggleArchive}
          onToggleFavorite={handleToggleFavorite}
          onCreateNote={handleCreateNote}
        />
      </div>
      <div className="min-w-0 flex-1">
        <EditorArea setNotes={setNotes} selectedNote={selectedNote} isCreatingNote={isCreatingNote} newNoteTrigger={newNoteTrigger}/>
      </div>
    </div>
  );
};

export default NotesWorkspace;
