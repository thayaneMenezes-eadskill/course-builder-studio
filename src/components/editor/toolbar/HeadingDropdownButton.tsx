
import React from "react";
import { Editor } from "@tiptap/react";
import { Heading1, ChevronDown } from "lucide-react";
import { HeadingDropdown } from "../HeadingDropdown";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface HeadingDropdownButtonProps {
  editor: Editor;
}

export const HeadingDropdownButton = ({ editor }: HeadingDropdownButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center">
          <HeadingDropdown editor={editor} />
          <span className="text-gray-400 -ml-1">
            <ChevronDown size={14} />
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent>Estilos de Título</TooltipContent>
    </Tooltip>
  );
};
