let express = require("express");
let authentication = require('../../middleware/authentication');

let router = express.Router();

router.get('/profile',[authentication,require('./controllers/profile')]);
router.post('/init_profile',[authentication,require('./controllers/init-profile')]);
router.post('/bind_tel',[authentication,require('./controllers/bind-tel')]);
router.post('/change_profile_name',[authentication,require('./controllers/change-profile-name')]);


module.exports = router;