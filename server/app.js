// 初始化
const express = require('express');
// 创建服务
const server = express();

// // 测试服务器
// server.get('/aaaa', (req, res) => {
//     console.log('接收的参数：', req.query);
//     res.send('连接成功，OK!');
// });


// 导入
const routerCategories = require('./router/router_categories');
const routerUser = require('./router/router_user');
server.use('/categories', routerCategories);
server.use('/user', routerUser);



// 启用服务
server.listen(1807, () => {
    console.log('服务已启用，端口：1807');
});