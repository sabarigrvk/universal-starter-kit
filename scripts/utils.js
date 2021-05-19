import webpack from "webpack";
import chalk from "chalk";

export const logMessage = (message, type) => {
  let color = "white";
  switch (type) {
    case "info":
      color = "cyanBright";
      break;
    case "error":
      color = "redBright";
      break;
    case "warning":
      color = "yellowBright";
      break;
    default:
      color = "white";
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

export const logCompiler = (error, stats) => {
  if (!error && !stats.hasErrors()) {
    console.log(stats.toString(stats));
    return;
  }

  if (error) {
    logMessage(error, "error");
  }

  if (stats.hasErrors()) {
    const info = stats.toJson();
    const errors = info.errors[0].details;
    logMessage(errors, "error");
  }
};

export const clientOnly = () => process.argv.includes("--client-only");

export const getWebpackPort = () =>
  process.env.WEBPACK_PORT ||
  (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8501);
