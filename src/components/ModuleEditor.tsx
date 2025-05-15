
import React, { useState, useEffect } from "react";
import { TiptapEditor } from "./TiptapEditor";
import { useModules } from "@/contexts/ModuleContext";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface ModuleEditorProps {
  moduleId: string;
  onSave: () => void;
}

const ModuleEditor = ({ moduleId, onSave }: ModuleEditorProps) => {
  const { getModuleById, updateModule } = useModules();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
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
    
    // Debounce API updates
    const timeoutId = setTimeout(() => {
      setIsSaving(true);
      updateModule(moduleId, { title: newTitle })
        .finally(() => setIsSaving(false));
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  };

  const handleContentChange = (html: string) => {
    setContent(html);
    
    // Debounce API updates
    const timeoutId = setTimeout(() => {
      setIsSaving(true);
      updateModule(moduleId, { content: html })
        .finally(() => setIsSaving(false));
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  };

  return (
    <Card className="border-none h-full">
      <CardContent className="p-0 h-full">
        <div className="flex items-center mb-4">
          <Input
            value={title}
            onChange={handleTitleChange}
            className="text-3xl font-bold border-none focus-visible:ring-0 px-0 flex-grow"
            placeholder="Module Title"
          />
          {isSaving && <span className="text-xs text-muted-foreground">Saving...</span>}
        </div>
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
