import { defineField, defineType } from "sanity";
import { Quote } from "lucide-react";
import { englishFieldset } from "@/sanity/lib/localizedFields";

export default defineType({
  name: "quote",
  title: "Quote",
  type: "object",
  icon: Quote,
  fieldsets: [
    { name: "content", title: "Content (Spanish)" },
    englishFieldset,
  ],
  fields: [
    // Spanish
    defineField({
      name: "quoteText",
      title: "Quote Text (ES)",
      type: "text",
      rows: 3,
      fieldset: "content",
    }),
    defineField({
      name: "attribution",
      title: "Attribution (ES)",
      type: "string",
      fieldset: "content",
    }),
    // English
    defineField({
      name: "quoteTextEn",
      title: "Quote Text (EN)",
      type: "text",
      rows: 3,
      fieldset: "english",
    }),
    defineField({
      name: "attributionEn",
      title: "Attribution (EN)",
      type: "string",
      fieldset: "english",
    }),
  ],
  preview: {
    select: {
      quote: "quoteText",
      attribution: "attribution",
    },
    prepare({ quote, attribution }) {
      return {
        title: "Quote",
        subtitle: `"${quote?.substring(0, 40)}..." - ${attribution || ""}`,
      };
    },
  },
});
