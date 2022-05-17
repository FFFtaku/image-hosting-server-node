let {service:{imageByProfileService},joi,ResTemplate} = require('../dependence');

module.exports = async (req, res, next) => {

  let { account_id_email , account_status} = req.auth;
  
  try{
    let serviceRet = await imageByProfileService(account_id_email,account_status);
    res.send(serviceRet);
  }catch(E){
    next(E);
  }
}
