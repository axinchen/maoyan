// 数据表格
import { show } from './hotShowing.js';
export default function() {
    // 点击bar的增加按钮，弹出增加框
    $("#hs_add-btn").click(function() {
        $("#hs_add").dialog("open");
        $('#hs_add_tb').datagrid("reload");
    });
    $('#hs_add_tb').datagrid({
        pagination: true,
        pageNumber: 1,
        pageSize: 5,
        pageList: [5, 10, 15],
        url: '/movie/show?isUpcoming=false&isBroadcast=false&isShowing=false',
        method: "get",
        columns: [
            [
                { field: 'number', title: ' ', checkbox: true, align: 'center',width: 100 },
                { field: 'name', title: '电影名', align: 'center',width: 100 },
                { field: 'englishName', title: '英文电影名', align: 'center',width: 100 },
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
        toolbar: $("#hs_add_bar"), 
    });
     $("#hs_add").dialog({
        buttons: [{
            text: '保存',
            handler: function() {
                let idAry = [];
                let checkedObj = $('#hs_add_tb').datagrid('getChecked');
                $(checkedObj).each(function() {
                    idAry.push(this._id);
                });
                if (!idAry.length) {
                    $.messager.alert('警告', '您还未选中任何要新增的电影');
                    return;
                }
                for (let item of idAry) {
                    $.ajax({
                        type: 'get',
                        url: '/movie/update',
                        data: {
                            _id: item,
                            isShowing: 'true'
                        },
                        success: function() {
                            $("#hs_add").window("close");
                            show();
                        }
                    });
                }
            }
        }, {
            text: '取消',
            handler: function() {
                $("#hs_add").window("close");
            }
        }]
     });
    // 搜索
    $('#hs_add_search').searchbox({
        searcher: function(value, name) {
            show(name, value);
        }
    });
}