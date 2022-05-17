let connPool = require('./db-connect-config');

/**
 * @author taku 
 * @description 封装基于mysql库的基本查询，promise格式。
 * 基本单条sql查询，多条sql事务查询
 */
module.exports = class BaseConnQuery{

  // 单条sql查询
  static query(sql = "", params = []){
    return new Promise((resovle, reject)=>{
      connPool.getConnection((err,connection)=>{
        // 获取连接池中连接失败，抛出异常
        if(err){
          console.log('❌---获取连接池中连接出错---');
          return reject(err);
        } 

        // 正常执行sql语句
        connection.query(sql, params, (errors, data, fields)=>{
          // 释放当前连接
          connection.release();

          // sql语句错误，抛出异常
          if(errors){
            console.log('❌---sql语句错误---');
            return reject(errors);
          }

          // 返回成功结果
          return resovle(data);
        })

      })
    });
  }

  // 事务查询
  static transaction(sqls, paramsArr){
    return new Promise((resovle, reject)=>{

      // 如果语句和参数数量不匹配 promise直接返回失败
      if (sqls.length !== paramsArr.length) {
        console.log('❌---sql语句和参数数量不匹配---');
        return reject("语句与传值不匹配");
      }


      connPool.getConnection((err, connection)=>{
        // 获取连接池中连接失败，抛出异常
        if(err){
          console.log('❌---获取连接池中连接出错---');
          return reject(err);
        } 
        
        // 开始事务
        connection.beginTransaction((beginErr)=>{
          // 创建事务失败
          if(beginErr){
            connection.release();
            console.log('❌---创建事务失败---');
            return reject(beginErr);
          }
          console.log("开始执行事务，共将执行" + sqls.length + "条语句");

          let queryArr = sqls.map((item, index)=>{
            return new Promise((_resolve, _reject)=>{
              connection.query(item, paramsArr[index],(errors, data, fields)=>{
                if(errors){
                  return _reject(errors);
                }
                _resolve(data);
              })
            })
          })

          Promise.all(queryArr).then(resultArr=>{
            connection.commit((commitErr, info)=>{
              if(commitErr){
                console.log('❌---提交事务失败，即将回滚---',commitErr);   
                // 提交失败，回滚
                connection.rollback(rollbackErr=>{
                  if(rollbackErr){
                    console.log('❌---回滚失败---',rollbackErr);
                  }else{
                    console.log('❌---提交事务失败，已回滚---');   
                  }
                  connection.release();
                  // 返回提交失败的原因
                  return reject(rollbackErr?rollbackErr:commitErr);
                })
              }
              connection.release();
              // 所有sql执行成功
              return resovle(resultArr);
            })
          }).catch(anySqlErr=>{
            connection.rollback((rollbackErr)=>{
              if(rollbackErr){
                console.log('❌---回滚失败---',rollbackErr);                
              }
              connection.release();
              return reject(rollbackErr?rollbackErr:anySqlErr);
            })
          })
        })
      })
    });
  }
}