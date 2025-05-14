import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToolbarButton } from "../ToolbarButton";

interface AccordionDialogProps {
  editor: Editor;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AccordionDialog = React.forwardRef((props: AccordionDialogProps, ref) => {
  const { editor, children, open, onOpenChange } = props;
  const [items, setItems] = useState([{ title: "Item 1", content: "" }]);

  const addItem = () => {
    setItems([...items, { title: `Item ${items.length + 1}`, content: "" }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItemTitle = (index: number, title: string) => {
    const newItems = [...items];
    newItems[index].title = title;
    setItems(newItems);
  };

  const updateItemContent = (index: number, content: string) => {
    const newItems = [...items];
    newItems[index].content = content;
    setItems(newItems);
  };

  const addAccordion = () => {
    if (items.length > 0 && items.every(item => item.title)) {
      editor.chain().focus().setAccordion({ items }).run();
      setItems([{ title: "Item 1", content: "" }]);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar Acordeão</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {items.map((item, index) => (
            <div key={index} className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Item {index + 1}</h4>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeItem(index)}
                  disabled={items.length <= 1}
                >
                  <Minus size={16} />
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <label htmlFor={`title-${index}`} className="block text-sm mb-1">
                    Título
                  </label>
                  <Input
                    id={`title-${index}`}
                    value={item.title}
                    onChange={(e) => updateItemTitle(index, e.target.value)}
                    placeholder="Título do item"
                  />
                </div>
                <div>
                  <label htmlFor={`content-${index}`} className="block text-sm mb-1">
                    Conteúdo
                  </label>
                  <Textarea
                    id={`content-${index}`}
                    value={item.content}
                    onChange={(e) => updateItemContent(index, e.target.value)}
                    placeholder="Conteúdo do item"
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={addItem} className="mt-2">
            <Plus size={16} className="mr-2" /> Adicionar Item
          </Button>
          <Button onClick={addAccordion} className="mt-2">Adicionar Acordeão</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

// Ensure display name for debugging
AccordionDialog.displayName = "AccordionDialog";
