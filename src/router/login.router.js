const router = require('@koa/router');
const verifyLogin = require('../middleware/login.middleeare');
const loginController = require('../controller/login.controller');
const LoginRouter = new router({ prefix: '/login' });
LoginRouter.post('/', verifyLogin, loginController.sign);

module.exports = LoginRouter;
