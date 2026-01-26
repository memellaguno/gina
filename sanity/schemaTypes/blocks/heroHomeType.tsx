import { defineField, defineType } from "sanity";
import { Home } from "lucide-react";
import { englishFieldset } from "@/sanity/lib/localizedFields";

export default defineType({
  name: "heroHome",
  title: "Hero Home",
  type: "object",
  icon: Home,
  fieldsets: [
    { name: "settings", title: "Settings" },
    { name: "content", title: "Content (Spanish)" },
    englishFieldset,
  ],
  fields: [
    // Spanish content (primary)
    defineField({
      name: "tagline",
      title: "Tagline (ES)",
      type: "string",
      fieldset: "content",
    }),
    defineField({
      name: "heading",
      title: "Heading (ES)",
      type: "string",
      fieldset: "content",
    }),
    // English content (secondary)
    defineField({
      name: "taglineEn",
      title: "Tagline (EN)",
      type: "string",
      fieldset: "english",
    }),
    defineField({
      name: "headingEn",
      title: "Heading (EN)",
      type: "string",
      fieldset: "english",
    }),
    // Shared fields (no localization needed)
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      fieldset: "content",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          initialValue: "Image",
        },
      ],
    }),
    defineField({
      name: "overlayGradient",
      title: "Overlay Gradient",
      type: "boolean",
      fieldset: "settings",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "backgroundImage",
    },
    prepare({ title, media }) {
      return {
        title: "Hero Home",
        subtitle: title,
        media,
      };
    },
  },
});
