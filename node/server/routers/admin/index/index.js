"use strict";
const Router = require("koa-router");
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
        // ctx.throw(404)
        ctx.body = 'admin/index';
        // await ctx.render("index");
    });
    // 找到文件夹
    return router;
};
module.exports = addRouter;
