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
  Quote,
  Undo,
  Redo,
  WalletCards as Card,
  ChevronsDown,
  IndentIncrease as TabsIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { ToolbarButton } from "./ToolbarButton";
import { LinkDialog } from "./dialogs/LinkDialog";
import { ImageDialog } from "./dialogs/ImageDialog";
import { YoutubeDialog } from "./dialogs/YoutubeDialog";
import { FlashCardDialog } from "./dialogs/FlashCardDialog";
import { AccordionDialog } from "./dialogs/AccordionDialog";
import { TabsDialog } from "./dialogs/TabsDialog";
import { HeadingDropdown } from "./HeadingDropdown";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

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
        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()}>
              <Bold />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>Negrito</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()}>
              <Italic />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>Itálico</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <HeadingDropdown editor={editor} />
          </TooltipTrigger>
          <TooltipContent>Estilos de Título</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ToolbarButton>
                  <AlignLeft />
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
          </TooltipTrigger>
          <TooltipContent>Opções de Alinhamento</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()}>
              <List />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>
            Lista com Marcadores</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()}>
              <ListOrdered />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>Lista Ordenada</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()}>
              <Quote />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>Citação</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
              <Code />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>Bloco de Código</TooltipContent>
        </Tooltip>

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

        <div className="border-r mx-1 h-6"></div>

        <FlashCardDialog
          editor={editor}
          open={showFlashCardDialog}
          onOpenChange={setShowFlashCardDialog}
        >
          <ToolbarButton onClick={() => setShowFlashCardDialog(true)} disabled>
            <Card />
          </ToolbarButton>
        </FlashCardDialog>

        <AccordionDialog
          editor={editor}
          open={showAccordionDialog}
          onOpenChange={setShowAccordionDialog}
        >
          <ToolbarButton onClick={() => setShowAccordionDialog(true)} disabled>
            <ChevronsDown />
          </ToolbarButton>
        </AccordionDialog>

        <TabsDialog
          editor={editor}
          open={showTabsDialog}
          onOpenChange={setShowTabsDialog}
        >
          <ToolbarButton onClick={() => setShowTabsDialog(true)} disabled>
            <TabsIcon />
          </ToolbarButton>
        </TabsDialog>

        <div className="border-r mx-1 h-6"></div>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
              <Undo />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>Desfazer</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
              <Redo />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>
            Refazer
         </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
