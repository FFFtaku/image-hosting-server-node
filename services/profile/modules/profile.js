let {
  BaseConnQuery,
  ResTemplate,
} = require('../dependence');


module.exports = async (account_id_email) => {
  let ret = ResTemplate.resTemplateByJson();
  let res = await BaseConnQuery.query(
    `select * 
    from profile 
    where profile_account_map=?
    `,
    [account_id_email]
  ).catch(err => {
    console.log(err)
    throw new Error("get-profile接口出错");
  })
  let [profile] = res;
  ret = ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['SUCCESS'],profile);

  return ret;
}