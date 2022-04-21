const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://114.55.1.241:8090/',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    },
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
}