const app = require('../app')
const proxy = require('express-http-proxy')
const url = require('url')

// app.use('/proxy', proxy('www.google.com'));
app.use('/api', proxy('192.168.1.12:8090', {
    // filter选项主要用于筛选哪些请求可以被代理转发，例如，你只想转发post请求
    filter: function (req, res) {
        return req.method == 'POST'
    },
    // forwardPath选项用于在代理请求之前修改路径
    // forwardPath: function (req, res) {
    //     let path = url.parse(req.url).path
    //     path = `/api${path}`
    //     return path
    // },
    // 在请求通过代理转发至目标主机之前，对请求进行处理
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {

        // console.log(Object.keys(srcReq))
        // console.log(Object.keys(proxyReqOpts))
        // console.log(proxyReqOpts.headers)
        // console.log(srcReq.headers)

        // ip
        // console.log(srcReq.ip)
        // ::ffff:192.168.10.42
        let ip = getIp(srcReq.ip)
        proxyReqOpts.headers.ip = ip
        console.log(ip)

        return proxyReqOpts
    }
}))

/**
 *
 * @param str
 * @returns {*|void|string|never}
 */
function getIp(str) {
    if (new RegExp(/(\d+\.\d+\.\d+\.\d+)/).test(str)) {
        return RegExp.$1
    }
    return str.replace('::ffff:', '')
}
