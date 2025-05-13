import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const FlashCardComponent: React.FC<NodeViewProps> = ({ node, updateAttributes, editor }) => {
  const [flipped, setFlipped] = useState(false);
  const { front, back } = node.attrs;
  const isEditable = editor.isEditable;

  const handleFlip = () => {
    if (!isEditable) {
      setFlipped(!flipped);
    }
  };

  const sanitizeHTML = (html: string) => {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  };

  const handleFrontChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitizedValue = sanitizeHTML(e.target.value);
    updateAttributes({ front: sanitizedValue });
  };

  const handleBackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitizedValue = sanitizeHTML(e.target.value);
    updateAttributes({ back: sanitizedValue });
  };

  return (
    <NodeViewWrapper className="my-4">
      <div className="relative min-h-[200px]">
        <Card 
          className={`transition-all duration-300 ${flipped ? 'opacity-0 absolute inset-0' : 'opacity-100'}`}
          onClick={handleFlip}
        >
          <CardContent className="p-6 flex flex-col items-center">
            {isEditable ? (
              <textarea
                className="w-full p-2 bg-transparent border rounded resize-none min-h-[100px]"
                value={front}
                onChange={handleFrontChange}
                placeholder="Digite o conteúdo frontal do flashcard"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div className="text-center">
                <p>{front}</p>
                <div className="mt-4 text-sm text-muted-foreground">Clique para virar</div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card 
          className={`transition-all duration-300 ${!flipped ? 'opacity-0 absolute inset-0' : 'opacity-100'}`}
          onClick={handleFlip}
        >
          <CardContent className="p-6 flex flex-col items-center">
            {isEditable ? (
              <textarea
                className="w-full p-2 bg-transparent border rounded resize-none min-h-[100px]"
                value={back}
                onChange={handleBackChange}
                placeholder="Digite o conteúdo do verso do flashcard"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div className="text-center">
                <p>{back}</p>
                <div className="mt-4 text-sm text-muted-foreground">Clique para virar</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </NodeViewWrapper>
  );
};
