"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const path = require("path");
const R = require("ramda");
const _ = require("lodash");
const fs = require("fs");
const log_1 = require("./libs/log");
let node_env = process.env.NODE_ENV + "";
const Libs = require("./libs");
let my_config = require(`./config/${node_env == "undefined" ? "development" : node_env}`);
class Server {
    constructor() {
        this.app = null;
        this.config = my_config;
        this.MIDDLEWARES = ["start", "error", "router"];
        this.port = 8080;
        this.Libs = Libs;
        let self = this;
        if (my_config.use_sql) {
            let db = require("./libs/db");
            db.getConnection(my_config.mysql)
                .then((db_connection) => {
                this.startApp({ db: db_connection });
            })
                .catch((error) => {
                console.log("链接mysql失败-失败原因保存到日志中", error);
                let mysqlErr = log_1.createErrorStackLogger(this.config.log_path);
                mysqlErr.log({
                    level: "error",
                    message: "mysql error",
                    info: error.stack
                });
            });
        }
        else {
            this.app = new Koa();
            this.app.context.$class = self;
            this.startApp();
        }
    }
    async startApp(options = {}) {
        let self = this;
        let client = {};
        this.app = new Koa();
        if (my_config.use_redis) {
            client = await Libs.RedisConnect(my_config);
        }
        if (client == false) {
            console.log("链接redis失败-失败原因保存到日志中");
        }
        else {
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
        let middlewares = R.filter((md_name) => {
            return (md_name != "" &&
                fs.existsSync(path.join(__dirname, "./middleware", md_name + ".js")));
        })(this.MIDDLEWARES);
        R.forEach(R.pipe((md_name) => {
            let filePath = path.join(__dirname, "./middleware", md_name);
            return require(filePath);
        }, fn => {
            if (_.isFunction(fn)) {
                fn(this.app, this);
            }
        }))(middlewares);
        this.app.listen(this.port);
    }
}
exports.Server = Server;
