const { merge } = require("webpack-merge");
const { HotModuleReplacementPlugin } = require("webpack");
const nodeExternals = require("webpack-node-externals");
const { paths } = require("./paths");
const { serverLoaders } = require("./loaders");
const { serverPlugins, sharedPlugins } = require("./plugins");
const baseConfig = {
  name: "server",
  target: "node",
  entry: {
    server: [
      // require.resolve("core-js/stable"),
      // require.resolve("regenerator-runtime/runtime"),
      paths.SERVER_SRC_DIR,
    ],
  },
  externals: [nodeExternals()],
  output: {
    path: paths.SERVER_BUILD_DIR,
    libraryTarget: "commonjs2",
  },
  module: {
    rules: serverLoaders,
  },
  plugins: [...sharedPlugins, ...serverPlugins],
};

module.exports = {
  development: merge(baseConfig, {
    devtool: "inline-cheap-module-source-map",
    plugins: [new HotModuleReplacementPlugin()],
  }),
  production: merge(baseConfig, {
    devtool: false,
  }),
};
