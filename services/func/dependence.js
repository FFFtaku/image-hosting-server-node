
/**
 * 依赖引入
 */
let moment = require('moment');

/**
 * 工具类引入
 */
let ResTemplate = require('../../utils/private/res-template');
let sendMailAuth = require('../../utils/common/mail-auth-code');
let {getRandomCode} = require('../../utils/common/generate-random-code');



module.exports = {
  ResTemplate,
  moment,
  sendMailAuth,
  getRandomCode
}