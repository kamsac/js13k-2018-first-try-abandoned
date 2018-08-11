const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          compress: {
            arguments: true,
            hoist_funs: true,
            module: true,
            toplevel: true
          },
          mangle: true
        },
      })
    ]
  }
});
