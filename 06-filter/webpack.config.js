// Webpack config
const webpack = require('webpack');
const path = require('path');

const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === 'production';

const nodeModulesPath = path.join(__dirname, '../node_modules');
const cachePath = path.join(nodeModulesPath ,'./.cache');

const resourcePath = path.join(__dirname, './resources/assets');
const buildPath = path.join(__dirname, './build');

// Common plugins
const plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|id)$/),
];

// Common loaders
const imageLoader = [];
const loaders = [
  {
    test: /\.(jsx|js)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      babelrc: false,
      presets: [
        [ 'es2015', { modules: false } ],
        "react",
        "stage-2"
      ]
    }
  },
  {
    test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: isProd ? 'file-loader?publicPath=../&name=fonts/[name].[hash].[ext]' :
                  'file-loader?name=fonts/[name].[ext]'
  },
  {
    test: /.*\.(gif|png|jpe?g)$/i,
    loaders: imageLoader
  }
];

// Configure plugins and loaders depending on environment settings
if (isProd) {
  plugins.push(
    new HardSourceWebpackPlugin({
      cacheDirectory: `${cachePath}/hard-source/[confighash]`,
      recordsPath: `${cachePath}/hard-source/[confighash]/records.json`,
      configHash: require('node-object-hash')({sort: false}).hash,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false
      },
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash].css',
      allChunks: true,
    })
  );

  imageLoader.push(
    'file-loader?name=img/[name].[hash].[ext]',
    {
      loader: 'image-webpack-loader',
      query: {
        optipng: {
          quality: '65-90',
          speed: 4,
          optimizationLevel: 7,
          interlaced: false
        },
        gifsicle: {
          quality: '65-90',
          speed: 4,
          optimizationLevel: 7,
          interlaced: false
        },
        mozjpeg: {
          quality: '65-90',
          speed: 4,
          optimizationLevel: 7,
          interlaced: false,
          progressive: true
        }
      }
    }
  );

  loaders.push(
    {
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!sass-loader',
      }),
    }
  );
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  imageLoader.push('file-loader?name=img/[name].[ext]');
  loaders.push({
    test: /\.(css|sass|scss)$/,
    use: ['style-loader', 'css-loader', 'sass-loader',]
  });
}

// Split each entry to app and vendor bundle
plugins.push(
  new webpack.ProvidePlugin({
    moment: "moment",
    $: "jquery",
    jQuery: "jquery",
    "window.$": "jquery",
    "window.jQuery": "jquery"
  }),
  // Common vendor
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor-common',
    chunks: [
      'app1',
      'app2',
      'app3',
    ],
  }),
  // Split app and vendor code of app1
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor-app1',
    chunks: ['app1'],
    minChunks: ({ resource }) => /node_modules/.test(resource),
  }),
  // Split app and vendor code of app2
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor-app2',
    chunks: ['app2'],
    minChunks: ({ resource }) => /node_modules/.test(resource),
  }),
  // Split app and vendor code of app3
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor-app3',
    chunks: ['app3'],
    minChunks: ({ resource }) => /node_modules/.test(resource),
  })
);

// Configuration
module.exports = {
  devtool: isProd ? 'source-map' : 'eval',
  context: resourcePath,
  entry: {
    'app1': './js/app1.js',
    'app2': './js/app2.js',
    'app3': './js/app3.js',
  },
  output: {
    path: buildPath + '/assets/',
    filename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    chunkFilename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    publicPath: '/assets/'
  },
  module: {
    loaders: loaders
  },
  resolve: {
    alias: {
      joi: 'joi-browser'
    },
    modules: [
      resourcePath,
      nodeModulesPath
    ],
  },
  plugins,
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    port: 3001,
    proxy: {
      '**': `http://localhost:3000/`,
    },
    hot: true,
    inline: true,
    publicPath: '/assets/',
    compress: isProd,
    watchOptions: {
      poll: true
    },
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      }
    },
  }
};
