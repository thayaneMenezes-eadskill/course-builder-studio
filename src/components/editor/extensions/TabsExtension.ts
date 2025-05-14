
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { TabsComponent } from '../interactive/TabsComponent';

export interface TabsOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tabs: {
      setTabs: (options: { tabs: { title: string; content: string }[] }) => ReturnType;
    };
  }
}

export const TabsExtension = Node.create<TabsOptions>({
  name: 'tabs',
  
  group: 'block',
  
  content: 'inline*',
  
  atom: true,

  addAttributes() {
    return {
      tabs: {
        default: [
          { title: 'Tab 1', content: 'Content 1' },
          { title: 'Tab 2', content: 'Content 2' },
        ],
        parseHTML: (element) => {
          const tabs = element.getAttribute('data-tabs');
          try {
            return tabs ? JSON.parse(tabs) : [
              { title: 'Tab 1', content: 'Content 1' },
              { title: 'Tab 2', content: 'Content 2' },
            ];
          } catch {
            return [
              { title: 'Tab 1', content: 'Content 1' },
              { title: 'Tab 2', content: 'Content 2' },
            ];
          }
        },
        renderHTML: (attributes) => {
          return {
            'data-tabs': JSON.stringify(attributes.tabs || [
              { title: 'Tab 1', content: 'Content 1' },
              { title: 'Tab 2', content: 'Content 2' },
            ]),
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="tabs"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'tabs' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TabsComponent);
  },

  addCommands() {
    return {
      setTabs:
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
