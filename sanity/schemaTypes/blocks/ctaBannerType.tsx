import { defineField, defineType } from "sanity";
import { Megaphone } from "lucide-react";
import { englishFieldset } from "@/sanity/lib/localizedFields";

export default defineType({
  name: "ctaBanner",
  title: "CTA Banner",
  type: "object",
  icon: Megaphone,
  fieldsets: [
    { name: "content", title: "Content (Spanish)" },
    { name: "settings", title: "Settings" },
    englishFieldset,
  ],
  fields: [
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      fieldset: "settings",
      options: {
        list: [
          { title: "Speaking CTA", value: "speaking" },
          { title: "Newsletter", value: "newsletter" },
          { title: "Quote", value: "quote" },
        ],
      },
      initialValue: "speaking",
    }),
    // Spanish
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text (ES)",
      type: "string",
      fieldset: "content",
      hidden: ({ parent }) => parent?.style === "quote",
    }),
    defineField({
      name: "heading",
      title: "Heading (ES)",
      type: "text",
      rows: 2,
      fieldset: "content",
    }),
    defineField({
      name: "subheading",
      title: "Subheading (ES)",
      type: "text",
      rows: 2,
      fieldset: "content",
      hidden: ({ parent }) => parent?.style === "quote",
    }),
    defineField({
      name: "attribution",
      title: "Attribution (ES)",
      type: "string",
      fieldset: "content",
      hidden: ({ parent }) => parent?.style !== "quote",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text (ES)",
      type: "string",
      fieldset: "content",
      hidden: ({ parent }) => parent?.style === "quote" || parent?.style === "newsletter",
    }),
    // English
    defineField({
      name: "eyebrowEn",
      title: "Eyebrow Text (EN)",
      type: "string",
      fieldset: "english",
      hidden: ({ parent }) => parent?.style === "quote",
    }),
    defineField({
      name: "headingEn",
      title: "Heading (EN)",
      type: "text",
      rows: 2,
      fieldset: "english",
    }),
    defineField({
      name: "subheadingEn",
      title: "Subheading (EN)",
      type: "text",
      rows: 2,
      fieldset: "english",
      hidden: ({ parent }) => parent?.style === "quote",
    }),
    defineField({
      name: "attributionEn",
      title: "Attribution (EN)",
      type: "string",
      fieldset: "english",
      hidden: ({ parent }) => parent?.style !== "quote",
    }),
    defineField({
      name: "buttonTextEn",
      title: "Button Text (EN)",
      type: "string",
      fieldset: "english",
      hidden: ({ parent }) => parent?.style === "quote" || parent?.style === "newsletter",
    }),
    // Shared
    defineField({
      name: "link",
      title: "Button Link",
      type: "link",
      fieldset: "content",
      hidden: ({ parent }) => parent?.style === "quote" || parent?.style === "newsletter",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      style: "style",
    },
    prepare({ title, style }) {
      return {
        title: `CTA Banner (${style})`,
        subtitle: title?.substring(0, 50),
      };
    },
  },
});
