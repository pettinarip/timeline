var path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: './src/main.js',
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
  }
}
