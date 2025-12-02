// import { PowerSyncDatabase } from '@powersync/web'
import { SyncClientImplementation } from '@powersync/web'
import {
  // AppSchema,
  AppSchemaWithDiagnostics,
} from '~/powersync/AppSchema'
import { SupabaseConnector } from '~/powersync/SuperbaseConnector'
import { NuxtPowerSyncDatabase } from '../../src/runtime/utils/NuxtPowerSyncDatabase'

export default defineNuxtPlugin({
  async setup(nuxtApp) {
    const db = new NuxtPowerSyncDatabase({
      database: {
        dbFilename: 'a-db-name.sqlite',
      },
      schema: AppSchemaWithDiagnostics,
    })

    const connector = new SupabaseConnector()

    await db.init()

    await db.connect(connector)

    const plugin = createPowerSyncPlugin({ database: db })

    nuxtApp.vueApp.use(plugin)
  },
})
