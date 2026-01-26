import { defineField, defineType, defineArrayMember } from "sanity";
import { Images } from "lucide-react";
import { englishFieldset } from "@/sanity/lib/localizedFields";

export default defineType({
  name: "imageSlider",
  title: "Image Slider",
  type: "object",
  icon: Images,
  fieldsets: [
    { name: "content", title: "Content (Spanish)" },
    { name: "settings", title: "Settings" },
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
      name: "headingEn",
      title: "Heading (EN)",
      type: "string",
      fieldset: "english",
    }),
    // Shared
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      fieldset: "content",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            { name: "alt", type: "string", title: "Alt text", initialValue: "Image" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        }),
      ],
    }),
    defineField({
      name: "showProgressBar",
      title: "Show Progress Bar",
      type: "boolean",
      fieldset: "settings",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "heading",
      images: "images",
    },
    prepare({ title, images }) {
      return {
        title: "Image Slider",
        subtitle: title || `${images?.length || 0} images`,
      };
    },
  },
});
