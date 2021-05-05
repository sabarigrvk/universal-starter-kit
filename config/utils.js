const chalk = require("chalk");

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

module.exports = { logMessage };
