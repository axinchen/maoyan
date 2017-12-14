import { show } from './cinema.js';
export default function() {
    // 点击bar的修改按钮，弹出增加框
    $("#cin_update_btn").click(function() {
        // 判断选中的条数
        let idAry = [];
        let checkedObj = $('#cin_tb').datagrid('getChecked');
        $(checkedObj).each(function() {
            idAry.push(this._id);
        });
        if (!idAry.length) {
            $.messager.alert('警告', '您还未选中任何要修改的院线');
            return;
        }
        else if(idAry.length>1){
            $.messager.alert('警告', '每次只能修改一个院线，请重新选择');
            return;
        }
        $("#cin_update").window("open").window('center');
        // 弹框内的显示
        $.ajax({
            type:'get',
            url:'/cinema/infoByid',
            data:{
                _id:idAry[0]
            },
            success:function(data){
                $("#cin_updateName").textbox("setValue",data.name);
                $("#cin_updateAddress").textbox("setValue",data.address);
                $("#cin_updateTel").textbox("setValue",data.tel);
                $("#cin_updateWeb").textbox("setValue",data.website);
                $("#cin_updateId").val(data._id);
            }
        });
    });
    // 修改弹框的操作
    $("#cin_update").dialog({
        method: 'get',
        href: '/manage/cinema/update.html',
        buttons: [{
            text: '保存修改',
            handler: function() {
                $("#cin_update").form("submit", {
                    url: '/cinema/update',
                    success: function() {
                        $("#cin_update").window("close");
                        show();
                    }
                });
            }
        }, {
            text: '取消',
            handler: function() {
                $("#cin_update").window("close");
            }
        }]
    });
}