let express = require("express");
let router = express.Router();

let {middleware:{stateManagement}} = require('./dependence');

router.post('/register_auth',[stateManagement,require('./controllers/register-auth')]);


module.exports = router;