$(function() {
        initart_cate()
        var layer = layui.layer
        var form = layui.form

        var addCateindex = null
            // 为添加类别按钮绑定点击事件
        $('#addArtCate').on('click', function() {
                // 弹出层

                addCateindex = layer.open({
                    type: 1,
                    area: ['400px', '400px'],
                    title: '添加文章分类',
                    content: $('#addArt_cate').html(),
                });

            })
            // 通过代理的方式，给弹出层绑定提交事件
        $('body').on('submit', '#addCateFrom', function(e) {
            e.preventDefault()

            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {


                    if (res.status !== 0) return layer.msg('添加类别失败')
                    layer.msg('添加类别成功')
                    initart_cate()
                    layer.close(addCateindex)
                }
            })
        })

        // 通过代理方式为编辑按钮添加点击事件
        var editStr = null
        $('tbody').on('click', '.btn-edit', function() {
                // 弹出层
                editStr = layer.open({
                    type: 1,
                    area: ['400px', '400px'],
                    title: '编辑',
                    content: $('#dialog-edit').html(),

                })

                var Id = $(this).attr('data-Id')
                    // console.log(Id)
                $.ajax({
                    method: 'GET',
                    url: '/my/article/cates/' + Id,
                    success: function(res) {
                        if (res.status !== 0) return layer.msg('获取信息失败')
                            // console.log('获取信息成功')
                        var dataStr = {...res.data }
                            // console.log(dataStr)
                        form.val('fromEdit', dataStr)
                    }
                })


            })
            // 根据id获取用户信息，并填写到表单中

        // 通过代理的形式，为修改分类的表单绑定 submit 事件：
        $('body').on('submit', '#from-edit', function(e) {
            e.preventDefault()
            console.log($(this).Id)
                // 根据id更新文章类别
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res)
                    if (res.status !== 0) return layer.msg('更新文章分类失败')
                    layer.msg('更新文章分类成功')
                    layer.close(editStr)
                    initart_cate()

                }
            })
        })

        // 通过代理的方式，为删除按钮绑定点击事件
        $('body').on('click', '.btn-delete', function() {
            var id = $(this).attr('data-id')
            layer.confirm('确认删除', { icon: 3, title: '提示' }, function(index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + id,
                    success: function(res) {
                        // console.log(res)

                        if (res.suatus !== 0) return layer.msg('删除信息失败')
                        layer.msg('删除信息成功')
                        initart_cate()
                        layer.close(index);

                    }
                })

            })
        })


    })
    // 格式化文章类别表格
function initart_cate() {

    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res) {
            if (res.status !== 0) return layer.msg('获取文章类别失败')

            // 渲染表格中的数据
            // console.log(res)
            var cateStr = template('tpl-cate', res)
            $('tbody').html(cateStr)


        }
    })
}