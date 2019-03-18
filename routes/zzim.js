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
    var createQuery = `INSERT INTO zzimInform(STORE_ID, USER_KEY) values('${req.query.storeID}', '${req.query.userID}')`;
    var deleteQuery = `DELETE FROM zzimInform WHERE USER_KEY = '${req.query.userID}'`;
    if(req.query.checked == 'true') {
        connection.query(createQuery, function (err, rows, fields) {
            console.log(createQuery);
        });
    } else {
        connection.query(deleteQuery, function (err, rows, fields) {
            console.log(deleteQuery);
        });
    }
});

module.exports = router;