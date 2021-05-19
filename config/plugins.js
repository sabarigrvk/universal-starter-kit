const { DefinePlugin } = require("webpack");
const { join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require("webpackbar");
const LoadablePlugin = require("@loadable/webpack-plugin");
const { isProd } = require("./utils");
const { paths } = require("./paths");

const sharedPlugins = [
  isProd() &&
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].css",
    }),
].filter(Boolean);

const clientPlugins = [
  new DefinePlugin({
    __SERVER__: "false",
    __BROWSER__: "true",
  }),
  new HtmlWebpackPlugin({
    filename: join(paths.CLIENT_BUILD_DIR, "index.html"),
    inject: true,
    template: paths.HTML_TEMPLATE,
  }),
  new LoadablePlugin({ filename: "stats.json", writeToDisk: true }),
];

const serverPlugins = [
  new DefinePlugin({
    __SERVER__: "true",
    __BROWSER__: "false",
  }),
];

module.exports = { sharedPlugins, clientPlugins, serverPlugins };
