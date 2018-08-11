const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const rootPath = require('app-root-path') + '';

module.exports = {
  target: 'web',
  entry: {
    main: path.resolve(rootPath, './src/main.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(rootPath, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          }
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'js13k-2018',
      template: path.resolve(rootPath, 'src/index.html'),
      minify: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true
      },
      showErrors: false
    }),
  ]
};
