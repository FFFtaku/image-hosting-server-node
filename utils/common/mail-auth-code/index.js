let nodemailer = require('nodemailer');

let { userEmailConfig, emailServicerConfig } = require('./config');
let transporter = nodemailer.createTransport({
  ...emailServicerConfig,
  // 使用安全连接
  secureConnection: true,
  // 使用连接池
  pool: true,
  auth: userEmailConfig
});

/**
 * 
 * @param {String} toEmail 接收的邮箱号
 * @param {String} authCode 验证码
 */
function sendMailAuth(toEmail, authCode) {
  
  let message = {
    from: '"ukat" <1192766697@qq.com>', // 发送者
    to: toEmail, // 接受者,可以同时发送多个,以逗号隔开
    // cc:'', // 抄送,可以同时发送多个,以逗号隔开
    //bcc:'',//暗抄送,可以同时发送多个,以逗号隔开
    subject: '这是一封验证码邮件', // 标题
    // text: ``, // 可以使用纯文本(本质上纯文本也会被解析为html) 或html标签
    html:`
      <div 
      style="width:600px;
            margin:auto;
            background:rgba(46, 183, 224, 0.411);
            border-radius:10px;
            box-shadow: 10px 10px 30px #000;
            "
      >
        <div style="padding:20px">
          尊敬的用户您好，您正在注册账户。您的验证码为：
        </div>
        <div 
        style="background:rgba(235, 131, 209, 0.733);
              padding:40px;
              font-size:1.6em;
              text-align:center
              "
        >
          ${authCode}
        </div>
        <div>
          (大小写敏感)
        </div>
        <div style="padding:20px">
          -> 该验证码三分钟内有效！请勿泄露于他人！ <-
        </div>
      </div>    
    `
  };

  return transporter.sendMail(message);
}

module.exports = sendMailAuth;

