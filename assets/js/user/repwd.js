$(function() {

    var form = layui.form
    var larer = layui.layer
        // 给重置密码定义验证规则
    form.verify({
        oldPwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function(value) {
            if (value === $('[name=oldPwd]').val()) return '新旧密码一致'

        },
        renewPwd: function(value) {
            if (value !== $('[name=newPwd]').val()) return '两次密码密码不一致'

        },
    })

    // 监听表单提交行为
    $('.layui-form').on('submit', function(e) {
        // 阻止默认提交行为
        e.preventDefault()
            // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {

                if (res.status !== 0) return layer.msg('修改密码失败')

                layer.msg('更新密码成功！')
                $('.layui-form')[0].reset()
            }
        })



    })
})