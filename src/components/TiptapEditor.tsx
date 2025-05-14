import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getEditorExtensions } from "./editor/EditorConfig";
import { EditorToolbar } from "./editor/EditorToolbar";

type TiptapEditorProps = {
  content: any;
  onChange: (json: any) => void;
  placeholder?: string;
  editable?: boolean;
};

export const TiptapEditor = ({
  content,
  onChange,
  placeholder = "Start writing...",
  editable = true,
}: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: getEditorExtensions(placeholder),
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editable,
  });

  // sempre via microtask, para não disparar flushSync dentro do hook
  useEffect(() => {
    
    if (!editor) return;

    const shouldUpdate =
      (typeof content === "string" && content !== editor.getHTML()) ||
      (typeof content === "object" && content !== editor.getJSON());

    if (shouldUpdate) {
      // agenda para depois do ciclo de render
      setTimeout(() => {
        editor.commands.setContent(content);
      }, 0);
    }
  }, [editor, content]);

  useEffect(() => {
    if (editor && editor.isEditable !== editable) {
      editor.setEditable(editable);
    }
  }, [editor, editable]);


  if (!editor) return null;

  return (
    <div className="flex flex-col h-full">
      <ScrollArea
        className={`flex-1 border ${editable ? "rounded-t-md" : "rounded-md"}`}
      >
        <EditorContent editor={editor} className="min-h-[400px]" />
      </ScrollArea>
      {editable && <EditorToolbar editor={editor} />}
    </div>
  );
};