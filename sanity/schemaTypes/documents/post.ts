import {DocumentTextIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType, defineArrayMember} from 'sanity'
import {createLocalizedField, englishFieldset} from '@/sanity/lib/localizedFields'

/**
 * Post schema for the Perspectivas (Blog) section
 * Supports bilingual content (Spanish primary, English secondary)
 */

// Categories matching the design filters
const categories = [
  {title: 'Tips', value: 'tips'},
  {title: 'Insights', value: 'insights'},
  {title: 'Reflections', value: 'reflections'},
  {title: 'Talks', value: 'talks'},
  {title: 'News', value: 'news'},
]

export default defineType({
  name: 'post',
  title: 'Posts',
  icon: DocumentTextIcon,
  type: 'document',
  fieldsets: [
    englishFieldset,
  ],
  fields: [
    // Spanish title (primary)
    defineField({
      name: 'title',
      title: 'Title (ES)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // English title
    defineField({
      name: 'titleEn',
      title: 'Title (EN)',
      type: 'string',
      fieldset: 'english',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the post to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: categories,
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    // Spanish excerpt (primary)
    defineField({
      name: 'excerpt',
      title: 'Excerpt (ES)',
      type: 'text',
      rows: 3,
      description: 'Short description shown in blog cards',
    }),
    // English excerpt
    defineField({
      name: 'excerptEn',
      title: 'Excerpt (EN)',
      type: 'text',
      rows: 3,
      fieldset: 'english',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          initialValue: 'Image',
        },
      ],
      validation: (rule) => rule.required(),
    }),
    // Spanish content (primary)
    defineField({
      name: 'content',
      title: 'Content (ES)',
      type: 'blockContent',
    }),
    // English content
    defineField({
      name: 'contentEn',
      title: 'Content (EN)',
      type: 'blockContent',
      fieldset: 'english',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'date',
      media: 'coverImage',
    },
    prepare({title, media, category, date}) {
      const subtitles = [
        category && category.toUpperCase(),
        date && format(parseISO(date), 'LLL d, yyyy'),
      ].filter(Boolean)

      return {title, media, subtitle: subtitles.join(' • ')}
    },
  },
})
