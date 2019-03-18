var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "soolgitdb.cbez9w0oetpz.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    password: "rbduf123",
    database: "Soolgit"
});

connection.connect(function (err) {
    if (err) {
        throw err;
    } else {
        
    }
});

router.get('/', function (req, res, next) {
    var query = "SELECT STORE_ID, STORE_NM, STORE_CALL, STORE_B_LCN, STORE_POINT_X, STORE_POINT_Y, STORE_IMG FROM storeInform WHERE STORE_POINT_Y >= " + req.query.dy +
    " AND STORE_POINT_Y <= " + req.query.ty +" AND STORE_POINT_X >= " + req.query.lx + " AND STORE_POINT_X <= " + req.query.rx
    connection.query(query, function (err, rows, fields) {
        res.send(rows);
    });
});

module.exports = router;