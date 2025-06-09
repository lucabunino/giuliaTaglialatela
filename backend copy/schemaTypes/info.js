import {InfoOutlineIcon, ImageIcon} from '@sanity/icons'

export default {
  name: 'info',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'scope',
      type: 'string',
    },
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'phone',
      type: 'string',
    },
    {
      name: 'portrait',
      type: 'image',
    },
    {
      name: 'content',
      type: 'text',
      rows: 8,
    },
  ],
};