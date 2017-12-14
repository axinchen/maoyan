import { show } from './hotShowing.js';
export default function() {
    $('#hs_del-btn').on("click", function() {
        let idAry = [];
        let checkedObj = $('#hs_tb').datagrid('getChecked');
        $(checkedObj).each(function() {
            idAry.push(this._id);
        });
        if (!idAry.length) {
            $.messager.alert('警告', '您还未选中任何要删除的热映电影');
            return;
        }
        $.messager.confirm('确认', `您确认要删除选中的${idAry.length}个热映电影吗?`, function(r) {
            if (r) {
                for (let item of idAry) {
                    $.ajax({
                        type: 'get',
                        url: '/movie/update',
                        data: {
                            _id: item,
                            isShowing:'false'
                        },
                        success: function() {
                            show();
                            $("#hs_add_tb").datagrid("reload");
                        }
                    });
                }
            }
        });
    });
}