
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
          
        </div>
      </TooltipTrigger>
      <TooltipContent>Títulos</TooltipContent>
    </Tooltip>
  );
};
