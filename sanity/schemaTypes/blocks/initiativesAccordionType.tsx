import { defineField, defineType, defineArrayMember } from "sanity";
import { Building2 } from "lucide-react";
import { englishFieldset } from "@/sanity/lib/localizedFields";

export default defineType({
  name: "initiativesAccordion",
  title: "Initiatives Accordion",
  type: "object",
  icon: Building2,
  fieldsets: [
    { name: "content", title: "Content (Spanish)" },
    { name: "settings", title: "Settings" },
    englishFieldset,
  ],
  fields: [
    // Spanish
    defineField({
      name: "introText",
      title: "Introduction Text (ES)",
      type: "text",
      rows: 4,
      fieldset: "content",
    }),
    // English
    defineField({
      name: "introTextEn",
      title: "Introduction Text (EN)",
      type: "text",
      rows: 4,
      fieldset: "english",
    }),
    // Sections
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      fieldset: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "section",
          fields: [
            defineField({
              name: "sectionTitle",
              title: "Section Title (ES)",
              type: "string",
              description: "e.g., 'Companies' or 'Non-Profit Foundations'",
            }),
            defineField({
              name: "sectionTitleEn",
              title: "Section Title (EN)",
              type: "string",
            }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "item",
                  fields: [
                    defineField({
                      name: "name",
                      title: "Name",
                      type: "string",
                    }),
                    defineField({
                      name: "logo",
                      title: "Logo",
                      type: "image",
                      fields: [
                        { name: "alt", type: "string", title: "Alt text" },
                      ],
                    }),
                    defineField({
                      name: "description",
                      title: "Description (ES)",
                      type: "text",
                      rows: 4,
                    }),
                    defineField({
                      name: "descriptionEn",
                      title: "Description (EN)",
                      type: "text",
                      rows: 4,
                    }),
                    defineField({
                      name: "websiteUrl",
                      title: "Website URL",
                      type: "url",
                    }),
                    defineField({
                      name: "websiteLinkText",
                      title: "Website Link Text (ES)",
                      type: "string",
                      initialValue: "Visita su sitio web",
                    }),
                    defineField({
                      name: "websiteLinkTextEn",
                      title: "Website Link Text (EN)",
                      type: "string",
                      initialValue: "Visit their website",
                    }),
                    defineField({
                      name: "portfolioImages",
                      title: "Portfolio Images",
                      type: "array",
                      of: [
                        defineArrayMember({
                          type: "object",
                          name: "portfolioImage",
                          fields: [
                            defineField({
                              name: "image",
                              title: "Image",
                              type: "image",
                              options: { hotspot: true },
                              fields: [
                                { name: "alt", type: "string", title: "Alt text" },
                              ],
                            }),
                            defineField({
                              name: "caption",
                              title: "Caption",
                              type: "string",
                            }),
                          ],
                          preview: {
                            select: {
                              title: "caption",
                              media: "image",
                            },
                          },
                        }),
                      ],
                    }),
                  ],
                  preview: {
                    select: {
                      title: "name",
                      media: "logo",
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "sectionTitle",
              items: "items",
            },
            prepare({ title, items }) {
              return {
                title: title,
                subtitle: `${items?.length || 0} items`,
              };
            },
          },
        }),
      ],
    }),
    // Settings
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      fieldset: "settings",
      options: {
        list: [
          { title: "Dark (Secondary)", value: "dark" },
          { title: "Light", value: "light" },
        ],
      },
      initialValue: "dark",
    }),
  ],
  preview: {
    select: {
      sections: "sections",
    },
    prepare({ sections }) {
      const totalItems = sections?.reduce((acc: number, s: any) => acc + (s.items?.length || 0), 0) || 0;
      return {
        title: "Initiatives Accordion",
        subtitle: `${sections?.length || 0} sections, ${totalItems} items`,
      };
    },
  },
});
