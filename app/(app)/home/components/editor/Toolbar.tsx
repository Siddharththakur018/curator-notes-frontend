"use client";

import { useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import {
  ChevronDown,
  ListChecks,
  Loader2,
  Sparkles,
  TextQuote,
  WandSparkles,
} from "lucide-react";

import { ToolbarButton } from "./ToolbarButton";
import { Icons } from "./icons";
import { aiAssist } from "@/services/gemini.service";
import { showErrorToast } from "@/utils/toast";

type Props = {
  editor: Editor;
};

const Sep = () => <div className="w-px h-5 bg-neutral-200 mx-1 shrink-0" />;

export const Toolbar = ({ editor }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const actions: {
    label: string;
    description: string;
    action: "summarize" | "improve" | "extract";
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      label: "Summarize",
      description: "Condense the note into a crisp brief.",
      action: "summarize",
      icon: TextQuote,
    },
    {
      label: "Improve writing",
      description: "Polish tone, flow, and clarity.",
      action: "improve",
      icon: WandSparkles,
    },
    {
      label: "Extract key points",
      description: "Pull out the main ideas quickly.",
      action: "extract",
      icon: ListChecks,
    },
  ];

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const handleAiAssist = async (action: "summarize" | "improve" | "extract") => {
    try {
      const text = editor.getText().trim();

      if (!text) {
        showErrorToast("Write something first, then ask AI to help.");
        return;
      }

      setLoading(true);
      setIsOpen(false);

      const response = await aiAssist({ action, text });

      console.log(response);
    } catch (error) {
      console.error(error);
      showErrorToast(error, {
        fallback: "AI Assistant could not complete that request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center flex-wrap gap-0.5 px-3 py-1.5 border-b border-neutral-100 bg-white"
      role="toolbar"
    >
      <ToolbarButton
        title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        <Icons.Bold />
      </ToolbarButton>

      <ToolbarButton
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        <Icons.Italic />
      </ToolbarButton>

      <Sep />

      <ToolbarButton
        title="Bullet List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      >
        <Icons.BulletList />
      </ToolbarButton>

      <div className="relative ml-2" ref={menuRef}>
        <button
          type="button"
          disabled={loading}
          onClick={() => setIsOpen((current) => !current)}
          className="flex h-9 items-center gap-2 rounded-lg border border-blue-200 bg-blue-700 px-3 text-sm font-semibold text-white shadow-sm shadow-blue-900/10 transition-all hover:bg-blue-800 hover:shadow-md hover:shadow-blue-900/15 disabled:cursor-not-allowed disabled:opacity-70"
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/15">
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
          </span>
          <span>{loading ? "Thinking" : "AI Assist"}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && !loading && (
          <div
            className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10"
            role="menu"
          >
            <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-blue-700">
                Curator AI
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-950">
                Shape this note instantly
              </p>
            </div>

            <div className="p-1.5">
              {actions.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.action}
                    type="button"
                    onClick={() => handleAiAssist(item.action)}
                    className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-blue-50"
                    role="menuitem"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-slate-950">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                        {item.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
