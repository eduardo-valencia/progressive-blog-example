import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  /\.(?:css|html|js|svg)$/,
  new StaleWhileRevalidate({ cacheName: 'static' })
)

registerRoute(
  'https://jsonplaceholder.typicode.com/posts',
  new NetworkFirst({ cacheName: 'api' })
)

registerRoute('/', new StaleWhileRevalidate({ cacheName: 'static' }))
