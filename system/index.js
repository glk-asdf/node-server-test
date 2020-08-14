// app
const express = require('express')
const app = require('../app')
//
const path = require('path')

/**
 * @desc 设置系统路由和静态资源
 * @param {String} system 系统根目录 '/bdp'
 */
function setSystem (system = '') {
    console.log(system)


    // dirname
    // console.log(__dirname)
    let dirname = path.resolve(__dirname, `../`)
    // console.log(dirname)


    // 静态文件
    app.use(`${system}/static`, express.static(`${dirname}/webApp${system}/static`))

    // index.html
    let router = express.Router()
    router.get(`*`, function (req, res) {
        res.sendFile(`${dirname}/webApp${system}/index.html`)
    })
    app.use(system, router)
}

function setBase (systemArr, systemMain) {

    if (!systemArr || systemArr.length <= 0) {
        return
    }

    if (!systemMain) {
        systemMain = systemArr[0]
    }

    let router = express.Router()
    router.get(`/`, function (req, res) {
        res.redirect(systemMain)
    })
    app.use('/', router)

}

exports.setSystem = setSystem
exports.setBase = setBase
