const chalk = require("chalk");

const isDev = () => process.env.NODE_ENV === "development";
const isProd = () => process.env.NODE_ENV === "production";

const logMessage = (message, type) => {
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

  console.log(
    `\n [${new Date().toLocaleString()}]`,
    chalk.bold[color](message)
  );
};

module.exports = { logMessage, isDev, isProd };
