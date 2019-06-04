import * as Koa from "koa";
import * as path from "path";
import * as R from "ramda";
import * as _ from "lodash";
import * as fs from "fs";
import { createErrorStackLogger } from "./libs/log";
let node_env = process.env.NODE_ENV + "";
import * as Libs from "./libs";
let my_config = require(`./config/${
  node_env == "undefined" ? "development" : node_env
}`);
export class Server {
  app: Koa = null;
  config: any = my_config;
  MIDDLEWARES: string[] = ["start", "error", "router"];
  port: number = 8080;
  Libs = Libs;
  constructor() {
    let self:any = this;
    if (my_config.use_sql) {
      let db = require("./libs/db");
      db.getConnection(my_config.mysql)
        .then((db_connection: any) => {
          this.startApp({ db: db_connection });
        })
        .catch((error: any) => {
          console.log("链接mysql失败-失败原因保存到日志中", error);
          let mysqlErr = createErrorStackLogger(this.config.log_path);
          mysqlErr.log({
            level: "error",
            message: "mysql error",
            info: error.stack
          });
        });
    } else {
      this.app = new Koa();
      this.app.context.$class = self;
      this.startApp();
    }
  }
  async startApp(options: { db?: any } = {}) {
    let self:any = this;
    let client:any = {};
    this.app = new Koa();
    if (my_config.use_redis) {
      client = await Libs.RedisConnect(my_config);
    }
    if (client == false) {
      console.log("链接redis失败-失败原因保存到日志中");
    } else {
      
      this.app.context.$redis = client;
      this.app.context.$class = self;
      if (options.db) {
        this.app.context.$db = options.db;
      }
      this.start();
    }
  }
  start() {
    if (this.app) {
      this.useMiddleWares();
    }
  }
  useMiddleWares() {
    // 过滤掉没有的路径
    let middlewares = R.filter((md_name: string) => {
      return (
        md_name != "" &&
        fs.existsSync(path.join(__dirname, "./middleware", md_name + ".js"))
      );
    })(this.MIDDLEWARES);
    R.forEach(
      R.pipe(
        (md_name: string) => {
          let filePath = path.join(__dirname, "./middleware", md_name);
          return require(filePath);
        },
        fn => {
          if (_.isFunction(fn)) {
            fn(this.app, this);
          }
        }
      )
    )(middlewares);
    this.app.listen(this.port);
  }
}
