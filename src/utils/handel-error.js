// 该文件用于处理错误
const app = require('../app/index');
const {
  NAME_OR_PASSWORD_IS_REQUIRE,
  NAME_IS_ALREADLY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
} = require('../config/error-constance');
app.on('error', (error, ctx) => {
  let code = 0;
  let message = '';
  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRE:
      code = -1001;
      message = '用户名或者密码没写';
      break;
    case NAME_IS_ALREADLY_EXISTS:
      code = -1002;
      message = '用户已存在';
      break;
    case NAME_IS_NOT_EXISTS:
      code = -1003;
      message = '用户不存在请注册';
      break;
    case PASSWORD_IS_INCORRENT:
      code = -1005;
      message = '用户密码错误';
      break;
  }
  ctx.body = {
    code,
    message,
  };
});
