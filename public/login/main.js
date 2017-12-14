$.extend($.fn.validatebox.defaults.rules,{
	mobile : {// 验证手机号码
		validator : function(value) {
			let flag;
				$.ajax({
					type:"get",
					url:"/manager/loginValidate",
					data:{
						name:value
					},
					async:false,
					success:function(data){
						if(data!="phoneFail"){
							flag=true;
						}else{
							flag=false;
						}
					}
				});
				return flag;
		},
		message : '该用户不存在'
	},
	password : {// 验证密码
		validator : function(value) {
			let flag;
				$.ajax({
					type:"get",
					url:"/manager/loginValidate",
					data:{
						name:$("#name").val(),
						pwd:value
					},
					async:false,
					success:function(data){
						if(data=="ok"){
							flag=true;
						}else{
							flag=false;
						}
					}
				});
				return flag;
		},
		message : '密码输入错误'
	}
});
$('#fm').form({
	onSubmit:function(){
		return $(this).form('validate');
	},
	success:function(){
		window.location="index.html";
	}
});