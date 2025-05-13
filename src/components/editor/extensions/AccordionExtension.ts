
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { AccordionComponent } from '../interactive/AccordionComponent';

export interface AccordionOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    accordion: {
      setAccordion: (options: { items: { title: string; content: string }[] }) => ReturnType;
    };
  }
}

export const AccordionExtension = Node.create<AccordionOptions>({
  name: 'accordion',
  
  group: 'block',
  
  content: 'inline*',
  
  atom: true,

  addAttributes() {
    return {
      items: {
        default: [{ title: 'Item 1', content: 'Content 1' }],
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="accordion"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'accordion' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(AccordionComponent);
  },

  addCommands() {
    return {
      setAccordion:
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
