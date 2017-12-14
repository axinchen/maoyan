import cm_addM from "./cm_addM.js";
import cm_delM from "./cm_delM.js";
import cm_showCinM from "./cm_showCinM.js";
import cm_addCin from "./cm_addCin.js";
let show=function(type,value){
	$('#cinemaMatching').datagrid("reload",{
		type,value
	});
}
let cinemaMatching=function(){
	// 初始化主页数据表格
	$('#cinemaMatching').datagrid({
		fit:true,
		checkOnSelect:true,
		fitColumns:true,
		singleSelect:false,
		pagination: true,     //开启分页  
	    pageSize: 10,         //分页大小  
	    pageNumber:1,         //第几页显示（默认第一页，可以省略）  
	    pageList: [10, 20, 30], //设置每页记录条数的列表   
	    url: '/cinemaMatching/show',  //获取cinemaMatching集合中的数据
	    method:"get",
		columns:[
			[
				{field:'cm_checkbox',checkbox:true},
				{field:'name',width:"24%",align:'center',title:'电影名'},
				{field:'englishName',width:"24%",align:'center',title:'英文名'},
				{field:'type',width:"24%",align:'center',title:'类型'},
				{field:'cinema',width:"24%",align:'center',title:'院线',
					formatter:function(value,row,index){
						let str='';
						str+=`<a data-id=${row.movieID} class="easyui-linkbutton cm_showCin-btn" data-options="iconCls:'icon-television'">院线一览</a>`;
						str+=`<a data-id=${row.movieID} class="easyui-linkbutton cm_addCin-btn" data-options="iconCls:'icon-television_add'">增加院线</a>`;
						return str;
					}
				}
			]
		],
		onLoadSuccess:function(){
			$('.cm_showCin-btn').linkbutton();
			$('.cm_addCin-btn').linkbutton();
			$(".cm_showCin-btn").on("click",function(){
				let movieID=this.dataset.id;
				cm_showCinM(movieID);
				$('#cm_showCinMDialog').window('open');
			});
			$(".cm_addCin-btn").on("click",function(){
				let movieID=this.dataset.id;
				cm_addCin(movieID);
				$('#cm_addCinDialog').window('open');
			});
		}
	});
	$('#cm_search').searchbox({
		searcher:function(value,name){
			show(name,value);
		}
	});
	cm_addM();
	cm_delM();
}
export {show,cinemaMatching};