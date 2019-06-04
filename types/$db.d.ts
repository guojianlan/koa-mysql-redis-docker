export class PoolConnection {
  static createQuery(sql: any, values: any, cb: any, config: any): any;
  static defaultMaxListeners: any;
  static init(): void;
  static listenerCount(emitter: any, type: any): any;
  static statementKey(options: any): any;
  static usingDomains: boolean;
  constructor(pool: any, options: any);
  addCommand(cmd: any): any;
  addListener(type: any, listener: any): any;
  beginTransaction(cb: any): any;
  changeUser(options: any, callback: any): any;
  close(): void;
  commit(cb: any): any;
  connect(cb: any): void;
  createBinlogStream(opts: any): any;
  destroy(): void;
  emit(type: any, args: any): any;
  end(): void;
  escape(value: any): any;
  escapeId(value: any): any;
  eventNames(): any;
  execute(sql: any, values: any, cb: any): any;
  format(sql: any, values: any): any;
  getMaxListeners(): any;
  handlePacket(packet: any): void;
  listenerCount(type: any): any;
  listeners(type: any): any;
  off(type: any, listener: any): any;
  on(type: any, listener: any): any;
  once(type: any, listener: any): any;
  pause(): void;
  ping(cb: any): any;
  pipe(): void;
  prepare(options: any, cb: any): any;
  prependListener(type: any, listener: any): any;
  prependOnceListener(type: any, listener: any): any;
  promise(promiseImpl: any): any;
  protocolError(message: any, code: any): void;
  query(sql: any, values: any, cb: any): any;
  raw(sql: any): any;
  rawListeners(type: any): any;
  release(): void;
  removeAllListeners(type: any, ...args: any[]): any;
  removeListener(type: any, listener: any): any;
  resume(): void;
  rollback(cb: any): any;
  serverHandshake(args: any): any;
  setMaxListeners(n: any): any;
  startTLS(onSecure: any): void;
  unprepare(sql: any): any;
  write(buffer: any): void;
  writeColumns(columns: any): void;
  writeEof(warnings: any, statusFlags: any): void;
  writeError(args: any): void;
  writeOk(args: any): void;
  writePacket(packet: any): void;
  writeTextResult(rows: any, columns: any): void;
  writeTextRow(column: any): void;
}
export namespace PoolConnection {
  class EventEmitter {
    // Circular reference from index.PoolConnection.EventEmitter
    static EventEmitter: any;
    static defaultMaxListeners: any;
    static init(): void;
    static listenerCount(emitter: any, type: any): any;
    static usingDomains: boolean;
    addListener(type: any, listener: any): any;
    emit(type: any, args: any): any;
    eventNames(): any;
    getMaxListeners(): any;
    listenerCount(type: any): any;
    listeners(type: any): any;
    off(type: any, listener: any): any;
    on(type: any, listener: any): any;
    once(type: any, listener: any): any;
    prependListener(type: any, listener: any): any;
    prependOnceListener(type: any, listener: any): any;
    rawListeners(type: any): any;
    removeAllListeners(type: any, ...args: any[]): any;
    removeListener(type: any, listener: any): any;
    setMaxListeners(n: any): any;
  }
}
export const Types: any;
export function clearParserCache(): void;
export function connect(opts: any): any;
export function createConnection(opts: any): any;
export const createConnectionPromise: any;
export function createPool(config: any): any;
export function createPoolCluster(config: any): any;
export const createPoolClusterPromise: any;
export const createPoolPromise: any;
export function createQuery(sql: any, values: any, cb: any, config: any): any;
export function createServer(handler: any): any;
export function escape(val: any, stringifyObjects: any, timeZone: any): any;
export function escapeId(val: any, forbidQualified: any): any;
export function format(
  sql: any,
  values: any,
  stringifyObjects: any,
  timeZone: any
): any;
export function raw(sql: any): any;
export function setMaxParserCache(max: any): void;
import * as Koa from "koa";
declare module "koa" {
  interface BaseContext {
    $db: PoolConnection;
  }
}
