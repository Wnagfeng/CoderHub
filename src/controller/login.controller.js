const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../config/screct');
class LoginController {
  sign(ctx, next) {
    // 获取数据库用户信息
    const { id, name } = ctx.user;
    // 给该用户颁发令牌
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: 'RS256',
    });

    ctx.body = {
      code: 0,
      message: '用户登录成功',
      data: {
        token,
        id,
        name,
      },
    };
  }
  next(ctx, next) {
    ctx.body="可以获取获取数据了"
  }
}
module.exports = new LoginController();
