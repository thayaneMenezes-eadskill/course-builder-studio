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
      onChange(editor.getHTML());
    },
    editable,
  });

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
    <div className=" flex flex-col ">
      <ScrollArea
        className={`flex-1 ${editable ? "rounded-t-md pb-20" : "rounded-md pb-0"}`}
      >
        <EditorContent editor={editor} />
      </ScrollArea>
      {editable && (
        <div className="fixed bottom-0 left-64 w-[calc(100%-16rem)] z-50">
          <EditorToolbar editor={editor} />
        </div>
      )}
    </div>
  );
};