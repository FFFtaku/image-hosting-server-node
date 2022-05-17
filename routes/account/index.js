let express = require("express");
let router = express.Router();

let { middleware: { authentication, stateManagement } } = require('./dependence');

router.post('/register', [stateManagement, require('./controllers/register')]);
router.post('/login', [require('./controllers/login')]);
router.post('/change_pass', [authentication, require('./controllers/change-pass')]);


module.exports = router;