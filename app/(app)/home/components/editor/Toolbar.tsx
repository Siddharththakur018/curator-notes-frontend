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
import { useAuth } from "@/context/useAuth";

type Props = {
  editor: Editor;
};

type AiAction = "summarize" | "improve" | "extract";

type AiSuggestion = {
  action: AiAction;
  result: string;
};

const Sep = () => <div className="mx-1 h-5 w-px shrink-0 bg-white/10" />;

export const Toolbar = ({ editor }: Props) => {
  const { setAppUser } = useAuth();
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
      const possibleKeys = [
        "result",
        "response",
        "text",
        "content",
        "message",
        "data",
      ];

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

  const getUpdatedCredits = (payload: unknown): number | null => {
    if (!payload || typeof payload !== "object") return null;

    const data = payload as Record<string, unknown>;

    if (typeof data.aiCredits === "number") return data.aiCredits;

    if (data.user && typeof data.user === "object") {
      const user = data.user as Record<string, unknown>;

      if (typeof user.aiCredits === "number") return user.aiCredits;
    }

    if (data.credits && typeof data.credits === "object") {
      const credits = data.credits as Record<string, unknown>;

      if (typeof credits.remaining === "number") return credits.remaining;
    }

    return null;
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
      .map(
        (paragraph) =>
          `<p>${escapeHtml(paragraph).replace(/\n/g, "<br />")}</p>`,
      )
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

  const handleAiAssist = async (
    action: "summarize" | "improve" | "extract",
  ) => {
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
      const updatedCredits = getUpdatedCredits(response);

      if (updatedCredits !== null) {
        setAppUser((current) =>
          current ? { ...current, aiCredits: updatedCredits } : current,
        );
      }

      if (!result) {
        showErrorToast("AI Assistant returned an empty response.");
        return;
      }

      setSuggestion({ action, result });
    } catch (error: any) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      if (status === 402) {
        showErrorToast(
          "You've run out of AI credits. Upgrade or wait for next reset.",
        );
      } else if (status === 429) {
        showErrorToast("Too many requests. Please slow down and try again.");
      } else if (status === 500 || status === 503) {
        showErrorToast(
          message || "AI service is unavailable. Please try again later.",
        );
      } else {
        showErrorToast("AI Assistant could not complete that request.");
      }
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
    <div className="border-b border-white/10 bg-[#252523]">
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
            className="flex h-9 items-center gap-2 rounded-lg border border-[#D9D6EA]/30 bg-[#D9D6EA] px-3 text-sm font-bold text-[#373785] shadow-sm shadow-black/20 transition-all hover:bg-[#C9C5E8] disabled:cursor-not-allowed disabled:opacity-70"
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
              className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-lg border border-white/10 bg-[#282826] shadow-2xl shadow-black/35"
              role="menu"
            >
              <div className="border-b border-white/10 bg-[#252523] px-4 py-3">
                <p className="text-xs font-semibold uppercase text-[#D9D6EA]">
                  Curator AI
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
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
                      className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/5"
                      role="menuitem"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D9D6EA] text-[#373785]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-white">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-5 text-[#9C9B96]">
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
          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#2A2A28] shadow-sm">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex min-w-0 items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D9D6EA] text-[#373785] shadow-sm shadow-black/20">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {actionLabel[suggestion.action]}
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-[#9C9B96]">
                    Review it, then copy it or add it to your note.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSuggestion(null)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#8B8A84] transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Dismiss AI suggestion"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto px-4 py-3">
              <p className="whitespace-pre-wrap text-sm leading-6 text-[#C6C4BD]">
                {suggestion.result}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-white/10 bg-[#252523] px-4 py-3">
              <button
                type="button"
                onClick={handleCopy}
                className="flex h-8 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 text-xs font-semibold text-[#C6C4BD] transition-colors hover:bg-white/5 hover:text-white"
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
                className="flex h-8 items-center gap-1.5 rounded-lg border border-[#D9D6EA]/30 px-2.5 text-xs font-semibold text-[#D9D6EA] transition-colors hover:bg-white/5"
              >
                <Plus className="h-3.5 w-3.5" />
                Insert
              </button>

              <button
                type="button"
                onClick={handleReplace}
                className="flex h-8 items-center gap-1.5 rounded-lg bg-[#D9D6EA] px-2.5 text-xs font-bold text-[#373785] transition-colors hover:bg-[#C9C5E8]"
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
