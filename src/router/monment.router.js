const router = require('@koa/router');
const {
  LoginAUTHourizathionVerify,
} = require('../middleware/login.middleeare');
const MonmentController = require('../controller/monment.controller');
const MonmentRouter = new router({ prefix: '/monment' });
const getresourceState=require("../middleware/getresourceState")
const verifyPermission = require('../middleware/permission.middleware');
// 在发表动态之前我们需要先验证用户是否已经登录即验证token
// 增加动态
MonmentRouter.post('/', LoginAUTHourizathionVerify, MonmentController.create);
// 查动态
MonmentRouter.get('/', MonmentController.getmonmentlist);
MonmentRouter.get('/:monmentid', MonmentController.getmonmentdetaile);
// 修改动态：前提需要登录
// 还有就是你需要验证当前登录的用户是否发表了该文章
MonmentRouter.patch(
  '/:momentid',
  LoginAUTHourizathionVerify,
  getresourceState,
  verifyPermission,
  
  MonmentController.updatamonment,
);
// 删除动态
MonmentRouter.delete(
  '/:momentid',
  LoginAUTHourizathionVerify,
  getresourceState,
  verifyPermission,

  MonmentController.deletemonment,
);

module.exports = MonmentRouter;
