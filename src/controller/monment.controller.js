const monmentService = require('../service/monment.service');
const MonmentService = require('../service/monment.service');

class MonmentController {
  async create(ctx, next) {
    // 拿到该用户需要发表的文章
    const { content } = ctx.request.body;
    const id = ctx.user.id;
    // 再根据用户的id和内容进行插入数据库
    const res = await MonmentService.create(content, id);
    ctx.body = {
      message: '发表用户文章成功',
      data: res,
    };
  }
  async getmonmentlist(ctx, next) {
    const { offset, size } = ctx.query;
    const res = await monmentService.querylist(offset, size);
    ctx.body = {
      message: '查询成功',
      data: res,
    };
  }
  async getmonmentdetaile(ctx, next) {
    const { monmentid } = ctx.params;
    const res = await monmentService.querydetaile(monmentid);
    ctx.body = {
      message: '查询成功',
      data: res,
    };
  }
  async updatamonment(ctx, next) {
    const { momentid } = ctx.params;
    const { content } = ctx.request.body;
    const res = await monmentService.updatamonment(momentid, content);
    ctx.body = {
      message: '修改成功',
      data: res,
    };
  }
  async deletemonment(ctx, next) {
    const { momentid } = ctx.params;

    const res = await monmentService.deletemonment(momentid);
    ctx.body = {
      message: '删除动态成功',
      data: res,
    };
  }
  async addmonment_Label(ctx, next) {
    // 拿到labels
    const labels = ctx.labels;
    // 拿到动态id
    const { momentid } = ctx.params;
    let hasLabelArray = [];
    let nohasLabelArray = [];
    for (const item of labels) {
      // 判断一下当前的动态是否已经添加了当前标签
      const res = await MonmentService.hasLabel(momentid, item.id);
      // 如果不存在是true
      if (!!res.length) {
        hasLabelArray.push(item);
        ctx.body = {
          message: '当前动态已存在该标签',
          data: hasLabelArray,
        };
      } else {
        // 把momentid和labelsid取出来执行sql语句插入到数据库中
        const result = await MonmentService.addLabels(momentid, item.id);
        nohasLabelArray.push(item);
        ctx.body = {
          message: '添加标签成功',
          data: result,
          labels: nohasLabelArray,
        };
      }
    }
  }
}
module.exports = new MonmentController();
