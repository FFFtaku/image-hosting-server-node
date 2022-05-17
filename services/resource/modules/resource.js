let {
  BaseConnQuery,
  ResTemplate,
} = require('../dependence');


module.exports = async (account_id_email) => {
  let ret = ResTemplate.resTemplateByJson();
  try{
    let res = await BaseConnQuery.query(
      `select resource_name, resource_count, resource_unique_id
      from resource
      where resource_profile_map=?
      `,
      [account_id_email]
    );
    
    ret = ResTemplate.resTemplateByJson(
      ResTemplate.restfulStatusCode['SUCCESS'],
      res
    );
  }catch(E){
    console.log(E);
    throw new Error("get-resource接口出错");
  }

  return ret;
}