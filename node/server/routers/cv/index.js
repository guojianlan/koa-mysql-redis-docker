"use strict";
const Router = require("koa-router");
let addRouter = (prefix, $class) => {
    let router = new Router({
        prefix: `/${prefix}`
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
        ctx.body = 'cv';
    });
    return router;
};
module.exports = addRouter;
