import * as IORedis from "ioredis";

import * as Koa from "koa";
declare module "koa" {
  interface BaseContext {
    $redis: IORedis.Redis;
  }
}
