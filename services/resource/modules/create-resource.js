let {
  BaseConnQuery,
  ResTemplate,
  path,
  pathConfig,
  fs,
  uuidv4,
  PathGenerator
} = require('../dependence');


module.exports = async (account_id_email, account_status, resource_name) => {
  let ret = ResTemplate.resTemplateByJson();
  try{
    let selectRes = await BaseConnQuery.query(
      `select profile_path
      from profile 
      where profile_account_map=?
      `,
      [account_id_email]
    );
    let [profile] = selectRes;
    let profilePath = profile.profile_path;
    let uuid = uuidv4();
    let resourceId = `resource-${uuid}`

    // 路径拼接处理
    let basePath = PathGenerator.getLocalBasePath(account_status);
    let resourcePath = path.join(profilePath, resourceId);
    let absolutePath = path.join(
      basePath,
      resourcePath
    );
    // 创建这个文件夹
    fs.mkdirSync(absolutePath);
    // 事务query
    let res = await BaseConnQuery.transaction(
      [
        `insert into resource(
          resource_profile_map,
          resource_unique_id,
          resource_path,
          resource_name
        )
          values (?,?,?,?)
        `,

        `update profile
        set profile_resource_count=profile_resource_count+1
        where profile_account_map=?
        `
      ],
      [
        [account_id_email,resourceId,resourcePath,resource_name],
        [account_id_email]
      ]
    );
    ret = ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['SUCCESS']);
  }catch(E){
    console.log(E);
    throw new Error("create-resource接口出错");
  }

  return ret;
}