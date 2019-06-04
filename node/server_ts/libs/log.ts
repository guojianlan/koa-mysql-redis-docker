import * as winston from "winston";
import * as path from "path";
import * as DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, label, printf, json } = winston.format;
//---------------error-stack 日志 --------------------------------
let createErrorStackLogger = function(filepath: string = "") {
  let errStackLogger = winston.createLogger({
    level: "error",
    format: combine(
      label({ label: "error" }),
      timestamp(),
      printf(print => {
        let { level, message, label, timestamp, info } = print;
        info = info
          .replace(/at.+\/node_modules\/.+(\)|\d)/g, "")
          .replace(/(\r\n)|\n/g, "")
          .replace(/at\s+/g, "\n");
        return `${new Date(
          timestamp
        ).toLocaleString()} [${label}] ${level}: ${message}--print: \n ${info}`;
      })
    ),
    transports: [
      new DailyRotateFile({
        filename: path.resolve(filepath,`log/error_stack/%DATE%.log`),
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d"
      })
    ]
  });
  return errStackLogger;
};
let createErrorRequestLogger = function(filepath: string = "") {
  let errStackLogger = winston.createLogger({
    level: "error",
    format: combine(
      label({ label: "error" }),
      timestamp(),
      printf(print => {
        let { level, message, label, timestamp, info } = print;
        info = info
          .replace(/at.+\/node_modules\/.+(\)|\d)/g, "")
          .replace(/(\r\n)|\n/g, "")
          .replace(/at\s+/g, "\n");
        return `${new Date(
          timestamp
        ).toLocaleString()} [${label}] ${level}:\n ${message}--print: \n ${info}`;
      })
    ),
    transports: [
      new DailyRotateFile({
        filename: path.resolve(filepath,`log/error_request/%DATE%.log`),
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d"
      })
    ]
  });
  return errStackLogger;
};
let createLog = (type: string = "debug") => {
  return function(filepath: string = "") {
    let Log = winston.createLogger({
      level: type,
      format: json(),
      transports: [
        new DailyRotateFile({
          filename: path.resolve(filepath,`log/${type}/%DATE%.log`),
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d"
        })
      ]
    });
    return Log;
  };
};
let init = (app: any, filepath: string = "") => {
  app.context.createError = createErrorStackLogger(filepath);
  app.context.requestError = createErrorRequestLogger(filepath)
  let appDebug: any = createLog()(filepath);
  let appError: any = createLog("error")(filepath);
  app.context.$log = (str: any, type: string = "debug") => {
    if (type == "debug") {
      appDebug.log({
        level: "debug",
        message: "debug",
        info: str
      });
    } else {
      appError.log({
        level: "error",
        message: "error",
        info: str
      });
    }
  };
};
let Log = {
  createErrorStackLogger,
  createDeBug: createLog(),
  createError: createLog("error"),
  init: init
};
export = Log;
