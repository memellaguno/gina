import { defineField, defineType } from "sanity";
import { Star } from "lucide-react";
import { englishFieldset } from "@/sanity/lib/localizedFields";

export default defineType({
  name: "featuredInitiative",
  title: "Featured Initiative",
  type: "object",
  icon: Star,
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
          { title: "Home", value: "home" },
          { title: "About", value: "about" },
        ],
      },
      initialValue: "home",
    }),
    // Spanish
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text (ES)",
      type: "string",
      fieldset: "content",
    }),
    defineField({
      name: "title",
      title: "Title (ES)",
      type: "string",
      fieldset: "content",
    }),
    defineField({
      name: "description",
      title: "Description (ES)",
      type: "text",
      rows: 3,
      fieldset: "content",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text (ES)",
      type: "string",
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
      name: "titleEn",
      title: "Title (EN)",
      type: "string",
      fieldset: "english",
    }),
    defineField({
      name: "descriptionEn",
      title: "Description (EN)",
      type: "text",
      rows: 3,
      fieldset: "english",
    }),
    defineField({
      name: "buttonTextEn",
      title: "Button Text (EN)",
      type: "string",
      fieldset: "english",
    }),
    // Shared
    defineField({
      name: "image",
      title: "Image",
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
      name: "link",
      title: "Link",
      type: "link",
      fieldset: "content",
    }),
    defineField({
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      fieldset: "settings",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
      },
      initialValue: "left",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: "Featured Initiative",
        subtitle: title,
        media,
      };
    },
  },
});
