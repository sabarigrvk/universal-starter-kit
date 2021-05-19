const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { isDev, isProd } = require("./utils");
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const postcssOptions = {
  loader: require.resolve("postcss-loader"),
  options: {
    sourceMap: isDev(),
  },
};
const cssModuleOptions = {
  exportLocalsConvention: "camelCase",
  localIdentName: isDev()
    ? "[name]-[local]-[hash:base64:5]"
    : "[hash:base64:8]",
};

const cssLoaderClient = {
  test: cssRegex,
  exclude: cssModuleRegex,
  sideEffects: true,
  use: [
    isDev() ? "style-loader" : MiniCssExtractPlugin.loader,
    {
      loader: require.resolve("css-loader"),
      options: {
        sourceMap: isDev(),
        importLoaders: 1,
      },
    },
    postcssOptions,
  ],
};

const cssLoaderServer = {
  test: cssRegex,
  exclude: cssModuleRegex,
  sideEffects: true,
  use: [
    {
      loader: require.resolve("css-loader"),
      options: {
        sourceMap: isDev(),
        importLoaders: 1,
      },
    },
    postcssOptions,
  ],
};

const cssModuleLoaderClient = {
  test: cssModuleRegex,
  sideEffects: true,
  use: [
    isDev() ? "style-loader" : MiniCssExtractPlugin.loader,
    {
      loader: require.resolve("css-loader"),
      options: {
        modules: cssModuleOptions,
        importLoaders: 1,
        sourceMap: isDev(),
      },
    },
    postcssOptions,
  ],
};

const cssModuleLoaderServer = {
  test: cssModuleRegex,
  sideEffects: true,
  use: [
    {
      loader: require.resolve("css-loader"),
      options: {
        modules: {
          ...cssModuleOptions,
          // useful for ssr: https://github.com/webpack-contrib/css-loader#exportonlylocals
          exportOnlyLocals: true,
        },
        importLoaders: 1,
        sourceMap: true,
      },
    },
    postcssOptions,
  ],
};

const scriptsLoader = {
  oneOf: [
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    },
    {
      test: /\.(js|jsx|mjs)$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve("babel-loader"),
        options: {
          cacheDirectory: true,
          compact: isProd(),
          cacheCompression: false,
          babelrc: false,
          envName: process.env.NODE_ENV,
          ignore: ["node_modules", "build"],
        },
      },
    },
  ],
};

const clientLoaders = [
  {
    oneOf: [cssLoaderClient, cssModuleLoaderClient, scriptsLoader],
  },
];

const serverLoaders = [
  {
    oneOf: [cssLoaderServer, cssModuleLoaderServer, scriptsLoader],
  },
];

module.exports = { clientLoaders, serverLoaders };
