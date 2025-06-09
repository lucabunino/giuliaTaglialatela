import {HomeIcon} from '@sanity/icons'

export default {
  name: 'selection',
  type: 'document',
  icon: HomeIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
      hidden: true,
    },
    {
      name: 'selected',
      type: 'array',
      validation: (Rule) => Rule.required().min(4),
      of: [
        {
          name: 'selectedProject',
          type: 'object',
          fields: [
            {
              name: 'reference',
              type: 'reference',
              to: [{ type: 'project' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'size',
              type: 'string',
              options: {
                layout: 'radio',
                direction: 'horizontal',
                list: [
                  { title: 'Small', value: 'S' },
                  { title: 'Medium', value: 'M' },
                  { title: 'Large', value: 'L' }
                ],
              },
              initialValue: 'M',
              validation: (Rule) => Rule.required()
            },
          ],
          preview: {
            select: {
              title: 'reference.title',
              date: 'reference.date',
              size: 'size',
              client: 'reference.client.title',
              preview: 'reference.preview'
            },
            prepare({ title, date, client, preview, size }) {
              const formattedYear = date ? new Date(date).getFullYear() : 'No year';
              return {
                title: `[${size}] ${title}`,
                subtitle: `${formattedYear} × ${client || 'No client'}`,
                media: preview,
              };
            }
          }
        }
      ],
    },
  ],
};