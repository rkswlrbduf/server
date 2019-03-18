var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hotplaceRouter = require('./routes/hotplace');
//var testRouter = require('./routes/test');
var dongRouter = require('./routes/dong');
var storeRouter = require('./routes/store');
var mapRouter = require('./routes/map');
var storeDongRouter = require('./routes/storedong');
var searchRouter = require('./routes/search');
var storeNoImageMenuRouter = require('./routes/storenoimagemenu');
var storeImageMenuRouter = require('./routes/storeimagemenu');
// var storeImageRouter = require('./routes/storeimage');
var storePlaceRouter = require('./routes/storeplace');
var storeServiceRouter = require('./routes/storeservice');
var noticeRouter = require('./routes/notice');
var creatUserRouter = require('./routes/createuser');
var recommendRouter = require('./routes/recommend');
var themeRouter = require('./routes/theme');
var conceptRouter = require('./routes/concept');
var storeDetailRouter = require('./routes/storedetail');
var categoryRouter = require('./routes/category');
var zzimRouter = require('./routes/zzim');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
// port setup
app.set('port', process.env.PORT || 9000);
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hotplace', hotplaceRouter);
//app.use('/test', testRouter);
app.use('/dong', dongRouter);
app.use('/store', storeRouter);
app.use('/map', mapRouter);
app.use('/storedong', storeDongRouter);
app.use('/search', searchRouter);
app.use('/storenoimagemenu', storeNoImageMenuRouter);
// app.use('/storeimage', storeImageRouter);
app.use('/storeimagemenu', storeImageMenuRouter);
app.use('/storeplace', storePlaceRouter);
app.use('/storeservice', storeServiceRouter);
app.use('/notice', noticeRouter);
app.use('/createuser', creatUserRouter);
app.use('/theme', themeRouter);
app.use('/concept', conceptRouter);
app.use('/storedetail', storeDetailRouter);
app.use('/recommend', recommendRouter);
app.use('/category', categoryRouter);
app.use('/zzim', zzimRouter);

// catch 404 and forward to error handler!!!!!
app.use(function(req, res, next) {
  //next(createError(404));
});

// error handler
//app.use(function(err, req, res, next) {
  // set locals, only providing error in development
//  res.locals.message = err.message;
//  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
//  res.status(err.status || 500);
//  res.render('error');
//});

module.exports = app;

var server = app.listen(app.get('port'), function() {
	console.log('Express Server Listening On Port ' + server.address().port);
});
