// 无论是get、post、还是ajax请求，都需要先经过ajaxPrefilter

$.ajaxPrefilter(function(options) {
    // 统一拼接根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
        // console.log(options.url)
        // 统一为需要权限接口的添加Authorization属性
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载 complete 回调函数
    options.complete = function(res) {
        // console.log(res)
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token存储
            localStorage.removeItem('token')
                // 强制回到登录页面
            location.href = '/login.html'
        }
    }


})