$(function() {
        // 调用获取用户信息
        getUserInfo()
            //退出功能
        var larer = layui.layer
        $('#btnLogout').on('click', function() {
            layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
                //清空本地存储
                localStorage.removeItem('token')
                    // 跳回到登录页面
                location.href = '/login.html'
                layer.close(index);
            });
            // console.log('ok')
        })

    })
    //获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            // console.log(res)
            // console.log(localStorage.getItem('token'))
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败! ')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvater(res.data)
        },
        // 不论成功还是失败，最终都会调用 complete 回调函数

        complete: function(res) {
            console.log(res)
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 强制清空token存储
                localStorage.removeItem('token')
                    // 强制回到登录页面
                location.href = '/login.html'
            }
        }
    })
}
//渲染用户的头像
function renderAvater(userInfo) {
    var name = userInfo.nickname || userInfo.username
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    if (userInfo.user_pic !== null) {
        // 用户有信息渲染用户头像
        $('.layui-nav-img').attr('src', userInfo.user_img).show()
        $('.text-avatar').hide()

    } else {
        // 渲染名字图片信息
        // console.log(name[0].toUpperCase())
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}