// Import dependencies
const webpack = require('webpack');
const path = require('path');

const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Config variables
const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === 'production';

const nodeModulesPath = path.join(__dirname, '../node_modules');

const resourcePath = path.join(__dirname, './resources/assets');
const buildPath = path.join(__dirname, './build');

// Common plugins
const plugins = [
  // Make sure Webpack is given current environment with quotes ("")
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
  }),

  // Provide plugin to prevent "moment is not defined" or "$ is not defined"
  new webpack.ProvidePlugin({
    moment: 'moment',
    $: 'jquery',
    jQuery: 'jquery',
    'window.$': 'jquery',
    'window.jQuery': 'jquery',
  }),
];

// Common loaders
const imageLoader = [];
const loaders = [
  // Use babel-loader to transpile file with JS/JSX extension
  {
    test: /\.(jsx|js)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      babelrc: false,
      presets: [
        ['es2015'],
        'react',
        'stage-2',
      ],
    },
  },

  // Use file-loader to load fonts
  {
    test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: isProd ? 'file-loader?publicPath=../&name=fonts/[name].[hash].[ext]' :
      'file-loader?name=fonts/[name].[ext]',
  },

  // Use imageLoader to load images
  {
    test: /.*\.(gif|png|jpe?g)$/i,
    loaders: imageLoader,
  },
];

// Configure plugins and loaders depending on environment settings
if (isProd) {
  plugins.push(
    // Add global options for all loaders
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    // Uglify Javascript files
    new webpack.optimize.UglifyJsPlugin(),

    // [NEW]: Split each entry to app and vendor bundle
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
    }),

    // Hash assets
    new WebpackMd5Hash(),

    // Add manifest to assets after build
    new ManifestPlugin(),

    // [NEW]: enable hash on chunk bundles
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }),

    // Separate CSS files from the Javascript files
    // [NEW]: change [hash] to [chunkhash] and add property allChunks: true
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash].css',
      allChunks: true,
    })
  );

  // Apply optimizing for images on production
  imageLoader.push(
    'file-loader?name=img/[name].[hash].[ext]',
    {
      loader: 'image-webpack-loader',
      query: {
        optipng: {
          quality: '65-90',
          speed: 4,
          optimizationLevel: 7,
          interlaced: false,
        },
        gifsicle: {
          quality: '65-90',
          speed: 4,
          optimizationLevel: 7,
          interlaced: false,
        },
        mozjpeg: {
          quality: '65-90',
          speed: 4,
          optimizationLevel: 7,
          interlaced: false,
          progressive: true,
        },
      },
    }
  );

  // Use css-loader and sass-loader as an input for ExtractTextPlugin
  // If CSS files are not extracted, use style-loader instead
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
  // Enable hot reload on development
  plugins.push(new webpack.HotModuleReplacementPlugin());

  // Standard loading on development
  imageLoader.push('file-loader?name=img/[name].[ext]');

  // Use style-loader, css-loader, and sass-loader on development
  loaders.push({
    test: /\.(css|sass|scss)$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  });
}

// Configuration
module.exports = {
  // source-map: long build, smaller size, production
  // eval: fast build, bigger size, development
  devtool: isProd ? 'source-map' : 'eval',

  // Source directory
  context: resourcePath,

  // Source files; relative to context
  entry: {
    app1: './js/app1.js',
    app2: './js/app2.js',
    app3: './js/app3.js',
  },

  // Output directory
  // [NEW]: change [hash] to [chunkhash], add output.chunkFilename
  output: {
    path: `${buildPath}/assets/`,
    filename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    chunkFilename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    publicPath: '/assets/',
  },

  // Loaders used to load modules
  module: {
    loaders,
  },

  // Resolve a module name as another module and
  // directories to lookup when searching for modules
  resolve: {
    alias: {
      joi: 'joi-browser',
    },
    modules: [
      resourcePath,
      nodeModulesPath,
    ],
  },

  // Plugins used
  plugins,

  // webpack-dev-server (more like webpack-dev-middleware) configuration
  devServer: {
    // It should be the same as buildPath
    contentBase: './build',

    // Fallback to /index.html when not found
    historyApiFallback: true,
    port: 3001,

    // Proxy to a running server
    proxy: {
      '**': 'http://localhost:3000/',
    },

    // Enable hot-reload
    hot: true,

    // Inline HTML instead of iframe
    inline: true,

    // Same as output.publicPath
    publicPath: '/assets/',
    compress: false,

    // Enable "waiting" for file changes
    watchOptions: {
      poll: true,
    },

    // Show stats after in-memory bundle has been built
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
      },
    },
  },
};
