const pkg = require("./package.json");

const isTargetWeb = (caller) => Boolean(caller && caller.target === "web");
const isWebpack = (caller) => Boolean(caller && caller.name === "babel-loader");
const config = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  const web = api.caller(isTargetWeb);
  const webpack = api.caller(isWebpack);
  return {
    // https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
    sourceType: "unambiguous",
    presets: [
      "@babel/react",
      [
        "@babel/env",
        {
          // https://babeljs.io/docs/en/babel-preset-env#include
          useBuiltIns: web ? "entry" : undefined,
          corejs: web ? "core-js@3" : false,
          targets: !web ? { node: "current" } : undefined,
          modules: webpack ? false : "commonjs",
          targets: {
            browsers: pkg.browserslist[api.env()],
          },
        },
      ],
    ],
    plugins: [
      "@loadable/babel-plugin",
      "@babel/plugin-proposal-class-properties",
      [
        "@babel/plugin-transform-runtime",
        {
          corejs: false,
          regenerator: true,
        },
      ],
    ],
  };
};
module.exports = config;
