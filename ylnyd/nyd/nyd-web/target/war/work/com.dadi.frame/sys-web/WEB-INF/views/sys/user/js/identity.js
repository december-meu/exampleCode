$(function() {
    // 1.初始化Table
    var mainList = new MainList();
    mainList.Init();

    // 2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

});

function refreshList(resId) {
    $('#dataList').bootstrapTable('refresh');
}
var callback = function() {
    return bsTable.selectionIds;
}

function switchTo(userId){
    var url= webPath+"/sys/user/switchTo/"+userId;
    document.all.form.action = action;
    document.all.form.submit();
    
    
}
var MainList = function() {
    var mainList = new Object();
    var url = webPath + 'sys/user/list';

    var columnsIdetity = [ {
	field : 'checkStatus',
	checkbox : true
    }, {
	field : 'id',
	visible : false,
	title : "id",
    }, {
	field : 'username',
	title : '姓名'
    }, {
	field : 'identityRoleName',
	title : '系统身份'
    }, {
	field : '_op',
	title : '操作',
	formatter : function(value, row, index) {
	    var str = '<a class="switch ml10" href="'+webPath+'/sys/user/switchTo/'+row.id+'" style="margin-left:5px" title="切换">切换 <i class="glyphicon glyphicon-edit"></i></a>'
	    return str;
	}
    }

    ];

    columnsFrom = [ {
	field : 'checkStatus',
	checkbox : true
    }, {
	field : 'id',
	visible : false,
	title : "id",
    }, {
	field : 'username',
	title : '姓名'
    }, {
	field : 'identityRoleName',
	title : '系统身份'
    }, {
	field : '_op',
	title : '操作',
	formatter : function(value, row, index) {
	    var str = '<a class="switch ml10" href="'+webPath+'/sys/user/switchTo/'+row.id+'" style="margin-left:5px" title="切换">切换 <i class="glyphicon glyphicon-edit"></i></a>'
	    return str;
	}
    } ];
    columnsTo = [ {
	field : 'checkStatus',
	checkbox : true
    }, {
	field : 'id',
	visible : false,
	title : "id",
    }, {
	field : 'username',
	title : '姓名'
    }, {
	field : 'identityRoleName',
	title : '系统身份'
    } , {
	field : '_op',
	title : '操作',
	formatter : function(value, row, index) {
	    var str = '<a class="switch ml10" href="'+webPath+'/sys/user/switchTo/'+row.id+'" style="margin-left:5px" title="解除">解除 <i class="glyphicon glyphicon-edit"></i></a>'
	    return str;
	}
    } ];

    mainList.Init = function() {
	console.log(_userName + "," + _userId);
	var identityUrl = webPath + 'sys/employee/part/list/' + _userId;
	var options1 = getBsTableOptions(identityUrl, "id_toolbar", columnsIdetity, null, false);
	$('#identity_list').bootstrapTable(options1);
	var fromUrl = webPath + 'sys/user/delegate/list';
	var options2 = getBsTableOptions(fromUrl, "from_toolbar", columnsFrom, null, false);
	$('#from_list').bootstrapTable(options2);
	var toUrl = webPath + 'sys/user/delegated/list';
	var options3 = getBsTableOptions(toUrl, "to_toolbar", columnsTo, null, false);
	$('#to_list').bootstrapTable(options3);

    }

    return mainList;
};
/**
 * 初始按钮事件
 */
var ButtonInit = function() {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function() {
	// 初始化页面上面的按钮事件

	$('#btn_identity_add').click(function() {
	    layer.open({
		type : 2,
		title : "添加用户",
		shade : [ 0.5, '#000', true ],
		shade : [ 0 ],
		area : [ '500px', '500px' ],
		anim : 2,
		content : [ webPath + 'sys/employee/part/form?id='+_userId, 'no' ], // iframe的url，no代表不显示滚动条
		end : function() { // 此处用于演示

		}
	    });

	});
	$('#btn_edit').click(function() {
	    console.log("click");
	    var rows = $('#dataList').bootstrapTable('getAllSelections');
	    if (rows.length == 0) {
		layer.alert("请选择一条数据！");
		return;
	    }
	    if (rows.length > 1) {
		layer.alert("只能选择一条数据！");
		return;
	    }
	    var id = rows[0].id;
	    layer.open({
		type : 2,
		title : "修改用户",
		shade : [ 0.5, '#000', true ],
		// closeBtn: 0, //不显示关闭按钮
		shade : [ 0 ],
		area : [ '500px', '400px' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/user/form?id=' + id, 'no' ], // iframe的url，no代表不显示滚动条
		end : function() { // 此处用于演示

		}
	    });

	});

	$("#btn_delete").click(function() {
	    var rows = $('#dataList').bootstrapTable('getAllSelections');
	    if (rows.length == 0) {
		layer.alert("请选择一条数据！");
		return;
	    }
	    if (rows.length > 1) {
		layer.alert("只能选择一条数据！");
		return;
	    }
	    console.log("rows=" + JSON.stringify(rows));
	    data = {
		id : rows[0].id
	    };
	    $.ajax({
		url : webPath + "/sys/user/delete",
		data : data,
		type : "POST",
		dataType : "json",
		success : function(result) {
		    if (result.code == "200") {
			$("#dataList").bootstrapTable('refresh', {
			    silent : true
			});
			parent.layer.closeAll();
		    } else {
			layer.alert(result.msg);
		    }

		},
		error : function(error) {
		    parent.layer.closeAll();
		    layer.alert("请求出错！");
		}
	    });
	});
	/**
	 * 分配角色
	 */
	$("#btn_setRole").click(function() {
	    var rows = $('#dataList').bootstrapTable('getAllSelections');
	    if (rows.length == 0) {
		layer.alert("请选择一条数据！");
		return;
	    }
	    if (rows.length > 1) {
		layer.alert("只能选择一条数据！");
		return;
	    }
	    var id = rows[0].id;
	    layer.open({
		type : 2,
		title : "分配角色",
		shade : [ 0.5, '#000', true ],
		// closeBtn: 0, //不显示关闭按钮
		shade : [ 0 ],
		area : [ '100%', '100%' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/user/role/select?id=' + id, 'no' ], // iframe的url，no代表不显示滚动条
		btn : [ '确定', '关闭' ],
		yes : function(index) {
		    // 当点击‘确定’按钮的时候，获取弹出层返回的值
		    var res = window["layui-layer-iframe" + index].callback();
		    var roleIds = res.join();
		    // 打印返回的值，看是否有我们想返回的值。
		    console.log(roleIds);
		    var data = {
		        userId : id,
		        roleIds : roleIds
		    }
		    $.ajax({
		        url : webPath + "/sys/user/role/set",
		        data : data,
		        type : "POST",
		        dataType : "json",
		        success : function(result) {
			    if (result.code == "200") {
			        $("#dataList").bootstrapTable('refresh', {
				    silent : true
			        });
			        layer.close(index);
			    } else {
			        layer.alert(result.msg);
			    }

		        },
		        error : function(error) {
			    // 最后关闭弹出层
			    layer.close(index);
			    layer.alert("请求出错！");
		        }
		    });

		    // 最后关闭弹出层
		    layer.close(index);
		},
		cancel : function() {
		    // 右上角关闭回调
		},
		end : function() { // 此处用于演示

		}
	    });

	});

    };

    return oInit;
}