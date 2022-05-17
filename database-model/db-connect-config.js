let mysql = require('mysql');

let connPool = mysql.createPool({
  'host':'localhost',
  'user':'root',
  'password': "root",
  'database': "image_hosting",
  'port':3306,
  'timezone': "SYSTEM",
});

// 连接池状态确认
connPool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});
connPool.on('connection', function (connection) {
  connection.query('SET SESSION auto_increment_increment=1')
});
connPool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});
connPool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

module.exports = connPool;