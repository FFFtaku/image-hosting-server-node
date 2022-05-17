let {
  BaseConnQuery,
  ResTemplate,
} = require('../dependence');


module.exports = async (account_id_email, profile_tel) => {
  let ret = ResTemplate.resTemplateByJson();
  let res = await BaseConnQuery.query(
    `update profile 
    set  profile_tel=?
    where profile_account_map=?
    `,
    [profile_tel, account_id_email]
  ).catch(err => {
    console.log(err)
    throw new Error("bind-tel接口出错");
  })

  if(res.affectedRows !== 1){
    ret = ResTemplate.resTemplateByJson(
      ResTemplate.restfulStatusCode['OPERATION_FAILURE'],
      null,
      "匹配参数有误"
    );
    return ret;
  }
  if(res.changedRows === 1){
    ret = ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['SUCCESS']);
  }else if(res.changedRows === 0){
    ret = ResTemplate.resTemplateByJson(
      ResTemplate.restfulStatusCode['OPERATION_FAILURE'],
      null,
      "已绑定该手机号"
    );
  }

  return ret;
}