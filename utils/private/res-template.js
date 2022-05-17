const restfulStatusCode = require('../../config/restful-status-code');

module.exports = class ResTemplate {
  static restfulStatusCode = restfulStatusCode;

  static resTemplateByJson(statusCode, data, message) {
    // statusCode不存在，返回默认值
    if(!statusCode){
      return {
        'status': restfulStatusCode['SERVER_ERROR'],
        'message': '未知错误',
        'data': null
      }
    }
    // 200->调用成功
    if (statusCode === restfulStatusCode['SUCCESS']) {
      return {
        'status': statusCode,
        'message': message?message:'调用成功',
        'data': data?data:null
      }
    }
    // 404->资源未找到
    if(statusCode === restfulStatusCode['NOT_FOUND']){
      return {
        'status': statusCode,
        'message': message?message:'未找到资源',
        'data': data?data:null
      }
    }
    // 10000->操作失败
    if(statusCode === restfulStatusCode['OPERATION_FAILURE']){
      return {
        'status': statusCode,
        'message': message?message:"操作失败",
        'data': data?data:null
      }
    }
    // 10001->身份失效
    if(statusCode === restfulStatusCode['IDENTITY_FAILURE']){
      return {
        'status': statusCode,
        'message': message?message:'身份失效',
        'data': data?data:null
      }
    }
    // 20000->服务器内部错误，操作错误
    if(statusCode === restfulStatusCode['SERVER_ERROR']){
      return {
        'status': statusCode,
        'message': message?message:'操作或服务器内部错误',
        'data': data?data:null
      }
    }
    // 20001->接口参数错误
    if(statusCode === restfulStatusCode['API_PARAMETER_ERROR']){
      return {
        'status': statusCode,
        'message': message?message:'参数错误',
        'data': data?data:null
      }
    }
  }
}