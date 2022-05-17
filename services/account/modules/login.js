let {
  BaseConnQuery,
  ResTemplate,
  TokenUtil
} = require('../dependence');


module.exports = async (account_id_email, account_pass) => {
  let ret = ResTemplate.resTemplateByJson();
  let res = await BaseConnQuery.query(
    `select account_id_email, account_status 
    from account 
    where account_id_email=? and account_pass=?
    `,
    [account_id_email, account_pass]
  ).catch(err => {
    console.log(err)
    throw new Error("login接口出错");
  })
  let [user] = res;
  if (user) {
    ret = ResTemplate.resTemplateByJson(
      ResTemplate.restfulStatusCode['SUCCESS'],
      {
        'token':TokenUtil.createToken(user.account_id_email,user.account_status)
      }
    );
  } else {
    ret = ResTemplate.resTemplateByJson(
      ResTemplate.restfulStatusCode['OPERATION_FAILURE'],
      null,
      '用户名或密码错误'
    );
  }
  return ret;
}