// 初始化
const express = require('express');
const router = express.Router();
// 连接数据库
const conn = require('../util/sql');

// 普通键值对
router.use(express.urlencoded());

// 1、接收的参数
// 2、拼接sql
// 3、操作sql
// 4、返回值

// 1、 get 接口 -- 获取文章分类
router.get('/my/article/cates', (req, res) => {
    // 1、接收的参数
    // console.log('接收的参数:', req.query);
    // 2、拼接sql
    const sqlStr = `select id,name,slug from categories `;
    // console.log(sqlStr);
    // 3、操作sql
    conn.query(sqlStr, (err, result) => {
        // console.log('返回的结果：', result);
        // 4、返回值
        if (err) return res.json({ status: 1, message: '分类获取失败' });
        res.json({ status: 0, message: '分类获取成功', data: result });
    });
});


// 2、 post 接口 -- 新添文章分类
router.post('/my/article/addcates', (req, res) => {
    // 1、接收的参数
    console.log('接收的参数：', req.body);
    const { name, slug } = req.body;
    // 2、拼接sql
    const sqlStr = `insert into categories (name, slug) values("${name}", "${slug}")`;
    // 3、操作sql
    conn.query(sqlStr, (err, result) => {
        // 4、返回值
        if (err) return res.json({ status: 1, message: '分类添加失败！' });
        // console.log('返回值:', result);
        res.json({ status: 0, message: '分类添加成功' });
    });
});

// 3、 get 接口 -- 根据 Id 删除文章分类
router.get('/my/article/deletecate', (req, res) => {
    // 1、接收的参数
    console.log('接收的参数:', req.query);
    const { id } = req.query;
    // 2、拼接sql
    const sqlStr = `update categories set isdelete=1 where id=${id}`;
    // console.log(sqlStr);
    // 3、操作sql
    conn.query(sqlStr, (err, result) => {
        // 4、返回值
        if (err) return res.json({ status: 1, message: '分类删除失败' });
        console.log('返回的结果：', result);
        res.json({ status: 0, message: '分类删除成功' });
    });
});

// 4、post 接口-- 根据 Id 获取文章分类数据
router.get('/my/article/getCatesById', (req, res) => {
    // 1、接收的参数
    console.log('接收的参数:', req.query);
    const { id } = req.query;
    // 2、拼接sql
    const sqlStr = `select id,name,slug from categories where id="${id}"`;
    console.log(sqlStr);
    // 3、操作sql
    conn.query(sqlStr, (err, result) => {
        // 4、返回值
        if (err) return res.json({ status: 1, message: '获取文章分类数据失败' });
        res.json({ status: 0, message: '获取文章分类数据成功', data: result });
    });
});


// 5、post 接口-- 根据 Id 更新文章分类数据
router.post('/my/article/updatecate', (req, res) => {
    // 1、接收的参数
    console.log('接收的参数:', req.body);
    const { name, slug, id } = req.body;
    // 空数组保存新数据
    const params = [];
    if (name) {
        // 往数组最后一个元素后面追加元素
        params.push(`name="${name}"`);
    };
    if (slug) {
        // 往数组最后一个元素后面追加元素
        params.push(`slug="${slug}"`);
    };
    // console.log(params);
    // 将数组通过 ',' 拼接成字符串
    const paramsNew = params.join(',');
    // console.log(paramsNew);
    // 2、拼接sql
    const sqlStr = `update categories set ${paramsNew} where id="${id}"`;
    // console.log(sqlStr);
    // 3、操作sql
    conn.query(sqlStr, (err, result) => {
        // 4、返回值
        if (err) return res.json({ status: 1, message: '更新文章分类数据失败' });
        res.json({ status: 0, message: '更新文章分类数据成功' });
    });
});

// 导出
module.exports = router;