
import React from "react";
import { Editor } from "@tiptap/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FormatButtons } from "./toolbar/FormatButtons";
import { HeadingDropdownButton } from "./toolbar/HeadingDropdownButton";
import { AlignmentDropdown } from "./toolbar/AlignmentDropdown";
import { ListsDropdown } from "./toolbar/ListsDropdown";
import { BlockFormatButtons } from "./toolbar/BlockFormatButtons";
import { MediaButtons } from "./toolbar/MediaButtons";
import { InteractiveComponentButtons } from "./toolbar/InteractiveComponentButtons";
import { HistoryButtons } from "./toolbar/HistoryButtons";

interface EditorToolbarProps {
  editor: Editor | null;
}

export const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const [showLinkDialog, setShowLinkDialog] = React.useState(false);
  const [showImageDialog, setShowImageDialog] = React.useState(false);
  const [showYoutubeDialog, setShowYoutubeDialog] = React.useState(false);
  const [showFlashCardDialog, setShowFlashCardDialog] = React.useState(false);
  const [showAccordionDialog, setShowAccordionDialog] = React.useState(false);
  const [showTabsDialog, setShowTabsDialog] = React.useState(false);

  if (!editor) return null;

  return (
    <TooltipProvider>
      <div className="bg-background border rounded-b-md p-2 flex flex-wrap gap-1 sticky bottom-0 z-30">
        <FormatButtons editor={editor} />
        <HeadingDropdownButton editor={editor} />
        <AlignmentDropdown editor={editor} />
        <ListsDropdown editor={editor} />
        <BlockFormatButtons editor={editor} />
        
        <MediaButtons 
          editor={editor} 
          showLinkDialog={showLinkDialog}
          setShowLinkDialog={setShowLinkDialog}
          showImageDialog={showImageDialog}
          setShowImageDialog={setShowImageDialog}
          showYoutubeDialog={showYoutubeDialog}
          setShowYoutubeDialog={setShowYoutubeDialog}
        />

        <div className="border-r mx-1 h-6"></div>

        <InteractiveComponentButtons 
          editor={editor}
          showFlashCardDialog={showFlashCardDialog}
          setShowFlashCardDialog={setShowFlashCardDialog}
          showAccordionDialog={showAccordionDialog}
          setShowAccordionDialog={setShowAccordionDialog}
          showTabsDialog={showTabsDialog}
          setShowTabsDialog={setShowTabsDialog}
        />

        <div className="border-r mx-1 h-6"></div>

        <HistoryButtons editor={editor} />
      </div>
    </TooltipProvider>
  );
};
