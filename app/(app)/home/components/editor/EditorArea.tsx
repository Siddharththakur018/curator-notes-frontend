"use client";

import { useCallback, useEffect, useState } from "react";
import { EditorContent, setContent, useEditor } from "@tiptap/react";

import { createNote, deleteNote, updateNote } from "@/services/notes.service";

import { editorExtensions } from "./editorExtensions";
import { getWordCount, formatDate } from "./helpers";
import { Toolbar } from "./Toolbar";
import { TopBar } from "./TopBar";
import { StatusBar } from "./StatusBar";
import { useAutosave } from "./useAutosave";

import "./styles.css";
import { Note } from "@/types/notes";

type Props = {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  selectedNote: Note | null;
  isCreatingNote: boolean;
  newNoteTrigger: number;
};

const EditorArea: React.FC<Props> = ({ setNotes, selectedNote, isCreatingNote, newNoteTrigger }) => {
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
          "ProseMirror focus:outline-none min-h-[400px] text-[15px] leading-[1.85] text-neutral-800",
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
    }
  }, [editor, noteId, title]);

  const { triggerAutosave, saveStatus } = useAutosave(handleSave);

  useEffect(() => {
    triggerAutosave();
  }, [title, triggerAutosave]);

  useEffect(() => {
    if (!editor) return;

    if(!selectedNote){
      setTitle("")
      setNoteId(null);

      editor.commands.clearContent();
      return;
    }

    setTitle(selectedNote.title);
    setNoteId(selectedNote.id);

    editor.commands.setContent(selectedNote.content);

    setWordCount(getWordCount(editor.getText()));
  }, [selectedNote,isCreatingNote, editor, newNoteTrigger]);

  if (!editor) return null;

  return (
    <div className="w-full h-full bg-[#FAFAFB] overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col">
          <TopBar saveStatus={saveStatus} />

          <Toolbar editor={editor} />

          <div className="px-10 py-8 flex-1">
            <input
              type="text"
              placeholder="Untitled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                w-full bg-transparent border-none outline-none
                text-[32px] font-semibold tracking-tight
                text-neutral-900 placeholder:text-neutral-300
                leading-tight mb-3
              "
            />

            <div className="flex items-center gap-3 text-xs text-neutral-400 mb-6 pb-5 border-b border-neutral-100">
              <span>{formatDate()}</span>

              <span className="w-1 h-1 rounded-full bg-neutral-300 inline-block" />

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
