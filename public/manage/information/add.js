import { show } from './information.js';
export default function() {
    // 点击bar的增加按钮，弹出增加框
    $("#information_add_btn").click(function() {
        $("#information_add").window("open").window('refresh');
    });
    // 用于保存数据的数组
    let picObjArr = [];
    let disArr = [];
    // 增加弹框的操作
    $("#information_add").dialog({
        method: 'get',
        href: '/manage/information/add.html',
        onLoad: function() {
            $("#info_picture").linkbutton();
            $("#info_discuss").linkbutton();
            // 点击新增图文
            let info_add_dataId = 0;
            $("#info_picture").on("click", function() {
                if ($("#info_picture-box .imgPar input[data-type=uploadImg]").length) {
                    info_add_dataId = $("#info_picture-box .imgPar input[data-type=uploadImg]").length;
                }
                let imgStr = `<div style="display:flex;">
                        <div class="imgPar" data-id="${info_add_dataId}" style="margin-bottom: 20px">
                            <div data-options="region:'east',border:false" style="width:100px;margin: auto">
                                <div style="width:100px;height:100px;">
                                    <img class="headImg" data-id="${info_add_dataId}" style="width:100%;height:100%;" >
                                <input data-type="uploadImg" data-id="${info_add_dataId}" name="file" class="easyui-filebox" style="width:100px">
                            </div>
                        </div>
                    </div>
                    <div style="margin-bottom:20px "><textarea class="info_text_add" style="width:180px;height:130px;" placeholder="请输入配文…"></textarea></div></div>`;
                $("#info_picture").before(imgStr);
                $("#info_picture-box input[data-type=uploadImg]").filebox({
                    buttonText: "选择图片",
                    buttonAlign: "center",
                    onChange: function() {
                        let $obj = $(this);
                        let uploadImgId = $obj[0].dataset.id;
                        if (!$("#info_picture-box input[type=file]").eq(uploadImgId).val()) { return; }
                        $.ajaxFileUpload({
                            url: "/upload",
                            fileElementId: $obj.parents().find("#info_picture-box input[type=file]").eq(uploadImgId).attr("id"),
                            dataType: "string",
                            success: function(data) {
                                $("#info_picture-box .headImg").eq(uploadImgId).attr("src", "/" + data);
                            }
                        });
                        $obj.filebox("clear");
                    }
                });

            });
            // 点击新增评论
            $("#info_discuss").on("click", function() {
                let disStr = '<textarea class="info_discuss_add" style="width:280px;height:130px;margin:10px 0" placeholder="请输入评论…"></textarea>';
                $("#info_discuss").before(disStr);
            });
        },
        buttons: [{
            text: '保存添加',
            handler: function() {
                // 清空容器
                picObjArr = [];
                disArr = [];
                // 保存图文数组
                $("#info_picture-box input[data-type=uploadImg]").each(function(i) {
                    let picObj = {};
                    picObj.text = $("#info_picture-box .info_text_add").eq(i).val(); //文段
                    picObj.pics = $("#info_picture-box .headImg").eq(i).attr("src"); //路径
                    picObjArr.push(picObj); //文段路径一起的集合
                });
                // 保存评论数组
                $("#info_discuss-box .info_discuss_add").each(function() {
                    disArr.push(this.value);
                });
                $("#information_add").form("submit", {
                    url: '/information/add',
                    queryParams: {
                        picObjArr: JSON.stringify(picObjArr),
                        disArr: JSON.stringify(disArr),
                    },
                    success: function() {
                        $("#information_add").window("close");
                        show();
                        picObjArr = [];
                        disArr = [];
                    }
                });
            }
        }, {
            text: '取消',
            handler: function() {
                $("#information_add").window("close").window('refresh');
            }
        }],
    });
}