
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
  Heading1, 
  Heading2, 
  Heading3, 
  Heading4, 
  Heading5, 
  Heading6, 
  TextIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadingDropdownProps {
  editor: Editor;
}

export const HeadingDropdown = ({ editor }: HeadingDropdownProps) => {
  // Function to determine which heading is currently active
  const getActiveHeading = () => {
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    if (editor.isActive("heading", { level: 4 })) return "h4";
    if (editor.isActive("heading", { level: 5 })) return "h5";
    if (editor.isActive("heading", { level: 6 })) return "h6";
    if (editor.isActive("paragraph")) return "p";
    return "p"; // Default to paragraph
  };

  // Function to get the icon for the current active heading
  const getActiveIcon = () => {
    const active = getActiveHeading();
    switch (active) {
      case "h1": return <Heading1 size={18} />;
      case "h2": return <Heading2 size={18} />;
      case "h3": return <Heading3 size={18} />;
      case "h4": return <Heading4 size={18} />;
      case "h5": return <Heading5 size={18} />;
      case "h6": return <Heading6 size={18} />;
      default: return <TextIcon size={18} />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          size="icon" 
          variant="ghost" 
          className={cn(editor.isActive("heading") || editor.isActive("paragraph") ? "bg-muted" : "")}
        >
          {getActiveIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem 
          className="flex gap-2 items-center" 
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <TextIcon size={16} /> <span>Normal text</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex gap-2 items-center" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 size={16} /> <span>Heading 1</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex gap-2 items-center" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 size={16} /> <span>Heading 2</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex gap-2 items-center" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 size={16} /> <span>Heading 3</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex gap-2 items-center" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        >
          <Heading4 size={16} /> <span>Heading 4</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex gap-2 items-center" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        >
          <Heading5 size={16} /> <span>Heading 5</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex gap-2 items-center" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        >
          <Heading6 size={16} /> <span>Heading 6</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
