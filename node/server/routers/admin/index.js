"use strict";
const Router = require("koa-router");
const path = require("path");
let resolve = (str = '') => path.resolve(__dirname, str);
let addRouter = (prifix, $class) => {
    let router = new Router({
        prefix: `/${prifix}`
    });
    router.use(async (ctx, next) => {
        try {
            await next();
        }
        catch (error) {
            throw error;
        }
    });
    router.get("/", async (ctx) => {
        ctx.body = 'admin';
    });
    // 找到文件夹,无限加载
    $class.Libs.infinite_routes(resolve(), router, $class);
    return router;
};
module.exports = addRouter;
