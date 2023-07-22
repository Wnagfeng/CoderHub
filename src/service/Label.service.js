const database = require('../app/database');
class LabelService {
  async create(name) {
    const statement = 'INSERT INTO label (name) VALUES(?)';
    const [result] = await database.execute(statement, [name]);
    return result;
  }
  async getLabelStateForname(name) {
    const statement = 'SELECT * FROM label l WHERE l.name=?;';
    const [result] = await database.execute(statement, [name]);
    return result;
  }
  async querylist(offset = 0, size = 10) {
    const statement = `
    SELECT l.name,l.id FROM label l LIMIT ? OFFSET ?
    `;
    const [result] = await database.execute(statement, [
      String(size),
      String(offset),
    ]);
    return result;
  }
}
module.exports = new LabelService();
