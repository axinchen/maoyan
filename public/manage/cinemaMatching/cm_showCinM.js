import cm_addHall from "./cm_addHall.js";
import cm_showHall from "./cm_showHall.js";
export default function(movieID){
    let show=function(type,value){
        $('#cm_showCinTb').datagrid("reload",{
            type,value
        });
    }
    //初始化院线一览对话框
	$('#cm_showCinMDialog').dialog({ 
    	href: '/manage/cinemaMatching/cm_showCinM.html', 
    	buttons:[{
    		text:'关闭',
    		handler:function(){
    			$("#cm_showCinMDialog").window("close");
    		}
    	}],
    	onLoad:function(){
            //初始化院线一览表格
    		$('#cm_showCinTb').datagrid({
				fit:true,
				checkOnSelect:true,
				fitColumns:true,
				singleSelect:false,
				pagination: true,     //开启分页  
		        pageSize: 5,         //分页大小  
		        pageNumber:1,         //第几页显示（默认第一页，可以省略）  
		        pageList: [5, 10, 15], //设置每页记录条数的列表   
		        url:"/cinemaMatching/showCinAll",  //获取已排片院线
                queryParams:{
                    movieID
                },
				columns:[
					[
                        {field:'checkbox',checkbox:true},
						{field:'cinemaName',width:"40%",align:'center',title:'院线'},
						{field:'option',width:"57%",align:'center',title:'操作',
                            formatter:function(value,row,index){
                                let str='';
                                str+=`<a data-id=${row.cinemaID} class="easyui-linkbutton cm_showHall-btn" data-options="iconCls:'icon-television'">放映一览</a>`;
                                str+=`<a data-id=${row.cinemaID} class="easyui-linkbutton cm_addHall-btn" data-options="iconCls:'icon-television_add'">增加放映</a>`;
                                return str;
                            }
                        },
					]
				],
                onLoadSuccess:function(){
                    $('.cm_showHall-btn').linkbutton();
                    $('.cm_addHall-btn').linkbutton();
                    $('.cm_showHall-btn').on("click",function(){
                        let cinemaID=this.dataset.id;
                        //传入电影id、院线id
                        cm_showHall(movieID,cinemaID);
                        $('#cm_showCinMDialog').window('close');
                        $('#cm_showHallDialog').window('open');
                    });
                    $('.cm_addHall-btn').on("click",function(){
                        let cinemaID=this.dataset.id;
                        //传入电影id、院线id
                        cm_addHall(movieID,cinemaID);
                        $('#cm_showCinMDialog').window('close');
                        $('#cm_addHallDialog').window('open');
                    });
                }
			}); 
    	}
	});
    $('#cm_showCinMDialog').delegate("#cm_delCinB","click",function(){
        let checked=$('#cm_showCinTb').datagrid('getChecked');
        let objArr=[];
        for(let obj of checked){
            objArr.push({
                cinemaID:obj.cinemaID,
                movieID:obj.movieID
            });
        }
        $.ajax({
            type:"post",
            url:"/cinemaMatching/delCin",//删除排片院线
            data:{
                objArr:JSON.stringify(objArr)
            },
            success:function(data){
                if(data){
                    show();
                }
            }
        });
    });
    $('#cm_showCinSearch').searchbox({
        searcher:function(value,name){
            show(name,value);
        }
    });
}