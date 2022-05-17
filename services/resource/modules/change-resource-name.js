let {
  BaseConnQuery,
  ResTemplate,
  path,
  pathConfig,
  fs
} = require('../dependence');


module.exports = async (resource_unique_id, resource_new_name) => {
  let ret = ResTemplate.resTemplateByJson();
  try{
    let res = await BaseConnQuery.query(
      `update resource 
      set resource_name=? 
      where resource_unique_id=?
      `,
      [resource_new_name, resource_unique_id]
    );
    
    ret = ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['SUCCESS']);
  }catch(E){
    console.log(E);
    throw new Error("get-resource接口出错");
  }

  return ret;
}