
// 集中导入controllers
let accountRouter = require('./account');
let profileRouter = require('./profile');
let resourceRouter =require('./resource');
let imageRouter = require('./image');
let funcRouter = require('./func');

module.exports = {
  accountRouter,
  profileRouter,
  resourceRouter,
  imageRouter,
  funcRouter
}