let { service: { changeResourceNameService }, ResTemplate,joi} = require('../dependence');

module.exports = async (req, res, next) => {
  // 参数校验
  let joiSchema = joi.object({
    'resource_unique_id': joi.string().max(50).required(),
    'resource_new_name': joi.string().max(20).required(),
  })
  let validate = joiSchema.validate(req.body);
  if (validate.error) {
    return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['API_PARAMETER_ERROR']));
  }
  let { resource_new_name ,resource_unique_id} = validate.value;

  try {
    let serviceRet = await changeResourceNameService(resource_unique_id, resource_new_name);
    res.send(serviceRet);
  } catch (E) {
    next(E);
  }
}
