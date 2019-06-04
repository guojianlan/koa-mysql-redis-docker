"use strict";
let start = (app, $class) => {
    // 统一处理函数
    app.use(async (ctx, next) => {
        try {
            let start_time = Date.now();
            await next();
            console.log(`加载${ctx.url}的时间为:${Date.now() - start_time}`);
        }
        catch (error) {
            ctx.app.emit("error", error, ctx);
        }
    });
    // 加载views
    if ($class.config.view_path != "") {
        let render = require("koa-ejs");
        render(app, {
            root: $class.config.view_path,
            layout: false,
            viewExt: $class.config.view_ext || "html",
            cache: false,
            debug: false
        });
    }
};
module.exports = start;
