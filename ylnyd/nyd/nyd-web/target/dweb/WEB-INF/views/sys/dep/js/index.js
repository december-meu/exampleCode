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
function onDepNodeSelected(depId) {
    $("#dep-selected-id").val(depId);// form中隐藏的部门
    refreshList(depId);
}
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
function refreshList(depId) {
    $('#dataList').bootstrapTable('refresh', {
	query : {
	    'filter_EQ_parent.id' : depId
	}
    });
}
var callback = function() {
    return bsTable.selectionIds;
}

var MainList = function() {
    var mainList = new Object();
    var url = webPath + 'sys/dep/list';

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

	if (!isSelectForm) {
	    var options = getBsTableOptions(url, "toolbar", columns, null, null, {
		field : 'sortNum',
		dir : 'asc'
	    });
	    $('#dataList').bootstrapTable(options);
	} else {
	    var options1 = getBsTableOptions(url, "toolbar", columns, mainList.queryParams, null, {
		field : 'sortNum',
		dir : 'asc'
	    });
	    var roleIds = $('#depIds').val();
	    if (roleIds != "") {
		bsTable.selectionIds = roleIds.split(",")
	    }
	    options1.columns = columnsSelect;
	    bsTable.initTable("dataList", options1);

	}
    }
    // 得到查询的参数
    mainList.queryParams = function(params) {
	var admParentId = $('#admParentId').val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	    pageSize : params.pageSize, // 页面大小
	    pageNumber : params.pageNumber, // 页码
	    sortField : "sortNum",
	    sortDir : "asc",
	};
	if(_orgId){
//	    console.log(temp);
//	    console.log(temp.organization);
//	    temp.organization.id=_orgId
	    //0522孟伟鹏修改
	    admParentId = _orgId; 
	}
	if (admParentId != "") {
	    temp["filter_NE_id"] = admParentId;
	}
	return temp;
    };
    // 得到查询的参数
    mainList.queryParams2 = function(params) {
	var admParentId = $('#admParentId').val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	    pageSize : params.pageSize, // 页面大小
	    pageNumber : params.pageNumber, // 页码
	    sortField : "sortNum",
	    sortDir : "asc",
	    "filter_EQ_organization.id":getSeletedOrg(),
	    "filter_EQ_parent.id" : getSelectedDep()
	};
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
	    console.log("click");
	    var orgId = getSeletedOrg();
	    var pid = getSelectedDep();
	    if (pid == "") {
		layer.alert("请选择上级机构");
		return;
	    }
	    layer.open({
		type : 2,
		title : "添加部门",
		shade : [ 0.5, '#000', true ],
		shade : [ 0 ],
		area : [ '600px', '700px' ],
		anim : 2,
		content : [ webPath + 'sys/dep/form?orgId=' + orgId + "&pid=" + pid, 'no' ], // iframe的url，no代表不显示滚动条
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
	    var orgId = getSeletedOrg();
	    var pid = getSelectedDep();
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
		content : [ webPath + 'sys/dep/form?id=' + id + "&orgId=" + orgId + "&pid=" + pid, 'no' ], // iframe的url，no代表不显示滚动条
		end : function() { // 此处用于演示

		}
	    });

	});

	$("#btn_delete").click(function() {
	    var rows = $('#dataList').bootstrapTable('getAllSelections');
	    if (rows.length == 0) {
		layer.alert("请选择要删除的数据！");
		return;
	    }
	    var ids = "";
	    for (var i = 0; i < rows.length; i++) {
		var item = rows[i];
		if (i == rows.length - 1) {
		    ids += item.id;
		} else {
		    ids += item.id + ",";
		}
	    }
	    console.log("rows=" + JSON.stringify(rows));
	    console.log("ids=" + ids);
	    data = {
		ids : ids
	    };
	    var orgId = getSeletedOrg();
		data["orgId"] = orgId;
		console.log(orgId)
		layer.confirm('确定删除吗?', { title:'提示'}, function(index){
			if(index){
				 $.ajax({
						url : webPath + "/sys/dep/batchdelete",
						data : data,
						type : "POST",
						dataType : "json",
						success : function(result) {
						    if (result.code == "200") {
						    	$("#dataList").bootstrapTable('refresh', {
							    silent : true
							});
							initTreeView(orgId);
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
		// closeBtn: 0, //不显示关闭按钮
		shade : [ 0 ],
		area : [ '80%', '80%' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/dep/leader/select?id=' + id ], // iframe的url，no代表不显示滚动条
		btn : [ '确定', '关闭' ],
		yes : function(index) {
		    // 当点击‘确定’按钮的时候，获取弹出层返回的值
		    var res = window["layui-layer-iframe" + index].callback();
		    var empId = res.join();
		    // 打印返回的值，看是否有我们想返回的值。
		    console.log("selectuseiD=" + empId);
		    var data = {
		        depId : id,
		        empId : empId
		    }
		    var depId = getSelectedDep();
		    $.ajax({
		        url : webPath + "/sys/dep/leader/set",
		        data : data,
		        type : "POST",
		        dataType : "json",
		        success : function(result) {
			    if (result.code == "200") {
			        $("#dataList").bootstrapTable('refresh', {
			            query : {
				        "filter_EQ_parent.id" : depId
			            },
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
	$("#btn_setPosition").click(function() {
	    var rows = $('#dataList').bootstrapTable('getAllSelections');
	    var id = "";
	    if (rows.length == 0) {
		// id=getSelectedDep();
		layer.alert("请选择一条数据！");
		return;
	    }
	    if (rows.length > 1) {
		layer.alert("只能选择一条数据！");
		return;
	    }

	    id = rows[0].id;

	    layer.open({
		type : 2,
		title : "指定负责人",
		shade : [ 0.5, '#000', true ],
		// closeBtn: 0, //不显示关闭按钮
		shade : [ 0 ],
		area : [ '600', '600' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/dep/position/select?id=' + id ], // iframe的url，no代表不显示滚动条
		btn : [ '确定', '关闭' ],
		yes : function(index) {
		    // 当点击‘确定’按钮的时候，获取弹出层返回的值
		    var res = window["layui-layer-iframe" + index].callback();
		    var positionIds = res.join();
		    // 打印返回的值，看是否有我们想返回的值。
		    console.log("selectuseiD=" + positionIds);
		    var data = {
		        depId : id,
		        positionIds : positionIds
		    }
		    var depId = getSelectedDep();
		    $.ajax({
		        url : webPath + "/sys/dep/position/set",
		        data : data,
		        type : "POST",
		        dataType : "json",
		        success : function(result) {
			    if (result.code == "200") {
			        $("#dataList").bootstrapTable('refresh', {
			            query : {
				        "filter_EQ_parent.id" : depId
			            },
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
	$("#btn_setAdmChildren").click(function() {
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
		content : [ webPath + 'sys/dep/sub/select?admParentId=' + id ], // iframe的url，no代表不显示滚动条
		btn : [ '确定', '关闭' ],
		yes : function(index) {
		    // 当点击‘确定’按钮的时候，获取弹出层返回的值
		    var res = window["layui-layer-iframe" + index].callback();
		    var depIds = res.join();
		    // 打印返回的值，看是否有我们想返回的值。
		    console.log("selectuseiD=" + depIds);
		    var data = {
		        admParentId : id,
		        depIds : depIds
		    }
		    var depId = getSelectedDep();
		    $.ajax({
		        url : webPath + "/sys/dep/sub/set",
		        data : data,
		        type : "POST",
		        dataType : "json",
		        success : function(result) {
			    if (result.code == "200") {
			        $("#dataList").bootstrapTable('refresh', {
			            query : {
				        "filter_EQ_parent.id" : depId
			            },
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