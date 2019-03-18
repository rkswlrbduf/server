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
    var output;

    var query = "SELECT DISTINCT S.STORE_ID, S.STORE_NM, S.STORE_B_LCN, S.STORE_TIME, S.STORE_CALL, T.THEME_ID, T.THEME_NM, SI.IMG_ID, SI.IMG_PATH FROM storeInform S INNER JOIN storeImageInform SI ON S.STORE_ID = SI.STORE_ID INNER JOIN storeThemeInform ST ON S.STORE_ID = ST.STORE_ID INNER JOIN themeInform T ON ST.THEME_ID = T.THEME_ID WHERE S.STORE_ID = ";
    query += req.query.id;
    
    connection.query(query, function (err, rows, fields) {
        
        rows.forEach(function (item) {
            if(output == null) {
                item.THEME_ID = [item.THEME_ID];
                item.THEME_NM = [item.THEME_NM];
                item.IMG_ID = [item.IMG_ID];
                item.IMG_PATH = [item.IMG_PATH];
                output = item;
            } else {
                if(output.THEME_ID.indexOf(item.THEME_ID) < 0) {
                    output.THEME_ID = output.THEME_ID.concat(item.THEME_ID);
                    output.THEME_NM = output.THEME_NM.concat(item.THEME_NM);
                }
                if(output.IMG_ID.indexOf(item.IMG_ID) < 0) {
                    output.IMG_ID = output.IMG_ID.concat(item.IMG_ID);
                    output.IMG_PATH = output.IMG_PATH.concat(item.IMG_PATH);
                }
            }
        });
        res.send(output);
    });

});

module.exports = router;
