// app
// const express = require('express')
const app = require('./app')
// api
require('./api')
//
const objC = require('./utils/common').objC
// system
const setSystem = require('./system').setSystem
const setBase = require('./system').setBase
// setting
const systemArr = require('./setting').systemArr || []
const systemMain = require('./setting').systemMain || ''


// 设置设个系统
if(objC(systemArr, 'length')){
    for(let i = 0, l = systemArr.length; i < l; i++){
        let system = systemArr[i]
        setSystem(system)
    }
    setBase(systemArr, systemMain)
}else{
    setSystem()
}



app.listen(3000)
