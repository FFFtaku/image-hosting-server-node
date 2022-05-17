let {
  BaseConnQuery,
  ResTemplate,
  moment
} = require('../dependence');


module.exports = async (account_id_email, account_pass, account_status, register_auth_code, registerAuthCodeSession) => {
  let ret = ResTemplate.resTemplateByJson();

  // 获取当前时间戳，后续逻辑需要使用
  let nowTime = Date.now();

  // 先做验证码判断处理
  let isAuthSuccess = false;

  if (registerAuthCodeSession[account_id_email]) {

    let { codes, timeout } = registerAuthCodeSession[account_id_email];
    let searchAuthCode = codes.indexOf(register_auth_code);

    // 存在该验证码
    if (searchAuthCode !== -1) {
      let prevTime = timeout[searchAuthCode];
      isAuthSuccess = (nowTime - prevTime) < 180000; // 3mins = 180000ms
    }
  }

  if (isAuthSuccess) {
    delete registerAuthCodeSession[account_id_email];
  } else {
    ret = ResTemplate.resTemplateByJson(
      ResTemplate.restfulStatusCode['OPERATION_FAILURE'],
      null,
      '无效验证码或验证码已过期'
    );
    return ret;
  }

  // 验证通过后开始注册逻辑
  let currentTime = moment(nowTime).format('YYYY-MM-DD HH:mm:ss');
  let res = await BaseConnQuery.query(
    `insert into account ( 
      account_id_email, 
      account_pass, 
      account_status, 
      account_created, 
      account_modified 
    ) 
      values(?,?,?,?,?)`,
    [account_id_email, account_pass, account_status, currentTime, currentTime]
  ).catch(err => {
    if (err.code === "ER_DUP_ENTRY") {
      ret = ResTemplate.resTemplateByJson(
        ResTemplate.restfulStatusCode['OPERATION_FAILURE'],
        null,
        "该账户已存在"
      );
    } else {
      // 处理其他错误
      console.log(err)
      throw new Error("register接口出错");
    }
  })
  if (res) {
    ret = ResTemplate.resTemplateByJson(
      ResTemplate.restfulStatusCode['SUCCESS'],
      account_id_email
    );
  }
  return ret;
}