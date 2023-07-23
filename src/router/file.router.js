const router = require('@koa/router');
const {
  LoginAUTHourizathionVerify,
} = require('../middleware/login.middleeare');
const handelAvatar = require('../middleware/file.middleeare');
const fileRouter = new router({ prefix: '/file' });
const fileController = require('../controller/file.controller');
fileRouter.post(
  '/',
  LoginAUTHourizathionVerify,
  handelAvatar,
  fileController.create,
);


module.exports = fileRouter;
