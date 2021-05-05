const { paths } = require("./paths");
const scriptsLoader = {
  oneOf: [
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    },
    {
      test: /\.(js|jsx|mjs)$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve("babel-loader"),
        options: {
          cacheDirectory: false,
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
    oneOf: [scriptsLoader],
  },
];

const serverLoaders = [
  {
    oneOf: [scriptsLoader],
  },
];

module.exports = { clientLoaders, serverLoaders };
