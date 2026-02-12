import { defineField, defineType, defineArrayMember } from "sanity";
import { Video } from "lucide-react";

export default defineType({
  name: "videoGallery",
  title: "Video Gallery",
  type: "object",
  icon: Video,
  fields: [
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "video" }],
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
