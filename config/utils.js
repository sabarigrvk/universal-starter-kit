const chalk = require("chalk");

const isDev = () => process.env.NODE_ENV === "development";
const isProd = () => process.env.NODE_ENV === "production";

const logMessage = (message, type = "info") => {
  let color =
    type === "error"
      ? "redBright"
      : type === "warning"
      ? "yellowBright"
      : "cyanBright";

  console.log(
    `\n [${new Date().toLocaleString()}]`,
    chalk.bold[color](message)
  );
};

module.exports = { logMessage, isDev, isProd };
