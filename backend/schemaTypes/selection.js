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
              name: 'image',
              type: 'image',
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
              subtitle: 'reference.date',
              media: 'image',
            },
          }
        }
      ],
    },
  ],
};