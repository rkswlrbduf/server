var express = require('express');
var router = express.Router();
var mysql = require("mysql"); // mysql 모듈을 불러옵니다.
var query = "SELECT S.STORE_ID, STORE_NM, STORE_LCN, STORE_TIME, STORE_CALL, STORE_TYPE, STORE_TYPE, STORE_CODE, STORE_DONG, STORE_DT, T.THEME_ID, T.THEME_NM FROM storeInform S INNER JOIN storeThemeInform ST ON S.STORE_ID = ST.STORE_ID INNER JOIN themeInform T ON ST.THEME_ID = T.THEME_ID";

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
	var output = [];
	connection.query(query, function(err, rows, fields) {
		rows.forEach(function(item) {
			var existing = output.filter(function(v, i) {
				return v.STORE_ID == item.STORE_ID;
			});
			if(existing.length) {
				var existingIndex = output.indexOf(existing[0]);
				output[existingIndex].THEME_NM = output[existingIndex].THEME_NM.concat(item.THEME_NM);
				output[existingIndex].THEME_ID = output[existingIndex].THEME_ID.concat(item.THEME_ID);
			} else {
				if(typeof item.THEME_NM == 'string')
					item.THEME_NM = [item.THEME_NM];
				if(typeof item.THEME_ID == 'number')
					item.THEME_ID = [item.THEME_ID];
				output.push(item);
			}
		});
		res.send(output); // 결과를 출력합니다!
	});
});

module.exports = router;
