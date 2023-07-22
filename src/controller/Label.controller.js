const LabelService = require('../service/Label.service');
const { THECURRENTLABELALREADYEXISTS } = require('../config/error-constance');
const getlabenameState = require('../middleware/Label.middlear');
class LabelControl {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const res = await LabelService.create(name);
    ctx.body = {
      message: '插入成功',
      data: res,
    };
  }
  async getlabellist(ctx, next) {
    const { offset, size } = ctx.query;
    const res = await LabelService.querylist(offset, size);
    ctx.body = {
      message: '查询成功',
      data: res,
    };
  }
  async getLabelState(ctx, next) {
    const { name } = ctx.request.body;
    const res = await getlabenameState(name);
    if (res.length == 0) {
      return await next();
    } else {
      ctx.app.emit('error', THECURRENTLABELALREADYEXISTS, ctx);
    }
  }
}
module.exports = new LabelControl();
