import { defineField, defineType } from "sanity";
import { AlignCenter } from "lucide-react";
import { englishFieldset } from "@/sanity/lib/localizedFields";

export default defineType({
  name: "introText",
  title: "Intro Text",
  type: "object",
  icon: AlignCenter,
  fieldsets: [
    { name: "content", title: "Content (Spanish)" },
    englishFieldset,
  ],
  fields: [
    // Spanish
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text (ES)",
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
    // English
    defineField({
      name: "eyebrowEn",
      title: "Eyebrow Text (EN)",
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
  ],
  preview: {
    select: {
      title: "heading",
      eyebrow: "eyebrow",
    },
    prepare({ title, eyebrow }) {
      return {
        title: "Intro Text",
        subtitle: eyebrow || title?.substring(0, 50),
      };
    },
  },
});
