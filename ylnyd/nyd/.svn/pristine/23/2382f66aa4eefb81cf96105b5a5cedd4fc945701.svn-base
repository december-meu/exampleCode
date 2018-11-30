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

var MainList = function() {
    var mainList = new Object();
    var url = webPath + 'sys/group/list';

    var columns = [ {
	checkbox : true
    }, {
	field : 'id',
	visible : false,
	title : "id",
    }, {
	// field : 'type.name',
	title : '类型',

	formatter : function(value, row, index) {
	    if (row.type) {
		return row.type.name;
	    } else {
		return "";
	    }
	}
    }, {
	field : 'code',
	title : '编码'
    }, {
	field : 'name',
	title : '名称'
    }, {
	field : 'description',
	title : '描述'
    }, {
	field : '_op',
	title : '操作',
	formatter : function(value, row, index) {
	    var str = "";
	    if (_isPermited("group:edit")) {
		str += '<a class="edit ml10" href="javascript:void(0)" title="修改">修改 <i class="glyphicon glyphicon-edit"></i></a>'
	    }
	    if (_isPermited("group:delete")) {
		str += '<a class="delete ml10" href="javascript:void(0)" style="margin-left:5px" title="删除">删除 <i class="glyphicon glyphicon-edit"></i></a>'
	    }

	    return str;
	},
	events : {
	    'click .edit' : function(e, value, row, index) {
	        showEdit(row.id);
	    },
	    'click .delete' : function(e, value, row, index) {
	        deleteGroup(row.id);
	    },

	}
    } ];
    mainList.Init = function() {
	$('#dataList').bootstrapTable(getBsTableOptions(url, "toolbar", columns, null, null, {
	    field : 'sortNum',
	    dir : 'asc'
	}));
    }
    // 得到查询的参数
    mainList.queryParams = function(params) {
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	    pageSize : params.pageSize, // 页面大小
	    pageNumber : params.pageNumber, // 页码
	};
	return temp;
    };
    return mainList;
};

function showEdit(id) {
    layer.open({
	type : 2,
	title : "修改组织机构",
	shade : [ 0.5, '#000', true ],
	// closeBtn: 0, //不显示关闭按钮
	shade : [ 0 ],
	area : [ '600px', '700px' ],
	// offset: 'rb', //右下角弹出
	// time: 2000, //2秒后自动关闭
	anim : 2,
	content : [ webPath + 'sys/group/form?id=' + id, 'no' ], // iframe的url，no代表不显示滚动条
	end : function() { // 此处用于演示

	}
    });
}

function deleteGroup(id) {
    var data = {
	id : id
    };
    $.ajax({
	url : webPath + "/sys/group/delete",
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
}
/**
 * 初始按钮事件
 */

var ButtonInit = function() {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function() {
	// 初始化页面上面的按钮事件

	$('#btn_add').click(function() {
	    console.log("click");

	    layer.open({
		type : 2,
		title : "添加资源",
		shade : [ 0.5, '#000', true ],
		shade : [ 0 ],
		area : [ '600px', '700px' ],
		anim : 2,
		content : [ webPath + 'sys/group/form', 'no' ], // iframe的url，no代表不显示滚动条
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
	    showEdit(id);

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
	    var id = rows[0].id;
	    deleteGroup(id);
	});
	$("#btn_setUser").click(function() {
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
		area : [ '80%', '80%' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/group/user/select?id=' + id ], // iframe的url，no代表不显示滚动条
		btn : [ '确定', '关闭' ],
		yes : function(index) {
		    // 当点击‘确定’按钮的时候，获取弹出层返回的值
		    var res = window["layui-layer-iframe" + index].callback();
		    var userIds = res.join();
		    // 打印返回的值，看是否有我们想返回的值。
		    console.log(userIds);
		    var data = {
		        groupId : id,
		        userIds : userIds
		    }
		    $.ajax({
		        url : webPath + "/sys/group/user/set",
		        data : data,
		        type : "POST",
		        dataType : "json",
		        success : function(result) {
			    if (result.code == "200") {
			        $("#dataList").bootstrapTable('refresh', {
				    silent : true
			        });
			        layer.close(index);
			        layer.alert(result.msg);
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
	$("#btn_setEmp").click(function() {
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
		area : [ '600', '600' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/group/emp/select?id=' + id ], // iframe的url，no代表不显示滚动条
		btn : [ '确定', '关闭' ],
		yes : function(index) {
		    // 当点击‘确定’按钮的时候，获取弹出层返回的值
		    var res = window["layui-layer-iframe" + index].callback();
		    var userIds = res.join();
		    // 打印返回的值，看是否有我们想返回的值。
		    console.log(userIds);
		    var data = {
		        groupId : id,
		        userIds : userIds
		    }
		    $.ajax({
		        url : webPath + "/sys/group/user/set",
		        data : data,
		        type : "POST",
		        dataType : "json",
		        success : function(result) {
			    if (result.code == "200") {
			        $("#dataList").bootstrapTable('refresh', {
				    silent : true
			        });
			        layer.close(index);
			        layer.alert(result.msg);
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
		area : [ '80%', '80%' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/group/role/select?id=' + id ], // iframe的url，no代表不显示滚动条
		btn : [ '确定', '关闭' ],
		yes : function(index) {
		    // 当点击‘确定’按钮的时候，获取弹出层返回的值
		    var res = window["layui-layer-iframe" + index].callback();
		    var roleIds = res.join();
		    // 打印返回的值，看是否有我们想返回的值。
		    console.log(roleIds);
		    var data = {
		        groupId : id,
		        roleIds : roleIds
		    }
		    $.ajax({
		        url : webPath + "/sys/group/role/set",
		        data : data,
		        type : "POST",
		        dataType : "json",
		        success : function(result) {
			    if (result.code == "200") {
			        $("#dataList").bootstrapTable('refresh', {
				    silent : true
			        });
			        layer.close(index);
			        layer.alert(result.msg);
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
		    //右上角关闭回调
		},
		end : function() { // 此处用于演示

		}
	    });
	});

    };

    return oInit;
};