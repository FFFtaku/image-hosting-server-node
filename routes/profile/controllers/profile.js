let {service:{profileService}} = require('../dependence');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = async (req, res, next) => {

  let {account_id_email} = req.auth;

  try{
    let serviceRet = await profileService(account_id_email);
    res.send(serviceRet);
  }catch(E){
    next(E);
  }
}
