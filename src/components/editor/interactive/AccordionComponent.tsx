
import React from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

export const AccordionComponent: React.FC<NodeViewProps> = ({ node, updateAttributes, editor }) => {
  const { items } = node.attrs;
  const isEditable = editor.isEditable;

  const handleTitleChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index].title = value;
    updateAttributes({ items: newItems });
  };

  const handleContentChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index].content = value;
    updateAttributes({ items: newItems });
  };

  const addItem = () => {
    const newItems = [...items, { title: `Item ${items.length + 1}`, content: 'Novo conteúdo' }];
    updateAttributes({ items: newItems });
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    updateAttributes({ items: newItems });
  };

  return (
    <NodeViewWrapper className="my-4">
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            {isEditable ? (
              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-1 py-4 bg-transparent border-none focus:outline-none"
                  value={item.title}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                  placeholder="Título do item"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeItem(index)}
                  className="mr-2"
                >
                  <Minus size={16} />
                </Button>
              </div>
            ) : (
              <AccordionTrigger>{item.title}</AccordionTrigger>
            )}
            
            <AccordionContent>
              {isEditable ? (
                <textarea
                  className="w-full p-2 bg-transparent border rounded resize-none min-h-[100px]"
                  value={item.content}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  placeholder="Conteúdo do item"
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      {isEditable && (
        <Button 
          variant="outline" 
          onClick={addItem}
          className="mt-2"
        >
          <Plus size={16} className="mr-2" /> Adicionar Item
        </Button>
      )}
    </NodeViewWrapper>
  );
};
