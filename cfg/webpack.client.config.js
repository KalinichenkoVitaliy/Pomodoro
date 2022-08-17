const path = require('path');
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const GLOBAL_CSS_REGEXP = /\.global\.css$/;
const DEV_PLUGINS = [new CleanWebpackPlugin(), new HotModuleReplacementPlugin()];
const COMMON_PLUGINS = [
  new DefinePlugin({
    'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
    // 'process.env.SECRET': JSON.stringify(process.env.SECRET),
    // 'process.env.REDIRECT_URL': JSON.stringify(process.env.REDIRECT_URL),
    // 'process.env.PORT': JSON.stringify(process.env.PORT),
  }),
];

/**
 * Генерирует настройку для devtool в зависимости от NODE_ENV
 * - в девелопменте "eval"
 * - в продакшене false
 */
function setupDevtool() {
  if (IS_DEV) return 'eval';
  else return false;
}

/**
 * Генерирует настройку для webpack в зависимости от NODE_ENV
 */
function setupEntry() {
  if (IS_DEV)
    return [
      path.resolve(__dirname, '../src/client/index.jsx'),
      'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr',
    ];
  else return [path.resolve(__dirname, '../src/client/index.jsx')];
}

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',
    },
  },
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: setupEntry(),
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'client.js',
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
        exclude: GLOBAL_CSS_REGEXP,
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.(ico|png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(wav|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'sounds/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  devtool: setupDevtool(),
  plugins: IS_DEV ? DEV_PLUGINS.concat(COMMON_PLUGINS) : COMMON_PLUGINS,
};
