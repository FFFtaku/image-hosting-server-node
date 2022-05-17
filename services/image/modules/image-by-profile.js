let {
  BaseConnQuery,
  ResTemplate,
  generateImgUrl
} = require('../dependence');

module.exports = async (account_id_email, account_status) => {
  let ret = ResTemplate.resTemplateByJson();
  try{
    let res = await BaseConnQuery.query(
      `select image_path, image_name, image_size
      from image
      where image_owner=?
      `,
      [account_id_email]
    )
    res.forEach(element => {
    
      element.image_path = generateImgUrl(account_status, element.image_path);
    });
    ret = ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['SUCCESS'],res);
  }catch(err){
    console.log(err);
    throw new Error('get-image-by-profile接口出错');
  }

  return ret;
}