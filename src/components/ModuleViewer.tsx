
import React, { useEffect } from "react";
import { TiptapEditor } from "./TiptapEditor";
import { Card, CardContent } from "@/components/ui/card";

interface ModuleViewerProps {
  title: string;
  content: any;
}

const ModuleViewer = ({ title, content }: ModuleViewerProps) => {
  return (
    <Card className="border-none h-full">
      <CardContent className="p-0 h-full">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <TiptapEditor
          content={content}
          onChange={() => {}} 
          editable={false}
          placeholder=""
        />
      </CardContent>
    </Card>
  );
};

export default ModuleViewer;
