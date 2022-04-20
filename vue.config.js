const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://ship.ahzhgc.cn',
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
