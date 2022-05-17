let {service:{uploadImageService},joi,ResTemplate} = require('../dependence');

module.exports = async (req, res, next) => {
  // 参数校验
  let joiSchema = joi.object({
    'resource_unique_id':joi.string().max(50).required()
  })
  let validate = joiSchema.validate(req.body);
  if(validate.error){
    return res.send(ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['API_PARAMETER_ERROR']));
  }
  let {resource_unique_id} = validate.value;
  let { account_id_email , account_status} = req.auth;
  let files = req.files;
  
  try{
    let serviceRet = await uploadImageService(files, account_id_email, account_status, resource_unique_id);
    res.send(serviceRet);
  }catch(E){
    next(E);
  }
}
