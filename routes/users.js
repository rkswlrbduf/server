var express = require('express');
var router = express.Router();
var mysql = require("mysql"); // mysql 모듈을 불러옵니다.

var connection = mysql.createConnection({
  host: "soolgitdb.cbez9w0oetpz.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "rbduf123",
  database: "Soolgit"
});

// RDS에 접속합니다.
connection.connect(function(err) {
  if (err) {
    throw err; // 접속에 실패하면 에러를 throw 합니다.
  } else {
    // 접속시 쿼리를 보냅니다.
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    connection.query("SELECT * FROM storeInform where id=\'" + req.query.id + "\'", function(err, rows, fields) {
      res.send(rows); // 결과를 출력합니다!
    });
});

module.exports = router;
