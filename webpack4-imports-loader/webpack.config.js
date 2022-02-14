const config = {
  mode: 'development',
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'imports-loader?define=>false&module=>false&exports=>false&this=>window'
      }
    ]
  }
}

const webpack = require('webpack')

const compiler = webpack(config)

compiler.run()
