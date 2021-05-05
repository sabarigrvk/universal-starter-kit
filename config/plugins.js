const { DefinePlugin } = require("webpack");
const LoadablePlugin = require("@loadable/webpack-plugin");

const sharedPlugins = [];

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
