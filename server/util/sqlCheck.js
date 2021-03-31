// 测试连接数据库
const conn = require('./sql');
conn.query('select * from categories', (err, result) => {
    console.log('数据：', result);          // 测试成功
});