"use strict";
const Router = require("koa-router");
let addRouter = (prefix, $class) => {
    let router = new Router({
        prefix: `/${prefix}`
    });
    router.get("/", async (ctx) => {
        // ctx.throw(404)
        await ctx.render("index");
        // ctx.body = "index";
    });
    return router;
};
module.exports = addRouter;
