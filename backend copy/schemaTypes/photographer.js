import {CropIcon} from '@sanity/icons'

export default {
  name: 'photographer',
  type: 'document',
  icon: CropIcon,
  fields: [
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
  ],
};