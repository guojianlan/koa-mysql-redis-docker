import * as Router from "koa-router";
import * as Koa from "koa";
let addRouter = (prefix: string,$class:any) => {
  let router = new Router({
    prefix: `/${prefix}`
  });
  router.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (error) {
      throw error;
    }
  });
  router.get("/", async ctx => {
    // ctx.throw(404)
    ctx.body='cv'
  });
  return router;
};
export = addRouter;
