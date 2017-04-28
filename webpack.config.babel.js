import {join} from 'path'

const include = join(__dirname, 'src');

export default {
  entry: './src/js/quiz.js',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'js-quiz-using-json',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', include }
    ]
  }
}
