
import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface FlashCardDialogProps {
  editor: Editor;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FlashCardDialog = ({ editor, children, open, onOpenChange }: FlashCardDialogProps) => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const addFlashCard = () => {
    if (front && back) {
      editor.chain().focus().setFlashCard({ front, back }).run();
      setFront("");
      setBack("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Flashcard</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="front" className="block text-sm font-medium mb-1">
              Frente
            </label>
            <Textarea
              id="front"
              placeholder="Conteúdo da frente"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div>
            <label htmlFor="back" className="block text-sm font-medium mb-1">
              Verso
            </label>
            <Textarea
              id="back"
              placeholder="Conteúdo do verso"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <Button onClick={addFlashCard} className="mt-2">Adicionar Flashcard</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
