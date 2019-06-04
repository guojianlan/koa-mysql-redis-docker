import * as Koa from "koa";
import { init as initLog } from "../libs/log";
let error = (app: Koa,$server:any) => {
  // 统一处理错误
  initLog(app,$server.config.log_path)
  app.on("error", (error, ctx: Koa.BaseContext) => {
    if (
      error.name == "StatusCodeError" ||
      error.name == "TransformError" ||
      error.name == "RequestError"
    ) {
      //请求后台错误
      ctx.requestError.log({
        level: "error",
        message: JSON.stringify(error.options),
        info: error.message
      });
    } else {
      //正常错误
      if (error.statusCode == 500) {
        ctx.status = 500;
        ctx.body = "server error";
      }
      ctx.createError.log({
        level: "error",
        message: "server error",
        info: error.stack
      });
    }
  });
};
export = error;
