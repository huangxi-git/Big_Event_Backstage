// 初始化
const express = require('express');
const sql = require('../util/sql');
const router = express.Router();
// 引入数据库
const conn = require('../util/sql');

// 1、接收的参数
// 2、拼接sql
// 3、操作sql
// 4、返回值

// 普通键值对
router.use(express.urlencoded());

// 处理 form-data 类型的
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
// 精细化去设置，如何去保存文件
const storage = multer.diskStorage({
    // 保存在哪里
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    // 保存时，文件名叫什么
    filename: function (req, file, cb) {
        console.log('file', file)
        // const filenameArr = file.originalname.split('.');
        cb(null, file.originalname) //  + "." +filenameArr[filenameArr.length-1]);
    },
});
var upload = multer({ storage });


// 1、get 接口-- 获取用户的基本信息
router.get('/my/userinfo', (req, res) => {
    // 1、接收的参数
    console.log('接收的参数:', req.query);
    const { username } = req.query;
    // 2、拼接sql
    const sqlStr = `select id, username, nickname, email, userPic from users where username="${username}"`;
    // console.log(sqlStr);
    // 3、操作sql
    conn.query(sqlStr, (err, result) => {
        // 4、返回值
        if (err) return res.json({ status: 1, message: '获取用户的基本信息失败' });
        // console.log(result);
        res.json({ status: 0, message: '获取用户的基本信息成功', data: result });
    });
});


// 2、post 接口-- 更新用户的基本信息
router.post('/my/userinfo', (req, res) => {
    // 1、接收的参数
    console.log('接收的参数:', req.body);
    const { id, nickname, email, userPic } = req.body;
    // 定义新数组保存新数据
    const params = [];
    // 判断传入的参数
    if (nickname) {
        params.push(`nickname="${nickname}"`);
    };
    if (email) {
        params.push(`email="${email}"`);
    };
    if (userPic) {
        params.push(`userPic="${userPic}"`);
    };
    // 将数组转为字符串后用','拼接
    const paramsNew = params.join(',');
    // 2、拼接sql
    const sqlStr = `update users set ${paramsNew} where id="${id}"`;
    // console.log(sqlStr);
    // 3、操作sql
    conn.query(sqlStr, (err, result) => {
        // 4、返回值
        if (err) return res.json({ status: 1, message: '更新用户的基本信息失败' });
        res.json({ status: 0, message: '更新用户的基本信息成功' });
    });
});


// 3、post 接口-- 上传用户头像
router.post('/my/uploadPic', upload.single('file_data'), (req, res) => {
    // 1、接收的参数
    console.log('接收的参数:', req.file);
    // 4、返回值
    res.json({
        status: 0,
        message: '上传用户头像成功',
        src: 'http://127.0.0.1:1807/uploads/' + req.file.filename,
    });
});


// 4、post 接口-- 重置密码
router.post('/my/updatepwd', (req, res) => {
    // 1、接收的参数
    console.log('接收的参数:', req.body);
    const { id, oldPwd, newPwd } = req.body;
    // 2、拼接sql
    const sqlStr = `update users set password="${newPwd}" where id=${id} and password="${oldPwd}"`;
    // console.log(sqlStr);s
    // 3、操作sql
    conn.query(sqlStr, (err, result) => {
        // 4、返回值
        if (err) return res.json({ status: 1, message: '重置密码失败' });
        res.json({ status: 0, message: '重置密码成功' });
    });
});




// 导出
module.exports = router;