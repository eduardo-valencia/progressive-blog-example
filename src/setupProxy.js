const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  const proxyWithConfig = createProxyMiddleware(['/api/**'], {
    target: 'http://localhost:5000',
  })
  app.use(proxyWithConfig)

  const serverProxy = createProxyMiddleware(['/reminder'], {
    target: 'http://localhost:8000',
  })
  app.use(serverProxy)
}
