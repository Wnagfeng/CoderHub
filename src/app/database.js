// 该文件用于和数据库建立联系
const mysql = require('mysql2');
const connectionPoll = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'coderhub',
  user: 'root',
  password: '124578Wf,',
  connectionLimit: 5,
});
connectionPoll.getConnection((err, connection) => {
  // 判断数据库是否连接成功
  if (err) {
    console.log('连接数据库失败~', err);
    return;
  }
  // 获取连接connection尝试和数据库建立连接
  connection.connect((err) => {
    if (err) {
      console.log('数据库操作失败了', err);
    } else {
      console.log('可以和数据库进行交互了');
    }
  });
});
const connection = connectionPoll.promise();
module.exports = connection;
