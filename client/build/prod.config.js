const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const config = require('../../config');
const baseWebpackConfig = require('./base.config');
const plugins = [
  new webpack.DefinePlugin({
    'process.env': config.prod.env,
    '_config.urls': config.prod.urls
  }),
  new TerserWebpackPlugin()
]

if (config.common.productionGzip) {
  plugins.push(new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(`\\.(${config.common.productionGzipExtensions.join('|')})$`),
      threshold: 10240,
      minRatio: 0.8
    }));
}

module.exports = merge(baseWebpackConfig('production'), {
  devtool: config.common.productionSourceMap ? '#source-map' : false,
  plugins
});
