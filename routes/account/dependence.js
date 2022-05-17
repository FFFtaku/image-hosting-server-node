
/**
 * 第三方模块引入
 */
// joi参数校验模块
let joi = require('joi');

/**
 * 依赖引入
 */
let { v4:uuidv4 } = require('uuid'); 

/**
 * 工具类
 */
let ResTemplate = require('../../utils/private/res-template');

/**
 * service引入
 */
let accountService = require('../../services/account');

/**
 * 中间件
 */
let stateManagement = require('../../middleware/state-management');
let authentication = require('../../middleware/authentication');


/**
 * 配置信息
 */
let {ANONYMOUS_ACCOUNT_PASSWORD} = require('../../config/common-config');

module.exports = {
  service:{
    ...accountService
  },
  middleware:{
    stateManagement,
    authentication
  },
  joi,
  ResTemplate,
  uuidv4,
  ANONYMOUS_ACCOUNT_PASSWORD
}