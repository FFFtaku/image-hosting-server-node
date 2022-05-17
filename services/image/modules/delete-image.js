let {
  BaseConnQuery,
  ResTemplate,
  PathGenerator,
  path,
  fs
} = require('../dependence');

module.exports = async (account_id_email, image_positioning) => {
  let ret = ResTemplate.resTemplateByJson();
  // 解析获取serial
  let {name:image_serial} = path.parse(image_positioning);

  try{
    // 如果能查到一定只有一条数据
    let selectRes = await BaseConnQuery.query(
      `select image_path
      from image
      where image_owner=? and image_serial=?
      `,
      [account_id_email,image_serial]
    )
    if(selectRes.length === 0){
      ret = ResTemplate.resTemplateByJson(
        ResTemplate.restfulStatusCode['OPERATION_FAILURE'],
        null,
        '该图片不存在'
      );
      return ret;
    }
    // 数据库操作存在失败可能性
    // 因此先执行数据库操作：删除image记录，减少resource中记录的图片数量
    let deleteRes = await BaseConnQuery.transaction(
      [
        `delete 
        `
        ,
        `
        `
      ],[
        [],
        []
      ]
    )
    res.forEach(element => {
    
      element.image_path = generateImgUrl(account_status, element.image_path);
    });
    ret = ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['SUCCESS'],res);
  }catch(err){
    console.log(err);
    throw new Error('delete-image-by-url接口出错');
  }

  return ret;
}