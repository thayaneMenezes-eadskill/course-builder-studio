
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { FlashCardComponent } from '../interactive/FlashCardComponent';

export interface FlashCardOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    flashCard: {
      setFlashCard: (options: { front: string; back: string }) => ReturnType;
    };
  }
}

export const FlashCardExtension = Node.create<FlashCardOptions>({
  name: 'flashCard',
  
  group: 'block',
  
  content: 'inline*',
  
  atom: true,

  addAttributes() {
    return {
      front: {
        default: '',
      },
      back: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="flash-card"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'flash-card' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FlashCardComponent);
  },

  addCommands() {
    return {
      setFlashCard:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
