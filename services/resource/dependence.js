/**
 * 标准库
 */
let fs = require('fs');
let path = require('path');

/**
 * 依赖引入
 */
let moment = require('moment');
let { v4 : uuidv4 } = require('uuid');

/**
 * 工具类引入
 */
let {BaseConnQuery} = require('../../database-model');
let ResTemplate = require('../../utils/private/res-template');
let PathGenerator = require('../../utils/private/path-generator');

/**
 * 配置信息引入
 */
let pathConfig = require('../../config/resource-path');


module.exports = {
  BaseConnQuery,
  ResTemplate,
  moment,
  fs,
  path,
  pathConfig,
  uuidv4,
  PathGenerator
}