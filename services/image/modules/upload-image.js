let {
  BaseConnQuery,
  ResTemplate,
  path,
  fs,
  pathConfig,
  moment,
  PathGenerator
} = require('../dependence');

module.exports = async (files, account_id_email, account_status, resource_unique_id) => {
  let ret = ResTemplate.resTemplateByJson();
  
  // 获得文件数组，文件数组可能不存在
  let elements = files["upload_file"];
  if (!elements) {
    ret = ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['SUCCESS'], []);
    return ret;
  }

  // 通过resource_unique_id获得resource_path
  let resource_path=null;
  try{
    let [ resource ] = await BaseConnQuery.query(
      `select resource_path
      from resource
      where resource_unique_id=?
      `,
      [resource_unique_id]
    )
    if(!resource){
      throw new Error('不正确的resource_unique_id');
    }
    resource_path = resource.resource_path;
  }catch(err){
    elements.forEach(element => {
      fs.unlinkSync(element.path);      
    });
    ret = ResTemplate.resTemplateByJson(
      ResTemplate.restfulStatusCode['OPERATION_FAILURE'],
      null,
      "解析resource_unique_id失败"
    );
    return ret;
  }

  // 获得基本路径
  let basePath = PathGenerator.getLocalBasePath(account_status);

  // 转移文件并将元信息写入数据库
  let fileInfoList = [];
  let len = elements.length;
  for(let i =0;i<len;i++){
    let element = elements[i];

    // fileSerial图片唯一序列号
    let fileSerial = `file-${element.uuid}(${Date.now()})`;
    // realFileName为文件存储的真实名称，就是序列号+后缀
    let realFileName = fileSerial+element.ext;

    // currentFileRelativePath文件相对路径
    let currentFileRelativePath = path.join(resource_path, realFileName);

    // 从临时区移动至个人目录中，一般认为文件操作不会失败，因此不做错误处理
    let absolutePath = path.join(basePath, currentFileRelativePath);
    fs.renameSync(
      element.path,
      absolutePath
    );

    // 通过循环来进行插入，虽然效率更低，但相对安全。
    try{
      await BaseConnQuery.transaction(
        [
          `insert into image (
            image_serial,
            image_owner,
            image_resource_map,
            image_path,
            image_name,
            image_size,
            image_content_type,
            image_upload_time,
            image_modified_time
          )
          values (?,?,?,?,?,?,?,?,?)
          `
          ,
          `update resource
          set resource_count=resource_count+1
          where resource_unique_id =?
          `
        ],
        [
          [
            fileSerial,
            account_id_email,
            resource_unique_id,
            currentFileRelativePath,
            element.originalname,
            element.size,
            element.mimetype,
            moment().format('YYYY-MM-DD HH:mm:ss'),
            moment().format('YYYY-MM-DD HH:mm:ss')
          ],
          [resource_unique_id]
        ]
      )
    }catch(err){
      // 如果存储失败，需要删除这个文件
      console.log(err);
      fs.unlinkSync(absolutePath);
      continue;
    }
    
    fileInfoList.push({
      name:element.originalname,
      url:PathGenerator.generateImgUrl(account_status,currentFileRelativePath)
    })
  }

  ret = ResTemplate.resTemplateByJson(ResTemplate.restfulStatusCode['SUCCESS'],fileInfoList);

  return ret;
}