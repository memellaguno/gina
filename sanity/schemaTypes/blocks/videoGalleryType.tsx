import { defineField, defineType, defineArrayMember } from "sanity";
import { Video } from "lucide-react";
import { englishFieldset } from "@/sanity/lib/localizedFields";

export default defineType({
  name: "videoGallery",
  title: "Video Gallery",
  type: "object",
  icon: Video,
  fieldsets: [
    { name: "content", title: "Content" },
    englishFieldset,
  ],
  fields: [
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      fieldset: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "video",
          fields: [
            defineField({
              name: "title",
              title: "Title (ES)",
              type: "string",
            }),
            defineField({
              name: "titleEn",
              title: "Title (EN)",
              type: "string",
            }),
            defineField({
              name: "videoFile",
              title: "Video File",
              type: "file",
              options: {
                accept: "video/*",
              },
            }),
            defineField({
              name: "videoUrl",
              title: "Video URL (YouTube/Vimeo)",
              type: "url",
              description: "Alternative to uploading a file",
            }),
            defineField({
              name: "poster",
              title: "Poster Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                { name: "alt", type: "string", title: "Alt text", initialValue: "Video thumbnail" },
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "poster",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      videos: "videos",
    },
    prepare({ videos }) {
      return {
        title: "Video Gallery",
        subtitle: `${videos?.length || 0} videos`,
      };
    },
  },
});
