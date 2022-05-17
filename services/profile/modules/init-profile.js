let {
  pathConfig,
  BaseConnQuery,
  ResTemplate,
  moment,
  fs,
  path
} = require('../dependence');


module.exports = async (account_id_email, account_status, profile_name) => {
  let ret = ResTemplate.resTemplateByJson();
  console.log(account_status)
  try {
    // 是否能够访问目录
    fs.accessSync(pathConfig.TOTAL_RESOURCE_PATH);
    
    let currentRelativePath = account_id_email;
    let statusPath = account_status === 0?
      pathConfig['STANDARD_ACCOUNT_PATH']:
      pathConfig['ANONYMOUS_ACCOUNT_PATH'];

    let currentAbsolutePath = path.join(statusPath, currentRelativePath);
    // 如果已经存在这个路径
    if(fs.existsSync(currentAbsolutePath)){
      ret = ResTemplate.resTemplateByJson(
        ResTemplate.restfulStatusCode['OPERATION_FAILURE'],
        null,
        "个人文档已存在"
      );
      return ret;
    }
    
    // 不存在则创建个人目录
    fs.mkdirSync(currentAbsolutePath);

    let res = await BaseConnQuery.query(
      `insert into profile (
        profile_account_map,
        profile_path,
        profile_name
      )
        values(?,?,?)
      `,
      [account_id_email, currentRelativePath, profile_name]
    );

    if(res){
      ret = ResTemplate.resTemplateByJson(
        ResTemplate.restfulStatusCode['SUCCESS']);
      return ret;
    }

  } catch (err) {
    console.log(err);
    throw new Error("init-profile接口出错")
  }
}