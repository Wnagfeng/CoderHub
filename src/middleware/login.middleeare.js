const UserService = require('../service/user.service');
const toMd5Hex = require('../utils/password-handle');
const jwt = require('jsonwebtoken');
const {
  NAME_OR_PASSWORD_IS_REQUIRE,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHOURIZATHION,
} = require('../config/error-constance');

const { PUBLIC_KEY } = require('../config/screct');

const verifyLogin = async (ctx, next) => {
  // 1.1 判断用户名和密码
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRE, ctx);
  }
  // 1.2查询用户是否存在
  const users = await UserService.findeuserState(name);
  const user = users[0];
  if (!user) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx);
  }

  // 1.3判断用户的登录密码是否正确
  //   用curry 进行测试
  if (user.password !== toMd5Hex(password)) {
    console.log(user);
    console.log(toMd5Hex('123456'));
    return ctx.app.emit('error', PASSWORD_IS_INCORRENT, ctx);
  }

  // 1.4将user信息保存在ctx中供loginctroller使用
  ctx.user = user;
  await next();
};

const LoginAUTHourizathionVerify = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit('error', UNAUTHOURIZATHION, ctx);
  }
  const token = authorization.replace('Bearer ', '');
  // 拿到token以后我们需要进行比对 如果验证通过就可以继续执行获取请求
  try {
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    });
    // 将token信息保存下来
    ctx.user = res;
    await next();
  } catch (error) {
    ctx.app.emit('error', UNAUTHOURIZATHION, ctx);
  }
};
module.exports = { verifyLogin, LoginAUTHourizathionVerify };
