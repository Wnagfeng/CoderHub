const router = require('@koa/router');
const {
  verifyLogin,
  LoginAUTHourizathionVerify,
} = require('../middleware/login.middleeare');

const loginController = require('../controller/login.controller');
const LoginRouter = new router({ prefix: '/login' });
LoginRouter.post('/', verifyLogin, loginController.sign);
LoginRouter.get('/test', LoginAUTHourizathionVerify, loginController.next);

module.exports = LoginRouter;
