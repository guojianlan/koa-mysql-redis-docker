import * as path from 'path'
export = {
  env:"development",
  log_path:path.resolve(__dirname,'../../'),
  use_sql:false,
  mysql:{
    host: "127.0.0.1",
    user: "root",
    password: "example",
    database: "cspm"
  },
  view_path:path.resolve(__dirname,'../views'),
  view_ext:'html',
  static_path:path.resolve(__dirname,'../public/static'),
  js_max_age:365 * 24 * 60 * 60,
  css_max_age:365 * 24 * 60 * 60,
  ico_max_age:365 * 24 * 60 * 60,
  routes:['index','cv','admin']
}