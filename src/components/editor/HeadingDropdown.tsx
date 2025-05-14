import React from "react";
import { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadingDropdownProps {
  editor: Editor;
}

export const HeadingDropdown = ({ editor }: HeadingDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(editor.isActive("heading") ? "bg-muted" : "")}
        >
          <Heading1 size={18} />
          <span className="text-gray-400 -ml-1">
            <ChevronDown size={14} />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          className="flex gap-2 items-center"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 size={16} /> <span>Título 1</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 items-center"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 size={16} /> <span>Título 2</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 items-center"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 size={16} /> <span>Título 3</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 items-center"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        >
          <Heading4 size={16} /> <span>Título 4</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 items-center"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        >
          <Heading5 size={16} /> <span>Título 5</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 items-center"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        >
          <Heading6 size={16} /> <span>Título 6</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
