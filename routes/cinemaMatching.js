var express = require('express');
var router = express.Router();
const hc=require('ykt-http-client');

//cinemaMatching集合存储主页面数据，数据结构：电影id、电影名、英文名、类型、时长
//CM集合用于存储电影与院线的对应数据，数据结构：电影id、院线id、院线名
//CMHT集合用于存储电影、院线与放映厅的对应数据，数据结构：上映时间date、放映时间startTime、价格price、电影id、院线id、放映厅id、时长、座位、放映厅名

//主页显示数据路由
router.get("/show",function(req,res,next){
	let value=req.query.value;
	let type=req.query.type;
	let page=req.query.page;
	let rows=req.query.rows;
	let obj={page,rows};
	if(type){
		obj[type]=value;
	}
	hc.get("127.0.0.1:8080/cinemaMatching/find",obj).then(function(data){
	    res.send(data);
	});
});

//显示所有未排片电影
router.get("/showAll",function(req,res,next){
	let page=req.query.page;
	let rows=req.query.rows;
	hc.get("127.0.0.1:8080/movie/find",{page,rows,isSchedule:"false"}).then(function(data){
	    res.send(data);
	});
});

//删除电影排片
router.post("/delM",function(req,res,next){
	let ids=JSON.parse(req.body.ids);
	let movieIDs=JSON.parse(req.body.movieIDs);
	if(ids.length>1){
		hc.post("127.0.0.1:8080/cinemaMatching/del",{ids}).then(function(){});
	}else{
		let _id=ids[0];
		hc.post("127.0.0.1:8080/cinemaMatching/del",{_id}).then(function(){});
	}
	for(let movieID of movieIDs){
		hc.post("127.0.0.1:8080/movie/update",{_id:movieID,isSchedule:"false"}).then(function(){});
		hc.post("127.0.0.1:8080/CM/del",{movieID}).then(function(){});
		hc.post("127.0.0.1:8080/CMHT/del",{movieID}).then(function(){});
	}
	res.send("ok");
});

//向CM集合中新增数据
router.post("/add",function(req,res,next){
	let data=JSON.parse(req.body.data);
	for(let obj of data){
		//修改电影排片属性
		hc.post("127.0.0.1:8080/movie/update",{_id:obj.movieID,isSchedule:"true"}).then(function(){});
		hc.post("127.0.0.1:8080/cinemaMatching/add",obj).then(function(){});
	}
	res.send("ok");
});

//增加院线显示路由
router.post("/showCin",function(req,res,next){
	let page=req.body.page;
	let rows=req.body.rows;
	let cinArr=JSON.parse(req.body.cinArr);
	//从院线集合中获取数据
	hc.post("127.0.0.1:8080/cinema/find",{page,rows}).then(function(data){
		res.send(showData(data));
	});
	//得到未排片院线数据
	let showData=function(data){
		for(let cin of cinArr){
			for(let i in data.rows){
				if(cin==data.rows[i]._id){
					data.rows.splice(i,1);
					data.total--;
				}
			}
		}
		return data;
	}
});

//通过电影ID获取已添加院线
router.get("/getScheduleCin",function(req,res,next){
	let movieID=req.query.movieID;
	hc.get("127.0.0.1:8080/CM/find",{movieID}).then(function(data){
	    res.send(data);
	});
});

//往CM中添加数据
router.post("/addCin",function(req,res,next){
	hc.post("127.0.0.1:8080/CM/add",req.body).then(function(data){
		res.send("ok");
	});
});

//显示已排片院线
router.post("/showCinAll",function(req,res,next){
	let page=req.body.page;
	let rows=req.body.rows;
	let movieID=req.body.movieID;
	hc.post("127.0.0.1:8080/CM/find",{page,rows,movieID}).then(function(data){
	    res.send(data);
	});
	// let showData=function(data){
	// 	for(let i=0;i<data.rows.length;i++){
	// 		for(let j=i+1;j<data.rows.length;j++){
	// 			if(data.rows[i].cinemaID==data.rows[j].cinemaID){
	// 				data.rows.splice(j,1);
	// 				j--;
	// 			}
	// 		}
	// 	}
	// 	return data;
	// }
});

//获取对应院线id的所有放映厅
router.get("/showHallAll",function(req,res,next){
	let page=req.query.page;
	let rows=req.query.rows;
	let cinemaId=req.query.cinemaID;
	hc.get("127.0.0.1:8080/hall/find",{page,rows,cinemaId}).then(function(data){
		console.log('data',data);
	    res.send(data);
	});
});

router.post("/delCin",function(req,res,next){
	let objArr=JSON.parse(req.body.objArr);
	for(let obj of objArr){
		hc.post("127.0.0.1:8080/CM/del",obj).then(function(){});
		hc.post("127.0.0.1:8080/CMHT/del",obj).then(function(){});
	}
	res.send("ok");
});

router.post("/addShow",function(req,res,next){
	hc.post("127.0.0.1:8080/CMHT/add",req.body).then(function(){
		res.send("ok");
	});
});

router.get("/getHallInfo",function(req,res,next){
	let _id=req.query.hallID;
	hc.get("127.0.0.1:8080/hall/find",{_id}).then(function(data){
		res.send(data);
	});
});

router.get("/findM",function(req,res,next){
	let _id=req.query.movieID;
	hc.get("127.0.0.1:8080/movie/find",{_id}).then(function(data){
		res.send(data);
	});
});

router.post("/getOccupyTiem",function(req,res,next){
	hc.post("127.0.0.1:8080/CMHT/find",req.body).then(function(data){
		res.send(data);
	});
});

router.post("/addSchedule",function(req,res,next){
	hc.post("127.0.0.1:8080/CMHT/add",req.body).then(function(data){
		res.send("ok");
	});
});

router.get("/showHall",function(req,res,next){
	hc.get("127.0.0.1:8080/CMHT/find",req.query).then(function(data){
		res.send(data);
	});
});

//删除放映厅排片
router.post("/delHall",function(req,res,next){
	let ids=JSON.parse(req.body.ids);
	if(ids.length>1){
		hc.post("127.0.0.1:8080/CMHT/del",{ids}).then(function(){});
	}else{
		let _id=ids[0];
		hc.post("127.0.0.1:8080/CMHT/del",{_id}).then(function(){});
	}
});

//修改场次信息
router.post("/updateHall",function(req,res,next){
	hc.post("127.0.0.1:8080/CMHT/update",req.body).then(function(data){
		res.send("ok");
	});
});

module.exports = router;