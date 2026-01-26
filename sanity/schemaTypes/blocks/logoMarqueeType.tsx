import { defineField, defineType, defineArrayMember } from "sanity";
import { Repeat } from "lucide-react";

export default defineType({
  name: "logoMarquee",
  title: "Logo Marquee",
  type: "object",
  icon: Repeat,
  fields: [
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "logo",
          fields: [
            defineField({
              name: "name",
              title: "Company Name",
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
      logos: "logos",
    },
    prepare({ logos }) {
      return {
        title: "Logo Marquee",
        subtitle: `${logos?.length || 0} logos`,
      };
    },
  },
});
