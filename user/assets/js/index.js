$(function () {

    // 点击退出按钮
    $('#btnLogout').on('click', function () {
        // console.log(88888);
        // 提醒
        alert('你即将退出登录！');
        // 跳转页面
        window.location.href = '/user/login.html';
        // 清除本地的 token 
        localStorage.removeItem('token');
    });

    // // 点击跳转页面
    // $('#basics').on('click', () => {
    //     window.location.href = '/user/user/user_info.html' + '?' + accountName;
    // });

});

// 在 URL 中拿取传入的  参数 username 
// 将地址栏中传入的参数字符串才分成数组
let accountName = window.location.search.split('?')[1];
// console.log(accountName);

// ajax 请求 统一携带 token 
$.ajaxSetup({
    headers: {
        Authorization: localStorage.getItem('token'),
    },
});

// 渲染页面
userBaseInfo();



// 获取用户基本信息
// 全局函数，其他模块能调用
function userBaseInfo() {

    // 发送请求
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:1807/account/my/userinfo',
        data: {
            username: accountName,
        },
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) return alert(res.message);
            console.log(res.message);
            // 向渲染用户头像函数传值
            userPic(res.data);
        },
    });
};


// 渲染用户头像
function userPic(userData) {
    // console.log(userData);
    // 渲染用户名或昵称
    const name = userData[0].nickname;
    $('#welcome').html(name);
    // 判断头像是否为空
    if (userData[0].userPic !== '') {
        // 判断有头像
        $('.text-avatar').hide();
        $('.layui-nav-img').show().attr('src', userData[0].userPic);
    } else {
        // 判断没有头像
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(userData[0].nickname.substring(0, 1).toUpperCase())
    }
};