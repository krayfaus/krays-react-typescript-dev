/* eslint-env es6 */
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const lodash = require('lodash');
const path = require('path');

/** Returns the absolute path in relation to root directory.
 * @param {string} relativePath - self described.
 */
function getAbsolutePath(relativePath)
{
  return path.join(__dirname, relativePath);
}

const PRODUCTION_BUILD = process.env.NODE_ENV === 'production';
const DEVELOPMENT_BUILD = process.env.NODE_ENV === 'development';
const BUILD_DIRECTORY = getAbsolutePath('dist');

const commonConfig = {
  context: __dirname,  // to find tsconfig.json automatically.
  devtool: DEVELOPMENT_BUILD ? 'source-map' : false,
  mode: PRODUCTION_BUILD ? 'production' : 'development',
  output: { path: BUILD_DIRECTORY },
  node: { __dirname: false, __filename: false },
  resolve: {
    alias: {
      _: getAbsolutePath('src'),
      _main: getAbsolutePath('src/main'),
      _core: getAbsolutePath('src/core'),  // some people may call this lib.
      _preload: getAbsolutePath('src/preload'),
      _renderer: getAbsolutePath('src/renderer'),
      _components: getAbsolutePath('src/renderer/components')
    },
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true  // type checking now takes place in fork-ts-checker-webpack-plugin.
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|svg|ico|icns)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}'
      },
    }),
  ],
};

const mainConfig = lodash.cloneDeep(commonConfig);
mainConfig.entry = './src/main/main.ts';
mainConfig.target = 'electron-main';
mainConfig.output.filename = 'main.bundle.js';
mainConfig.plugins = [
  ...mainConfig.plugins,
  new CopyPlugin({
    patterns: [
      {
        from: 'package.json',
        to: 'package.json',
        transform: (content, _path) =>
        {
          const jsonContent = JSON.parse(content);

          delete jsonContent.devDependencies;
          delete jsonContent.scripts;
          delete jsonContent.build;

          jsonContent.main = './main.bundle.js';
          jsonContent.scripts = { start: 'electron ./main.bundle.js' };
          jsonContent.postinstall = 'electron-builder install-app-deps';

          return JSON.stringify(jsonContent, undefined, 2);
        },
      },
    ],
  }),
];

const rendererConfig = lodash.cloneDeep(commonConfig);
rendererConfig.entry = './src/renderer/renderer.tsx';
rendererConfig.target = 'electron-renderer';
rendererConfig.output.filename = 'renderer.bundle.js';
rendererConfig.plugins = [
  ...mainConfig.plugins,
  new HtmlPlugin({
    template: path.resolve(__dirname, './src/renderer/index.html'),
  }),
  new CopyPlugin({
    patterns: [{
      from: 'src/renderer/resources/',
      to: "resources/"  // some may want to rename this to assets.
    }]
  })
];

const preloadConfig = lodash.cloneDeep(commonConfig);
preloadConfig.entry = './src/preload/index.ts';
preloadConfig.target = 'electron-preload';
preloadConfig.output.filename = 'preload.bundle.js';

module.exports = [mainConfig, preloadConfig, rendererConfig];