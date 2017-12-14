import { show } from './user.js';
export default function() {
    $('#user_del_btn').on("click", function() {
        let idAry = [];
        let checkedObj = $('#user_tb').datagrid('getChecked');
        $(checkedObj).each(function() {
            idAry.push(this._id);
        });
        if (!idAry.length) {
            $.messager.alert('警告', '您还未选中任何要删除的用户');
            return;
        }
        $.messager.confirm('确认', `您确认要删除选中的${idAry.length}个用户吗?`, function(r) {
            if (r) {
                for (let item of idAry) {
                    $.ajax({
                        type: 'post',
                        url: '/user/del',
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