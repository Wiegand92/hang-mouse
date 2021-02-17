const path = require('path')

module.exports = {
  entry: './src/hangman.js',
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: 'hangman.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader:'babel-loader',
        options: {
          presets: ['@babel/env'],
          plugins: [
            '@babel/plugin-proposal-class-properties'
          ]
        }
      }
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/scripts/',
    inline: true,
    hot: true,
    watchContentBase: true
  }
}