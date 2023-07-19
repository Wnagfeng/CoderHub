// 对于main只是启动该服务
const app =require("./app/index")
const { SERVER_PORT } = require('./config/Server');
require('./utils/handel-error');
app.listen(SERVER_PORT, () => {
  console.log('服务器启动成功🐮');
});
