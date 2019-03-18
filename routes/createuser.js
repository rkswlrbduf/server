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

router.post('/', function (req, res, next) {
    var selectQuery = `SELECT USER_KEY FROM userInform WHERE USER_KEY = ${req.body.id}`
    var createQuery = `INSERT INTO userInform(USER_KEY, USER_NM, USER_IMG, USER_TYPE, USER_MAIL, USER_COST) values('${req.body.id}', '${req.body.name}', '${req.body.profileUrl}', '${req.body.type}', '${req.body.email}', 0)`;
    var updateQuery = `UPDATE userInform SET USER_NM = '${req.body.name}', USER_IMG = '${req.body.profileUrl}', USER_TYPE = '${req.body.type}', USER_MAIL = '${req.body.email}' WHERE USER_KEY = '${req.body.id}'`;
    connection.query(selectQuery, function(err, rows, fields) {
        if(rows.length == 0) {
            connection.query(createQuery, function (err, rows, fields) {
                res.send(rows);
            });
        } else {
            connection.query(updateQuery, function (err, rows, fields) {
                res.send(rows);
            });
        }
    });
});

module.exports = router;