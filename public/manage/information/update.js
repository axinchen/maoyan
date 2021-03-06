import { show } from './information.js';
export default function() {
    // 点击bar的修改按钮，弹出增加框
    // 用于保存数据的数组
    let picObjArr = [];
    let disArr = [];
    let idAry = [];
    $("#information_update_btn").click(function() {
        // 判断选中的条数
        idAry = [];
        let checkedObj = $('#information_tb').datagrid('getChecked');
        $(checkedObj).each(function() {
            idAry.push(this._id);
        });
        if (!idAry.length) {
            $.messager.alert('警告', '您还未选中任何要修改的资讯');
            return;
        } else if (idAry.length > 1) {
            $.messager.alert('警告', '每次只能修改一条资讯，请重新选择');
            return;
        }
        $("#information_update").window("open").window('center').window('refresh');
        // 弹框内的显示
        $.ajax({
            type: 'get',
            url: '/information/infoByid',
            data: {
                _id: idAry[0]
            },
            success: function(data) {
                $("#information_updateTitle").textbox("setValue", data.title);
                $("#information_updateTime").textbox("setValue", data.time);
                for (let i = 0; i < data.picObjArr.length; i++) {
                    // 显示原始图文
                    let imgStr = `<div style="display:flex;">
                        <div class="imgPar" data-id="${i}" style="margin-bottom: 20px">
                            <div data-options="region:'east',border:false" style="width:100px;margin: auto">
                                <div style="width:100px;height:100px;">
                                    <img class="headImg" data-id="${i}" style="width:100%;height:100%;" >
                                <input data-type="uploadImg" data-id="${i}" name="file" class="easyui-filebox" style="width:100px">
                            </div>
                        </div>
                    </div>
                    <div style="margin-bottom:20px "><textarea class="info_text_add" style="width:180px;height:130px;"></textarea></div></div>`;
                    $("#info_updatepicture").before(imgStr);
                    // dataId=i;
                    $("#info_picture-updatebox textarea").eq(i).val(data.picObjArr[i].text);
                    $("#info_picture-updatebox .headImg").eq(i).attr("src", data.picObjArr[i].pics);
                }
                // 点击新增图文
                $("#info_updatepicture").on("click", function() {
                    let info_dataId = 0;
                    if ($("#info_picture-updatebox .imgPar input[data-type=uploadImg]").length) {
                        info_dataId = $("#info_picture-updatebox .imgPar input[data-type=uploadImg]").length;
                    }
                    let imgStr = `<div style="display:flex;">
                        <div class="imgPar" data-id="${info_dataId}" style="margin-bottom: 20px">
                            <div data-options="region:'east',border:false" style="width:100px;margin: auto">
                                <div style="width:100px;height:100px;">
                                    <img class="headImg" data-id="${info_dataId}" style="width:100%;height:100%;" >
                                <input data-type="uploadImg" data-id="${info_dataId}" name="file" class="easyui-filebox" style="width:100px">
                            </div>
                        </div>
                    </div>
                    <div style="margin-bottom:20px "><textarea class="info_text_add" style="width:180px;height:130px;" placeholder="请输入配文…"></textarea></div></div>`;
                    $("#info_updatepicture").before(imgStr);
                    $("#info_picture-updatebox input[data-type=uploadImg]").filebox({
                        buttonText: "选择图片",
                        buttonAlign: "center",
                        onChange: function() {
                            let $obj = $(this);
                            let uploadImgId = $obj.attr('data-id');
                            console.log(uploadImgId);
                            if (!$("#info_picture-updatebox input[type=file]").eq(uploadImgId).val()) { return; }
                            $.ajaxFileUpload({
                                url: "/upload",
                                fileElementId: $obj.parents().find("#info_picture-updatebox input[type=file]").eq(uploadImgId).attr("id"),
                                dataType: "string",
                                success: function(data) {
                                    $("#info_picture-updatebox .headImg").eq(uploadImgId).attr("src", "/" + data);
                                }
                            });
                            $obj.filebox("clear");
                        }
                    });
                });
                $("#info_picture-updatebox input[data-type=uploadImg]").filebox({
                    buttonText: "选择图片",
                    buttonAlign: "center",
                    onChange: function() {
                        let $obj = $(this);
                        let uploadImgId = $obj.attr('data-id');
                        console.log(uploadImgId);
                        if (!$("#info_picture-updatebox input[type=file]").eq(uploadImgId).val()) { return; }
                        $.ajaxFileUpload({
                            url: "/upload",
                            fileElementId: $obj.parents().find("#info_picture-updatebox input[type=file]").eq(uploadImgId).attr("id"),
                            dataType: "string",
                            success: function(data) {
                                $("#info_picture-updatebox .headImg").eq(uploadImgId).attr("src", "/" + data);
                            }
                        });
                        $obj.filebox("clear");
                    }
                });
                $("#info_updatediscuss").on('click', function() {
                    let disStr = '<textarea class="info_discuss_update" style="width:280px;height:130px;margin:10px 0" placeholder="请输入评论…"></textarea>';
                    $("#info_updatediscuss").before(disStr);
                });
                // 显示原始评论
                let disStr = '<textarea class="info_discuss_update" style="width:280px;height:130px;margin:10px 0"></textarea>';
                for (let i = 0; i < data.disArr.length; i++) {
                    $("#info_updatediscuss").before(disStr);
                    $("#info_discuss-updatebox textarea").eq(i).val(data.disArr[i]);
                }
            }
        });
    });
    // 修改弹框保存的操作
    $("#information_update").dialog({
        method: 'get',
        href: '/manage/information/update.html',
        buttons: [{
            text: '保存修改',
            handler: function() {
                // 清空容器
                picObjArr = [];
                disArr = [];
                // 保存图文数组
                $("#info_picture-updatebox input[data-type=uploadImg]").each(function(i) {
                    let picObj = {};
                    picObj.text = $("#info_picture-updatebox .info_text_add").eq(i).val(); //文段
                    picObj.pics = $("#info_picture-updatebox .headImg").eq(i).attr("src"); //路径
                    picObjArr.push(picObj); //文段路径一起的集合
                });
                $("#info_discuss-updatebox .info_discuss_update").each(function() {
                    disArr.push(this.value);
                });
                $("#information_update").form("submit", {
                    url: '/information/update',
                    queryParams: {
                        _id: idAry[0],
                        picObjArr: JSON.stringify(picObjArr),
                        disArr: JSON.stringify(disArr),
                    },
                    success: function() {
                        $("#information_update").window("close");
                        show();
                        picObjArr = [];
                        disArr = [];
                    }
                });
            }
        }, {
            text: '取消',
            handler: function() {
                $("#information_update").window("close");
            }
        }]
    });
}