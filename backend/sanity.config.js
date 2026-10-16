import './structure.css';
import {defineConfig, isDev} from 'sanity'
import {structureTool} from 'sanity/structure'
import {myStructure} from './structure.js'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {colorInput} from '@sanity/color-input'
import {media} from 'sanity-plugin-media'

const singletonActions = new Set(['publish', 'discardChanges', 'restore', 'delete'])
const singletonTypes = new Set(['selection', 'info', 'settings'])

export function StatusBadge(props) {
  const status = props.published?.status || props.draft?.status
  if (!status) return null

  let color = 'primary'
  if (status === 'public') color = 'success'
  if (status === 'hidden') color = 'danger'

  return {
    label: status.charAt(0).toUpperCase() + status.slice(1),
    title: `Status: ${status}`,
    color,
  }
}


export default defineConfig({
  name: 'default',
  title: 'Giulia Taglialatela',

  projectId: 'l9ltsld4',
  dataset: 'production',

  releases: {enabled: isDev},
  scheduledDrafts: {enabled: isDev},

  plugins: [
    structureTool({
      structure: myStructure,
    }),
    ...(isDev ? [visionTool()] : []),
    media(),
    colorInput(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
	badges: [StatusBadge]
  },
})
