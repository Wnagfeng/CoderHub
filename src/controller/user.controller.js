const userService = require('../service/user.service');
class UserController {
  // 这里是对于用户的操作
  async create(ctx, next) {
   
    const user = ctx.request.body;
    // 拿到数据我不管 你给我找到操作数据的方法来执行创建用户的主要操作
    // 1.3执行创建逻辑
    const res = await userService.create(user);
    ctx.body = {
      message: '创建用户成功',
      code: 0,
      data: res,
    };
  }
}
module.exports = new UserController();
