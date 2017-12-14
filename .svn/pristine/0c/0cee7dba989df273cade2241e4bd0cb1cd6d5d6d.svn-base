import { show } from './user.js';
export default function() {
    // 点击bar的增加按钮，弹出增加框
    $("#user_add_btn").click(function() {
        $("#user_add").window("open").window('refresh');
    });
    // 增加弹框的操作
    $("#user_add").dialog({
        method: 'get',
        href: '/manage/user/add.html',
        buttons: [
            {
                text: '保存添加',
                handler: function() {
                    $("#user_add").form("submit", {
                        url: '/user/add',
                        success: function() {
                            $("#user_add").window("close");
                            show();
                        }
                    });
                }
            }, {
                text: '取消',
                handler: function() {
                    $("#user_add").window("close");
                }
            }
        ],
    });   
}