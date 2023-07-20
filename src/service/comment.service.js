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
    console.log(content, userID, monmentid, commentid);

    const statement =
      'INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES(?,?,?,?);';
    const [result] = await database.execute(statement, [
      content,
      String(monmentid),
      String(userID),
      String(commentid),
    ]);
    console.log(result);

    return result;
  }
}
module.exports = new commentservice();
