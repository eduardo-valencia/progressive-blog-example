import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies'
import { BackgroundSyncPlugin } from 'workbox-background-sync'
import process from 'process'

const backgroundSync = new BackgroundSyncPlugin('addTask')

registerRoute(
  new RegExp('/api/tasks'),
  new NetworkOnly({ plugins: [backgroundSync] }),
  'POST'
)

const handlePush = (event) => {
  const options = {
    body: event.body || 'Test',
  }
  event.waitUntil(self.registration.showNotification('Reminder!', options))
}

self.addEventListener('push', handlePush)

registerRoute(
  /\.(?:css|html|js|svg)$/,
  new StaleWhileRevalidate({ cacheName: 'static' })
)

registerRoute('/', new StaleWhileRevalidate({ cacheName: 'static' }))

if (process.env.NODE_ENV === 'production') {
  precacheAndRoute(self.__WB_MANIFEST)
}
