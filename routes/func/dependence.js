
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
let funcServices = require('../../services/func');

/**
 * 中间件引入
 */
let stateManagement = require('../../middleware/state-management');

module.exports = {
  services:{
    ...funcServices
  },
  middleware:{
    stateManagement
  },
  joi,
  ResTemplate,
}