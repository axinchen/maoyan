export default function(){
    $('#movie_dg').datagrid({
        fit:true,
        fitColumns:true,
        pagination: true,
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 20, 30],
        url: '/movie/show',
        method: "get",
        columns: [[
            {field:'number',title:' ',checkbox:true,align: 'center',width:100},
            {field: 'name', title: '电影名', align: 'center',width: 100},
            {field: 'englishName', title: '英文电影名', align: 'center',width: 100},
            {field: 'type', title: '类型', align: 'center',width: 100},
            {field: 'point', title: '电影评分', align: 'center',width: 100},
            {field: 'actorName', title: '演员', align: 'center',width: 100},
            {field: 'want', title: '想看', align: 'center',width: 100},
            {field: 'area', title: '区域', align: 'center',width: 100},
            {field: 'year', title: '年代', align: 'center',width: 100},
            {field: 'time', title: '时长', align: 'center',width: 100},
            {field: 'releaseTime', title: '上映时间', align: 'center',width: 100},
            {field: 'boxOffice', title: '票房', align: 'center',width: 100},
            {field: 'synopsis', title: '简介', align: 'center',width: 100},
            {field: 'dirName', title: '导演', align: 'center',width: 100},
            {field: 'topUrl', title: '电影封面', align: 'center',width: 100},
            {field: 'imgs', title: '相关图集', align: 'center',width: 100},
        ]],
        toolbar: '#movie_tb',
    });
    let show = function (type, value) {
        $("#movie_dg").datagrid("reload", {type: type, value: value});
    }
    let imgStr="";
    let actorObj={};
    let actorArr=[];
    let actorNameArr=[];
    let photos = [];
    //增加
    $("#movie_add").click(function(){
         $("#movie_dd").window("open");
    })
    $("#movie_dd").dialog({
        //href: "/manage/easyStudent/add.html",

        buttons: [{
            text: "保存",
            handler: function () {
                let name = $("#movie_name").val();
                let englishName=$("#movie_englishName").val();
                let type=$("#movie_type").val();
                let point =$("#movie_point").val();
                let performer =$("#movie_performer").val();
                let want =$("#movie_want").val();
                let area =$("#movie_area").val();
                let year =$("#movie_year").val();
                let time =$("#movie_time").val();
                let releaseTime =$("#movie_releaseTime").val();
                let boxOffice =$("#movie_boxOffice").val();
                let synopsis =$("#movie_synopsis").val();
                let topUrl = $("#headImg").attr("src");
                let dirName =$("#movie_director").val();
                let dir={};
                 dir.name = $("#movie_director").val();
                dir.url = $("#directorImg").attr("src");
                let director=JSON.stringify(dir);

                let movieActor = JSON.stringify(actorArr);
                let actorName= JSON.stringify(actorNameArr);
                let images =  JSON.stringify(photos);
                console.log(actorArr)
                let obj={
                   name,englishName,type,point,performer,want,area,year,time,releaseTime,boxOffice,synopsis,dirName,topUrl,director,movieActor,actorName,images
                }
                let imgs = imgS((imgs) => {
                    obj.imgs = imgs
                    $.ajax({
                        type:"get",
                        url:"/movie/add",
                        data:{
                            obj:JSON.stringify(obj),
                            imgs: JSON.stringify(imgs),
                            isSchedule:'false'
                        },
                        success:function(data){
                            show();
                              $("#movie_dd").form("clear");
                            $("#movie_yy").empty();
                            $("#movie_dd").window("close");
                            $(".p_c").remove();
                        }
                    })
                })

                //$.ajax({
                //    url: "/movie/add",
                //    type: "get",
                //    data: {
                //        //name,englishName,type,point,performer,want,area,year,time,releaseTime,boxOffice,synopsis,director,topUrl,dirName,movieActor,actorName,images
                //                obj:JSON.stringify(obj),
                //
                //    },
                //    success: function () {
                //        show();
                //        $("#movie_yy").remove();
                //        $("#movie_dd").window("close");
                //    }
                //})
            }
        }, {
            text: "关闭",
            handler: function () {
                $("#movie_dd").window("close");
            }
        }]
    });
    //主题照片
    $("#uploadImg").filebox({
        onChange: function () {
            // console.log($(this).parents().find("input[type=file]").attr("id"));
            let $obj = $(this);
            if(!$("#movie_dd #wyc input[type=file]").val()){return;}
            $.ajaxFileUpload({
                url: "/upload",
                fileElementId: $obj.parents().find("#movie_dd #wyc input[type=file]").attr("id"),
                dataType: "string",
                success: function (data) {
                    console.log("data", data);
                    $("#headImg").attr("src", "/" + data);
                }
            });
            $obj.filebox("clear")
        }
    });
    //导演照片
    $("#dirImg").filebox({
        onChange: function () {
            // console.log($(this).parents().find("input[type=file]").attr("id"));
            let $obj = $(this);
            if(!$("#movie_dd #cyw input[type=file]").val()){return;}
            $.ajaxFileUpload({
                url: "/upload",
                fileElementId: $obj.parents().find("#movie_dd #cyw input[type=file]").attr("id"),
                dataType: "string",
                success: function (data) {
                    console.log("data", data);
                    $("#directorImg").attr("src", "/" + data);
                }
            });
            $obj.filebox("clear")
        }
    });

    //添加演员图集

    $("#ImgBtn").on("click",function(){
        console.log(111)
        let dataId=0;
        if($("#movie_dd .imgPar input[data-type=uploadImg]").length){
            dataId=$(".imgPar input[data-type=uploadImg]").length;
        }

        imgStr=`<p>演员姓名</p>
        <div style="margin-bottom:20px "><input type="text" class="actor" style="width:100px"></div>
        <div class="imgPar" data-id="${dataId}" style="margin-bottom: 20px">
                <div data-options="region:'east',border:false" style="width:150px;margin: auto">
                <div style="border:1px solid black;width:90px;height:120px;margin: auto">
                  <img class="headImg" id="headImg" data-id="${dataId}" style="width:100%;height:100%;" >
                </div>
                <input data-type="uploadImg" data-id="${dataId}" name="file" class="easyui-filebox" style="width:80px">
                </div>
                </div>`

        $("#movie_yy").append(imgStr);
        // console.log($(".imgPar").last().dataset.id)
        $("#movie_dd input[data-type=uploadImg]").filebox({
            buttonText:"选择图片",
            buttonAlign:"right"
        });
        $("#movie_dd input[data-type=uploadImg]").linkbutton();

        $("#movie_dd input[data-type=uploadImg]").filebox({
            onChange:function(){
                let $obj = $(this);
                // if(!$obj.filebox("getValue")){
                //     return;
                // }
                let uploadImgId=$obj[0].dataset.id;
                if(!$("#movie_dd #movie_yy input[type=file]").eq(uploadImgId).val()){return;}
                $.ajaxFileUpload({
                    url: "/upload",
                    fileElementId: $obj.parents().find("#movie_dd #movie_yy input[type=file]").eq(uploadImgId).attr("id"),
                    dataType: "string",
                    success: function(data) {
                        console.log("data",data);
                        console.log($(".actor").eq(uploadImgId).val());
                        actorObj = {};
                        actorObj.name = $(".actor").eq(uploadImgId).val();
                        actorObj.url= data;
                        actorArr.push(actorObj);
                        console.log(actorArr);
                        actorNameArr.push($(".actor").eq(uploadImgId).val());

                        //imgIds.push(data)
                        $("#movie_dd .headImg").eq(uploadImgId).attr("src","/"+data);
                    }
                });
                // 解决不能更换图片的问题
                $obj.filebox("clear");
            }
        });

    })
