import { show } from './information.js';
export default function() {
    $('#information_del_btn').on("click", function() {
        let idAry = [];
        let checkedObj = $('#information_tb').datagrid('getChecked');
        $(checkedObj).each(function() {
            idAry.push(this._id);
        });
        if (!idAry.length) {
            $.messager.alert('警告', '您还未选中任何要删除的资讯');
            return;
        }
        $.messager.confirm('确认', `您确认要删除选中的${idAry.length}个资讯吗?`, function(r) {
            if (r) {
                for (let item of idAry) {
                    $.ajax({
                        type: 'post',
                        url: '/information/del',
                        data: {
                            _id: item
                        },
                        success: function() {
                            show();
                        }
                    });
                }
            }
        });
    });
}