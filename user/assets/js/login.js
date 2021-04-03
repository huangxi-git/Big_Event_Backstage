$(function () {
    // console.log(6666);

    // ajax 请求 统一携带 token 
    $.ajaxSetup({
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    });

    // 点击去注册按钮
    $('#link_reg').click(() => {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击去登录按钮
    $('#link_login').click(() => {
        $('.login-box').show();
        $('.reg-box').hide();
    });


    // 注册账号
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        // 账号输入框
        const act = $('#reg_account').val().trim();
        // 密码框内容
        const pwd = $('#reg_password').val().trim();
        // 确认密码框内容
        const repwd = $('#req_repassword').val().trim();
        // 密码输入框内容长度
        const pwdLength = pwd.length >= 6 && repwd.length <= 12;
        // 判断长度 boolearn
        if (!pwdLength) {
            return alert('密码长度必须为6-12！');
        };
        if (pwd !== repwd) {
            return alert('两次输入密码必须一致！');
        };
        // 实现注册功能
        // 发送请求
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:1807/user/api/reguser',
            data: {
                username: act,
                password: pwd,
            },
            success: (res) => {
                // console.log(res);
                // 注册失败
                if (res.status !== 0) return alert(res.message);
                alert(res.message);
                // 切换到登录页面
                $('#link_login').click();
                // 清空form表单输入框内容
                $('#form-reg')[0].reset();
            },
        });
    });


    // 登录账号
    $('#form-login').on('submit', (e) => {
        e.preventDefault();
        // 账号
        const act = $('#login_account').val().trim();
        // 密码
        const pwd = $('#login_password').val().trim();
        // 发送请求 -- 携带token
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:1807/user/api/login',
            data: {
                username: act,
                password: pwd,
            },
            success: (res) => {
                // console.log(res);
                // console.log(act);
                // 登录失败
                if (res.code != 0) {
                    return alert(res.message);
                };
                // 保存 后端返回的 token 
                localStorage.setItem('token', res.token);
                // 跳转页面 -- 拼接需要传出的用户名
                window.location.href = '/user/index.html' + '?' + act;
            },
        });
    });

});