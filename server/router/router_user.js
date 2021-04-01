// 初始化
const express = require('express');
const router = express.Router();
// 连接数据库
const conn = require('../util/sql');

// 普通键值对
router.use(express.urlencoded());

// 创建 token 验证
const jwt = require('jsonwebtoken');

// 1、接收的参数
// 2、拼接sql
// 3、操作sql
// 4、返回值

// post 接口 -- 用户注册
router.post('/api/reguser', (req, res) => {
    // 1、接收的参数
    console.log('接收的参数:', req.body);
    const { username, password } = req.body;
    // 接收到用户输入的参数后，去数据库查找是否已存在，已存在--用户名被占用
    // 拼接数据库查找的sql
    const sqlStrCheck = `select username from users where username="${username}"`;
    // 操作查找数据库sql
    conn.query(sqlStrCheck, (err, result) => {
        if (err) return res.json({ code: 1, message: '注册用户名查询失败！' });
        // console.log('返回结果：', result);
        // 用户名存在
        if (result.length > 0) return res.json({ code: 1, message: '用户名已存在！' });
        // 用户名 不 存在
        // 2、拼接sql
        const sqlStr = `insert into users (username, password) value("${username}", "${password}")`;
        // console.log(sqlStr);
        // 3、操作sql
        conn.query(sqlStr, (err, result) => {
            // 4、返回值
            if (err) return res.json({ status: 1, message: '注册失败！' });
            res.json({ status: 0, message: '注册成功！' });
        });
    });
});

// post 接口 -- 用户登录
router.post('/api/login', (req, res) => {
    // 1、接收的参数
    console.log('接收的参数:', req.body);
    const { username, password } = req.body;
    // 在数据库中查找是否有这个用户名，有--允许登录
    // 2、拼接sql
    const sqlStr = `select * from users where username="${username}" and password="${password}"`;
    // 3、操作sql
    conn.query(sqlStr, (err, result) => {
        // 4、返回值
        // console.log('返回值：', result);
        if (err) return res.json({ code: 1, message: '登录错误！' });
        if (result.length > 0) {
            // 返回 token ,调用 jwt 的 sign 
            const token = 'Bearer ' + jwt.sign(
                { name: username },
                'bignew1',
                { expiresIn: 14400 },
            );
            return res.json({ code: 0, message: '登录成功！', token });
        } else {
            return res.json({ code: 1, message: '登录失败！' });
        };
    });
});

// 导出
module.exports = router;