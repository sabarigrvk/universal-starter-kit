const { DefinePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const { isDev, isProd } = require("./utils");

const sharedPlugins = [
  new MiniCssExtractPlugin({
    filename: isDev() ? "[name].css" : "[name].[contenthash].css",
    chunkFilename: isDev() ? "[id].css" : "[id].[contenthash].css",
  }),
];

const clientPlugins = [
  new DefinePlugin({
    __SERVER__: "false",
    __BROWSER__: "true",
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
