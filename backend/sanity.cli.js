import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'l9ltsld4',
    dataset: 'production'
  },
  studioHost: 'giuliataglialatela',
  deployment: {
    appId: 't5nvpamhpwjftnizyscw2vw0',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: false,
  },
})
