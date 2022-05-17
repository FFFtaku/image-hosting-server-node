/**
 * 用于设置全局定时行为
 */

 let checkRegisterAuthCode = require('./checkRegisterAuthCode');

// 服务器启动时就开启定时任务
 (()=>{
  checkRegisterAuthCode();
 })();