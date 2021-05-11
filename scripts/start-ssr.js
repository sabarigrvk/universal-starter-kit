import express from "express";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import nodemon from "nodemon";
import { logMessage } from "../config/utils";
import getConfig from "../webpack.config";
import { getWebpackPort, getCompiler, getCompilerPromise } from "./utils";
import { paths } from "../config/paths";

const startSSR = async () => {
  const WEBPACK_PORT = getWebpackPort();
  const DEVSERVER_HOST = process.env.DEVSERVER_HOST || "http://localhost";
  const [clientConfig, serverConfig] = getConfig();
  const publicPath = clientConfig.output.publicPath;
  clientConfig.output.publicPath = [
    `${DEVSERVER_HOST}:${WEBPACK_PORT}`,
    publicPath,
  ]
    .join("/")
    .replace(/([^:+])\/+/g, "$1/");

  serverConfig.output.publicPath = [
    `${DEVSERVER_HOST}:${WEBPACK_PORT}`,
    publicPath,
  ]
    .join("/")
    .replace(/([^:+])\/+/g, "$1/");
  const [clientCompiler, serverCompiler] = getCompiler(
    clientConfig,
    serverConfig
  );
  const clientPromise = getCompilerPromise("client", clientCompiler);
  const serverPromise = getCompilerPromise("server", serverCompiler);

  // starts client webpack compiler in hmr mode
  const app = express();
  const watchOptions = {
    ignored: /node_modules/,
    stats: clientConfig.stats,
  };
  app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    return next();
  });
  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      serverSideRender: true,
      // writeToDisk is used in favor of WriteFileWebpackPlugin
      // https://github.com/jacob-ebey/webpack-5-ssr-example/blob/e974509636ecd32a74fedb042a5a44033d21fc50/server/middleware/index.js#L40
      writeToDisk: true,
      stats: clientConfig.stats,
    })
  );
  app.use(webpackHotMiddleware(clientCompiler));
  app.use("/static", express.static(paths.CLIENT_BUILD_DIR));
  app.listen(WEBPACK_PORT);

  // starts server in watch mode

  serverCompiler.watch(watchOptions, (error, stats) => {
    logMessage("servercompiler watching");
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
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
  });

  try {
    await serverPromise;
    await clientPromise;
  } catch (error) {
    logMessage(error, "error");
  }

  // start node server using nodemon script and watch for changes in server scriptF
  const script = nodemon({
    script: `${paths.SERVER_BUILD_DIR}/server.js`,
    ignore: ["src", "scripts", "config", "./*.*", "build/client"],
    delay: 200,
  });

  script.on("restart", () => {
    logMessage("Server side app has been restarted.", "warning");
  });

  script.on("quit", () => {
    logMessage("Process ended", "warning");
    process.exit();
  });

  script.on("error", () => {
    logMessage("An error occured. exiting", "error");
    process.exit(1);
  });
};

export default startSSR;
