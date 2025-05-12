
import React from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Code,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
} from "lucide-react";
import { ToolbarButton } from "./ToolbarButton";
import { LinkDialog } from "./dialogs/LinkDialog";
import { ImageDialog } from "./dialogs/ImageDialog";
import { YoutubeDialog } from "./dialogs/YoutubeDialog";

interface EditorToolbarProps {
  editor: Editor | null;
}

export const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const [showLinkDialog, setShowLinkDialog] = React.useState(false);
  const [showImageDialog, setShowImageDialog] = React.useState(false);
  const [showYoutubeDialog, setShowYoutubeDialog] = React.useState(false);

  if (!editor) return null;
  
  return (
    <div className="bg-background border rounded-b-md p-2 flex flex-wrap gap-1 sticky bottom-0 z-10">
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      >
        <Bold size={18} />
      </ToolbarButton>
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      >
        <Italic size={18} />
      </ToolbarButton>
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
      >
        <Heading1 size={18} />
      </ToolbarButton>
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
      >
        <Heading2 size={18} />
      </ToolbarButton>
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      >
        <List size={18} />
      </ToolbarButton>
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
      >
        <ListOrdered size={18} />
      </ToolbarButton>
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
      >
        <Quote size={18} />
      </ToolbarButton>
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
      >
        <Code size={18} />
      </ToolbarButton>
      
      <LinkDialog 
        editor={editor}
        open={showLinkDialog}
        onOpenChange={setShowLinkDialog}
      >
        <ToolbarButton
          onClick={() => setShowLinkDialog(true)}
          isActive={editor.isActive("link")}
        >
          <LinkIcon size={18} />
        </ToolbarButton>
      </LinkDialog>

      <ImageDialog 
        editor={editor}
        open={showImageDialog}
        onOpenChange={setShowImageDialog}
      >
        <ToolbarButton onClick={() => setShowImageDialog(true)}>
          <ImageIcon size={18} />
        </ToolbarButton>
      </ImageDialog>
      
      <YoutubeDialog 
        editor={editor}
        open={showYoutubeDialog}
        onOpenChange={setShowYoutubeDialog}
      >
        <ToolbarButton onClick={() => setShowYoutubeDialog(true)}>
          <YoutubeIcon size={18} />
        </ToolbarButton>
      </YoutubeDialog>

      <div className="border-r mx-1 h-6"></div>

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        isActive={false}
      >
        <Undo size={18} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        isActive={false}
      >
        <Redo size={18} />
      </ToolbarButton>
    </div>
  );
};
