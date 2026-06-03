"use client";

import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import { useState } from "react";

type RichTextEditorProps = {
  initialContent?: string;
  name?: string;
};

function ToolbarButton({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
        active
          ? "bg-zinc-950 text-white"
          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
      }`}
    >
      {label}
    </button>
  );
}

export function RichTextEditor({
  initialContent = "<p>Start writing...</p>",
  name = "content",
}: RichTextEditorProps) {
  const [content, setContent] = useState(initialContent);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor: currentEditor }) => {
      setContent(currentEditor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "blog-prose min-h-[360px] rounded-[28px] border border-zinc-200 bg-white px-6 py-5 outline-none focus:border-zinc-400",
      },
    },
  });

  return (
    <div className="space-y-4 rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-zinc-950">Story content</p>
        <p className="text-sm text-zinc-500">
          Use bold, italic, headings, lists, quotes and links.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-zinc-100 pb-4">
        <ToolbarButton
          label="Bold"
          active={editor?.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="Italic"
          active={editor?.isActive("italic")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="H2"
          active={editor?.isActive("heading", { level: 2 })}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          label="H3"
          active={editor?.isActive("heading", { level: 3 })}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <ToolbarButton
          label="Bullet"
          active={editor?.isActive("bulletList")}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="Numbered"
          active={editor?.isActive("orderedList")}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="Quote"
          active={editor?.isActive("blockquote")}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton
          label="Link"
          active={editor?.isActive("link")}
          onClick={() => {
            const currentLink = editor?.getAttributes("link").href || "";
            const value = window.prompt("Enter link URL", currentLink);

            if (!editor || value === null) {
              return;
            }

            if (!value) {
              editor.chain().focus().unsetLink().run();
              return;
            }

            editor.chain().focus().extendMarkRange("link").setLink({ href: value }).run();
          }}
        />
      </div>

      <input type="hidden" name={name} value={content} />
      <EditorContent editor={editor} />
    </div>
  );
}
