
import React from "react";
import { Editor } from "@tiptap/react";
import { Quote, Code } from "lucide-react";
import { ToolbarButton } from "../ToolbarButton";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface BlockFormatButtonsProps {
  editor: Editor;
}

export const BlockFormatButtons = ({ editor }: BlockFormatButtonsProps) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <ToolbarButton 
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
          >
            <Quote />
          </ToolbarButton>
        </TooltipTrigger>
        <TooltipContent>Citação</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <ToolbarButton 
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
          >
            <Code />
          </ToolbarButton>
        </TooltipTrigger>
        <TooltipContent>Bloco de Código</TooltipContent>
      </Tooltip>
    </>
  );
};
