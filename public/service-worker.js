import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies'
import { BackgroundSyncPlugin } from 'workbox-background-sync'

precacheAndRoute(self.__WB_MANIFEST)

const backgroundSync = new BackgroundSyncPlugin('addTask')

registerRoute(
  new RegExp('/api/tasks'),
  new NetworkOnly({ plugins: [backgroundSync] }),
  'POST'
)

registerRoute(
  /\.(?:css|html|js|svg)$/,
  new StaleWhileRevalidate({ cacheName: 'static' })
)

registerRoute('/', new StaleWhileRevalidate({ cacheName: 'static' }))
