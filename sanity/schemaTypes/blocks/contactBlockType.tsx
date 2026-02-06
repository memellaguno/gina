import { formatString } from "@/sanity/lib/helpers";
import { englishFieldset } from "@/sanity/lib/localizedFields";
import { Contact2 } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactBlock",
  type: "object",
  fieldsets: [englishFieldset],
  fields: [
    // Spanish fields (primary)
    defineField({
      name: "heading",
      title: "Heading (ES)",
      type: "string",
      initialValue: "CONTACTO",
    }),
    defineField({
      name: "description",
      title: "Description (ES)",
      type: "text",
      rows: 3,
    }),
    // English fields
    defineField({
      name: "headingEn",
      title: "Heading (EN)",
      type: "string",
      fieldset: "english",
      initialValue: "CONTACT",
    }),
    defineField({
      name: "descriptionEn",
      title: "Description (EN)",
      type: "text",
      rows: 3,
      fieldset: "english",
    }),
    // Show contact form
    defineField({
      name: "showForm",
      title: "Show Contact Form",
      type: "boolean",
      initialValue: true,
      description: "Display the contact form",
    }),
    // Contact info to display
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          description: "Contact email to display (form submissions go to Settings email)",
        }),
        defineField({
          name: "phone",
          title: "Phone",
          type: "string",
        }),
        defineField({
          name: "address",
          title: "Address",
          type: "text",
          rows: 2,
        }),
      ],
    }),
    // Optional image
    defineField({
      name: "image",
      type: "image",
      description: "Optional image for the contact block",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          initialValue: "Image",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      heading: "heading",
    },
    prepare: ({ heading }) => {
      return {
        title: "Contact Block",
        subtitle: heading ? formatString(heading, 25) : "Untitled",
      };
    },
  },
  icon: () => <Contact2 size={16} />,
});
