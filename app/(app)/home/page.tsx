"use client";

import { useState } from "react";
import NotesWorkspace from "./components/NotesWorkspace";
import EmptyState from "./components/EmptyState";

const HomePage = () => {
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

  return isWorkspaceOpen ? (
    <NotesWorkspace />
  ) : (
    <EmptyState onCreateNote={() => setIsWorkspaceOpen(true)} />
  );
};

export default HomePage;
