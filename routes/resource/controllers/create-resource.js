let { service: { createResourceService }, joi, ResTemplate } = require('../dependence');

module.exports = async (req, res, next) => {
  // 参数校验
  let joiSchema = joi.object({
    'resource_name': joi.string().max(20).required(),
  })
  let validate = joiSchema.validate(req.body);
  if (validate.error) {
    return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['API_PARAMETER_ERROR']));
  }
  let { resource_name } = validate.value;
  let { account_id_email, account_status } = req.auth;

  try {
    let serviceRet = await createResourceService(account_id_email, resource_name);
    res.send(serviceRet);
  } catch (E) {
    next(E);
  }
}
