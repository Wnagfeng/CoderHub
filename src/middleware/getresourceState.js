const getresourceStateService = require('../service/getresourceState');
const { SOURCE_IS_EMPTY } = require('../config/error-constance');
const getresourceState = async (ctx, next) => {
  // 获取到parmas名字
  const keyName = Object.keys(ctx.params)[0];
  // 用parmas去获取到需要操作的id
  const momentid = ctx.params[keyName];
  // 截取到需要操作的表名
  const resourceName = keyName.replace('id', '');
  // 获取到当前需要操作的对象的状态是否存在
  const res = await getresourceStateService.State(resourceName, momentid);
  if (!res) {
    return ctx.app.emit('error', SOURCE_IS_EMPTY, ctx);
  }
  await next();
};
module.exports = getresourceState;
