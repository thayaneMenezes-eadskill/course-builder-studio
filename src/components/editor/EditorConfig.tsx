
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";

export const getEditorExtensions = (placeholder: string = "Start writing...") => [
  StarterKit,
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
