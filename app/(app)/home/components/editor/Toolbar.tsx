import { Editor } from "@tiptap/react";

import { ToolbarButton } from "./ToolbarButton";
import { Icons } from "./icons";

type Props = {
  editor: Editor;
};

const Sep = () => (
  <div className="w-px h-5 bg-neutral-200 mx-1 shrink-0" />
);

export const Toolbar = ({ editor }: Props) => {
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
    </div>
  );
};