const router = require('@koa/router');
const {
  LoginAUTHourizathionVerify,
} = require('../middleware/login.middleeare');
const MonmentController = require('../controller/monment.controller');
const MonmentRouter = new router({ prefix: '/monment' });
const getresourceState = require('../middleware/getresourceState');
const verifyPermission = require('../middleware/permission.middleware');
const verifyLabelExtists = require('../middleware/moment.middler');
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
// 给动态添加标签接口
MonmentRouter.post(
  '/:momentid/labels',
  LoginAUTHourizathionVerify,
  getresourceState,
  verifyPermission,
  // 在给动态添加标签的时候我们不确定该标签是不是存在所以我们在添加之前我们需要给他验证一下
  // 如果存在就添加放到数组里面如果不存在就去创建一下最后放到ctx上 传给下一个中间件
  verifyLabelExtists,
  MonmentController.addmonment_Label,
);

module.exports = MonmentRouter;
