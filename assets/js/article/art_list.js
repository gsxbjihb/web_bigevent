$(function() {

    var layer = layui.layer
    var laypage = layui.laypage;

    var form = layui.form
        // 定义参数
    var q = {
            pagenum: 1, // 页码值，默认请求第一页的数据
            pagesize: 2, // 每页显示几条数据，默认每页显示2条
            cate_id: '', // 文章分类的 Id
            state: '', // 文章的发布状态
        }
        // 渲染表格数据
    initTable()
    initCate()














    // 定义渲染表格数据函数
    function initTable() {
        // 请求服务器获取数据
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取信息失败')
                }
                // 获取数据成功，渲染数据到表格中
                var tableStr = template('tpl-table', res)
                $('tbody').html(tableStr)
                    // 渲染分页数据
                renderPage(res.total)
            }
        })
    }

    //为筛选按钮绑定点击事件
    $('#fromSearch').on('submit', function(e) {
        // console.log('ok')
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
            // q.cate_id = $('[name=cate_id]').val()
            // q.state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
            //重新渲染表格数据

        initTable()


    })

    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {

                    return layer.msg('获取分类数据失败')
                }
                //渲染分类列表下拉菜单
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                    // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
            const dt = new Date(date)
            var y = dt.getFullYear()
            var m = addZero(dt.getMonth() + 1)
            var d = addZero(dt.getDate())

            var hh = addZero(dt.getHours())
            var mm = addZero(dt.getMinutes())
            var ss = addZero(dt.getSeconds())
            return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
        }
        // 定义补零函数
    function addZero(num) {
        return num > 9 ? num : '0' + num
    }


    // 渲染分页
    function renderPage(total) {

        laypage.render({


            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            limit: q.pagesize, //每页显示的条数

            limits: [2, 3, 5, 7, 10], //每页显示条数的下拉选择框
            curr: q.pagenum, //当前页

            count: total, //数据总数，从服务端得到
            // 分页排版
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            //换页执行的回调函数
            // 执行回调函数的两种情况
            // 1、打开页面渲染页面表格数据时
            // 2、点击页数时
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：

                q.pagenum = obj.curr
                q.pagesize = obj.limit
                    // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    // console.log(obj.limit); //得到每页显示的条数
                    // console.log(q)
                    //首次不执行
                if (!first) {
                    initTable()
                        //do something
                }
            }
        });
    }

    //通过代理的方式， 给删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var Id = $(this).attr('data-id')
            // 获取删除按钮的数量
        var btnNum = $('btn-delete').length
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + Id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg('删除文章数据失败')
                        // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                        // 如果没有剩余的数据了,则让页码值 -1 之后,
                        // 再重新调用 initTable 方法
                    if (btnNum === 1) {
                        q.pagesize = q.pagesize === 1 ? 1 : q.pagesize - 1
                    }
                    layer.msg('删除文章数据成功')
                    initTable()
                }
            })

            layer.close(index);
        });


    })

    //通过代理的方式， 给编辑按钮绑定点击事件
    // $('tbody').on('click', '.btn-edit', function() {
    //     location.href = '../../../article/art_pub.html'
    //     var Id = $(this).attr('data-id')
    //     $.ajax({
    //         method: 'POST',
    //         url: '/my/article/' + Id,
    //         success: function(res) {
    //             if (res.status !== 0) {
    //                 return layer.msg('获取文章失败')
    //             }
    //             //将文章信息渲染到发布文章页
    //             form.val('form-pub', res.data)
    //         }

    //     })

    // })


})