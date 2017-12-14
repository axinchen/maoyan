import cm_addShow from "./cm_addShow.js";
export default function(movieID,cinemaID){
    //初始化增加放映厅对话框
	$('#cm_addHallDialog').dialog({
		href: '/manage/cinemaMatching/cm_addHall.html',
		buttons:[{
            text:'返回上一级',
            handler:function(){
                $("#cm_addCinDialog").window("open");
                $("#cm_addHallDialog").window("close");
            }
        },{
    		text:'关闭',
    		handler:function(){
    			$("#cm_addHallDialog").window("close");
    		}
    	}],
    	onLoad:function(){
            //初始化增加放映厅表格数据
    		$("#cm_addHallTb").datagrid({
    			fit:true,	
				checkOnSelect:true,
				fitColumns:true,
				singleSelect:false,
				pagination: true,     //开启分页  
			    pageSize: 5,         //分页大小  
			    pageNumber:1,         //第几页显示（默认第一页，可以省略）  
			    pageList: [5, 10, 15], //设置每页记录条数的列表   
			    url: `/cinemaMatching/showHallAll?cinemaID=${cinemaID}`,  //传入院线id获取所有放映厅 
			    method:"get",
				columns:[
					[
						{field:'name',width:"50%",align:'center',title:'放映厅'},
						{field:'option',width:"50%",align:'center',title:'添加',
                            formatter:function(value,row,index){
                                let str='';
                                //保存放映厅id
                                str+=`<a data-id=${row._id} class="easyui-linkbutton cm_addShow-btn" data-options="iconCls:'icon-television'">添加</a>`;
                                return str;
                            }
                        },
					]
				],
				onLoadSuccess:function(){
                    $('.cm_addShow-btn').linkbutton();
                    $('.cm_addShow-btn').on("click",function(){
                    	let hallID=this.dataset.id;
                        //传入放映厅id
                    	cm_addShow(movieID,cinemaID,hallID);
                        $("#cm_addHallDialog").window("close");
                    	$('#cm_addShowDialog').window('open');
                    });
                }
    		});
    	}
	});
}