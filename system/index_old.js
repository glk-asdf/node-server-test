// app
const express = require('express')
const app = require('../app')
//
const path = require('path')
const getjsonAsync = require('../utils/common').getjsonAsync
const getModules = require('../utils/module-conf').getModules

/**
 * @desc 设置系统路由和静态资源
 * @param {String} system 系统根目录 '/bdp'
 * @param {String} mainModule 主模块 'main'
 */
function setSystem (system = '', mainModule = '') {
    console.log(system)

    // 模块
    const {moduleList, moduleDict} = getModules(system)
    console.log(moduleList)

    // 主模块
    let main = getMain(mainModule, moduleList, moduleDict)

    // dirname
    // console.log(__dirname)
    let dirname = path.resolve(__dirname, `../`)
    // console.log(dirname)

    // 判断是否未分模块
    if(!main || moduleDict['static']){

        console.log('未分模块')

        // 静态文件
        app.use(`${system}/static`, express.static(`${dirname}/webApp${system}/static`))

        // index.html
        let router = express.Router()
        router.get(`*`, function (req, res) {
            res.sendFile(`${dirname}/webApp${system}/index.html`)
        })
        app.use(system, router)
    }else{

        // 重定向
        app.get(`${system}/`, function (req, res) {
            res.redirect(`${system}/${main}/`)
        })

        // 静态文件和 index.html 重定向
        for (let i = 0, l = moduleList.length; i < l; i++) {
            let module = '/' + moduleList[i]
            // 静态文件
            app.use(`${system + module}/static`, express.static(`${dirname}/webApp${system + module}/static`))

            // index.html
            let router = express.Router()
            router.get(`*`, function (req, res) {
                res.sendFile(`${dirname}/webApp${system + module}/index.html`)
            })
            app.use(system + module, router)
        }

        // 其他的路径跳转登录
        let router = express.Router()
        router.get(`*`, function (req, res) {
            res.sendFile(`${dirname}/webApp${system}/base/index.html`)
        })
        app.use(system, router)
    }
}

/**
 * @desc 获取正确的主模块
 * @param main
 * @returns {string|*}
 */
function getMain(main, moduleList, moduleDict) {

    let menu = getjsonAsync('menu')
    main = main || menu.main

    if (moduleDict[main]) {
        return main
    }
    for (let i = 0, l = moduleList.length; i < l; i++) {
        let item = moduleList[i]
        if (item !== 'base' && menu.redirect[item]) {
            return item
        }
    }
    return moduleDict['base'] ? base : ''
}

exports.setSystem = setSystem
