let multer = require('multer');
let { v4 : uuidv4} = require('uuid');
let pathConfig = require('../config/resource-path');
let path = require('path');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathConfig.TEM_RESOURCE_PATH);
  },
  filename: function (req, file, cb) {
    let uuid = uuidv4();
    file.uuid = uuid;
    cb(null, 'temfile-' + uuid);
  }
});

let fileFilter = function (req, file, cb) {
  // 这个函数应该调用 `cb` 用boolean值来
  // 指示是否应接受该文件

  // 拒绝这个文件，使用`false`，像这样:
  let ext = path.extname(file.originalname);
  if(!ext || ext === '.'){
    return cb(null, false);
  }
  file.ext = ext;
  // 接受这个文件，使用`true`，像这样:
  return cb(null, true);
}

let upload = multer({
  storage,
  fileFilter
})

// 以一个字段名上传文件，方便后续操作
module.exports = (field)=>{
  return upload.fields([field]);
}