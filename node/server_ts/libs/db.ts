let mysql = require('mysql2')
let obj = {
  getConnection(config:{
    host: string,
    user: string,
    password: string,
    database: string,
    port?:string
  }) {
    return new Promise((resolve, reject) => {
      let pool = mysql.createPool(config);
      const promisePool = pool.promise();
      pool.getConnection((err: any, connection: any) => {
        if (err){
          reject(err)
        }else{
          connection.release();
          resolve(promisePool)
        };
      });
      pool.on("release", () => {
        console.log("release");
      });
      pool.on("error", () => {
        console.log("error");
      });
    });
  }
}
export = obj
