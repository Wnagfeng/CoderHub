const router = require('@koa/router');
const commentRouter = new router({ prefix: '/comment' });
const {
  LoginAUTHourizathionVerify,
} = require('../middleware/login.middleeare');
const getresourceState = require('../middleware/getresourceState');
const verifyPermission = require('../middleware/permission.middleware');
const comment = require('../controller/comment.controller');

commentRouter.post('/', LoginAUTHourizathionVerify, comment.create);
commentRouter.post('/reply', LoginAUTHourizathionVerify, comment.reply);
commentRouter.delete(
  '/:commentid',
  LoginAUTHourizathionVerify,
  getresourceState,
  verifyPermission,
  comment.delete,
);
module.exports = commentRouter;
