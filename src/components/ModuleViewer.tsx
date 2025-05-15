
import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Card, CardContent } from "@/components/ui/card";
import { getEditorExtensions } from "./editor/EditorConfig";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ModuleViewerProps {
  title: string;
  content: any;
}

const ModuleViewer = ({ title, content }: ModuleViewerProps) => {
  const editor = useEditor({
    extensions: getEditorExtensions(""),
    content,
    editable: false,
  });

  useEffect(() => {
    if (!editor) return;
    
    editor.commands.setContent(content);
  }, [editor, content]);

  return (
    <Card className="border-none h-full">
      <CardContent className="p-0 h-full">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <ScrollArea className="h-full">
          {editor && <EditorContent editor={editor} className="prose max-w-none" />}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ModuleViewer;
