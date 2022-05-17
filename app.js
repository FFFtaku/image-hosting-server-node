let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors');
let {MulterError} = require('multer');

let { BASE_IP_CONFIG } = require('./config/ip-config');
let ResTemplate = require('./utils/private/res-template');
let stateManagement = require('./middleware/state-management');
// 路由文件引入
let router = require('./routes');

const app = express();
const port = BASE_IP_CONFIG['PORT'];


/**
 * app配置
 */

// 为自定义状态管理中间件设置初始值
stateManagement.initState({
  // 用于管理和存储注册验证码
  registerAuthCodeSession:{}
});


// 配置用于正常获取请求体内容
let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(jsonParser);
app.use(urlencodedParser);

// 跨域配置
app.use(cors());

// 配置静态目录
app.use(express.static(path.join(__dirname, 'public')));

// 路由配置
app.use('/account',router.accountRouter);
app.use('/profile',router.profileRouter);
app.use('/resource',router.resourceRouter);
app.use('/image',router.imageRouter);
app.use('/func',router.funcRouter);

/**
 * 测试与全局异常处理
 */

// 服务器连通测试
app.get('/',(req, res, next) => {
  return res.send('http服务器可以接收');
})

// url 404 handler
app.use(function(req, res, next) {
  return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['NOT_FOUND']));
});

// error handler
app.use(function(err, req, res, next){
  console.log("❗❗❗错误处理中间件->",err);
  if(err instanceof MulterError){
    return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['API_PARAMETER_ERROR'],null,"文件传输参数错误"));
  }
  return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['SERVER_ERROR']));
})

/**
 * 开启服务
 */
// 开启全局定时任务
require('./global');
// 开启http端口监听
app.listen(port,()=>{
  console.log(`HTTP服务器-端口号：${port}`);
})
