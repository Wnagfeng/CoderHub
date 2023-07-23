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
    JSON_OBJECT("id",u.id,"name",u.name,"createTime",u.createAt,"updataTime",u.updateAt) AS 'user',
    (SELECT COUNT(*) FROM comment WHERE comment.moment_id=m.id) commentCount,
    (SELECT COUNT(*) FROM moment_label m WHERE m.moment_id=m.id) labelCount
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
    JSON_OBJECT("id",u.id,"name",u.name,"createTime",u.createAt,"avatar_url",u.avatar_url,"updataTime",u.updateAt) AS 'user',
    -- 子查询开始
    (
    SELECT 
    -- 查询到的结构
    JSON_ARRAYAGG(
    JSON_OBJECT('id',c.id,'content',c.content,'comment_id',c.comment_id,'user',JSON_OBJECT('username',cu.name,'userid',cu.id))
    ) 
    -- 当前子查询从comment表中查询 左连接用户表 当用户id等于评论id这个数据我们需要 当评论的对象id等于当前动态id我们需要这个数据
    FROM comment c  LEFT JOIN user cu ON c.user_id=cu.id WHERE c.moment_id=m.id
    ) comments,
    -- 子查询结束
    (JSON_ARRAYAGG(JSON_OBJECT('label',ll.name,'labelid',ll.id))) labels
    FROM moment m 
    LEFT JOIN user u ON u.id =m.user_id
    
    
    LEFT JOIN moment_label ml ON ml.moment_id=m.id
    LEFT JOIN label ll ON ml.label_id=ll.id
    
    WHERE m.id=?
    GROUP BY m.id;
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
    return result;
  }
  async hasLabel(monmentid, label_id) {
    const statement = `SELECT * FROM moment_label WHERE moment_id= ? AND label_id=?;`;
    const [result] = await database.execute(statement, [
      String(monmentid),
      String(label_id),
    ]);
    return result;
  }
  async addLabels(moment_id, label_id) {
    const statement =
      'INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);';
    const [result] = await database.execute(statement, [
      String(moment_id),
      String(label_id),
    ]);
    return result;
  }
}
module.exports = new MonmentService();
