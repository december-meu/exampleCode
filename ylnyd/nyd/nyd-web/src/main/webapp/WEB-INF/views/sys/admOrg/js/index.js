var currentDepId;// 当前选中的部门id
$(function() {

    // 1.初始化Table
    var mainList = new MainList();
    mainList.Init();

    // 2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

});
/**
 * 部门树选择回调事件
 */
//function onDepNodeSelected(depId) {
//    $("#dep-selected-id").val(depId);// form中隐藏的部门
//    refreshList(depId);
//}
/**
 * 机构选择回调事件
 */
function onOrgChanged(orgId) {
    $("#dep-selected-id").val('0');
    if (orgId == "")
	orgId = "0"// 如果为""条件会被忽略
    $('#dataList').bootstrapTable('refresh', {
	query : {
	    'filter_EQ_organization.id' : orgId
	}
    });
}
//function refreshList(depId) {
//    $('#dataList').bootstrapTable('refresh', {
//	query : {
//	    'filter_EQ_parent.id' : depId
//	}
//    });
//}
var callback = function() {
    return bsTable.selectionIds;
}

var MainList = function() {
    var mainList = new Object();
    var url = webPath + 'sys/admOrg/list';

    var columns = [ {
	checkbox : true
    }, {
	field : 'id',
	visible : false,
	title : "id",
    }, {
	field : 'code',
	title : '编码'
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
	field : 'name',
	title : '名称'
    }, {
	field : 'leaderName',
	title : '负责人'
    }, {
	field : 'description',
	title : '描述',
    }, {
	field : 'sortNum',
	title : '排序'
    } ];
    var columnsSelect = [ {
	field : 'checkStatus',
	checkbox : true
    }, {
	field : 'id',
	visible : false,
	title : "id",
    }, {
	field : 'code',
	title : '编码'
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
	field : 'name',
	title : '名称'
    }, {
	field : 'leaderName',
	title : '负责人'
    }, {
	field : 'description',
	title : '描述',
    }, {
	field : 'sortNum',
	title : '排序'
    } ];
    mainList.Init = function() {

	// $('#dataList').bootstrapTable(getBsTableOptions(url, "toolbar",
	// columns, null,null,{field:'sortNum',dir:'asc'}));

	var options = getBsTableOptions(url, "toolbar", columns, null, null, {
	    field : 'sortNum',
	    dir : 'asc'
	});
	$('#dataList').bootstrapTable(options);

    }
    // 得到查询的参数
    mainList.queryParams = function(params) {
	var admParentId = $('#admParentId').val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	    pageSize : params.pageSize, // 页面大小
	    pageNumber : params.pageNumber, // 页码
	    sortField : "sortNum",
	    sortDir : "asc"
	};
	if(_orgId){
	    temp.organization.id=_orgId
	}
	if (admParentId != "") {
	    temp["filter_NE_id"] = admParentId;
	}
	return temp;
    };
    return mainList;
};

var ButtonInit = function() {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function() {
	// 初始化页面上面的按钮事件
	$('#btn_add').click(function() {
	    layer.open({
		type : 2,
		title : "添加部门",
		shade : [ 0.5, '#000', true ],
		shade : [ 0 ],
		area : [ '600px', '700px' ],
		anim : 2,
		content : [ webPath + 'sys/admOrg/form', 'no' ], // iframe的url，no代表不显示滚动条
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
		title : "修改组织机构",
		shade : [ 0.5, '#000', true ],
		shade : [ 0 ],
		area : [ '600px', '700px' ],
		anim : 2,
		content : [ webPath + 'sys/admOrg/form?id=' + id , 'no' ], // iframe的url，no代表不显示滚动条
		end : function() { // 此处用于演示

		}
	    });

	});

	$("#btn_delete").click(function() {
	    var rows = $('#dataList').bootstrapTable('getAllSelections');
	    if (rows.length == 0) {
	    	layer.msg("请选择要删除的数据！");
	    	return;
	    }
	    layer.confirm('确定删除吗?', { title:'提示'}, function(index){
			if(index){
			    var id = rows[0].id;
			    var data={};
			    data.id = id;
			    $.ajax({
				url : webPath + "/sys/admOrg/delete",
				data : data,
				type : "POST",
				dataType : "json",
				success : function(result) {
				    if (result.code == "200") {
				    	layer.msg('删除成功', {icon : 1,time : 1000});
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
			layer.close(index);
		});
	});
	$("#btn_setLeader").click(function() {
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
		title : "指定负责人",
		shade : [ 0.5, '#000', true ],
		shade : [ 0 ],
		area : [ '80%', '80%' ],
		anim : 2,
		content : [ webPath + 'sys/admOrg/leader/select?id=' + id ], // iframe的url，no代表不显示滚动条
		btn : [ '确定', '关闭' ],
		yes : function(index) {
		    // 当点击‘确定’按钮的时候，获取弹出层返回的值
		    var res = window["layui-layer-iframe" + index].callback();
		    var empId = res.join();
		    // 打印返回的值，看是否有我们想返回的值。
		    console.log("selectuseiD=" + empId);
		    var data = {
		        admOrgId : id,
		        userId: empId
		    }
//		    var depId = getSelectedDep();
		    $.ajax({
		        url : webPath + "/sys/admOrg/leader/set",
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
	
	$("#btn_setDeps").click(function() {
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
		title : "设置行政子部门",
		shade : [ 0.5, '#000', true ],
		// closeBtn: 0, //不显示关闭按钮
		shade : [ 0 ],
		area : [ '600', '600' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/admOrg/dep/select?id=' + id ], // iframe的url，no代表不显示滚动条
		btn : [ '确定', '关闭' ],
		yes : function(index) {
		    // 当点击‘确定’按钮的时候，获取弹出层返回的值
		    var res = window["layui-layer-iframe" + index].callback();
		    var depIds = res.join();
		    // 打印返回的值，看是否有我们想返回的值。
		    console.log("selectuseiD=" + depIds);
		    var data = {
		        admOrgId : id,
		        depIds : depIds
		    }
		    $.ajax({
		        url : webPath + "/sys/admOrg/dep/set",
		        data : data,
		        type : "POST",
		        dataType : "json",
		        success : function(result) {
			    if (result.code == "200") {
			        $("#dataList").bootstrapTable('refresh', {
//			            query : {
//				        "filter_EQ_parent.id" : depId
//			            },
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
    };

    return oInit;
};