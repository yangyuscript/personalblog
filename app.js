var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var multer=require('multer');
var mongoose=require('mongoose');

//session
var session=require('express-session');

var app = express();


global.dbHandel=require('./database/dbHandel');
global.db=mongoose.connect("mongodb://localhost:27017/db_blog");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session setting
app.use(session({
  secret: 'secret',
  name:'blog',
  cookie:{
    maxAge: 1000*60*30
  },
  resave:true,
  saveUninitialized:true
}));
app.use(function(req,res,next){
  res.locals.user = req.session.user;   // 从session 获取 user对象
  res.locals.articles=req.session.articles;
  var err = req.session.error;   //获取错误信息
  var tip=req.session.tip;
  var getArticlesTip=req.session.getArticlesTip;
  delete req.session.error;
  res.locals.message = "";   // 展示的信息 message
  res.locals.tip='';
  res.locals.getArticlesTip='';
  if(err){
    res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
  }
  if(tip){
    res.locals.tip='<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+tip+'</div>';
  }
  if(getArticlesTip){
    res.locals.getArticlesTip='<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+getArticlesTip+'</div>';
  }
  next();  //中间件传递
});

app.use('/', index);
app.use('/login',index);
app.use('/regist',index);
app.use('/logout',index);
app.use('/addArticle',index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//database setting
app.use(bodyParser.urlencoded({extended:true}));
//app.use(multer());
//app.use(cookieParser());

module.exports = app;
