let jwt = require('jsonwebtoken');
const SECRET_KEY = require('../../config/token-config');


module.exports = class TokenUtil{

  static createToken = (accountIdEmail, accountStatus)=>{
    let payload = {
      accountIdEmail,
      accountStatus
    }
    let token = jwt.sign(payload, SECRET_KEY, {expiresIn:60*60*24})
    return token;
  }

  static verifyToken = (token , callback)=>{
    jwt.verify(token, SECRET_KEY,(err, decode)=>{
      if(err){
        return callback(err);
      }
      return callback(null, decode);
    })
  }
}