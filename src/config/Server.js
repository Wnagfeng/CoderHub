// 对于该文件只是管理端口
const dotenv = require('dotenv');
// 我们只需要调用他上面的config方法 他就能自动去读取 .env文件中的内容
dotenv.config();
module.exports = { SERVER_PORT, BASE_URL } = process.env;
