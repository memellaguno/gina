import { defineField, defineType, defineArrayMember } from "sanity";
import { BookOpen } from "lucide-react";
import { englishFieldset } from "@/sanity/lib/localizedFields";

export default defineType({
  name: "publishing",
  title: "Publishing",
  type: "object",
  icon: BookOpen,
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
    defineField({
      name: "description",
      title: "Description (ES)",
      type: "text",
      rows: 3,
      fieldset: "content",
    }),
    // English
    defineField({
      name: "headingEn",
      title: "Heading (EN)",
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
    // Books (with localized fields per book)
    defineField({
      name: "books",
      title: "Books",
      type: "array",
      fieldset: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "book",
          fields: [
            defineField({
              name: "title",
              title: "Book Title (ES)",
              type: "string",
            }),
            defineField({
              name: "titleEn",
              title: "Book Title (EN)",
              type: "string",
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle (ES)",
              type: "string",
            }),
            defineField({
              name: "subtitleEn",
              title: "Subtitle (EN)",
              type: "string",
            }),
            defineField({
              name: "publisher",
              title: "Publisher/Author Info (ES)",
              type: "string",
            }),
            defineField({
              name: "publisherEn",
              title: "Publisher/Author Info (EN)",
              type: "string",
            }),
            defineField({
              name: "year",
              title: "Year",
              type: "string",
            }),
            defineField({
              name: "coverImage",
              title: "Cover Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                { name: "alt", type: "string", title: "Alt text" },
              ],
            }),
            defineField({
              name: "link",
              title: "Purchase/Info Link",
              type: "url",
            }),
          ],
          preview: {
            select: {
              title: "title",
              year: "year",
              media: "coverImage",
            },
            prepare({ title, year, media }) {
              return {
                title: title,
                subtitle: year,
                media,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      books: "books",
    },
    prepare({ title, books }) {
      return {
        title: "Publishing",
        subtitle: title || `${books?.length || 0} books`,
      };
    },
  },
});
