module.exports = {
  entry: {
    game: './frontend/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/public/build'
  },
  mode: 'production',
}
