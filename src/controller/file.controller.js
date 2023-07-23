const fileService = require('../service/file.service');
const userService = require('../service/user.service');
const { BASE_URL } = require('../config/Server');
class fileController {
  async create(ctx, next) {
    const { file } = ctx.request;
    const { id } = ctx.user;
    const res = await fileService.create(
      file.filename,
      file.mimetype,
      file.size,
      id,
    );

    // 只要我们这边用户需要上传头像了我们就给user表中同时插入用户创建的数据
    const useravatarurl = `${BASE_URL}/user/avatar/${id}`;
    const res1 = await userService.addUserAvatar(useravatarurl, id);
    ctx.body = {
      message: '上传成功',
      avatarURl: useravatarurl,
    };
  }
}
module.exports = new fileController();
