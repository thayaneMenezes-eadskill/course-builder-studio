
import React from "react";
import { Editor } from "@tiptap/react";
import { Undo, Redo } from "lucide-react";
import { ToolbarButton } from "../ToolbarButton";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface HistoryButtonsProps {
  editor: Editor;
}

export const HistoryButtons = ({ editor }: HistoryButtonsProps) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <ToolbarButton 
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo />
          </ToolbarButton>
        </TooltipTrigger>
        <TooltipContent>Desfazer</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <ToolbarButton 
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo />
          </ToolbarButton>
        </TooltipTrigger>
        <TooltipContent>Refazer</TooltipContent>
      </Tooltip>
    </>
  );
};
