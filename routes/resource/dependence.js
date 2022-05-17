
/**
 * 第三方模块引入
 */
// joi参数校验模块
let joi = require('joi');

/**
 * 工具类
 */
let ResTemplate = require('../../utils/private/res-template');

/**
 * service引入
 */
let resourceService = require('../../services/resource');


module.exports = {
  service:{
    ...resourceService
  },
  joi,
  ResTemplate
}