let url = require('url');
let path = require('path');
let pathConfig = require('../../config/resource-path');
let {BASE_IP_CONFIG} = require('../../config/ip-config');

module.exports = class PathGenerator{

  static getLocalBasePath(accountStatus){
    basePath = null;
    if(accountStatus === 0){
      basePath = pathConfig['STANDARD_ACCOUNT_PATH'];
    }else{
      basePath = pathConfig['ANONYMOUS_ACCOUNT_PATH'];
    }
    return basePath;
  }

  static generateImgUrl( accountStatus, imageRelativePath){
    userStatusPath = null;
    if(accountStatus === 0){
      userStatusPath = pathConfig.DEFINE_PATH_NAME['STANDARD_ACCOUNT_NAME'];
    }else{
      userStatusPath = pathConfig.DEFINE_PATH_NAME['ANONYMOUS_ACCOUNT_NAME'];
    }
  
    // 这里使用url.resolve方法来拼接路径，主要是可以解决windows路径\\转/的问题
    let pathHandled = url.resolve(`/${userStatusPath}/`,imageRelativePath);
    // 根据配置生成完整url
    // 配置host = hostname + port，配置host后再单独配置port无效
    return url.format({
      protocol:BASE_IP_CONFIG.PROTOCOL,
      hostname:BASE_IP_CONFIG.HOST_NAME,
      pathname:pathHandled,
      port:4000
    });
  }

  static generateImgAbsolutePath(accountStatus, imgRelativePath){
    let basePath = this.getLocalBasePath(accountStatus);
    return path.join(basePath, imgRelativePath);
  }
}