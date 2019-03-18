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
    
    var query = "SELECT S.SERVICE_ID, S.SERVICE_NM, T.TAG_NM, S.SERVICE_IMG FROM serviceInform S INNER JOIN serviceTagInform ST ON S.SERVICE_ID = ST.SERVICE_ID INNER JOIN tagInform T ON ST.TAG_ID = T.TAG_ID WHERE S.STORE_ID = ";
    query += req.query.id;
    
    connection.query(query, function (err, rows, fields) {
        rows.forEach(function (item) {
            var existing1 = output.filter(function (v, i) {
                return v.SERVICE_ID == item.SERVICE_ID;
            });
            if (existing1.length) {
                var existingIndex1 = output.indexOf(existing1[0]);
                if(output[existingIndex1].TAG_NM.indexOf(item.TAG_NM) < 0) {
                    output[existingIndex1].TAG_NM = output[existingIndex1].TAG_NM.concat(item.TAG_NM);
                }
            } else {
                if (typeof item.TAG_NM == 'string')
                    item.TAG_NM = [item.TAG_NM];
                output.push(item);
            }
        });
        res.send(output); // 결과를 출력합니다!
    });
});

module.exports = router;
