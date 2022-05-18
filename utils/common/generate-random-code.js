// 随机码需要的字符
const codeStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * @description 生成[min,max]的随机整数
 * @param {number} min 
 * @param {number} max 
 * @author taku 
 */
function getRandom(min, max) { // param: (Number, Number)
  // 确保 max 始终大于 min
  if (min > max) {
    var temp = min;
    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}


/**
 * @description 生成n位随机码
 * @param {number} length 
 * @author taku
 */
function getRandomCode(length = 0) {
  let codeStrLength = codeStr.length;
  let randomCode = '';
  for (let i = 0; i < length; i++) {
    let random = getRandom(0, codeStrLength - 1);
    randomCode += codeStr[random];
  }
  return randomCode;
}


module.exports = {
  getRandom,
  getRandomCode
};