let {service:{loginService},joi,ResTemplate} = require('../dependence');

module.exports = async (req, res, next) => {
  // 参数校验
  let joiSchema = joi.object({
    'account_id_email':joi.string().max(50).required(),
    'account_pass':joi.string().max(20).required(),
  })
  let validate = joiSchema.validate(req.body);
  if(validate.error){
    return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['API_PARAMETER_ERROR']));
  }
  let {account_id_email, account_pass} = validate.value;

  try{
    let serviceRet = await loginService(account_id_email, account_pass);
    res.send(serviceRet);
  }catch(E){
    next(E);
  }
}
