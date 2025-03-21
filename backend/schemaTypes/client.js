import {CaseIcon} from '@sanity/icons'

export default {
  name: 'client',
  type: 'document',
  icon: CaseIcon,
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