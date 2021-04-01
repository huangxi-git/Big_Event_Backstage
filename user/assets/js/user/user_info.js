$(function () {
    // console.log(55599);

    // ajax 请求 统一携带 token 
    $.ajaxSetup({
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    });

    $('#user_info_form').on('submit', function (e) {
        e.preventDefault();
        // 调用函数
        editInfo();
    });


    // 封装 基本资料 函数 -- 修改
    function editInfo() {
        // 拿到 昵称 输入款内容
        const nickname = $('[name=nickname]').val().trim();
        // 邮箱
        const email = $('[name=email]').val().trim();
        // 发送请求
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:1807/account/my/userinfo',
            data: {
                id: 3,
                nickname: nickname,
                email: email,
            },
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) return alert(res.message);
                alert(res.message);
            },
        });
    };


});