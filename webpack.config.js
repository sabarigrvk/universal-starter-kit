const { merge } = require("webpack-merge");
const { resolvers } = require("./config/paths");
const config = () => {
  const mode = process.env.NODE_ENV || "development";
  const baseConfig = {
    mode,
    output: {
      clean: true,
    },
    resolve: {
      ...resolvers,
    },
    stats: {
      // errorDetails: true,
      warnings: false,
    },
  };

  return [
    merge(baseConfig, require("./config/client")[mode]),
    merge(baseConfig, require("./config/server")[mode]),
  ];
};

module.exports = config;
