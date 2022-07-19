$(function() {


    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 给上传头像按钮绑定点击事件
    $('#btnChangeImage').on('click', function() {
            $('#file').click()

        })
        // 监听上传头像文件改变事件
    $('#file').on('change', function(e) {
            // console.log(e.target.files)
            // 获取用户选择的文件数组(e.target.files是一个伪数组)
            var filelist = e.target.files
                // 用户未选择照片
            if (filelist.length === 0) {
                return layer.msg('请选择照片！')
            }
            // 获取用户选择的文件
            var file = e.target.files[0]
                //根据选择的文件，创建一个对应的 URL 地址
            var newImgURL = URL.createObjectURL(file)

            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域



        })
        // 未确定按钮绑定click事件,将头像上传至服务器
    $('#btnUpload').on('click', function() {

        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            .toDataURL('image/png')


        // 发送ajax请求将头像上传至服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    layui.layer.msg('更换头像失败')
                }
                layui.layer.msg('更换头像成功')
                    // console.log(res)
                window.parent.getUserInfo()
            }
        })
    })
})