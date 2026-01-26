import { defineField, defineType } from "sanity";
import { User } from "lucide-react";
import { englishFieldset } from "@/sanity/lib/localizedFields";

export default defineType({
  name: "heroAbout",
  title: "Hero About",
  type: "object",
  icon: User,
  fieldsets: [
    { name: "content", title: "Content (Spanish)" },
    { name: "settings", title: "Settings" },
    englishFieldset,
  ],
  fields: [
    // Spanish
    defineField({
      name: "tagline",
      title: "Tagline (ES)",
      type: "string",
      fieldset: "content",
    }),
    defineField({
      name: "heading",
      title: "Heading (ES)",
      type: "text",
      rows: 3,
      fieldset: "content",
    }),
    defineField({
      name: "introText",
      title: "Intro Text (ES)",
      type: "text",
      rows: 3,
      fieldset: "content",
    }),
    // English
    defineField({
      name: "taglineEn",
      title: "Tagline (EN)",
      type: "string",
      fieldset: "english",
    }),
    defineField({
      name: "headingEn",
      title: "Heading (EN)",
      type: "text",
      rows: 3,
      fieldset: "english",
    }),
    defineField({
      name: "introTextEn",
      title: "Intro Text (EN)",
      type: "text",
      rows: 3,
      fieldset: "english",
    }),
    // Shared
    defineField({
      name: "image",
      title: "Portrait Image",
      type: "image",
      fieldset: "content",
      options: {
        hotspot: true,
      },
      fields: [
        { name: "alt", type: "string", title: "Alt text", initialValue: "Image" },
      ],
    }),
    defineField({
      name: "showDecorativeDots",
      title: "Show Decorative Dots",
      type: "boolean",
      fieldset: "settings",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: "Hero About",
        subtitle: title?.substring(0, 50),
        media,
      };
    },
  },
});
