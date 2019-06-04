import * as Busboy from "busboy";
import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";
import { createErrorStackLogger } from "./log";
import * as Redis from "ioredis";
import * as crypto from 'crypto'
let uploadFile = function(ctx: any) {
  var busboy = new Busboy({ headers: ctx.req.headers });
  return new Promise((resolve, reject) => {
    busboy.on(
      "file",
      async (fieldname, file, filename, encoding, mimetype) => {}
    );
    busboy.on("field", fieldname => {
      console.log(fieldname, "field");
    });
    busboy.on("finish", function() {
      console.log("finish");
      resolve(11);
    });
    busboy.on("error", function(err: any) {
      console.log("文件上出错");
      reject(err);
    });
    ctx.req.pipe(busboy);
  });
};
let infinite_routes = (file_path: string, router: any, $class: any) => {
  let dirPath = fs.readdirSync(file_path).filter(item => {
    return item.indexOf(".js") < 0;
  });
  dirPath.forEach((item, index) => {
    let filePath = path.join(file_path, item + "/index.js");
    if (fs.existsSync(filePath)) {
      let fn = require(filePath);
      if (_.isFunction(fn)) {
        router.use(fn(dirPath[index], $class).routes());
      }
    }
  });
};
let RedisConnect = (my_config: any) => {
  return new Promise((resolve, reject) => {
    let client = new Redis(my_config.redis);
    client.on("error", error => {
      console.log("链接redis失败-失败原因保存到日志中", error);
      let redis_err = createErrorStackLogger(my_config.log_path);
      redis_err.log({
        level: "error",
        message: "redis error",
        info: error.stack
      });
      reject(false);
    });
    client.on("ready", () => {
      resolve(client);
    });
  });
};
let md5= (str:string,salt:string="5tasd"):string=>{
  let md5 = crypto.createHash('md5');
  return md5.update(str+salt).digest('hex')
}
let libs = {
  uploadFile,
  infinite_routes,
  RedisConnect,
  md5
};
export = libs;
