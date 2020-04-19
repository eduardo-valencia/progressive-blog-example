const { join } = require('path')
const { InjectManifest } = require('workbox-webpack-plugin')

const getPublicPath = (subPath) => join(__dirname, 'public', subPath)

const getInjectManifestPlugin = () =>
  new InjectManifest({
    swSrc: getPublicPath('service-worker.js'),
    maximumFileSizeToCacheInBytes: 100 * 1024 * 1024,
    include: [/\.svg$/, /\.html$/, /\.css$/, /\.js$/],
  })

const getWebpackConfig = (config) => {
  const configuredPlugin = getInjectManifestPlugin()
  return {
    ...config,
    plugins: [...config.plugins, configuredPlugin],
  }
}

module.exports = {
  webpack: getWebpackConfig,
}
