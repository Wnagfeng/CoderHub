// 对于router只是完成router的实例和创建
const router = require('@koa/router');
const userRouter = new router({ prefix: '/user' });
// 验证用户的中间件
const { verfyUser,handelPassword} = require('../middleware/user.middleware');
// 加密密码的中间件
const UserController = require('../controller/user.controller');
// 只要你要创建用户了我就把该类中的create方法给你 让这个类来帮我创建用户以及一些创建的逻辑
userRouter.post('/',verfyUser,handelPassword, UserController.create);

module.exports = userRouter;
