import add from './add.js';
import del from './del.js';
import update from './update.js';
// 显示
let show = function(value, name) {
    $('#information_tb').datagrid('reload', {
        value,
        name
    });
};
let informationId;

// 资讯主函数
let information = function() {
    // 表格样式
    $("#information_tb").datagrid({
        fit:true,
        toolbar: $("#information_bar"),
        pagination: true,
        method: 'get',
        url: '/information/info',
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 20, 30],
        fitColumns:true,
        columns: [
            [
                { field: 'choose', align: 'center', width: 100, checkbox: true },
                { field: 'title', title: '资讯标题', width: 100, align: 'center' },
                { field: 'time', title: '发稿时间', width: 100, align: 'center' },
                { field: 'picObjArr', title: '图文', width: 100, align: 'center' },
                { field: 'disArr', title: '评论', width: 100, align: 'center' },
            ]
        ]
    });
    // 搜索样式
    $('#information_search').searchbox({
        menu: '#information_sel',
        prompt: '搜索',
        searcher: function(value, name) {
            show(value, name);
        }
    });
    // 增加资讯
    add();
    // 删除资讯
    del();
    // 修改资讯
    update();
};
export { information, show };