let uploadImageService = require('./modules/upload-image');
let imageByResourceService = require('./modules/image-by-resource');
let imageByProfileService = require('./modules/image-by-profile');
let deleteImageByUrlService = require('./modules/delete-image');

module.exports = {
  uploadImageService,
  imageByResourceService,
  imageByProfileService,
  deleteImageByUrlService
}