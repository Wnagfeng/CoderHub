const multer = require('@koa/multer');
const { UPLOAD_PATH } = require('../app/path');
// 定义上传文件的中间件
const uploadAvatar = multer({
  dest: UPLOAD_PATH,
});
const handelAvatar = uploadAvatar.single('avatar');

module.exports = handelAvatar;
