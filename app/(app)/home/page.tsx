"use client";

import { useEffect, useState } from "react";
import NotesWorkspace from "./components/NotesWorkspace";
import EmptyState from "./components/EmptyState";
import { getAllNotes } from "@/services/notes.service";

const HomePage = () => {
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNotes()
      .then((response) => {
        const notes = response.data.notes ?? [];

        if (notes.length > 0) {
          setIsWorkspaceOpen(true);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center bg-[#FAFAFB]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-800" />
      </div>
    );
  }

  return isWorkspaceOpen ? (
    <NotesWorkspace />
  ) : (
    <EmptyState onCreateNote={() => setIsWorkspaceOpen(true)} />
  );
};

export default HomePage;
