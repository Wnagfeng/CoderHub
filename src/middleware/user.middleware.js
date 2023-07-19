// 该文件用于验证用户是否存在
const userService = require('../service/user.service');
const toMd5Hex = require('../utils/password-handle');
const { NAME_OR_PASSWORD_IS_REQUIRE ,NAME_IS_ALREADLY_EXISTS} = require('../config/error-constance');
const verfyUser = async (ctx, next) => {
  // 1.1 判断用户名和密码
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRE, ctx);
  }

  const users = await userService.findeuserState(name);
  if (users.length) {
    return ctx.app.emit('error', NAME_IS_ALREADLY_EXISTS, ctx);
  }

  // 3.执行下一个中间件
  await next();
};
const handelPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  //  他娘滴使用node中自己的库进行加密老是拿不到结果只能自己封装md5加密函数真操蛋
  ctx.request.body.password = toMd5Hex(password);

  await next();
};
module.exports = { verfyUser, handelPassword };