//添加图集
var a =0;
    $("#addImg").linkbutton({
        iconCls: 'icon-add',
        onClick:function(){
            $("#movie_img").append("<div id='p_"+a+"'><p class='p_c'  style='margin-bottom: 20px'><input class='upImg' type='text' name='file' style='width:300px;'/></p></div>");
            $('#p_'+a+' .p_c .upImg').filebox({
                buttonText: '选择文件',
                buttonAlign: 'left',
                prompt:'请选择文件.....'

            });
            a++;
        }
    });
    let imgS=function(fuc){
        var arr1 = [];
        if($(".p_c .upImg").length >= 1){
            if($(".p_c .upImg").filebox("getValue") != ""){
                //上传图片 多张
                let conte=0;
                for(let i = 0;i < $(".p_c .upImg").length;i++){
                    $.ajaxFileUpload({
                        url: "/upload",
                        fileElementId: $($(".p_c")[i]).find("input[type=file]").attr("id"),
                        dataType: "string",
                        success: function(data) {
                            arr1.push(data);
                            conte++;
                            if(conte==$(".p_c .upImg").length){
                                fuc(arr1)
                            };
                        }
                    });
                }
            }
        }
    };

    //删除
    $("#movie_del").click(function(){
        let arr=[];
        let checked= $("#movie_dg").datagrid('getChecked')
           console.log(checked)
        for(let i = 0;i<checked.length;i++){
            arr.push(checked[i]._id)
        }
        //$(checked).each(function(){
        //   arr.push(this._id);
        //})
        console.log(arr);
        if(arr.length==0){
            $.messager.alert('警告','请选择你要删除的内容');
        }
        else{
                $.messager.confirm('确认', '您确认想要删除吗？', function (r) {
                    if (r) {
                        for(let item of arr){
                            $.ajax({
                                url: "/movie/del",
                                type: "get",
                                data: {
                                    _id: item
                                },
                                success: function () {
                                    show();
                                }
                            })
                        }

                    }
                });
            }
    })
    $("#uploadImg2").filebox({
            onChange: function () {
            // console.log($(this).parents().find("input[type=file]").attr("id"));
            let $obj = $(this);
            if(!$("#movie_ww #wyc2 input[type=file]").val()){return;}
            $.ajaxFileUpload({
                url: "/upload",
                fileElementId: $obj.parents().find("#movie_ww #wyc2 input[type=file]").attr("id"),
                dataType: "string",
                success: function (data) {
                    console.log("data", data);
                    $("#headImg2").attr("src", "/" + data);
                }
            });
            $obj.filebox("clear")
        }
    });
    $("#dirImg2").filebox({
        onChange: function () {
            // console.log($(this).parents().find("input[type=file]").attr("id"));
            let $obj = $(this);
            if(!$("#movie_ww #cyw2 input[type=file]").val()){return;}
            $.ajaxFileUpload({
                url: "/upload",
                fileElementId: $obj.parents().find("#movie_ww #cyw2 input[type=file]").attr("id"),
                dataType: "string",
                success: function (data) {
                    console.log("data", data);
                    $("#directorImg2").attr("src", "/" + data);
                }
            });
            $obj.filebox("clear")
        }
    });

    //修改
    $("#movie_update").click(function(){

        let arr=[];
        let checked= $("#movie_dg").datagrid('getChecked')
        for(let i = 0;i<checked.length;i++){
            arr.push(checked[i]._id)
        }
        if(!arr.length){
            $.messager.alert('警告','请选择你要修改的内容');
        }
        else if(arr.length>1){
            $.messager.alert('警告','只能修改一条内容');
        }else{
            $("#movie_ww").window("open");
            $.ajax({
                type: "get",
                url: "/movie/updateShow",
                data: {
                    _id: arr[0]
                },
                success: function (date) {
                    //console.log(_id);
                    $("#movie_name2").textbox("setValue", date.name)
                    $("#movie_englishName2").textbox("setValue", date.englishName)
                    $("#movie_type2").textbox("setValue", date.type)
                    $("#movie_point2").textbox("setValue", date.point)
                    $("#movie_performer2").textbox("setValue", date.performer)
                    $("#movie_want2").textbox("setValue", date.want)
                    $("#movie_area2").textbox("setValue", date.area)
                    $("#movie_year2").textbox("setValue", date.year)
                    $("#movie_time2").textbox("setValue", date.time)
                    $("#movie_releaseTime2").textbox("setValue", date.releaseTime)
                    $("#movie_boxOffice2").textbox("setValue", date.boxOffice)
                    $("#movie_synopsis2").textbox("setValue", date.synopsis)
                    $("#movie_director2").textbox("setValue",date.dirName)
                    $("#directorImg2").attr("src",date.director.url)
                    $("#headImg2").attr("src",date.topUrl)
                    $("#hidden").val(date._id)
                        
                }
            })
        }

    })
    $("#movie_ww").dialog({
        //href: "/manage/easyStudent/add.html",
        buttons: [{
            text: "保存",
            handler: function () {
                let name = $("#movie_name2").val();
                let englishName=$("#movie_englishName2").val();
                let type=$("#movie_type2").val();
                let point =$("#movie_point2").val();
                let performer =$("#movie_performer2").val();
                let want =$("#movie_want2").val();
                let area =$("#movie_area2").val();
                let year =$("#movie_year2").val();
                let time =$("#movie_time2").val();
                let releaseTime =$("#movie_releaseTime2").val();
                let boxOffice =$("#movie_boxOffice2").val();
                let synopsis =$("#movie_synopsis2").val();
                let dirName = $("#movie_director2").val();
                let dirObj={};
                dirObj.name=$("#movie_director2").val();
                dirObj.url=$("#directorImg2").attr("src");
                let topUrl =$("#headImg2").attr("src");
                let director = JSON.stringify(dirObj);

                let _id = $("#hidden").val();
                $.ajax({
                    url: "/movie/update",
                    type: "get",
                    data: {
                        _id,name,englishName,type,point,performer,want,area,year,time,releaseTime,boxOffice,synopsis,director,dirName,topUrl
                    },
                    success: function () {
                        show();
                        $("#movie_ww").window("close");
                    }
                })
            }
        }, {
            text: "关闭",
            handler: function () {
                $("#movie_ww").window("close");
            }
        }]
    });
    $("#movie_ss").searchbox({
        searcher: function (value, name) {
            show(name, value);
        }
    })
    $("#movie_E").click(function(){
        show();
    })

};

