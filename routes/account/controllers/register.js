let { service: { registerService }, joi, ResTemplate, uuidv4, ANONYMOUS_ACCOUNT_PASSWORD } = require('../dependence');

module.exports = async (req, res, next) => {

  // 不传参表示创建匿名账户，传参需要以下三个参数同时存在
  let joiSchema = joi.object({
    'account_id_email': joi.string().max(50),
    'account_pass': joi.string().max(20),
    'register_auth_code': joi.string().max(6)
  }).and('account_id_email', 'account_pass', 'register_auth_code');

  let validate = joiSchema.validate(req.body);
  if (validate.error) {
    console.log(validate.error)
    return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['API_PARAMETER_ERROR']));
  }
  let { account_id_email, account_pass, register_auth_code } = validate.value;

  let account_status = account_id_email ? 0 : 1;
  if (!account_id_email) {
    account_id_email = 'anonymous-' + uuidv4();
    account_pass = ANONYMOUS_ACCOUNT_PASSWORD;
  }

  try {
    let serviceRet = await registerService(
      account_id_email,
      account_pass,
      account_status,
      register_auth_code,
      req.getState('registerAuthCodeSession')
    );
    res.send(serviceRet);
  } catch (E) {
    next(E);
  }
}
