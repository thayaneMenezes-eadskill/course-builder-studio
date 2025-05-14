
import React from "react";
import { Editor } from "@tiptap/react";
import { Link as LinkIcon, Image as ImageIcon, Youtube as YoutubeIcon } from "lucide-react";
import { ToolbarButton } from "../ToolbarButton";
import { LinkDialog } from "../dialogs/LinkDialog";
import { ImageDialog } from "../dialogs/ImageDialog";
import { YoutubeDialog } from "../dialogs/YoutubeDialog";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface MediaButtonsProps {
  editor: Editor;
  showLinkDialog: boolean;
  setShowLinkDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showImageDialog: boolean;
  setShowImageDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showYoutubeDialog: boolean;
  setShowYoutubeDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MediaButtons = ({ 
  editor, 
  showLinkDialog, 
  setShowLinkDialog, 
  showImageDialog, 
  setShowImageDialog, 
  showYoutubeDialog, 
  setShowYoutubeDialog 
}: MediaButtonsProps) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <LinkDialog
            editor={editor}
            open={showLinkDialog}
            onOpenChange={setShowLinkDialog}
          >
            <ToolbarButton onClick={() => setShowLinkDialog(true)}>
              <LinkIcon />
            </ToolbarButton>
          </LinkDialog>
        </TooltipTrigger>
        <TooltipContent>Adicionar Link</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <ImageDialog
            editor={editor}
            open={showImageDialog}
            onOpenChange={setShowImageDialog}
          >
            <ToolbarButton onClick={() => setShowImageDialog(true)}>
              <ImageIcon />
            </ToolbarButton>
          </ImageDialog>
        </TooltipTrigger>
        <TooltipContent>Imagem</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <YoutubeDialog
            editor={editor}
            open={showYoutubeDialog}
            onOpenChange={setShowYoutubeDialog}
          >
            <ToolbarButton onClick={() => setShowYoutubeDialog(true)}>
              <YoutubeIcon />
            </ToolbarButton>
          </YoutubeDialog>
        </TooltipTrigger>
        <TooltipContent>Vídeo</TooltipContent>
      </Tooltip>
    </>
  );
};
