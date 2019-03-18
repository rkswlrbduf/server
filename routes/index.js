var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("HELLO");	  
//  res.render('index', { title: '술깃한제안 RDS' });
});

module.exports = router;
