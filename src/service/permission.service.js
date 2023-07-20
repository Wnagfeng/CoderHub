const database = require('../app/database');
class Permission {
  async monmentPermission(monmentid, user_id) {
    const statement =
      'SELECT * FROM moment m WHERE m.id= ? AND m.user_id= ? ; ';
    const [result] = await database.execute(statement, [
      String(monmentid),
      String(user_id),
    ]);
    return !!result.length;
  }

  async PermissionService(resourceName, resourceId, id) {
    const statement = `SELECT * FROM ${resourceName} m WHERE m.id= ? AND m.user_id= ? ; `;
    const [result] = await database.execute(statement, [
      String(resourceId),
      String(id),
    ]);
    return !!result.length;
  }
}
module.exports = new Permission();
