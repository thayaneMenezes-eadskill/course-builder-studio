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
  CreditCard,
  ChevronsDown,
  PanelTopClose,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Strikethrough,
  Underline,
  Highlighter,
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
            <ToolbarButton 
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
            >
              <Bold />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>Negrito</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton 
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
            >
              <Italic />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>Itálico</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton 
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive('underline')}
            >
              <Underline />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>Sublinhado</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton 
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive('strike')}
            >
              <Strikethrough />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>Tachado</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton 
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              isActive={editor.isActive('highlight')}
            >
              <Highlighter />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>Destacar</TooltipContent>
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
            <ToolbarButton 
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
            >
              <List />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>
            Lista com Marcadores</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton 
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
            >
              <ListOrdered />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>Lista Ordenada</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton 
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive('blockquote')}
            >
              <Quote />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>Citação</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton 
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              isActive={editor.isActive('codeBlock')}
            >
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

        <div className="border-r mx-1 h-6"></div>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton 
              onClick={() => editor.chain().focus().undo().run()}
              isActive={editor.isActive('undo')}
            >
              <Undo />
            </ToolbarButton>
          </TooltipTrigger>
          <TooltipContent>Desfazer</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToolbarButton 
              onClick={() => editor.chain().focus().redo().run()}
              isActive={editor.isActive('redo')}
            >
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
