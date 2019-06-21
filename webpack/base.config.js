const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const minimizeCss = env === 'production';
  const chunkhash = env === 'development' ? '' : '.[chunkhash:7]';
  const hash = env === 'development' ? '' : '.[hash:7]';
  const bundleOutputDir = '../client/dist';
  const cssFileName = `site${chunkhash}.css`;
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const VueLoaderPlugin = require('vue-loader/lib/plugin');

  function resolve(dir, show) {
    return path.join(__dirname, '..', dir);
  }

  function assetsPath(_path) {
    const assetsSubDirectory = 'static';

    return path.posix.join(assetsSubDirectory, _path);
  }

  return {
    stats: { modules: false },
    mode: env,

    entry: {
      'main': [
        resolve('./client/src/app.js'),
        resolve('./node_modules/bootstrap-vue/dist/bootstrap-vue.js'),
        resolve('./client/src/styles/core.scss')
      ]
    },

    output: {
      path: path.join(__dirname, bundleOutputDir),
      filename: `[name]${chunkhash}.js`,
      publicPath: '/dist/'
    },

    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.js',
        '@': resolve('./client/src', true)
      },
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader!indentedSyntax',
          },
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src'), resolve('test')],
        },
        {
          test: /\.(scss|sass|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // minimize: minimizeCss,
                sourceMap: true
              }
            },
            'css-loader',
            'sass-loader'
          ]
          // use: extractCss.extract([
          //     {
          //       loader: 'css-loader',
          //       options: {
          //         // minimize: minimizeCss,
          //         sourceMap: true
          //       }
          //     },
          //     {
          //       loader: 'sass-loader',
          //       options: {
          //         // minimize: minimizeCss,
          //         sourceMap: true
          //       }
          //     }
          //   ])
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 3000,
            name: assetsPath(`img/[name]${hash}.[ext]`),
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsPath(`media/[name]${hash}.[ext]`),
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsPath(`fonts/[name]${hash}.[ext]`),
          },
        }
      ]
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: cssFileName
      }),
      new VueLoaderPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: ''
      })
    ]
  };
};