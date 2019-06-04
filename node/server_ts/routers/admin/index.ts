import * as Router from "koa-router";
import * as Koa from "koa";
import * as path from 'path'
let resolve = (str:string='')=>path.resolve(__dirname,str)
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
    ctx.body='admin'
  });
  // 找到文件夹,无限加载
  $class.Libs.infinite_routes(resolve(),router,$class)
  return router
}

export = addRouter;
