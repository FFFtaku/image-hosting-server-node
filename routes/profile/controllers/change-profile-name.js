let { service: { changeProfileNameService }, joi, ResTemplate } = require('../dependence');

module.exports = async (req, res, next) => {
  // 参数校验
  let joiSchema = joi.object({
    'profile_new_name': joi.string().max(10).required(),
  })
  let validate = joiSchema.validate(req.body);
  if (validate.error) {
    return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['API_PARAMETER_ERROR']));
  }
  let { profile_new_name } = validate.value;
  let { account_id_email, account_status } = req.auth;

  try {
    let serviceRet = await changeProfileNameService(account_id_email, profile_new_name);
    res.send(serviceRet);
  } catch (E) {
    next(E);
  }
}
