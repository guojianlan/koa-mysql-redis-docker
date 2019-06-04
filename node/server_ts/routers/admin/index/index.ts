import * as Router from "koa-router";
import * as Koa from "koa";
import * as path from 'path'
let addRouter = (prifix:string,$class:any)=>{
  let router = new Router({
    prefix: `/${prifix}`
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
    ctx.body='admin/index'
    // await ctx.render("index");
  });
  // 找到文件夹
 
  return router
}

export = addRouter;
