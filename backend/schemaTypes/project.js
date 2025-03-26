import {orderRankField} from '@sanity/orderable-document-list'

export default {
  name: 'project',
  type: 'document',
  fields: [
    orderRankField({ type: "project" }),
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'singlePaged',
      type: 'boolean',
      description: "Turn this off to hide the link in Archive",
      initialValue: true,
    },
    {
      name: 'date',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY'
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'client',
      type: 'reference',
      to: [{ type: 'client' }]
    },
    {
      name: 'photographer',
      type: 'reference',
      to: [{ type: 'photographer' }]
    },
    { 
      name: 'preview',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'images',
      type: 'array',
      of: [
        { type: 'image' },
      ],
      options: {
        layout: 'grid'
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      client: 'client.title',
      preview: 'preview'
    },
    prepare({ title, date, client, preview }) {
      const formattedYear = date ? new Date(date).getFullYear() : 'No year';
      return {
        title,
        subtitle: `${formattedYear} × ${client || 'No client'}`,
        media: preview,
      };
    }
  }
};