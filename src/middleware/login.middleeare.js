const UserService = require('../service/user.service');
const toMd5Hex = require('../utils/password-handle');
const {
  NAME_OR_PASSWORD_IS_REQUIRE,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
} = require('../config/error-constance');
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
  ctx.user = user ;
  await next();
};
module.exports = verifyLogin;
