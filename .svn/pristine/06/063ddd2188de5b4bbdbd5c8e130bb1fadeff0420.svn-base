var express = require('express');
var router = express.Router();
const hc = require('ykt-http-client');
// 查询影院信息(含分页)
router.get('/info', function(req, res) {
    let obj = {};
    obj.rows = req.query.rows;
    obj.page = req.query.page;
    let value = req.query.value;
    let name = req.query.name;
    if (value) {
        obj[name] = value;
    }
    console.log(obj);
    hc.get('127.0.0.1:8080/cinema/find', obj).then(function(data) {
        res.send(data);
    });
});
// 通过id查询影院信息
router.get('/infoByid', function(req, res) {
    hc.get('127.0.0.1:8080/cinema/find', { _id: req.query._id }).then(function(data) {
        res.send(data);
    });
});
// 通过id删除影院信息
router.post('/del', function(req, res) {
    hc.post('127.0.0.1:8080/cinema/del', { _id: req.body._id }).then(function() {
        res.end();
    });
});
// 修改院线
router.post('/update', function(req, res) {
    console.log(req.body);
    hc.post('127.0.0.1:8080/cinema/update', req.body).then(function() {
        res.end();
    });
});
// 新增院线
router.post('/add', function(req, res) {
    hc.post('127.0.0.1:8080/cinema/add', req.body).then(function() {
        res.end();
    });
});
// 新增放映厅
router.post('/hallAdd', function(req, res) {
    hc.post('127.0.0.1:8080/hall/add', req.body).then(function() {
        res.send(req.body);
    });
});
// 查找放映厅
router.get('/hallInfo', function(req, res) {
    hc.get('127.0.0.1:8080/hall/find', req.query).then(function(data) {
        res.send(data);
    });
});
// 通过id查询放映厅
router.get('/hallInfoByid', function(req, res) {
    hc.get('127.0.0.1:8080/hall/find', {_id:req.query._id}).then(function(data) {
        res.send(data);
    });
});
// 通过id删除放映厅
router.post('/hallDel', function(req, res) {
	console.log(req.body);
    hc.get('127.0.0.1:8080/hall/del', {_id:req.body._id}).then(function() {
        res.end();
    });
});
// 修改放映厅
router.post('/hallUpdate', function(req, res) {
    hc.post('127.0.0.1:8080/hall/update', req.body).then(function() {
        res.end();
    });
});
module.exports = router;