import * as Router from "koa-router";
import * as Koa from "koa";
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
    ctx.body='admin/api'
    // await ctx.render("index");
  });
  router.get("/3", async ctx => {
    // ctx.throw(404)
    ctx.body='admin/api/3'
    // await ctx.render("index");
  });
  router.use(async (ctx,next)=>{
    // 判断是否有token,
    await next();
  })
  router.post('/register',async ctx=>{
    
  })
  // 找到文件夹
 
  return router
}

export = addRouter;
