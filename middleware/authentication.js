let TokenUtil = require('../utils/private/token');
let ResTemplate = require('../utils/private/res-template');

module.exports = (req, res, next)=>{
  // 前端定义字段token
  let token = req.headers.token;
  if(!token){
    return res.send(
      ResTemplate.resTemplateByJson(
        ResTemplate.restfulStatusCode['IDENTITY_FAILURE'],
        null,
        '请携带身份令牌以调用接口'
      ));
  }
  TokenUtil.verifyToken(token, (err, decode)=>{
    if(err){
      console.log(err)
      return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['IDENTITY_FAILURE']));
    }
    let {accountIdEmail, accountStatus} = decode;
    let newToken = TokenUtil.createToken(accountIdEmail, accountStatus);
    res.setHeader('newToken', newToken);
    req.auth = {}
    req.auth.account_id_email = accountIdEmail;
    req.auth.account_status = accountStatus;
    next();
  })
}