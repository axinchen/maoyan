import {show} from "./cinemaMatching.js";
export default function(){
	$("#cm_delM").on("click",function(){
		let ids=[];
		let movieIDs=[];
		let checked=$('#cinemaMatching').datagrid('getChecked');
		for(let obj of checked){
			ids.push(obj._id);
			movieIDs.push(obj.movieID);
		}
		$.ajax({
			type:"post",
			url:"/cinemaMatching/delM",
			data:{
				ids:JSON.stringify(ids),
				movieIDs:JSON.stringify(movieIDs)
			},
			success:function(data){
				if(data=="ok"){
					show();
				}
			}
		});
	});
}