"use client";

import { useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import {
  ChevronDown,
  Check,
  Copy,
  ListChecks,
  Loader2,
  Plus,
  Replace,
  Sparkles,
  TextQuote,
  WandSparkles,
  X,
} from "lucide-react";

import { ToolbarButton } from "./ToolbarButton";
import { Icons } from "./icons";
import { aiAssist } from "@/services/gemini.service";
import { showErrorToast } from "@/utils/toast";

type Props = {
  editor: Editor;
};

type AiAction = "summarize" | "improve" | "extract";

type AiSuggestion = {
  action: AiAction;
  result: string;
};

const Sep = () => <div className="w-px h-5 bg-neutral-200 mx-1 shrink-0" />;

export const Toolbar = ({ editor }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestion, setSuggestion] = useState<AiSuggestion | null>(null);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const actions: {
    label: string;
    description: string;
    action: AiAction;
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

  const actionLabel: Record<AiAction, string> = {
    summarize: "Summary",
    improve: "Improved draft",
    extract: "Key points",
  };

  const getAiResult = (payload: unknown): string => {
    if (typeof payload === "string") return payload;

    if (payload && typeof payload === "object") {
      const data = payload as Record<string, unknown>;
      const possibleKeys = ["result", "response", "text", "content", "message", "data"];

      for (const key of possibleKeys) {
        const value = data[key];

        if (typeof value === "string") return value;

        if (value && typeof value === "object") {
          const nested = getAiResult(value);

          if (nested) return nested;
        }
      }
    }

    return "";
  };

  const toEditorHtml = (text: string) => {
    const escapeHtml = (value: string) =>
      value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    return text
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br />")}</p>`)
      .join("");
  };

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
      const result = getAiResult(response).trim();

      if (!result) {
        showErrorToast("AI Assistant returned an empty response.");
        return;
      }

      setSuggestion({ action, result });
    } catch (error) {
      console.error(error);
      showErrorToast(error, {
        fallback: "AI Assistant could not complete that request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!suggestion) return;

    await navigator.clipboard.writeText(suggestion.result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const handleInsert = () => {
    if (!suggestion) return;

    editor.chain().focus().insertContent(toEditorHtml(suggestion.result)).run();
  };

  const handleReplace = () => {
    if (!suggestion) return;

    editor.commands.setContent(toEditorHtml(suggestion.result));
    editor.commands.focus();
  };

  return (
    <div className="border-b border-neutral-100 bg-white">
      <div
        className="flex items-center flex-wrap gap-0.5 px-3 py-1.5"
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

      {suggestion && (
        <div className="px-3 pb-3">
          <div className="overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-b from-blue-50/80 to-white shadow-sm">
            <div className="flex items-start justify-between gap-3 border-b border-blue-100/80 px-4 py-3">
              <div className="flex min-w-0 items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-white shadow-sm shadow-blue-900/15">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-950">
                    {actionLabel[suggestion.action]}
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-500">
                    Review it, then copy it or add it to your note.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSuggestion(null)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white hover:text-slate-700"
                aria-label="Dismiss AI suggestion"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto px-4 py-3">
              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {suggestion.result}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 bg-white px-4 py-3">
              <button
                type="button"
                onClick={handleCopy}
                className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>

              <button
                type="button"
                onClick={handleInsert}
                className="flex h-8 items-center gap-1.5 rounded-lg border border-blue-200 px-2.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-50"
              >
                <Plus className="h-3.5 w-3.5" />
                Insert
              </button>

              <button
                type="button"
                onClick={handleReplace}
                className="flex h-8 items-center gap-1.5 rounded-lg bg-blue-700 px-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-800"
              >
                <Replace className="h-3.5 w-3.5" />
                Replace note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
