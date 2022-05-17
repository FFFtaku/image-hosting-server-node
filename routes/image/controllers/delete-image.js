let { service: { deleteImageByUrlService }, joi, ResTemplate } = require('../dependence');

module.exports = async (req, res, next) => {
  // 参数校验
  let joiSchema = joi.object({
    'image_positioning': joi.string(),
  });
  let validate = joiSchema.validate(req.body);
  if (validate.error) {
    return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['API_PARAMETER_ERROR']));
  }
  let { image_positioning } = validate.value;
  let { account_id_email, account_status } = req.auth;

  try {
    let serviceRet = await deleteImageByUrlService(account_id_email, image_positioning);
    res.send(serviceRet);
  } catch (E) {
    next(E);
  }
}

