import * as path from 'path'
let config = {
  env:"development",
  keys:['im a newer secret', 'i like turtle'],
  log_path:path.resolve(__dirname,'../../'),
  use_sql:true,
  mysql:{
    host: "mysql",
    user: "root",
    port:3306,
    password: "company_mysql_password",
    database: "test"
  },
  use_redis:true,
  redis:{
    host:"redis",
    port:6379,
    password:'5201314qv'
  },
  view_path:path.resolve(__dirname,'../views'),
  view_ext:'html',
  static_path:path.resolve(__dirname,'../public/static'),
  js_max_age:365 * 24 * 60 * 60,
  css_max_age:365 * 24 * 60 * 60,
  ico_max_age:365 * 24 * 60 * 60,
  cookie_max_age:1000*60*60*24*60,
  routes:['index','cv','admin','site'],
  token_key:"token",
  browser_name_key:"web_browser_name"
}
export = config