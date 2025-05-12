
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getEditorExtensions } from "./editor/EditorConfig";
import { EditorToolbar } from "./editor/EditorToolbar";

type TiptapEditorProps = {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export const TiptapEditor = ({ content, onChange, placeholder = "Start writing..." }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: getEditorExtensions(placeholder),
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 border rounded-t-md">
        <EditorContent editor={editor} className="min-h-[400px]" />
      </ScrollArea>
      
      <EditorToolbar editor={editor} />
    </div>
  );
};
