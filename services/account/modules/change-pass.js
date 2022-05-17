let {
  BaseConnQuery,
  ResTemplate,
  moment
} = require('../dependence');


module.exports = async (account_id_email, account_new_pass) => {
  let ret = ResTemplate.resTemplateByJson();

  let currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  let res = await BaseConnQuery.query(
    `update account 
    set account_pass=? , account_modified=?
    where account_id_email=?
    `,
    [account_new_pass, currentTime ,account_id_email]
  ).catch(err => {
    console.log(err)
    throw new Error("change-pass接口出错");
  })
  if(res.affectedRows !== 1){
    ret = ResTemplate.resTemplateByJson(
      ResTemplate.restfulStatusCode['OPERATION_FAILURE'],
      null,
      "匹配参数有误"
    );
    return ret;
  }
  if (res.changedRows ===1 ) {
    ret = ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['SUCCESS']);
  }else if(res.changedRows ===0 ){
    ret = ResTemplate.resTemplateByJson(
      ResTemplate.restfulStatusCode['OPERATION_FAILURE'],
      null,
      "请勿和原密码相同"
    );
  }
  
  return ret;
}