let {service:{changePassService},joi,ResTemplate} = require('../dependence');

module.exports = async (req, res, next) => {
  // 参数校验
  let joiSchema = joi.object({
    'account_new_pass':joi.string().max(20).required(),
  })
  let validate = joiSchema.validate(req.body);
  if(validate.error){
    return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['API_PARAMETER_ERROR']));
  }
  let {account_new_pass} = validate.value;
  let {account_id_email} = req.auth;

  try{
    let serviceRet = await changePassService(account_id_email, account_new_pass);
    res.send(serviceRet);
  }catch(E){
    next(E);
  }
}
