const getresourceStateService = require('../service/getresourceState');
const { SOURCE_IS_EMPTY } = require('../config/error-constance');
const getresourceState = async (ctx, next) => {
  const { momentid } = ctx.params;
  const keyName = Object.keys(ctx.params)[0];
  const resourceName = keyName.replace('id', '');

  
  const res = await getresourceStateService.State(resourceName,momentid);
  if (!res) {
    return ctx.app.emit('error', SOURCE_IS_EMPTY, ctx);
  }
  await next();
};
module.exports = getresourceState;
