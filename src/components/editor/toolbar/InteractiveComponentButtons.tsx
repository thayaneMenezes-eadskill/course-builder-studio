
import React from "react";
import { Editor } from "@tiptap/react";
import { CreditCard, ChevronsDown, PanelTopClose } from "lucide-react";
import { ToolbarButton } from "../ToolbarButton";
import { FlashCardDialog } from "../dialogs/FlashCardDialog";
import { AccordionDialog } from "../dialogs/AccordionDialog";
import { TabsDialog } from "../dialogs/TabsDialog";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface InteractiveComponentButtonsProps {
  editor: Editor;
  showFlashCardDialog: boolean;
  setShowFlashCardDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showAccordionDialog: boolean;
  setShowAccordionDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showTabsDialog: boolean;
  setShowTabsDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InteractiveComponentButtons = ({
  editor,
  showFlashCardDialog,
  setShowFlashCardDialog,
  showAccordionDialog,
  setShowAccordionDialog,
  showTabsDialog,
  setShowTabsDialog
}: InteractiveComponentButtonsProps) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <FlashCardDialog
            editor={editor}
            open={showFlashCardDialog}
            onOpenChange={setShowFlashCardDialog}
          >
            <ToolbarButton onClick={() => setShowFlashCardDialog(true)}>
              <CreditCard />
            </ToolbarButton>
          </FlashCardDialog>
        </TooltipTrigger>
        <TooltipContent>Flashcard</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <AccordionDialog
            editor={editor}
            open={showAccordionDialog}
            onOpenChange={setShowAccordionDialog}
          >
            <ToolbarButton onClick={() => setShowAccordionDialog(true)}>
              <ChevronsDown />
            </ToolbarButton>
          </AccordionDialog>
        </TooltipTrigger>
        <TooltipContent>Acordeão</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <TabsDialog
            editor={editor}
            open={showTabsDialog}
            onOpenChange={setShowTabsDialog}
          >
            <ToolbarButton onClick={() => setShowTabsDialog(true)}>
              <PanelTopClose />
            </ToolbarButton>
          </TabsDialog>
        </TooltipTrigger>
        <TooltipContent>Abas</TooltipContent>
      </Tooltip>
    </>
  );
};
