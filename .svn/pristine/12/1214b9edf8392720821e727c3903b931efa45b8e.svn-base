import { show } from './user.js';
export default function() {
    // 点击bar的修改按钮，弹出增加框
    $("#user_update_btn").click(function() {
        // 判断选中的条数
        let idAry = [];
        let checkedObj = $('#user_tb').datagrid('getChecked');
        $(checkedObj).each(function() {
            idAry.push(this._id);
        });
        if (!idAry.length) {
            $.messager.alert('警告', '您还未选中任何要修改的用户');
            return;
        }
        else if(idAry.length>1){
            $.messager.alert('警告', '每次只能修改一个用户，请重新选择');
            return;
        }
        $("#user_update").window("open").window('center');
        // 弹框内的显示
        $.ajax({
            type:'get',
            url:'/user/infoByid',
            data:{
                _id:idAry[0]
            },
            success:function(data){
                $("#user_updateName").textbox("setValue",data.name);
                $("#user_updatePwd").textbox("setValue",data.pwd);
                $("#user_updateTel").textbox("setValue",data.tel);
                $("#user_updateEmail").textbox("setValue",data.email);
                $("#user_updateId").val(data._id);
            }
        });
    });
    // 修改弹框的操作
    $("#user_update").dialog({
        method: 'get',
        href: '/manage/user/update.html',
        buttons: [{
            text: '保存修改',
            handler: function() {
                $("#user_update").form("submit", {
                    url: '/user/update',
                    success: function() {
                        $("#user_update").window("close");
                        show();
                    }
                });
            }
        }, {
            text: '取消',
            handler: function() {
                $("#user_update").window("close");
            }
        }]
    });
}