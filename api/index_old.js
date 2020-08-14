const app = require('../app')
const getjsonAsync = require('../utils/common').getjsonAsync
const moduleDict = require('../setting').moduleDict || {}


// test
app.post('/api/test', function (req, res, next) {
    console.log(req.body)
    res.json(req.body)
})

// userLogin
app.post('/api/userLogin', function (req, res) {
    let data = req.body

    let response = {}

    if (data.userName === 'admin') {
        response.token = 'admin'
    }

    res.json(response)
})

// area
app.post('/api/area', function (req, res) {
    res.json(getjsonAsync('area'))
})

// route
app.post('/api/router', function (req, res) {

    // let data = req.body

    console.log('authorization:', req.headers.authorization)
    console.log('menu:', req.headers.menu)

    let token = req.headers.authorization

    let menu = getjsonAsync('menu')

    // 返回已有模块的页面
    // 不分模块时，返回所有菜单
    menu.arr = menu.arr.filter((obj) => moduleDict['static'] || moduleDict[obj.module])

    if (token !== 'admin') {
        menu.code = 'error'
        // 登录页，和登陆成功后需要跳转的主页
        // menu.arr = menu.arr.filter((obj) => obj.url === 'Login' || obj.id === menu.redirect[menu.main])
        // 如果只加了 main 页面，没有子页面，再加时，无法重定向
    }

    // 菜单排序
    menu.arr.sort((a, b) => a.sort - b.sort)

    res.json(menu)
})
