"use client";

import { useCallback, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import { createNote, deleteNote, updateNote } from "@/services/notes.service";

import { editorExtensions } from "./editorExtensions";
import { getWordCount, formatDate } from "./helpers";
import { Toolbar } from "./Toolbar";
import { TopBar } from "./TopBar";
import { StatusBar } from "./StatusBar";
import { useAutosave } from "./useAutosave";

import "./styles.css";
import { Note } from "@/types/notes";
import { showErrorToast } from "@/utils/toast";

type Props = {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  selectedNote: Note | null;
  isCreatingNote: boolean;
  newNoteTrigger: number;
};

const EditorArea: React.FC<Props> = ({
  setNotes,
  selectedNote,
  isCreatingNote,
  newNoteTrigger,
}) => {
  const [title, setTitle] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [noteId, setNoteId] = useState<string | null>(null);

  const editor = useEditor({
    extensions: editorExtensions,
    immediatelyRender: true,

    content: "",

    autofocus: true,

    editorProps: {
      attributes: {
        class:
          "ProseMirror focus:outline-none min-h-[400px] text-[15px] leading-[1.85] text-[#E7E5DF]",
      },
    },

    onUpdate: ({ editor }) => {
      setWordCount(getWordCount(editor.getText()));
      triggerAutosave();
    },
  });

  const handleSave = useCallback(async () => {
    if (!editor) return;

    try {
      const payload = {
        title,
        content: editor.getJSON(),
        previewText: editor.getText().slice(0, 100),
        searchText: editor.getText(),
      };

      const text = editor.getText().trim();
      const isEmpty = !text && !title.trim();

      if (!noteId) {
        if (isEmpty) {
          return;
        }
        const response = await createNote(payload);
        const newNote = response.data.note;
        setNoteId(response.data.note.id);
        setNotes((prev) => [newNote, ...prev]);
      } else if (isEmpty) {
        await deleteNote(noteId);

        setNotes((prev) =>
          prev.filter((note) => {
            return note.id !== noteId;
          }),
        );

        setNoteId(null);
        setTitle("");
        editor.commands.clearContent();
      } else {
        const response = await updateNote(noteId, payload);
        const updatedNote = response.data.note;

        setNotes((prev) =>
          prev.map((note) => (note.id === noteId ? updatedNote : note)),
        );
      }
    } catch (error) {
      console.error(error);
      showErrorToast(error, { fallback: "Could not save this note." });
    }
  }, [editor, noteId, setNotes, title]);

  const { triggerAutosave, saveStatus } = useAutosave(handleSave);

  useEffect(() => {
    triggerAutosave();
  }, [title, triggerAutosave]);

  useEffect(() => {
    if (!editor) return;

    const syncSelectedNote = () => {
      if (!selectedNote) {
        setTitle("");
        setNoteId(null);

        editor.commands.clearContent();
        return;
      }

      setTitle(selectedNote.title);
      setNoteId(selectedNote.id);

      editor.commands.setContent(selectedNote.content);

      setWordCount(getWordCount(editor.getText()));
    };

    syncSelectedNote();
  }, [selectedNote, isCreatingNote, editor, newNoteTrigger]);

  if (!editor) return null;

  return (
    <div className="h-full w-full overflow-y-auto bg-[#1F1F1E]">
      <div className="mx-auto max-w-4xl px-6 py-6">
        <div className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#282826] shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <TopBar saveStatus={saveStatus} />

          <Toolbar editor={editor} />

          <div className="flex-1 px-10 py-8">
            <input
              type="text"
              placeholder="Untitled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                w-full bg-transparent border-none outline-none
                text-[32px] font-semibold tracking-tight
                text-white placeholder:text-[#6A6964]
                leading-tight mb-3
              "
            />

            <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-5 text-xs text-[#8B8A84]">
              <span>{formatDate()}</span>

              <span className="inline-block h-1 w-1 rounded-full bg-[#6A6964]" />

              <span>
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </span>
            </div>

            <EditorContent editor={editor} />
          </div>

          <StatusBar
            characters={editor.storage?.characterCount?.characters?.() ?? 0}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorArea;
