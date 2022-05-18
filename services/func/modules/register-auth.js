let {
  BaseConnQuery,
  ResTemplate,
  sendMailAuth,
  getRandomCode
} = require('../dependence');

module.exports =async (account_id_email, registerAuthCodeSession)=>{
  let ret = ResTemplate.resTemplateByJson();
  let randomCode = getRandomCode(6);

  try{
    await sendMailAuth(account_id_email, randomCode);
  }catch(e){
    ret = ResTemplate.resTemplateByJson(
      ResTemplate.restfulStatusCode['OPERATION_FAILURE'],
      null,
      '验证码邮件发送失败，请检查邮箱是否正确！'
    );
    return ret;
  }
  if(!registerAuthCodeSession[account_id_email]){
    registerAuthCodeSession[account_id_email] = {
      codes:[],
      timeout:[]
    }
  }
  currentTime = Date.now();
  registerAuthCodeSession[account_id_email].codes.push(randomCode);
  registerAuthCodeSession[account_id_email].timeout.push(currentTime);
  
  ret = ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['SUCCESS']);
  return ret;
}