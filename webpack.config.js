const path = require('path')

module.exports = {
  entry: {
    game: './transpile/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/public/build'
  },
  mode: 'production',
}
