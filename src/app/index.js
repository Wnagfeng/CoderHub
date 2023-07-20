// 对于app只是实例化app和使用router 还有一些模块
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const registerRouters = require('../router/index');

// 引入错误处理函数 让他提前监听
const app = new Koa();

// 这个必须放到前面
app.use(bodyparser());
// 注册路由的自动化程序
registerRouters(app);

module.exports = app;
