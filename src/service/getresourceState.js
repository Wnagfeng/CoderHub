const database = require('../app/database');
class getresourceStateService {
    // 用于查询当前的需要操作的行是否存在
  async State(resourceName,resourceID) {
    const statement = `SELECT * FROM ${resourceName} m WHERE m.id= ?; `;
    const [result] = await database.execute(statement, [String(resourceID)]);
    return !!result.length;
  }
}
module.exports = new getresourceStateService();
