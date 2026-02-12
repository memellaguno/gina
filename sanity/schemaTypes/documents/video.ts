import { Video } from "lucide-react";
import { defineField, defineType } from "sanity";
import { englishFieldset } from "@/sanity/lib/localizedFields";

export default defineType({
  name: "video",
  title: "Videos",
  icon: Video,
  type: "document",
  fieldsets: [englishFieldset],
  fields: [
    defineField({
      name: "title",
      title: "Title (ES)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleEn",
      title: "Title (EN)",
      type: "string",
      fieldset: "english",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "string",
      description:
        "Paste a regular YouTube or Vimeo URL (e.g. https://www.youtube.com/watch?v=abc or https://vimeo.com/123456)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "poster",
      title: "Poster Image",
      type: "image",
      description:
        "Thumbnail image. If not provided, YouTube thumbnails will be auto-generated.",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          initialValue: "Video thumbnail",
        },
      ],
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "poster",
    },
  },
});
