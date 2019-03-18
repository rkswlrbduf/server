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
    var output = [];
    var trueOutput = [];
    var query = `SELECT S.STORE_ID, STORE_NM, STORE_M_LCN, STORE_CODE, STORE_DT, T.THEME_ID, T.THEME_NM, STORE_CALL, STORE_B_LCN, STORE_IMG, S.STORE_POINT_X, S.STORE_POINT_Y, (SELECT COUNT(Z.STORE_ID) FROM zzimInform Z WHERE Z.STORE_ID = S.STORE_ID) as COUNT ` +
        `FROM storeInform S INNER JOIN storeThemeInform ST ON S.STORE_ID = ST.STORE_ID INNER JOIN themeInform T ON ST.THEME_ID = T.THEME_ID`;
    var lon = req.query.pointX;
    var lat = req.query.pointY;
    var category = JSON.parse(req.query.categoryArray);
    var theme = JSON.parse(req.query.themeArray);

    if(category.length > 0) {
        query += " WHERE S.CATEGORY_ID IN (";
        for(var i = 0;i<category.length;i++) {
            query += category[i];
            if(category.length-1 != i) {
                query += ", ";
            } else {
                query += ")";
            }
        }
    }
    connection.query(query, function (err, rows, fields) {
        rows.forEach(function (item) {
            var existing = output.filter(function (v, i) {
                return v.STORE_ID == item.STORE_ID;
            });
            if (existing.length) {
                var existingIndex = output.indexOf(existing[0]);
                output[existingIndex].THEME_NM = output[existingIndex].THEME_NM.concat(item.THEME_NM);
                output[existingIndex].THEME_ID = output[existingIndex].THEME_ID.concat(item.THEME_ID);
            } else {
                if (typeof item.THEME_NM == 'string')
                    item.THEME_NM = [item.THEME_NM];
                if (typeof item.THEME_ID == 'number')
                    item.THEME_ID = [item.THEME_ID];
                if(getDistanceFromLatLonInKm(lat, lon, item.STORE_POINT_Y, item.STORE_POINT_X) < 5) {
                    output.push(item);
                }
            }
        });
        if(theme.length>0) {
            for(var i = 0;i<output.length;i++) {
                for(var j = 0;j<theme.length;j++) {
                    if(output[i].THEME_ID.includes(theme[j])) {
                        trueOutput.push(output[i]);
                        break;
                    }
                }
            }
             res.send(trueOutput);
        } else {
            res.send(output);
        }
    });
});

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

module.exports = router;
