let { service: { initProfileService,createResourceService}, joi, ResTemplate } = require('../dependence');

module.exports = async (req, res, next) => {
  // 参数校验
  let joiSchema = joi.object({
    'profile_name': joi.string().max(10),
  })
  let validate = joiSchema.validate(req.body);
  if (validate.error) {
    return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['API_PARAMETER_ERROR']));
  }
  let { profile_name } = validate.value;
  let { account_id_email, account_status } = req.auth;

  if(!profile_name){
    profile_name = '用户-'+account_id_email;
  }

  try {
    let serviceRet = await initProfileService(account_id_email, account_status, profile_name);
    if(serviceRet.status === 200){
      await createResourceService(account_id_email, account_status, "我的资源");
    }
    res.send(serviceRet);
  } catch (E) {
    next(E);
  }
}
