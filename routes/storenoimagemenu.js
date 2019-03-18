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
    /**
     * 아래 부분 데이터 추가시 활성화
     */
    //query += req.query.id;
    var query = "SELECT DISTINCT MENU_IMG_PATH, MENU_IMG_ID, MENU_NM, MENU_COST FROM menuInform WHERE STORE_ID = ";
    // var query = "SELECT DISTINCT S.STORE_ID, S.STORE_NM, S.STORE_B_LCN, S.STORE_TIME, S.STORE_CALL, I.IMG_ID, I.IMG_PATH, T.THEME_ID, T.THEME_NM, M.MENU_NM, M.MENU_COST FROM storeInform S INNER JOIN storeImageInform I ON S.STORE_ID = I.STORE_ID INNER JOIN storeThemeInform ST ON S.STORE_ID = ST.STORE_ID INNER JOIN themeInform T ON ST.THEME_ID = T.THEME_ID INNER JOIN menuInform M ON M.STORE_ID = S.STORE_ID WHERE S.STORE_ID = ";
    query += req.query.id;
    // query += "1";
    // console.log(query);
    // connection.query(query, function (err, rows, fields) {
    //     rows.forEach(function (item) {
    //         var existing1 = output.filter(function (v, i) {
    //             return v.STORE_ID == item.STORE_ID;
    //         });
    //         if (existing1.length) {
    //             var existingIndex1 = output.indexOf(existing1[0]);
    //             if(output[existingIndex1].IMG_ID.indexOf(item.IMG_ID) < 0) {
    //                 output[existingIndex1].IMG_ID = output[existingIndex1].IMG_ID.concat(item.IMG_ID);
    //                 output[existingIndex1].IMG_PATH = output[existingIndex1].IMG_PATH.concat(item.IMG_PATH);
    //             }
    //             if(output[existingIndex1].THEME_NM.indexOf(item.THEME_NM) < 0) {
    //                 output[existingIndex1].THEME_NM = output[existingIndex1].THEME_NM.concat(item.THEME_NM);
    //             }
    //             if(output[existingIndex1].THEME_ID.indexOf(item.THEME_ID) < 0) {
    //                 output[existingIndex1].THEME_ID = output[existingIndex1].THEME_ID.concat(item.THEME_ID);
    //             }
    //             if(output[existingIndex1].MENU_NM.indexOf(item.MENU_NM) < 0) {
    //                 output[existingIndex1].MENU_NM = output[existingIndex1].MENU_NM.concat(item.MENU_NM);
    //                 output[existingIndex1].MENU_COST = output[existingIndex1].MENU_COST.concat(item.MENU_COST);
    //             }
    //             // if(output[existingIndex1].IMG_ID == item.IMG_ID) {
    //             //     output[existingIndex1].IMG_ID = output[existingIndex1].IMG_ID.concat(item.IMG_ID);
    //             // }
    //         } else {
    //             if (typeof item.THEME_NM == 'string')
    //                 item.THEME_NM = [item.THEME_NM];
    //             if (typeof item.THEME_ID == 'number')
    //                 item.THEME_ID = [item.THEME_ID];
    //             if (typeof item.IMG_PATH == 'string')
    //                item.IMG_PATH = [item.IMG_PATH];
    //             if (typeof item.IMG_ID == 'number')
    //                 item.IMG_ID = [item.IMG_ID];
    //             if (typeof item.MENU_NM == 'string')
    //                 item.MENU_NM = [item.MENU_NM];
    //             if (typeof item.MENU_COST == 'string')
    //                 item.MENU_COST = [item.MENU_COST];
    //             output.push(item);
    //         }
    //     });
    connection.query(query, function (err, rows, fields) {
        var existing = rows.filter(function (v, i) {
            return v.MENU_IMG_ID == null;
        });
        res.send(existing); // 결과를 출력합니다!
    });
});

module.exports = router;
