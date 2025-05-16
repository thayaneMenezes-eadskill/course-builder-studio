import React, { useState, useEffect } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { TiptapEditor } from '../../TiptapEditor';

export const AccordionComponent: React.FC<NodeViewProps> = ({ node, updateAttributes, editor }) => {
  const { items } = node.attrs;
  const isEditable = editor.isEditable;

  const [localItems, setLocalItems] = useState(items);
  const [activeItem, setActiveItem] = useState('item-0');

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const handleTitleChange = (index: number, value: string) => {
    const newItems = [...localItems];
    newItems[index].title = value;
    setLocalItems(newItems);
    updateAttributes({ items: newItems });
  };

  const handleContentChange = (index: number, value: string) => {
    const newItems = [...localItems];
    newItems[index].content = value;
    setLocalItems(newItems);
    updateAttributes({ items: newItems });
  };

  const addItem = () => {
    const newItems = [...localItems, { title: `Item ${localItems.length + 1}`, content: 'Novo conteúdo' }];
    setLocalItems(newItems);
    updateAttributes({ items: newItems });
    setActiveItem(`item-${localItems.length}`);
  };

  const removeItem = (index: number) => {
    if (localItems.length > 1) {
      const newItems = localItems.filter((_, i) => i !== index);
      setLocalItems(newItems);
      updateAttributes({ items: newItems });
      setActiveItem(newItems.length > 0 
        ? `item-${Math.min(index, newItems.length - 1)}` 
        : 'item-0');
    }
  };

  const stopPropagation = (e: React.MouseEvent) => {
    if (isEditable) e.stopPropagation();
  };

  if (isEditable) {
    return (
      <NodeViewWrapper className="my-4">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          value={activeItem}
          onValueChange={setActiveItem}
        >
          {localItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <div className="flex items-center py-4">
                <input
                  type="text"
                  className="flex-1 bg-transparent border-none focus:outline-none"
                  value={item.title}
                  onChange={e => handleTitleChange(index, e.target.value)}
                  placeholder="Título do item"
                  onClick={stopPropagation}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={e => { e.stopPropagation(); removeItem(index); }}
                  className="mr-2"
                  disabled={localItems.length <= 1}
                >
                  <Trash2 color="red" size={16} />
                </Button>
              </div>
              <div className="px-4 pb-4">
                <textarea
                  className="w-full p-2 bg-transparent border rounded resize-none min-h-[100px]"
                  value={item.content}
                  onChange={e => handleContentChange(index, e.target.value)}
                  placeholder="Conteúdo do item"
                  onClick={stopPropagation}
                />
              </div>
            </AccordionItem>
          ))}
        </Accordion>
        
        <Button 
          variant="outline" 
          onClick={addItem}
          className="mt-2"
        >
          <Plus size={16} className="mr-2" /> Adicionar Item
        </Button>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="my-4">
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="px-2 py-1">{item.title}</AccordionTrigger>
            <AccordionContent className="p-2">
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </NodeViewWrapper>
  );
};
