let {
  BaseConnQuery,
  ResTemplate,
} = require('../dependence');


module.exports = async (account_id_email,profile_new_name) => {
  let ret = ResTemplate.resTemplateByJson();
  let res = await BaseConnQuery.query(
    `update profile 
    set profile_name=? 
    where profile_account_map=?
    `,
    [profile_new_name, account_id_email]
  ).catch(err => {
    console.log(err)
    throw new Error("get-profile接口出错");
  })
  ret = ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['SUCCESS']);

  return ret;
}