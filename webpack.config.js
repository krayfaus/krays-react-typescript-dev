/* eslint-env es6 */
/* eslint-disable no-console */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context: __dirname,  // to find tsconfig.json automatically.
  entry: './src/index.tsx',
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    path:__dirname+ '/dist/',
    filename: "app.bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true  // type checking now takes place in ForkTsCheckerWebpackPlugin.
        }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}'
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    }),
  ]
};