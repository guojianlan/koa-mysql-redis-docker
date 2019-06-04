import * as Router from "koa-router";
import * as Koa from "koa";
import * as parser from 'fast-xml-parser'
let addRouter = (prefix: string, $class:any) => {
  let router = new Router({
    prefix: `/${prefix}`
  });
  router.get("/", async (ctx: Koa.ParameterizedContext) => {
    // ctx.throw(404)
    await ctx.render("index");
    // ctx.body = "index";
  });
  return router;
};
export = addRouter;
