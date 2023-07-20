const commentservice = require('../service/comment.service');
class comment {
  async create(ctx, next) {
    // 拿到需要评论的内容
    const userID = ctx.user.id;
    const { content, monmentid } = ctx.request.body;
    const res = await commentservice.create(content, userID, monmentid);
    ctx.body = {
      message: '发表评论成功',
      data: res,
    };
  }
  async reply(ctx, next) {
    const userID = ctx.user.id;
    const { content, momentid, commentid } = ctx.request.body;
    const res = await commentservice.aply(content, userID, momentid, commentid);
    console.log(res);
    
    ctx.body = {
      message: '回复评论成功',
      data: res,
    };
  }
}
module.exports = new comment();
