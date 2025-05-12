
import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface YoutubeDialogProps {
  editor: Editor;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const YoutubeDialog = ({ editor, children, open, onOpenChange }: YoutubeDialogProps) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const addYoutubeVideo = () => {
    if (youtubeUrl) {
      editor.chain().focus().insertContent({
        type: 'youtube',
        attrs: {
          src: youtubeUrl
        }
      }).run();
      setYoutubeUrl("");
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
          <DialogTitle>Add YouTube Video</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addYoutubeVideo()}
          />
          <Button onClick={addYoutubeVideo}>Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
