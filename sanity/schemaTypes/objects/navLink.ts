import { defineField, defineType } from "sanity";

export default defineType({
  name: "navLink",
  title: "Navigation Link",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Navigation Text (ES)",
      type: "string",
    }),
    defineField({
      name: "textEn",
      title: "Navigation Text (EN)",
      type: "string",
    }),
    defineField({
      name: "link",
      type: "link",
    }),
  ],
});
