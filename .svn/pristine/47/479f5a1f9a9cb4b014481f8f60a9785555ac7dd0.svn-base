import add from './add.js';
import del from './del.js';
import update from './update.js';
// import hall from './hall.js';
// import hallTable from './hallTable.js';
// import hallSeat from './hallSeat.js';
// 显示
let show = function(value, name) {
    $('#cin_tb').datagrid('reload', {
        value,
        name
    });
};
let cinemaId;
let hallid;
let ary;
// 修改放映厅窗口中的颜色加载
let color = function(hallid) {
    $.ajax({
        type: 'get',
        url: '/cinema/hallInfo',
        data: {
            _id: hallid
        },
        async: true,
        success: function(data) {
            console.log('sz', data);
            let ary = data.seat;
            // $(data).each(function() {
            //     ary = this.seat;
            // });
            console.log($("#updateHallName").textbox('setValue', data.name));
            let n = 0;
            for (let i = 0; i < 12; i++) {
                for (let j = n; j < 12 + n; j++) {
                    if (ary[i][j % 12]) {
                        $("#updateSetChoose a").eq(j).linkbutton({
                            iconCls: 'icon-seat',
                        });
                        // $("#updateSetChoose a").eq(j).css('backgroundColor', 'rgb(200, 100, 150)');
                        // $("#updateSetChoose a").eq(j).children().css('backgroundColor', 'rgb(200, 100, 150)');
                    }
                }
                n += 12;
            }
        }
    });
};
// 有无座位的选择
let seatChoose = function(selector) {
    $(selector).on('click', function() {
        let $seat = $(this);
        if ($seat.children().children().hasClass('icon-seat')) {
            $seat.linkbutton({
                iconCls: ''
            });
        } else {
            $seat.linkbutton({
                iconCls: 'icon-seat',
            });
        }
        // if ($seat.css('backgroundColor') != 'rgb(200, 100, 150)') {
        //     $seat.css('backgroundColor', 'rgb(200, 100, 150)');
        //     $seat.children().css('backgroundColor', 'rgb(200, 100, 150)');
        // } else {
        //     $seat.css('backgroundColor', '');
        //     $seat.children().css('backgroundColor', '');
        // }
    });
};
// 影院主函数
let cinema = function() {
    // 表格样式
    $("#cin_tb").datagrid({
        fit: true,
        toolbar: $("#cin_bar"),
        pagination: true,
        method: 'get',
        url: '/cinema/info',
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 20, 30],
        fitColumns: true,
        columns: [
            [
                { field: 'choose', align: 'center', width: 100, checkbox: true },
                { field: 'name', title: '院线名', width: 100, align: 'center' },
                { field: 'address', title: '地址', width: 100, align: 'center' },
                { field: 'tel', title: '官方电话', width: 100, align: 'center' },
                { field: 'website', title: '官方网站', width: 100, align: 'center' },
                {
                    field: 'operate',
                    title: '放映厅',
                    align: 'center',
                    width: 100,
                    formatter: function(value, row, index) {
                        let str = "";
                        str += `<button data-id=${row._id} class="easyui-linkbutton hall-add-btn" data-options="iconCls:'icon-room',plain:true" style='margin:0 10px'>新增</button>`;
                        str += `<button data-id=${row._id} class="easyui-linkbutton hall-see-btn" data-options="iconCls:'icon-eye',plain:true" style='margin:0 10px'>查看</button>`;
                        return str;
                    }
                }
            ]
        ],
        // 加载成功后初始化新增和查看的按钮
        onLoadSuccess: function() {
            $(".hall-add-btn").linkbutton();
            $(".hall-see-btn").linkbutton();
            // 点击新增按钮,新增放映厅弹框出来
            $(".hall-add-btn").on('click', function() {
                $("#cinHall_add").window("open").window('refresh');
                cinemaId = this.dataset.id;
                $("#holl_hide").val(cinemaId);

            });
            // 点击查看
            $(".hall-see-btn").on('click', function() {
                $("#hall_dia").window('open').window('refresh');
                cinemaId = this.dataset.id;
                $("#holl_hide").val(cinemaId);
                // 显示放映厅数据
                $("#hall_tb").datagrid({
                    pagination: true,
                    method: 'get',
                    url: `/cinema/hallInfo?cinemaId=${cinemaId}`,
                    pageNumber: 1,
                    pageSize: 5,
                    pageList: [5, 10],
                    columns: [
                        [
                            { field: 'name', title: '放映厅名', width: 100, align: 'center' },
                            {
                                field: 'operate',
                                title: '操作',
                                align: 'center',
                                width: 100,
                                formatter: function(value, row, index) {
                                    let str = "";
                                    str += `<button data-cinid=${row.cinemaId} data-hallid=${row._id} class="easyui-linkbutton hall-update-btn" data-options="iconCls:'icon-edit',plain:true" style='margin:0 10px'>修改</button>`;
                                    str += `<button data-cinid=${row.cinemaId} data-hallid=${row._id} class="easyui-linkbutton hall-del-btn" data-options="iconCls:'icon-clear',plain:true" style='margin:0 10px'>删除</button>`;
                                    return str;
                                }
                            }
                        ]
                    ],
                    onLoadSuccess: function() {
                        $(".hall-update-btn").linkbutton();
                        $(".hall-del-btn").linkbutton();
                        $(".hall-update-btn").click(function() {
                            $("#cinHall_update").window('open').dialog('refresh');
                            cinemaId = this.dataset.cinid;
                            hallid = this.dataset.hallid;
                            $.ajax({
                                type: 'get',
                                url: '/cinema/hallInfo',
                                data: {
                                    cinemaId
                                },
                                async: true,
                                success: function(data) {
                                    $(data).each(function() {
                                        ary = this.seat;
                                    });
                                }
                            });
                        });
                        $(".hall-del-btn").click(function() {
                            cinemaId = this.dataset.cinid;
                            hallid = this.dataset.hallid;
                            console.log(cinemaId, hallid);
                            $.messager.confirm('确认', `您确认要删除选中的放映厅吗?`, function(r) {
                                if (r) {
                                    $.ajax({
                                        type: 'post',
                                        url: '/cinema/hallDel',
                                        data: {
                                            _id: hallid
                                        },
                                        success: function() {
                                            $('#hall_tb').datagrid('reload');
                                        }
                                    });

                                }
                            });

                        });

                    }
                });
            });

        }
    });
    // 修改放映厅的对话框
    $('#cinHall_update').dialog({
        method: 'get',
        href: '/manage/cinema/hallSeat.html',
        // 加载成功后，设置点击座位变色
        onLoad: function() {
            // 取出影院座位信息并打印
            color(hallid);

            // 有无座位选择
            seatChoose("#updateSetChoose a");
        },
        buttons: [{
            text: '保存放映厅',
            handler: function() { // 获取颜色组成数组,如果背景色为红色，则存1，否则存0
                let seatAry = [];
                let $aAry = $("#updateSetChoose a");
                let m = 0;
                for (let i = 0; i < 12; i++) {
                    seatAry.push([]);
                    for (let j = m; j < 12 + m; j++) {
                        if ($aAry.eq(j).children().children().hasClass('icon-seat')) {
                            seatAry[i].push(1);
                        } else {
                            seatAry[i].push(0);
                        }
                    }
                    // for (let j = m; j < 12 + m; j++) {
                    //     if ($aAry.eq(j).css('backgroundColor') == 'rgb(200, 100, 150)') {
                    //         seatAry[i].push(1);
                    //     } else {
                    //         seatAry[i].push(0);
                    //     }
                    // }
                    m += 12;
                }
                $("#cinHall_update").form("submit", {
                    url: '/cinema/hallUpdate',
                    queryParams: {
                        _id: hallid,
                        seat: JSON.stringify(seatAry)
                    },
                    success: function() {
                        $("#cinHall_update").window("close");
                        $('#hall_tb').datagrid('reload');

                    }
                });
            }
        }, {
            text: '取消',
            handler: function() {
                $("#cinHall_update").window("close");
            }
        }]
    });
    // 新增放映厅
    $('#cinHall_add').dialog({
        method: 'get',
        href: '/manage/cinema/hall.html',
        // 加载成功后，设置点击座位变色
        onLoad: function() {
            // 有无座位选择
            // seatChoose("#setChoose a");
            $("#setChoose a").each(function() {
                let $seat = $(this);
                $seat.linkbutton({
                    iconCls: 'icon-seat',
                });
                // $seat.css('backgroundColor', 'rgb(200, 100, 150)');
                // $seat.children().css('backgroundColor', 'rgb(200, 100, 150)');
            });
            $("#setChoose a").on('click', function() {
                let $seat = $(this);
                if ($seat.children().children().hasClass('icon-seat')) {
                    $seat.linkbutton({
                        iconCls: ''
                    });
                } else {
                    $seat.linkbutton({
                        iconCls: 'icon-seat',
                    });
                }
                // if ($seat.css('backgroundColor') != 'rgb(200, 100, 150)') {
                //     $seat.css('backgroundColor', 'rgb(200, 100, 150)');
                //     $seat.children().css('backgroundColor', 'rgb(200, 100, 150)');
                // } else {
                //     $seat.css('backgroundColor', '');
                //     $seat.children().css('backgroundColor', '');
                // }
            });
        },
        buttons: [{
            text: '保存放映厅',
            handler: function() {
                // 获取颜色组成数组,如果背景色为红色，则存1，否则存0
                let seatAry = [];
                let $aAry = $("#setChoose a");
                let m = 0;
                for (let i = 0; i < 12; i++) {
                    seatAry.push([]);
                    for (let j = m; j < 12 + m; j++) {
                        if ($aAry.eq(j).children().children().hasClass('icon-seat')) {
                            seatAry[i].push(1);
                        } else {
                            seatAry[i].push(0);
                        }
                        // if ($aAry.eq(j).css('backgroundColor') == 'rgb(200, 100, 150)') {
                        //     seatAry[i].push(1);
                        // } else {
                        //     seatAry[i].push(0);
                        // }
                    }
                    m += 12;
                }
                $("#cinHall_add").form("submit", {
                    url: '/cinema/hallAdd',
                    queryParams: {
                        seat: JSON.stringify(seatAry),
                        cinemaId
                    },
                    success: function() {
                        $("#cinHall_add").window("close");
                    }
                });
            }
        }, {
            text: '取消',
            handler: function() {
                $("#cinHall_add").window("close");
            }
        }]
    });
    // 搜索样式
    $('#cin_search').searchbox({
        menu: '#cin_sel',
        prompt: '搜索',
        searcher: function(value, name) {
            show(value, name);
        }
    });
    // 增加院线
    add();
    // 删除院线
    del();
    // 修改院线
    update();
    // hall();
    // hallTable();
    // hallSeat();
};
export { cinema, show };