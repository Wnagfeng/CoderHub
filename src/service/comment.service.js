const database = require('../app/database');
class commentservice {
  async create(content, userID, monmentid) {
    const statement =
      'INSERT INTO comment (content,moment_id,user_id) VALUES(?,?,?);';
    const [result] = await database.execute(statement, [
      content,
      String(monmentid),
      String(userID),
    ]);
    return result;
  }
  async aply(content, userID, monmentid, commentid) {
    const statement =
      'INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES(?,?,?,?);';
    const [result] = await database.execute(statement, [
      content,
      String(monmentid),
      String(userID),
      String(commentid),
    ]);
    return result;
  }
  async delete(comment_id) {
    const statement = 'DELETE FROM comment WHERE id= ?;';
    const [result] = await database.execute(statement, [String(comment_id)]);
    return result;
  }
}
module.exports = new commentservice();
