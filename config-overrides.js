const { join } = require('path')
const { InjectManifest } = require('workbox-webpack-plugin')
const { env } = require('process')

const getPublicPath = (subPath) => join(__dirname, 'public', subPath)

const getPluginConfig = () => {
  const baseConfig = {
    swSrc: getPublicPath('service-worker-src.js'),
    maximumFileSizeToCacheInBytes: 100 * 1024 * 1024,
  }
  if (env.NODE_ENV === 'production') {
    return {
      ...baseConfig,
      swDest: getPublicPath('service-worker.js'),
      include: [/\.svg$/, /\.html$/, /\.css$/, /\.js$/],
    }
  }
  return baseConfig
}

const getInjectManifestPlugin = () => {
  const config = getPluginConfig()
  return new InjectManifest(config)
}

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
