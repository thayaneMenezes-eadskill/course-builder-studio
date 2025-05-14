
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { FlashCardExtension } from "./extensions/FlashCardExtension";
import { AccordionExtension } from "./extensions/AccordionExtension";
import { TabsExtension } from "./extensions/TabsExtension";

export const getEditorExtensions = (placeholder: string = "Start writing...") => [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-primary underline cursor-pointer",
    },
  }),
  Image,
  Youtube.configure({
    controls: true,
    modestBranding: true,
    allowFullscreen: true,
  }),
  Placeholder.configure({
    placeholder,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Underline,
  Strike,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  FlashCardExtension.configure({
    HTMLAttributes: {
      class: 'interactive-flashcard',
    },
  }),
  AccordionExtension.configure({
    HTMLAttributes: {
      class: 'interactive-accordion',
    },
  }),
  TabsExtension.configure({
    HTMLAttributes: {
      class: 'interactive-tabs',
    },
  }),
];
