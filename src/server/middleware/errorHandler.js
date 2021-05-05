import { sep } from "path";

const errorHandler = (err, req, res, next) => {
  return res.status(404).json({
    status: "error",
    message: err.message,
    stack:
      process.env.NODE_ENV === "development" &&
      (err.stack || "")
        .split("\n")
        .map((line) => line.trim())
        .map((line) => line.split(sep).join("/"))
        .map((line) => line.replace(process.cwd().split(sep).join("/"), ".")),
  });
};

export default errorHandler;
