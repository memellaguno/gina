import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";
import AsyncSelect from "@/sanity/components/AsyncSelect";

export default defineType({
  name: "link",
  title: "Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "linkType",
      title: "Link Type",
      type: "string",
      initialValue: "url",
      options: {
        list: [
          { title: "URL", value: "href" },
          { title: "Page", value: "page" },
          { title: "Route", value: "route" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "route",
      title: "Route Path (ES)",
      description: "Spanish route, e.g. /es/perspectivas or /es/videos",
      type: "string",
      hidden: ({ parent }) => parent?.linkType !== "route",
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === "route" && !value) {
            return "Route path is required when Link Type is Route";
          }
          return true;
        }),
    }),
    defineField({
      name: "routeEn",
      title: "Route Path (EN)",
      description: "English route, e.g. /perspectives or /videos",
      type: "string",
      hidden: ({ parent }) => parent?.linkType !== "route",
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      hidden: ({ parent }) => parent?.linkType !== "href",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel", "www"],
        }).custom((value, context: any) => {
          if (context.parent?.linkType === "href" && !value) {
            return "URL is required when Link Type is URL";
          }
          return true;
        }),
    }),
    defineField({
      name: "page",
      title: "Page",
      type: "reference",
      to: [{ type: "page" }],
      hidden: ({ parent }) => parent?.linkType !== "page",
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === "page" && !value) {
            return "Page reference is required when Link Type is Page";
          }
          return true;
        }),
    }),
    defineField({
      name: "linkToSection",
      title: "Link to section in page",
      description: "Optional: You can link to a specific block within a page",
      type: "string",
      components: {
        input: AsyncSelect,
      },
      initialValue: "initial",
      hidden: ({ parent }) => parent?.linkType !== "page",
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    }),
  ],
  options: {
    collapsible: false,
  },
});
