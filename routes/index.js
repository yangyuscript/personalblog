var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.error="";
  req.session.tip="";
  req.session.getArticlesTip="";
  res.render('index');
});

router.post('/regist',function(req,res,next){
  var user=global.dbHandel.getModel('user');
  var account=req.body.account_regist;
  var password=req.body.password_regist;
  user.findOne({name:account},function(err,doc){
    if(err){
      req.session.error='网络异常错误!';
      console.log(err);
      res.send(500);
    }else if(doc){
      req.session.error='用户名已存在！';
      res.redirect('/');
    }else{
      user.create({
        name:account,
        password:password
      },function(err,doc){
        if(err){
          res.send(500);
          console.log(err);
        }else{
          req.session.error='用户名创建成功!';
          res.redirect('/');
        }
      });
    }
  });
  //res.render('index',{userName: account});
});

router.post('/login',function(req,res,next){
  var article=global.dbHandel.getModel('article');
  article.find({},function(err,docs){
    req.session.articles=docs;
    console.log("fuck"+req.session.articles.length);
  });
  var user=global.dbHandel.getModel('user');
  var account=req.body.account_login;
  user.findOne({name:account},function(err,doc){
    if(err){
      res.send(500);
      console.log(err);
    }else if(!doc){
      req.session.error='用户名不存在';
      res.redirect('/');
    }else{
      if(req.body.password_login!=doc.password){
        req.session.error="密码错误";
        return res.redirect('/');
      }else{
        req.session.user=doc;
        return res.redirect('/');
      }
    }
  });
});
router.get('/logout',function(req,res,next){
  req.session.user=null;
  req.session.articles=null;
  return res.redirect('/');
});

router.post('/addArticle',function(req,res,next){
  if(!req.session.user){
    req.session.tip="请登录后再发博文!";
    res.redirect('/');
  }else{
    console.log("进来阿里"+req.session.articles.length);
    var article=global.dbHandel.getModel('article');
    var title=req.body.title;
    var content=req.body.content;
    article.create({title:title,content:content},function(err,doc){
      if(err){
        res.send(500);
        console.log(err);
      }else{
        article.find({},function(err,docs){
          req.session.articles=docs;
          req.session.save();
          console.log("增加文章之后在查找所有文章"+req.session.articles.length);
        });
        res.redirect('/');
      }
    });
  }
});

module.exports = router;
