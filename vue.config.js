module.exports = {
  devServer: {
    proxy: {
      '/query': {
        // target: 'http://1.14.99.220:8090',
        target: 'http://localhost:8000'
        // changeOrigin: true
      }
    }
  },
  outputDir: 'dist',
  publicPath: './'
}
