var express = require('express');
var router = express.Router();
const multiparty = require('multiparty');

router.post('/upload',function(req,res,next){
	let form=new multiparty.Form({uploadDir:'./public/images'});
    form.parse(req,function(err,fields,files){
        if(err){
            res.send(err);
        }else{
            var filepath=files.file[0].path.substring(files.file[0].path.indexOf("images"));
            res.send(filepath);
        }
    });
});

module.exports = router;