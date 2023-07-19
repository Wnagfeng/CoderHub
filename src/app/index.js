// 对于app只是实例化app和使用router 还有一些模块
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const userRouter = require('../router/user.router');
const LoginRouter = require('../router/login.router');

// 引入错误处理函数 让他提前监听
const app = new Koa();
// 这个必须放到前面
app.use(bodyparser());
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(LoginRouter.routes());
app.use(LoginRouter.allowedMethods());

module.exports = app;
