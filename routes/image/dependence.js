
/**
 * 第三方模块引入
 */
// joi参数校验模块
let joi = require('joi');

/**
 * 中间件
 */
// 文件上传
let fileHandler = require('../../middleware/file-handler');
let authentication = require('../../middleware/authentication');


/**
 * 工具类
 */
let ResTemplate = require('../../utils/private/res-template');

/**
 * service引入
 */
let imageService = require('../../services/image');


module.exports = {
  service:{
    ...imageService
  },
  middleware:{
    fileHandler,
    authentication
  },
  joi,
  ResTemplate,
}