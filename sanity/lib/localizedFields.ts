import { defineField } from "sanity";

type FieldType = "string" | "text" | "blockContent";

interface LocalizedFieldOptions {
  name: string;
  title: string;
  type?: FieldType;
  rows?: number; // for text type
  fieldset?: string;
  description?: string;
  validation?: any;
}

/**
 * Creates a pair of localized fields (Spanish primary, English secondary)
 * Spanish field: uses the original name
 * English field: uses name + "En" suffix
 */
export function createLocalizedField(options: LocalizedFieldOptions) {
  const { name, title, type = "string", rows, fieldset, description, validation } = options;

  const baseField: any = {
    name,
    title: `${title} (ES)`,
    type,
    description,
    validation,
  };

  const enField: any = {
    name: `${name}En`,
    title: `${title} (EN)`,
    type,
    description: description ? `English: ${description}` : undefined,
  };

  if (fieldset) {
    baseField.fieldset = fieldset;
    enField.fieldset = "english";
  }

  if (type === "text" && rows) {
    baseField.rows = rows;
    enField.rows = rows;
  }

  return [defineField(baseField), defineField(enField)];
}

/**
 * Creates the English fieldset configuration
 * Use this in your schema's fieldsets array
 */
export const englishFieldset = {
  name: "english",
  title: "English Content",
  options: { collapsible: true, collapsed: true },
};

/**
 * Creates localized fields for common patterns
 */
export const localizedFields = {
  heading: (fieldset?: string) =>
    createLocalizedField({
      name: "heading",
      title: "Heading",
      type: "string",
      fieldset,
    }),

  tagline: (fieldset?: string) =>
    createLocalizedField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      fieldset,
    }),

  description: (fieldset?: string, rows = 3) =>
    createLocalizedField({
      name: "description",
      title: "Description",
      type: "text",
      rows,
      fieldset,
    }),

  buttonText: (fieldset?: string) =>
    createLocalizedField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      fieldset,
    }),

  eyebrow: (fieldset?: string) =>
    createLocalizedField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
      fieldset,
    }),
};
