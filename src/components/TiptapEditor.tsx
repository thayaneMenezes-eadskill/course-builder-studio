
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getEditorExtensions } from "./editor/EditorConfig";
import { EditorToolbar } from "./editor/EditorToolbar";

type TiptapEditorProps = {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  editable?: boolean;
};

export const TiptapEditor = ({ 
  content, 
  onChange, 
  placeholder = "Start writing...",
  editable = true
}: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: getEditorExtensions(placeholder),
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editable,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      setTimeout(() => {
        editor.commands.setContent(content);
      }, 0);
    }
  }, [content, editor]);

  useEffect(() => {
    if (editor && editor.isEditable !== editable) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className={`flex-1 border ${editable ? 'rounded-t-md' : 'rounded-md'}`}>
        <EditorContent editor={editor} className="min-h-[400px]" />
      </ScrollArea>
      
      {editable && <EditorToolbar editor={editor} />}
    </div>
  );
};
