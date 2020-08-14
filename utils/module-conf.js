// let chalk = require('chalk')
let glob = require('glob')

/**
 * @desc 获取当前系统下的模块
 * @param root 系统根目录
 */
function getModules(root = ''){
  // 获取所有的moduleList
  let moduleList = []
  let moduleDict = {}
  let moduleSrcArray = glob.sync(`./webApp${root}/*`)
  // let reg = new RegExp('.vue')
  for (let x in moduleSrcArray) {
    let arr = moduleSrcArray[x].split('/')
    let directory = arr[arr.length - 1]
    // if (reg.test(directory)) {
    //   continue
    // }
    moduleList.push(directory)
    moduleDict[directory] = true
  }

  return {
    moduleList,
    moduleDict
  }
}

exports.getModules = getModules
