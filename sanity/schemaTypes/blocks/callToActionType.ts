import { defineField, defineType } from "sanity";
import { BulbOutlineIcon } from "@sanity/icons";

export default defineType({
  name: "callToAction",
  title: "Call to action",
  type: "object",
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Type of Call to Action",
      description:
        "Selecting Cotizador will make the button open a modal with the Cotizador",
      type: "string",
      initialValue: "Link",
      options: {
        list: ["Cotizador", "Link"],
      },
    }),
    defineField({
      name: "caption",

      title: "Caption",
      type: "string",
      hidden: ({ parent }) => parent?.type !== "Cotizador",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      hidden: ({ parent }) => parent?.type !== "Cotizador",
    }),
    defineField({
      name: "button",
      title: "Button Link",
      type: "navLink",
      hidden: ({ parent }) => parent?.type !== "Link",
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: "Call to Action",
      };
    },
  },
});
