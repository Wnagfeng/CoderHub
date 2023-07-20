const database = require('../app/database');
class MonmentService {
  async create(content, id) {
    const statement = `INSERT INTO moment (content,user_id) VALUES (?,?);`;
    const [result] = await database.execute(statement, [content, id]);
    return result;
  }
  async querylist(offset = 0, size = 10) {
    const statement = `
    SELECT 
    m.id id,m.content content ,m.createAt createTime ,m.updateAt updataTime,
    JSON_OBJECT("id",u.id,"name",u.name,"createTime",u.createAt,"updataTime",u.updateAt) AS 'user'
    FROM moment m LEFT JOIN user u ON u.id =m.id LIMIT 10 OFFSET 0;
    `;
    const [result] = await database.execute(statement, [
      String(size),
      String(offset),
    ]);
    return result;
  }
  async querydetaile(monmentid) {
    const statement = `
    SELECT 
    m.id id,m.content content ,m.createAt createTime ,m.updateAt updataTime,
    JSON_OBJECT("id",u.id,"name",u.name,"createTime",u.createAt,"updataTime",u.updateAt) AS 'user'
    FROM moment m LEFT JOIN user u ON u.id =m.id WHERE ? =m.id;
    `;
    const [result] = await database.execute(statement, [String(monmentid)]);
    return result;
  }
  async updatamonment(monmentid, content) {
    const statement = 'UPDATE moment SET content = ? WHERE id = ? ;';
    const [result] = await database.execute(statement, [
      String(content),
      String(monmentid),
    ]);
    return result;
  }
  async deletemonment(monmentid) {
    const statement = 'DELETE FROM moment WHERE id= ?;';
    const [result] = await database.execute(statement, [String(monmentid)]);
    return result;
  }

  async getMonmentState(monmentid) {
    const statement = 'SELECT * FROM moment WHERE id= ?;';
    const [result] = await database.execute(statement, [String(monmentid)]);
    console.log(result);
    return result;
  }
}
module.exports = new MonmentService();
