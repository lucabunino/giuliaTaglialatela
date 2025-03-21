import {CogIcon, ColorWheelIcon} from '@sanity/icons'

export default {
  name: 'settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
      hidden: true
    },
    {
      name: 'instagramUrl',
      type: 'url',
    },
    {
      name: 'hoverColor',
      type: 'color',
    },
  ],
};