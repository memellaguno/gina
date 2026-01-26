import { defineField, defineType, defineArrayMember } from "sanity";
import { Award } from "lucide-react";
import { englishFieldset } from "@/sanity/lib/localizedFields";

export default defineType({
  name: "awardsAccordion",
  title: "Awards Accordion",
  type: "object",
  icon: Award,
  fieldsets: [
    { name: "content", title: "Content (Spanish)" },
    englishFieldset,
  ],
  fields: [
    // Spanish
    defineField({
      name: "heading",
      title: "Section Heading (ES)",
      type: "string",
      fieldset: "content",
    }),
    // English
    defineField({
      name: "headingEn",
      title: "Section Heading (EN)",
      type: "string",
      fieldset: "english",
    }),
    // Awards
    defineField({
      name: "awards",
      title: "Awards",
      type: "array",
      fieldset: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "award",
          fields: [
            defineField({
              name: "title",
              title: "Award Title (ES)",
              type: "string",
            }),
            defineField({
              name: "titleEn",
              title: "Award Title (EN)",
              type: "string",
            }),
            defineField({
              name: "organization",
              title: "Organization (ES)",
              type: "string",
            }),
            defineField({
              name: "organizationEn",
              title: "Organization (EN)",
              type: "string",
            }),
            defineField({
              name: "year",
              title: "Year",
              type: "string",
            }),
            defineField({
              name: "images",
              title: "Award Photos",
              type: "array",
              of: [
                defineArrayMember({
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    { name: "alt", type: "string", title: "Alt text" },
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              year: "year",
              organization: "organization",
            },
            prepare({ title, year, organization }) {
              return {
                title: title,
                subtitle: `${organization || ""} ${year || ""}`.trim(),
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
      awards: "awards",
    },
    prepare({ title, awards }) {
      return {
        title: "Awards Accordion",
        subtitle: title || `${awards?.length || 0} awards`,
      };
    },
  },
});
