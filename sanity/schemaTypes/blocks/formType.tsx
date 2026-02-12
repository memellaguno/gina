import { TITLE_DESCRIPTION, TITLE_TEXT } from "@/sanity/lib/constants";
import { formatString } from "@/sanity/lib/helpers";
import { englishFieldset } from "@/sanity/lib/localizedFields";

import { TextCursor, TextCursorInput } from "lucide-react";
import React from "react";
import { defineField, defineType } from "sanity";
import _ from "lodash";

export default defineType({
  name: "form",
  type: "object",
  fieldsets: [
    { name: "content", title: "Content (Spanish)" },
    englishFieldset,
  ],
  fields: [
    defineField({
      name: "title",
      title: TITLE_TEXT,
      description: TITLE_DESCRIPTION,
      type: "string",
      hidden: true,
    }),
    // Spanish
    defineField({
      name: "heading",
      title: "Heading (ES)",
      type: "string",
      description: "Title from left side",
      fieldset: "content",
    }),
    defineField({
      name: "subheading",
      title: "Subheading (ES)",
      type: "string",
      description: "Subtitle from left side",
      fieldset: "content",
    }),
    defineField({
      name: "text1",
      title: "Text (ES)",
      type: "text",
      description: "Text from left side",
      rows: 2,
      fieldset: "content",
    }),
    defineField({
      name: "text",
      title: "Right Side Text (ES)",
      type: "text",
      description: "Text from right side",
      rows: 2,
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
      name: "subheadingEn",
      title: "Subheading (EN)",
      type: "string",
      fieldset: "english",
    }),
    defineField({
      name: "text1En",
      title: "Text (EN)",
      type: "text",
      rows: 2,
      fieldset: "english",
    }),
    defineField({
      name: "textEn",
      title: "Right Side Text (EN)",
      type: "text",
      rows: 2,
      fieldset: "english",
    }),
    // Shared
    defineField({
      name: "email",
      type: "string",
      description: "Email to receive messages",
    }),
    defineField({
      name: "items",
      title: "Form input fields (ES)",
      type: "array",
      description: "Add input fields like Name, Email, Phone, etc",
      fieldset: "content",
      of: [
        defineField({
          name: "formItems",
          type: "object",
          fields: [
            defineField({
              name: "type",
              title: "Field Type",
              type: "string",
              options: {
                list: ["text", "email", "phone", "message"],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Field Title (ES)",
              description: "Title above input field",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "titleEn",
              title: "Field Title (EN)",
              type: "string",
            }),
            defineField({
              name: "placeholder",
              title: "Placeholder (ES)",
              type: "string",
              description: "Optional: Custom placeholder inside input field.",
            }),
            defineField({
              name: "placeholderEn",
              title: "Placeholder (EN)",
              type: "string",
            }),
          ],
          icon: TextCursor,
          preview: {
            select: {
              title: "title",
              type: "type",
            },
            prepare({ title, type }) {
              return {
                title: title,
                subtitle: `${_.capitalize(type)} Input`,
              };
            },
          },
        }),
      ],
    }),
  ],
  icon: () => <TextCursorInput size={16} />,
  preview: {
    select: {
      heading: "heading",
    },
    prepare({ heading }) {
      return {
        title: "Form",
        subtitle: heading ? formatString(heading, 50) : "Untitled",
      };
    },
  },
});
