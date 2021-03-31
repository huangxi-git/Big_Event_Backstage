// 初始化
const express = require('express');
// 创建服务
const server = express();

// // 测试服务器
// server.get('/aaaa', (req, res) => {
//     console.log('接收的参数：', req.query);
//     res.send('连接成功，OK!');
// });

// 解决跨域问题
const cors = require('cors');
server.use(cors());


// 中间件技术 -- 验证 token -- 代码官网赋值
const jwt = require('express-jwt');
// app.use(jwt().unless());
// jwt() 用于解析token，并将 token 中保存的数据 赋值给 req.user
// unless() 约定某个接口不需要身份认证
server.use(jwt({
    secret: 'bignew1',          // 生成token时的 钥匙，必须统一
    algorithms: ['HS256'],      // 必填，加密算法，无需了解
}).unless({
    path: [
        '/user/api/reguser',
        '/user/api/login',
        '/categories/my/article/deletecate',
        '/categories/my/article/addcates',
        '/categories/my/article/cates',
        '/categories/my/article/getCatesById',
        '/categories/my/article/updatecate',
    ] // 除了这几个接口，其他都需要认证
}));


// 导入
const routerCategories = require('./router/router_categories');
const routerUser = require('./router/router_user');
server.use('/categories', routerCategories);
server.use('/user', routerUser);

// 错误处理中间件
server.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        // res.status(401).send('invalid token...');
        res.status(401).send({ status: 1, message: 'token身份认证失败！' });
    };
});

// 启用服务
server.listen(1807, () => {
    console.log('服务已启用，端口：1807');
});