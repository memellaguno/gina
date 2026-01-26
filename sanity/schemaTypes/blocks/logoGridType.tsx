import { defineField, defineType, defineArrayMember } from "sanity";
import { LayoutGrid } from "lucide-react";
import { englishFieldset } from "@/sanity/lib/localizedFields";

export default defineType({
  name: "logoGrid",
  title: "Logo Grid",
  type: "object",
  icon: LayoutGrid,
  fieldsets: [
    { name: "content", title: "Content (Spanish)" },
    englishFieldset,
  ],
  fields: [
    // Spanish
    defineField({
      name: "heading",
      title: "Heading (ES)",
      type: "string",
      fieldset: "content",
    }),
    // English
    defineField({
      name: "headingEn",
      title: "Heading (EN)",
      type: "string",
      fieldset: "english",
    }),
    // Shared
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      fieldset: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "logo",
          fields: [
            defineField({
              name: "name",
              title: "Organization Name",
              type: "string",
            }),
            defineField({
              name: "image",
              title: "Logo Image",
              type: "image",
              fields: [
                { name: "alt", type: "string", title: "Alt text" },
              ],
            }),
            defineField({
              name: "link",
              title: "Link (optional)",
              type: "url",
            }),
          ],
          preview: {
            select: {
              title: "name",
              media: "image",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      logos: "logos",
    },
    prepare({ title, logos }) {
      return {
        title: "Logo Grid",
        subtitle: title || `${logos?.length || 0} logos`,
      };
    },
  },
});
