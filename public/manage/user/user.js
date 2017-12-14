import add from './add.js';
import del from './del.js';
import update from './update.js';
// 显示
let show = function(value, name) {
    $('#user_tb').datagrid('reload', {
        value,
        name
    });
};
let userId;

// 用户主函数
let user = function() {
    // 表格样式
    $("#user_tb").datagrid({
        fit:true,
        toolbar: $("#user_bar"),
        pagination: true,
        method: 'get',
        url: '/user/info',
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 20, 30],
        fitColumns:true,
        columns: [
            [
                { field: 'choose', align: 'center', width: 100, checkbox: true },
                { field: 'name', title: '用户名', width: 100, align: 'center' },
                { field: 'pwd', title: '密码', width: 100, align: 'center' },
                { field: 'tel', title: '手机号', width: 100, align: 'center' },
                { field: 'email', title: '邮箱', width: 100, align: 'center' },
            ]
        ]
    });
    // 搜索样式
    $('#user_search').searchbox({
        menu: '#user_sel',
        prompt: '搜索',
        searcher: function(value, name) {
            show(value, name);
        }
    });
    // 增加用户
    add();
    // 删除用户
    del();
    // 修改用户
    update();
};
export { user, show };