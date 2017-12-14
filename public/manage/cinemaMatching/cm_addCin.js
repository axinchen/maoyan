import cm_addHall from "./cm_addHall.js";
export default function(movieID){
    let addCinTb=function(cinArr){
        //初始化增加院线表格
        $('#cm_addCinTb').datagrid({
            fit:true,
            checkOnSelect:true,
            fitColumns:true,
            singleSelect:false,
            pagination: true,     //开启分页  
            pageSize: 5,         //分页大小  
            pageNumber:1,         //第几页显示（默认第一页，可以省略）  
            pageList: [5, 10, 15], //设置每页记录条数的列表   
            url: '/cinemaMatching/showCin',  //传入已排片院线id，返回未排片id
            queryParams:{
                cinArr
            },
            columns:[
                [
                    {field:'name',width:"20%",align:'center',title:'院线名'},
                    {field:'address',width:"20%",align:'center',title:'地址'},
                    {field:'tel',width:"20%",align:'center',title:'电话'},
                    {field:'website',width:"20%",align:'center',title:'官网'},
                    {field:'option',width:"20%",align:'center',title:'操作',
                        formatter:function(value,row,index){
                            let str='';
                            //保存影院id
                            str+=`<a data-id=${row._id} data-name=${row.name} class="easyui-linkbutton cm_addHall-btn" data-options="iconCls:'icon-television'">添加</a>`;
                            return str;
                        }
                    }
                ]
            ],
            onLoadSuccess:function(){
                $('.cm_addHall-btn').linkbutton();
                $('.cm_addHall-btn').on("click",function(){
                    let cinemaID=this.dataset.id;
                    let cinemaName=this.dataset.name;
                    $.ajax({
                        type:"post",
                        url:"/cinemaMatching/addCin",//将选中的院线加入CM集合
                        data:{
                            movieID,cinemaID,cinemaName
                        },
                        success:function(data){
                            if(data=="ok"){
                                $("#cm_addCinDialog").window("close");
                                cm_addHall(movieID,cinemaID);
                                $('#cm_addHallDialog').window("open");
                            }
                        }
                    });
                });
            }
        }); 
    }
    $('#cm_addCinDialog').dialog({ 
        href: '/manage/cinemaMatching/cm_addCin.html', 
        buttons:[{
            text:'添加',
            handler:function(){
                let data=[];
                //遍历选中行数据，取出需要的值，电影id、院线id、院线名
                for(let obj of objArr){
                    data.push({
                        movieID,//上一级菜单传入
                        cinemaID:obj._id,
                        cinemaName:obj.name
                    }); 
                }
                $.ajax({
                    type:"post",
                    url:"/cinemaMatching/addCin",//将选中的院线加入CM集合
                    data:{
                        data:JSON.stringify(data)
                    },
                    success:function(data){
                        if(data=="ok"){
                            $("#cm_addCinDialog").window("close");
                        }
                    }
                });
            }
        },{
            text:'关闭',
            handler:function(){
                $("#cm_addCinDialog").window("close");
            }
        }],
        onLoad:function(){
            $.ajax({
                type:"get",
                url:"/cinemaMatching/getScheduleCin",//获取对应电影已添加院线
                data:{
                    movieID
                },
                async:false,
                success:function(data){
                    if(data){
                        let cinArr=[];
                        for(let obj of data){
                            cinArr.push(obj.cinemaID);
                        }
                        addCinTb(JSON.stringify(cinArr));
                    }
                }
            });
        }
    });


}