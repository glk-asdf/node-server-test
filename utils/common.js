const fs = require('fs')

/**
 * @desc 获取 json 文件的数据
 * @param url
 * @returns {*}
 */
function getjsonAsync (url) {
  // json 的路径搞不懂
  let data = fs.readFileSync(`./json/${url}.json`)
  return JSON.parse(data.toString())
  // let data = require(`../json/${url}.json`);
  // return data
}

exports.getjsonAsync = getjsonAsync

/**
 * @desc 对象取值安全方法
 * @param {Object} obj 对象
 * @param {Array} arr 多级的键值
 * @returns {*} 取出的值或 ''
 */
function objC (obj, ...arr) {
  if (!arr.length) {
    return ''
  }
  for (let i = 0, l = arr.length; i < l; i++) {
    if (!isObject(obj)) {
      return ''
    }
    obj = obj[arr[i]]
  }
  return notUndefined(obj)
}

exports.objC = objC

/**
 * @desc 判断是否为对象
 * @param {*} obj 被判断的值
 * @returns {boolean} 是否为对象
 */
function isObject (obj) {
  if (typeof obj === 'object' && obj !== null) {
    return true
  }
  return false
}

exports.isObject = isObject

/**
 * @desc 将 undefined 和 nell 改为 ''
 * @param {*} str 需要保障的值
 * @param {*} u 替换的值
 * @returns {string|*} 保障后的值
 */
function notUndefined (str, u) {
  if (u === undefined || u === null) {
    u = ''
  }
  if (!str && str !== 0) {
    return u
  }
  return str
}

exports.notUndefined = notUndefined
