import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export const editorExtensions = [
  StarterKit.configure({
    strike: false,
  }),

  Typography,

  Underline,

  Strike,

  Link.configure({
    openOnClick: false,

    HTMLAttributes: {
      class: "text-[#D9D6EA] underline",
    },
  }),

  Image.configure({
    HTMLAttributes: {
      class: "rounded-lg max-w-full my-2",
    },
  }),

  Placeholder.configure({
    placeholder: "Start writing your thoughts…",
  }),
];
