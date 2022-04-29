const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const configPath = '../src/config'
const paths = require(`${configPath}/paths`)
const getClientEnvironment = require(`${configPath}/env`)

const { appIndexJs, esLintFile, appBuild, publicUrlOrPath } = paths

const env = getClientEnvironment(publicUrlOrPath)

const cssRegex = /\.css$/
const sassRegex = /\.(scss|sass)$/

module.exports = {
  entry: appIndexJs,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]ss|js|ts)/,
        enforce: 'pre',
        loader: 'import-glob',
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: esLintFile,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: cssRegex,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: sassRegex,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
      components: path.resolve(__dirname, '../src/components'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    new webpack.DefinePlugin(env.stringified),
    new WebpackManifestPlugin(),
    new LodashModuleReplacementPlugin(),
  ],
  output: {
    path: appBuild,
    globalObject: 'this',
  },
}
