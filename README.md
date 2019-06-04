# koa-mysql-redis-docker
全新的框架


let addRouter = (prifix:string,$class:any)=>{
  let router = new Router()
  $class.Libs.infinite_routes(path.join(__dirname),router,$class)
}

添加$db=>ctx.$db
添加$redis=>ctx.$redis
添加了fast-xml-parser解释xmltojson和jsontoxml
添加了koa-body解释post数据，如果需要保存文件的话