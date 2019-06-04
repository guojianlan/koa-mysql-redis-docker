import * as rp from "request-promise";

let request = () => {
  //服务发现，发现配置
  try {
    let headers = {}
    //请求redis
    setTimeout(() => {
      headers = {
        xx:new Date()
      }
    }, 2000);
    return function(options: rp.OptionsWithUri): rp.RequestPromise {
      options = Object.assign(
        {},
        {
          headers
        },
        options
      );
      return rp(options);
    };
  } catch (error) {
    throw error
  }
};
export = request;
