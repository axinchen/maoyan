import {show} from "./cinemaMatching.js";
export default function(){
    //打开新增电影弹框
	$("#cm_addM").on("click",function(){
		$("#cm_addMDialog").window("open");
        $('#cm_addMDialog').window('refresh', '/manage/cinemaMatching/cm_addM.html');
	}); 
    //初始化新增电影弹框
	$('#cm_addMDialog').dialog({ 
    	href: '/manage/cinemaMatching/cm_addM.html', 
    	buttons:[{
    		text:'添加',
    		handler:function(){
                //获取选中项对象
    			let objArr=$('#cm_addMTb').datagrid('getChecked');
    			let data=[];
    			for(let obj of objArr){
    				data.push({
    					movieID:obj._id,
    					name:obj.name,
    					englishName:obj.englishName,
    					type:obj.type
    				});	
    			}
    			$.ajax({
    				type:"post",
    				url:"/cinemaMatching/add",//向cinemaMatching集合中添加数据
    				data:{
    					data:JSON.stringify(data)
    				},
    				success:function(data){
    					if(data=="ok"){
    						show();
    					}
    				}
    			});
				$("#cm_addMDialog").window("close");
    		}
    	},{
    		text:'关闭',
    		handler:function(){
    			$("#cm_addMDialog").window("close");
    		}
    	}],
    	onLoad:function(){
            //初始化新增电影表格
    		$('#cm_addMTb').datagrid({
                fit:true,
                checkOnSelect:true,
                fitColumns:true,
                singleSelect:false,
                pagination: true,     //开启分页  
                pageSize: 5,         //分页大小  
                pageNumber:1,         //第几页显示（默认第一页，可以省略）  
                pageList: [5, 10, 15], //设置每页记录条数的列表   
                url: '/cinemaMatching/showAll',  //获取未排片电影 
                method:"get",
                columns:[
                    [
                        {field:'checkbox',checkbox:true},
                        {field:'name',width:"32%",align:'center',title:'电影名'},
                        {field:'type',width:"32%",align:'center',title:'类型'},
                        {field:'releaseTime',width:"32%",align:'center',title:'上映时间'},
                    ]
                ]
            }); 
    	}
	});
}