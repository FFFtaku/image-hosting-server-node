let {
  BaseConnQuery,
  ResTemplate,
  PathGenerator
} = require('../dependence');

module.exports = async (resource_unique_id, account_status) => {
  let ret = ResTemplate.resTemplateByJson();
  try{
    let res = await BaseConnQuery.query(
      `select image_path, image_name, image_size
      from image
      where image_resource_map=?
      `,
      [resource_unique_id]
    )
    res.forEach(element => {
    
      element.image_path = PathGenerator.generateImgUrl(account_status, element.image_path);
    });
    ret = ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['SUCCESS'],res);
  }catch(err){
    console.log(err);
    throw new Error('get-image-by-resource接口出错');
  }

  return ret;
}