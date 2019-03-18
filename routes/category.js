var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var query = "SELECT * FROM categoryInform";

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
    connection.query(query, function (err, rows, fields) {
        res.send(rows);
    });
});

module.exports = router;
