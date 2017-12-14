// 数据表格
import del from './del.js';
import add from './add.js';
//显示加载数据
let show = function(type, value) {
    $("#up_tb").datagrid("reload", { type: type, value: value });
};
let upcoming = function() {
    $('#up_tb').datagrid({
        fit:true,
        pagination: true,
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 20, 30],
        url: '/movie/show?isUpcoming=true',
        method: "get",
        columns: [
            [
                { field: 'number', title: ' ', checkbox: true, align: 'center',width: 100 },
                { field: 'name', title: '电影名', align: 'center',width: 100 },
                { field: 'englishName', title: '英文电影名',align: 'center', width: 100 },
                { field: 'type', title: '类型', align: 'center',width: 100 },
                { field: 'point', title: '电影评分', align: 'center',width: 100 },
                { field: 'actorName', title: '演员', align: 'center',width: 100 },
                { field: 'want', title: '想看', align: 'center',width: 100 },
                { field: 'area', title: '区域', align: 'center',width: 100 },
                { field: 'year', title: '年代', align: 'center',width: 100 },
                { field: 'time', title: '时长', align: 'center',width: 100 },
                { field: 'releaseTime', title: '上映时间', align: 'center',width: 100 },
                { field: 'boxOffice', title: '票房', align: 'center',width: 100 },
                { field: 'synopsis', title: '简介', align: 'center',width: 100 },

            ]
        ],
        toolbar: $("#up_bar"),
    });

    // 增加
   add();
    // 删除
    del();
    // 搜索
    $('#up_search').searchbox({
        searcher: function(value, name) {
            show(name, value);
        }
    });

};

export {upcoming,show};