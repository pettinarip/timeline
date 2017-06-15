var path = require('path')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: './src/timeline.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'timeline.js'
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }],
              'stage-0'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
