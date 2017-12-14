export default function(_id){
	$('#cm_showSeatDialog').dialog({
		buttons:[{
    		text:'关闭',
    		handler:function(){
    			$("#cm_showSeatDialog").window("close");
    		}
    	}],
    	onBeforeOpen:function(){
    		$.ajax({
    			type:"get",
    			url:"/cinemaMatching/showHall",
    			data:{
    				_id
    			},
    			success:function(data){
    				let seatArr=data.seat;
    				let str="";
    				for(let i=0;i<12;i++){
    					str+=`<ul style="width:340px;display: flex;justify-content: space-between;margin: 10px auto;">`;
    					for(let j=0;j<12;j++){
    						if(seatArr[i][j]==1){
    							str+=`<li style="width: 20px;height: 20px;background: green;"></li>`;
    						}else if(seatArr[i][j]==2){
                                str+=`<li style="width: 20px;height: 20px;background: red;"></li>`;
                            }else{
    							str+=`<li style="width: 20px;height: 20px;background: transparent;"></li>`;
    						}
    					}
    					str+="</ul>";
    				}
    				$('#cm_showSeatDialog').html(str);
    			}
    		});
    	}
	});
}