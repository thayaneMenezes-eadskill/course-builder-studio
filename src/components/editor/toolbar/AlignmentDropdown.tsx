
import React from "react";
import { Editor } from "@tiptap/react";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, ChevronDown } from "lucide-react";
import { ToolbarButton } from "../ToolbarButton";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface AlignmentDropdownProps {
  editor: Editor;
}

export const AlignmentDropdown = ({ editor }: AlignmentDropdownProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ToolbarButton isActive={editor.isActive('textAlign')}>
                <AlignLeft />
                <span className="text-gray-400 ml-0.5">
                  <ChevronDown size={14} />
                </span>
              </ToolbarButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem 
                className="flex gap-2 items-center" 
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
              >
                <AlignLeft size={16} /> <span>Alinhar à Esquerda</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex gap-2 items-center" 
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
              >
                <AlignCenter size={16} /> <span>Centralizar</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex gap-2 items-center" 
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
              >
                <AlignRight size={16} /> <span>Alinhar à Direita</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex gap-2 items-center" 
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              >
                <AlignJustify size={16} /> <span>Justificar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipTrigger>
      <TooltipContent>Opções de Alinhamento</TooltipContent>
    </Tooltip>
  );
};
