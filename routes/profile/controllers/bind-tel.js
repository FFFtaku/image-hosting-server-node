let { service: { bindTelService }, joi, ResTemplate } = require('../dependence');

module.exports = async (req, res, next) => {
  // 参数校验
  let joiSchema = joi.object({
    'profile_tel': joi.string().max(20).required(),
  })
  let validate = joiSchema.validate(req.body);
  if (validate.error) {
    return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['API_PARAMETER_ERROR']));
  }
  let { profile_tel } = validate.value;
  let { account_id_email, account_status } = req.auth;

  try {
    let serviceRet = await bindTelService(account_id_email, profile_tel);
    res.send(serviceRet);
  } catch (E) {
    next(E);
  }
}
