import { show } from './cinema.js';
export default function() {
    // 点击bar的增加按钮，弹出增加框
    $("#cin_add_btn").click(function() {
        $("#cin_add-box").show();
        $("#cin_add").window("open").window('refresh');
    });
    // 增加弹框的操作
    $("#cin_add").dialog({
        method: 'get',
        href: '/manage/cinema/add.html',
        buttons: [
            {
                text: '保存添加',
                handler: function() {
                    $("#cin_add").form("submit", {
                        url: '/cinema/add',
                        // queryParams:{
                        //     isSchedule:'false'
                        // },
                        success: function() {
                            $("#cin_add").window("close");
                            show();
                        }
                    });
                }
            }, {
                text: '取消',
                handler: function() {
                    $("#cin_add").window("close");
                }
            }
        ],
    });   
}