let express = require("express");
let authentication = require('../../middleware/authentication');

let router = express.Router();

router.post('/create_resource',[authentication,require('./controllers/create-resource')]);
router.get('/resource',[authentication,require('./controllers/resource')]);
router.post('/change_resource_name',[authentication,require('./controllers/change-resource-name')]);


module.exports = router;