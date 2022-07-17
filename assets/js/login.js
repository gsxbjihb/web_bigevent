//登录和注册
$(function() {
    //去注册
    $('#link-reg').on('click', function() {
        $('.reg-box').show()
        $('.login-box').hide()

    })

    // 去登录
    $('#link-login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })



    var layer = layui.layer
    var from = layui.form
        // 密码的表单验证
    from.verify({
        // 密码验证
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格']
            //再次密码验证
            ,
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致，请重新输入密码'
            }

        }
    })


    // 监听注册事件
    $('#from_reg').on('submit', function(e) {
        //阻止默认行为
        e.preventDefault()
        var data = { username: $('.reg-box [name=username]').val(), password: $('.reg-box [name=password]').val() }
        $.post('/api/reguser', data,
            function(res) {


                if (res.status !== 0) { return layer.msg(res.message) }

                layer.msg('注册成功，请登录')
                $('#link-login').click()
            })
    })

    //监听登录事件
    $('#from_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('登陆失败')
                layer.msg('登陆成功')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '../index.html'
            }
        })
    })
})