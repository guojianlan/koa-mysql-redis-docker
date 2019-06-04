import * as Koa from "koa";
interface Server {
  app: Koa;
  config: {};
  MIDDLEWARES: string[];
  port: number;
  Libs: {
    uploadFile: (ctx: any) => Promise<{}>;
    infinite_routes: (file_path: string, router: any, $class: any) => void;
    RedisConnect: (my_config: any) => Promise<{}>;
    md5: (str: string, salt?: string) => string;
  };
  constructor(): any;
  startApp(options?: { db?: any }): Promise<void>;
  start(): void;
  useMiddleWares(): void;
}

declare module "koa" {
  interface BaseContext {
    $class: Server;
    $log(str: string, type?: string): void;
  }
}
