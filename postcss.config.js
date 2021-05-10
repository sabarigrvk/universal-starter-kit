const pkg = require("./package.json");
module.exports = (api) => {
  // api.env: "production" || development
  // api.webpackLoaderContext.target: web || node;
  return {
    // You can specify any options from https://postcss.org/api/#processoptions here
    plugins: [
      "postcss-import",
      [
        "postcss-preset-env",
        {
          /* stage 2 features + features object */
          stage: 2,
          /* List of all features - https://cssdb.org/features */
          // Postcss specific feature id - https://github.com/csstools/postcss-preset-env/blob/master/src/lib/plugins-by-id.js#L36
          features: {
            "nesting-rules": true,
            "color-functional-notation": true,
            "custom-media-queries": true,
          },
          browsers: pkg.browserslist[api.env],
          autoprefixer: { flexbox: "no-2009" },
        },
      ],
      api.env === "production" && [
        "cssnano",
        {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      ],
    ].filter(Boolean),
  };
};
