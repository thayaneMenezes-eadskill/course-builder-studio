
import React from "react";
import { Editor } from "@tiptap/react";
import { List, ListOrdered, ListTodo, ChevronDown } from "lucide-react";
import { ToolbarButton } from "../ToolbarButton";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface ListsDropdownProps {
  editor: Editor;
}

export const ListsDropdown = ({ editor }: ListsDropdownProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ToolbarButton isActive={editor.isActive('bulletList') || editor.isActive('orderedList') || editor.isActive('taskList')}>
                <ListOrdered />
                <span className="text-gray-400 ml-0.5">
                  <ChevronDown size={14} />
                </span>
              </ToolbarButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem 
                className="flex gap-2 items-center" 
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List size={16} /> <span>Lista com Marcadores</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex gap-2 items-center" 
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered size={16} /> <span>Lista Ordenada</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex gap-2 items-center" 
                onClick={() => editor.chain().focus().toggleTaskList().run()}
              >
                <ListTodo size={16} /> <span>Lista de Tarefas</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipTrigger>
      <TooltipContent>Opções de Lista</TooltipContent>
    </Tooltip>
  );
};
