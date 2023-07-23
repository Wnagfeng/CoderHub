const database = require('../app/database');
// 该文件接收前端传递的用户信息 连接数据库进行一些逻辑操作
class UserService {
  async create(userInfo) {
    //接收到前端传递的数据进行主要的逻辑操作
    const { name, password } = userInfo;
    // 拼接statement语句
    const statement = 'INSERT INTO `user` (name,password) VALUES(?,?);';
    const [result] = await database.execute(statement, [name, password]);
    return result;
  }

  async findeuserState(username) {
    const statement = 'SELECT * FROM `user` WHERE name =?;';
    const [valeuse] = await database.execute(statement, [username]);
    return valeuse;
  }
  async showUseravatraImg(user_id) {
    const statement = 'SELECT * FROM avatar WHERE avatar.user_id=?;';
    const [result] = await database.execute(statement, [String(user_id)]);
    return result.pop();
  }

  async addUserAvatar(url, id) {
    console.log(url, id);

    const statement = 'UPDATE user SET avatar_url= ? WHERE user.id=?;';
    const [result] = await database.execute(statement, [url, String(id)]);
    return result;
  }
}
module.exports = new UserService();
