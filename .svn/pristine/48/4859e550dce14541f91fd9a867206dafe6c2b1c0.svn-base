var express = require('express');
var router = express.Router();
const hc = require('ykt-http-client');

//显示&搜素
router.get("/show",function(req,res,next){
    let type = req.query.type;
    let value = req.query.value;
    let obj = {};
    obj.page =req.query.page;
    obj.rows= req.query.rows;
    obj.isShowing = req.query.isShowing;
    obj.isUpcoming = req.query.isUpcoming;
    obj.isBroadcast = req.query.isBroadcast;
    if (type){
        obj[type]=value;
    }
    hc.get("localhost:8080/movie/find",obj).then(function(data){
        res.send(data);
    })

});
//增加
router.get("/add",function(req,res,next){
    //let name = req.query.name;
    //let englishName=req.query.englishName;
    //let type=req.query.type;
    //let point =req.query.point
    //let performer =req.query.performer
    //let want =req.query.want
    //let area =req.query.area
    //let year =req.query.year
    //let time =req.query.time
    //let releaseTime =req.query.releaseTime
    //let boxOffice =req.query.boxOffice
    //let synopsis =req.query.synopsis
    //let director =req.query.director
    //let topUrl = req.query.topUrl
    //let dirName = req.query.dirName
    //let movieActor =  req.query.movieActor
    //let actorName =req.query.actorName
    //let images = req.query.images
    let obj =JSON.parse(req.query.obj);
    let imgs = JSON.parse(req.query.imgs);
    obj.isShowing = "false";
    obj.isUpcoming = "false";
    obj.isBroadcast = "false";

    //let isShowing = "false"
    //let isUpcoming = "false"
    //let isBroadcast = "false"
console.log(typeof director);
    hc.get("localhost:8080/movie/add",obj,imgs).then(function(data){
        res.send(data);
    })
})

//name,englishName,type,point,performer,want,area,year,time,releaseTime,boxOffice,synopsis,director,dirName,topUrl,movieActor,actorName,images,isShowing,isUpcoming,isBroadcast
//删除
router.get("/del",function(req,res,next){
    let _id = req.query._id;
    console.log(_id);
   hc.get("localhost:8080/movie/del",{_id}).then(function(){
       res.send("ok");
   })
})

//修改获取值
router.get("/updateShow",function(req,res,next){
    let _id = req.query._id;
    console.log(_id);
    hc.get("localhost:8080/movie/find",{_id}).then(function(date){
        res.send(date);
    })
})
//修改值
router.get("/update",function(req,res,next){
    let _id = req.query._id;
    let name = req.query.name;
    let englishName=req.query.englishName;
    let type=req.query.type;
    let point =req.query.point
    let performer =req.query.performer
    let want =req.query.want
    let area =req.query.area
    let year =req.query.year
    let time =req.query.time
    let releaseTime =req.query.releaseTime
    let boxOffice =req.query.boxOffice
    let synopsis =req.query.synopsis
    let dirName =req.query.dirName
    let director = req.query.director
    let topUrl =req.query.topUrl
    hc.get("localhost:8080/movie/update",req.query).then(function(data){
        res.send(data);
    })
    //db.collection("students").update({_id:db.ObjectID(_id)},{name:name,age:age,gender:gender},function(data){
    //    res.send(data);
    //})
})
module.exports = router;