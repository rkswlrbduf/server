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
connection.connect(function (err) {
    if (err) {
        throw err; // 접속에 실패하면 에러를 throw 합니다.
    } else {
        // 접속시 쿼리를 보냅니다.
    }
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    var output = [];

    var query = "SELECT DISTINCT MENU_IMG_PATH, MENU_IMG_ID, MENU_NM, MENU_COST FROM menuInform WHERE STORE_ID = ";
    query += req.query.id;

    connection.query(query, function (err, rows, fields) {
        var existing = rows.filter(function (v, i) {
            return v.MENU_IMG_ID != null;
        });
        res.send(existing);
    });
    
});

module.exports = router;