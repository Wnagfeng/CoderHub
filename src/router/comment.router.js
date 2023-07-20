const router = require('@koa/router');
const commentRouter = new router({ prefix: '/comment' });
const {
  LoginAUTHourizathionVerify,
} = require('../middleware/login.middleeare');
const getresourceState = require('../middleware/getresourceState');
const comment = require('../controller/comment.controller');

commentRouter.post(
  '/',
  LoginAUTHourizathionVerify,
  comment.create,
);
commentRouter.post(
    '/reply',
    LoginAUTHourizathionVerify,
    comment.reply,
  );
module.exports = commentRouter;
