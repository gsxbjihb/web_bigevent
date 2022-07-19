$(function() {
    var form = layui.form
    var layer = layui.layer



    // 自定义表单验证规则
    form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return '昵称长度必须在 1 ~ 6 个字符之间！'
                }
            }
        })
        //初始化用户信息并渲染到表单中
    initUserinfo()

    function initUserinfo() {
        //获取用户信息
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {

                    return layer.msg('获取用户信息失败')
                }
                // layui快捷给表单赋值
                // console.log(res)
                form.val('formuserinfo', res.data)

            }
        })

    }

    // 表单的重置效果
    $('#btnReset').on('click', function(e) {
        //阻止默认行为
        e.preventDefault()
            // 重新初始化用户信息
        initUserinfo()
    })

    // 更新用户信息
    $('.layui-form').on('submit', function(e) {
        // 阻止默认提交行为
        e.preventDefault()
            // 发起post请求更新用户信息
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }

                layer.msg('修改用户信息成功')
                    // 调用父窗口的渲染用户信息和头像的函数
                window.parent.getUserInfo()

            }
        })
    })
})