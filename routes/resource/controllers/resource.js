let { service: { resourceService } } = require('../dependence');

module.exports = async (req, res, next) => {

  let { account_id_email, account_status } = req.auth;

  try {
    let serviceRet = await resourceService(account_id_email);
    res.send(serviceRet);
  } catch (E) {
    next(E);
  }
}
