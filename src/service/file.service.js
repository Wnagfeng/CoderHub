const database = require('../app/database');

class fileService {
  async create(filename, mimetype, size, user_id) {
    const statement =
      'INSERT INTO avatar (filename,mimetype,size,user_id) VALUES(?,?,?,?);';
        const [result] = await database.execute(statement, [
        filename,
        mimetype,
        size,
        user_id,
      ]);
    return result;
  }
}
module.exports = new fileService();
