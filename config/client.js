const { join } = require("path");
const { HotModuleReplacementPlugin } = require("webpack");
const { merge } = require("webpack-merge");
const { paths } = require("./paths");
const { clientLoaders } = require("./loaders");
const { clientPlugins, sharedPlugins } = require("./plugins");

const baseConfig = {
  name: "client",
  target: "web",
  entry: {
    bundle: [paths.CLIENT_SRC_DIR],
  },
  output: {
    path: join(paths.CLIENT_BUILD_DIR, paths.PUBLIC_DIR),
    publicPath: paths.PUBLIC_DIR,
  },
  module: {
    rules: clientLoaders,
  },
  plugins: [...sharedPlugins, ...clientPlugins],
  stats: {
    assets: true,
  },
};

module.exports = {
  development: merge(baseConfig, {
    devtool: "inline-cheap-module-source-map",
    plugins: [new HotModuleReplacementPlugin()],
  }),
  production: merge(baseConfig, {
    devtool: "source-map",
    output: {
      filename: "[name].[contenthash].js",
    },
  }),
};
