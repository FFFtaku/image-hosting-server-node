let { action } = require('../middleware/state-management');

module.exports = () => {
  let registerAuthCodeSession = action.getState('registerAuthCodeSession');
  setInterval(() => {
    let nowTime = Date.now();
    for (let key in registerAuthCodeSession) {
      let { codes, timeout } = registerAuthCodeSession[key];
      let len = timeout.length;
      let i = len - 1;

      // 反向遍历数组，如果某一个验证码超时，那么位于它之前的都已经超时，因此得到结果直接跳出循环
      for (; i >= 0; i--) {
        if ((nowTime - timeout[i]) > 180000) {
          break;
        }
      }
      // 切割数组保留有效的验证码
      codes.splice(0, i + 1);
      timeout.splice(0, i + 1);

      // 如果一个邮箱对应的已经没有任何验证码了，直接删除该邮箱数据
      if (codes.length === 0 || timeout === 0) {
        delete registerAuthCodeSession[key];
      }
    }

    // 30分钟检查一次验证码缓存
  }, 1800000);
}