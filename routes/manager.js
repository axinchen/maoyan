var express = require('express');
var router = express.Router();
const hc=require('ykt-http-client');

router.get("/validateManager",function(req, res, next){
  let name = req.query.name;
  hc.get("localhost:8080/managers/find",{name,findType:"exact"}).then(function(data){
    if(data.length > 0){
      res.send("fail");
    }else{
      res.send("ok");
    }
  });
});

router.get("/loginValidate",function(req, res, next){
  let name = req.query.name;
  let pwd = req.query.pwd;
  hc.get("127.0.0.1:8080/managers/find",{name,findType:"exact"}).then(function(data){
    if(data.length > 0){
      if(data[0].pwd==pwd){
        req.session.manager=data[0];
        res.send("ok");
      }else{
        res.send("phoneOk");
      }
    }else{
      res.send("phoneFail");
    }
  });
});

router.get("/getSession",function(req, res, next){
  let manager= req.session.manager;
  if(!manager || !manager.name){
    manager={};
  }
  res.send(manager);
});

router.get("/delSession",function(req,res,next){
  req.session.manager=null;
  res.send("ok");
});

router.post("/alter",function(req, res, next){
  let name = req.body.name;
  let pwd = req.body.pwd;
  let _id = req.body._id;
  hc.get("localhost:8080/managers/update",{_id,name,pwd}).then(function(data){
    res.send("ok");
  });
});

module.exports = router;