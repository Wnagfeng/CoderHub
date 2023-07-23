const userService = require('../service/user.service');
const fs = require('fs');
const { UPLOAD_PATH } = require('../app/path');
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
  async showAvatar(ctx, next) {
    const { id } = ctx.params;
    // 根据用户id去查询数据库获取到用户头像信息
    const res = await userService.showUseravatraImg(id);
    const { filename, mimetype } = res;
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
    ctx.type = mimetype;
  }
}
module.exports = new UserController();
