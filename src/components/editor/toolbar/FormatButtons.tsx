
import React from "react";
import { Editor } from "@tiptap/react";
import { Bold, Italic, Strikethrough, Underline, Highlighter } from "lucide-react";
import { ToolbarButton } from "../ToolbarButton";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface FormatButtonsProps {
  editor: Editor;
}

export const FormatButtons = ({ editor }: FormatButtonsProps) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <ToolbarButton 
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
          >
            <Bold />
          </ToolbarButton>
        </TooltipTrigger>
        <TooltipContent>Negrito</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <ToolbarButton 
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
          >
            <Italic />
          </ToolbarButton>
        </TooltipTrigger>
        <TooltipContent>Itálico</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <ToolbarButton 
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
          >
            <Underline />
          </ToolbarButton>
        </TooltipTrigger>
        <TooltipContent>Sublinhado</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <ToolbarButton 
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
          >
            <Strikethrough />
          </ToolbarButton>
        </TooltipTrigger>
        <TooltipContent>Tachado</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <ToolbarButton 
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            isActive={editor.isActive('highlight')}
          >
            <Highlighter />
          </ToolbarButton>
        </TooltipTrigger>
        <TooltipContent>Destacar</TooltipContent>
      </Tooltip>
    </>
  );
};
