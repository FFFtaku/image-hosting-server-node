let express = require("express");
let router = express.Router();

let {middleware:{fileHandler,authentication}} =require('./dependence');


router.post('/upload_image',[
  authentication, 
  fileHandler({name:"upload_file",maxCount:10}),
  require('./controllers/upload-image')
]);
router.get('/image_by_profile',[authentication, require('./controllers/image-by-profile')]);
router.post('/image_by_resource',[authentication, require('./controllers/image-by-resource')]);
router.post('/delete_image_by_url',[authentication, require('./controllers/delete-image')]);


module.exports = router;