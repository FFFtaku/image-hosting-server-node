let { services: { registerAuthService }, joi, ResTemplate } = require('../dependence');

module.exports = async (req, res, next) => {
  // 参数校验
  let joiSchema = joi.object({
    'account_id_email': joi.string().required(),
  });
  let validate = joiSchema.validate(req.body);
  if (validate.error) {
    return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['API_PARAMETER_ERROR']));
  }
  let { account_id_email } = validate.value;


  try {
    let serviceRet = await registerAuthService(account_id_email, req.getState('registerAuthCodeSession'));
    res.send(serviceRet);
  } catch (E) {
    next(E);
  }
}
