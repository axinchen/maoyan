var express = require('express');
var router = express.Router();
const db=require('ykt-mongo');
const hc=require('ykt-http-client');
// 获取用户信息(分页)
router.get('/info',function(req, res, next){
	let value=req.query.value;
	let name=req.query.name;
	let obj={};
	obj.page=req.query.page;
	obj.rows=req.query.rows;
	if(value){
		obj[name]=value;
	}
	hc.get('127.0.0.1:8080/user/find',obj).then(function(data){
		res.send(data);
	});
});
// 通过id获取用户信息
router.get('/infoByid',function(req, res, next){
	hc.get('127.0.0.1:8080/user/find',{_id:req.query._id}).then(function(data){
		res.send(data);
	});
});
// 增加用户信息
router.post('/add',function(req, res, next){
	let obj=req.body;
	console.log(obj);
	hc.post('127.0.0.1:8080/user/add',obj).then(function(){
		res.end();
	});
});
// 删除用户信息
router.post('/del',function(req,res,next){
	hc.post('127.0.0.1:8080/user/del',{_id:req.body._id}).then(function(){
		res.end();
	});
});
// 修改用户信息
router.post('/update',function(req,res,next){
	hc.post('127.0.0.1:8080/user/update',req.body).then(function(){
		console.log('zz');
		res.end();
	});
});
module.exports = router;