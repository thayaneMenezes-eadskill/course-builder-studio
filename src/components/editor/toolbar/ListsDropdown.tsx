
import React from "react";
import { Editor } from "@tiptap/react";
import { ListOrdered, ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ToolbarButton } from "../ToolbarButton";

interface ListsDropdownProps {
  editor: Editor;
}

export const ListsDropdown = ({ editor }: ListsDropdownProps) => {
  const isBulletListActive = editor.isActive("bulletList");
  const isOrderedListActive = editor.isActive("orderedList");
  const isTaskListActive = editor.isActive("taskList");
  const isAnyListActive = isBulletListActive || isOrderedListActive || isTaskListActive;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <ToolbarButton
            title="Lists"
            isActive={isAnyListActive}
            icon={
              <div className="flex items-center">
                <ListOrdered size={16} />
                <ChevronDown size={14} className="ml-1" />
              </div>
            }
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuCheckboxItem
          checked={isBulletListActive}
          onSelect={() => editor.chain().focus().toggleBulletList().run()}
        >
          <div className="flex items-center">
            {isBulletListActive && <Check className="w-4 h-4 mr-2" />}
            <span className={isBulletListActive ? "ml-0" : "ml-6"}>Bullet List</span>
          </div>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={isOrderedListActive}
          onSelect={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <div className="flex items-center">
            {isOrderedListActive && <Check className="w-4 h-4 mr-2" />}
            <span className={isOrderedListActive ? "ml-0" : "ml-6"}>Ordered List</span>
          </div>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={isTaskListActive}
          onSelect={() => editor.commands.toggleTaskList()}
        >
          <div className="flex items-center">
            {isTaskListActive && <Check className="w-4 h-4 mr-2" />}
            <span className={isTaskListActive ? "ml-0" : "ml-6"}>Task List</span>
          </div>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
