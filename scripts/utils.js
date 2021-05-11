import webpack from "webpack";
import chalk from "chalk";

export const logMessage = (message, type = "info") => {
  let color = "blue";
  switch (color) {
    case "error":
      color = "red";
      break;
    case "warning":
      color = "yellow";
      break;
  }
  console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

export const getCompilerPromise = (name, compiler) => {
  return new Promise((resolve, reject) => {
    compiler.hooks.done.tap(name, (stats) => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      return reject(`Failed to compile ${chalk.red(name)}`);
    });
  });
};

export const getCompiler = (clientConfig, serverConfig = {}) => {
  if (process.env.NODE_ENV === "development") {
    const DEVSERVER_HOST = process.env.DEVSERVER_HOST || "http://localhost";
    clientConfig.entry.bundle = [
      `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${getWebpackPort()}/__webpack_hmr`,
      ...clientConfig.entry.bundle,
    ];

    clientConfig.output.hotUpdateMainFilename =
      "updates/[fullhash].hot-update.json";
    clientConfig.output.hotUpdateChunkFilename =
      "updates/[id].[fullhash].hot-update.js";
  }
  const { compilers } = webpack([clientConfig, serverConfig]);
  const clientCompiler = compilers.find(
    (compiler) => compiler.name === "client"
  );
  const serverCompiler = compilers.find(
    (compiler) => compiler.name === "server"
  );
  return [clientCompiler, serverCompiler];
};

export const clientOnly = () => process.argv.includes("--client-only");

export const getWebpackPort = () =>
  process.env.WEBPACK_PORT ||
  (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8501);
