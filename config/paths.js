const { resolve } = require("path");
const { realpathSync } = require("fs");

const rootDir = realpathSync(process.cwd());
const resolveApp = (relativePath) => resolve(rootDir, relativePath);

const paths = {
  HTML_TEMPLATE: resolveApp("public/index.html"),
  CLIENT_BUILD_DIR: resolveApp("build/client"),
  SERVER_BUILD_DIR: resolveApp("build/server"),
  DOTENV: resolveApp(".env"),
  SRC_DIR: resolveApp("src"),
  BUILD_DIR: resolveApp("build"),
  CLIENT_SRC_DIR: resolveApp("src/client"),
  SERVER_SRC_DIR: resolveApp("src/server"),
  CONFIG_DIR: resolveApp("config"),
  PUBLIC_DIR: "/static/",
};

const resolvers = {
  extensions: [".js", ".json", ".mjs", ".jsx", ".ts", ".tsx", ".css"],
  modules: [
    paths.CLIENT_SRC_DIR,
    paths.SERVER_SRC_DIR,
    paths.SRC_DIR,
    "node_modules",
  ],
  alias: {
    // should match with jsconfig.json else webpack will complain module not found error
    client: paths.CLIENT_SRC_DIR,
    server: paths.SERVER_SRC_DIR,
    config: paths.CONFIG_DIR,
    components: resolve(paths.SRC_DIR, "shared/components"),
    store: resolve(paths.SRC_DIR, "shared/store"),
  },
};

module.exports = { paths, resolvers };
