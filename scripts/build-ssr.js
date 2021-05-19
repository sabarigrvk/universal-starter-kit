import rimraf from "rimraf";
import getConfig from "../webpack.config";
import { paths } from "../config/paths";
import { getCompiler, logCompiler } from "./utils";

const buildSSR = async () => {
  console.clear();
  rimraf.sync(paths.BUILD_DIR);

  const [clientConfig, serverConfig] = getConfig();
  const [clientCompiler, serverCompiler] = getCompiler(
    clientConfig,
    serverConfig
  );

  clientCompiler.run((error, stats) => {
    logCompiler(error, stats);
  });

  serverCompiler.run((error, stats) => {
    logCompiler(error, stats);
  });
};

export default buildSSR;
