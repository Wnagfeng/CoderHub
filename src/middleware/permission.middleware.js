const PermissionService = require('../service/permission.service');
const { OPERATION_IS_NOT_ALLOWED } = require('../config/error-constance');
const verifyMonmentPermission = async (ctx, next) => {
  // 拿到需要修改的文章的id
  const { monmentid } = ctx.params;
  // 拿到当前登录的用户的id
  const id = ctx.user.id;
  const res = await PermissionService.monmentPermission(monmentid, id);
  if (!res) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx);
  }
  await next();
};
const verifyPermission = async (ctx, next) => {
  // 获取到需要查询的表的名字
  const keyName = Object.keys(ctx.params)[0];
 
  
  // 拿到需要修改的rowid
  const resourceId = ctx.params[keyName];
  // 拿到当前的用户id
  const id = ctx.user.id;
  // 截取出需要查询的表的名字
  const resourceName = keyName.replace('id', '');
  const res = await PermissionService.PermissionService(resourceName,resourceId, id);
  if (!res) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx);
  }
  await next();
};
module.exports = verifyPermission;
