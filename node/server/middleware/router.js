"use strict";
const Router = require("koa-router");
const path = require("path");
const koa_static_cache = require("koa-static-cache");
const koa_static = require("koa-static");
const R = require("ramda");
const fs = require("fs");
const useragent = require("useragent");
let router = (app, $class) => {
    let router = new Router({
        prefix: ""
    });
    router.use(async (ctx, next) => {
        // 记录设备信息,存到msql
        let us = useragent.parse(ctx.header['user-agent']);
        let now = +new Date();
        if (!ctx.cookies.get("token")) {
            ctx.cookies.set("token", $class.Libs.md5(now + ""), {
                httpOnly: false,
                maxAge: 1000 * 60 * 60 * 24 * 30
            });
        }
        await next();
    });
    // 加载跟项目
    router.get("/", async (ctx) => {
        await ctx.redirect("/index");
    });
    // 加载路由
    load_router(router, $class);
    // 读取静态文件
    load_static(router, $class);
    app.use(router.routes());
};
let load_router = function (router, $class) {
    const router_module = $class.config.routes;
    const router_path = path.resolve(__dirname, "../routers");
    //判断是否有routers/文件夹下面室友有index.js
    let router_list = R.filter((md_name) => {
        return (md_name != "" &&
            fs.existsSync(path.resolve(router_path, md_name, "index.js")));
    })(router_module);
    R.forEach(R.pipe((md_name) => {
        return {
            fn: require(path.resolve(router_path, md_name)),
            name: md_name
        };
    }, (obj) => {
        router.use(obj.fn(obj.name, $class).routes());
    }))(router_list);
};
let load_static = function (router, $class) {
    router.get(/\.js$/i, koa_static_cache($class.config.static_path, {
        maxAge: $class.config.js_max_age
    }));
    // 读取css
    router.get(/\.css$/, koa_static_cache($class.config.static_path, {
        maxAge: $class.config.css_max_age
    }));
    router.get(/\.ico$/, koa_static_cache($class.config.static_path, {
        maxAge: $class.config.ico_max_age
    }));
    //读取static所有文件,不需要缓存
    router.get("/**", koa_static($class.config.static_path));
};
module.exports = router;
