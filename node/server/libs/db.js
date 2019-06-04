"use strict";
let mysql = require('mysql2');
let obj = {
    getConnection(config) {
        return new Promise((resolve, reject) => {
            let pool = mysql.createPool(config);
            const promisePool = pool.promise();
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                else {
                    connection.release();
                    resolve(promisePool);
                }
                ;
            });
            pool.on("release", () => {
                console.log("release");
            });
            pool.on("error", () => {
                console.log("error");
            });
        });
    }
};
module.exports = obj;
