import rimraf from "rimraf";
import nodemon from "nodemon";
import { logMessage } from "../config/utils";
import getConfig from "../webpack.config";
import { getCompiler, getCompilerPromise } from "./utils";
import { paths } from "../config/paths";

const buildSSR = async () => {
  console.clear();
  rimraf.sync(paths.BUILD_DIR);

  const [clientConfig, serverConfig] = getConfig();
  const [clientCompiler, serverCompiler] = getCompiler(
    clientConfig,
    serverConfig
  );
  const clientPromise = getCompilerPromise("client", clientCompiler);
  const serverPromise = getCompilerPromise("server", serverCompiler);

  serverCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      return;
    }
  });

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      return;
    }
    logMessage(stats.compilation.errors, "error");
  });

  try {
    await serverPromise;
    await clientPromise;
  } catch (error) {
    logMessage(error, "error");
  }

  const script = nodemon({
    script: `${paths.SERVER_BUILD_DIR}/server.js`,
    ignore: ["*"],
  });

  script.on("start", async () => {});

  script.on("quit", () => {
    logMessage("Process ended", "warning");
    process.exit();
  });

  script.on("error", () => {
    logMessage("An error occured. exiting", "error");
    process.exit(1);
  });
};

export default buildSSR;
