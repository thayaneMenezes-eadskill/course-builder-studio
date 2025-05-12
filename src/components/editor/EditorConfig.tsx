
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";

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
];
