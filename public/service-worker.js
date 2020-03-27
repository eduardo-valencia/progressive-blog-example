const openApiCache = () => caches.open('api')
const openStaticCache = () => caches.open('static')

const precacheData = async () => {
  const cache = await openStaticCache()
  await cache.addAll([
    'http://localhost:3000/',
    'http://localhost:3000/index.html'
  ])
}

self.addEventListener('install', event => {
  event.waitUntil(precacheData())
})

const getFromCache = async event => {
  const cache = await openApiCache()
  return cache.match(event.request.url)
}

const addClonedResponse = async (event, response) => {
  const cache = await openApiCache()
  await cache.put(event.request, response.clone())
}

const verifyAndSaveResponse = async (event, response) => {
  if (event.request.method === 'GET') {
    return addClonedResponse(event, response)
  }
}

const getFromNetworkOrCache = async event => {
  const response = await fetch(event.request)
  if (response.ok) {
    await verifyAndSaveResponse(event, response)
    return response
  }
  return getFromCache(event)
}

const fetchAndSaveResponse = async event => {
  try {
    return await getFromNetworkOrCache(event)
  } catch (error) {
    if (error) {
      return getFromCache(event)
    }
  }
}

const getFromStaticCache = async event => {
  const cache = await openStaticCache()
  return cache.match(event.request)
}

const getIfIsHtmlPage = event => {
  const index = event.request.url.search(/\.html/)
  const hasHtmlExtension = index !== -1
  return event.request.url === 'http://localhost:3000/' || hasHtmlExtension
}

self.addEventListener('fetch', async event => {
  const isHtmlPage = getIfIsHtmlPage(event)
  if (isHtmlPage) {
    return event.respondWith(getFromStaticCache(event))
  }
  return event.respondWith(fetchAndSaveResponse(event))
})
