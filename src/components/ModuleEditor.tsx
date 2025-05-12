
import React, { useState, useEffect } from "react";
import { TiptapEditor } from "./TiptapEditor";
import { useModules } from "@/contexts/ModuleContext";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface ModuleEditorProps {
  moduleId: string;
}

const ModuleEditor = ({ moduleId }: ModuleEditorProps) => {
  const { getModuleById, updateModule } = useModules();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  useEffect(() => {
    const module = getModuleById(moduleId);
    if (module) {
      setTitle(module.title);
      setContent(module.content);
    }
  }, [moduleId, getModuleById]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    updateModule(moduleId, { title: newTitle });
  };

  const handleContentChange = (html: string) => {
    setContent(html);
    updateModule(moduleId, { content: html });
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <Input
          value={title}
          onChange={handleTitleChange}
          className="text-3xl font-bold border-none focus-visible:ring-0 px-0 mb-4"
          placeholder="Module Title"
        />
        <TiptapEditor
          content={content}
          onChange={handleContentChange}
          placeholder="Start writing your module content..."
        />
      </CardContent>
    </Card>
  );
};

export default ModuleEditor;
