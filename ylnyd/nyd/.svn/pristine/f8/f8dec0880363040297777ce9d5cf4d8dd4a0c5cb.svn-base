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
function onDepNodeSelected(depId){
    $("#dep-selected-id").val(depId);//form中隐藏的部门
    refreshList(depId);
}
/**
 * 机构选择回调事件
*/
/*function onOrgChanged(orgId){
    $("#dep-selected-id").val('0');
    if(orgId=="")orgId="0"//如果为""条件会被忽略 
    $('#dataList').bootstrapTable('refresh', {
	query : {
	    'filter_EQ_organization.id' : orgId
	}
    });
}*/
function refreshList(depId,num) {
    $('#dataList').bootstrapTable('refresh', {
	query : {
	    'filter_EQ_department.id' : depId
	},
	pageNumber:num
    });
}
var callback = function() {
    return bsTable.selectionIds;
}

var MainList = function() {
    var mainList = new Object();
    var url = webPath + 'sys/position/list';

    var columns = [ {
	checkbox : true
    }, {
	field : 'id',
	visible : false,
	title : "id",
    },{
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
	field : 'description',
	title : '描述',
    } ];
    var columnsSelect = [ {
	field : 'checkStatus',
	checkbox : true
    }, {
	field : 'id',
	visible : false,
	title : "id",
    },{
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
	field : 'description',
	title : '描述',
    } ];
    mainList.Init = function() {
//	$('#dataList').bootstrapTable(getBsTableOptions(url, "toolbar", columns, mainList.queryParams));
	var options = getBsTableOptions(url, "toolbar", columns, mainList.queryParams, null);
	if (!isSelectForm) {
	    $('#dataList').bootstrapTable(options);
	} else {
	    var posIds = $('#positionIds').val();
	    if (posIds != "") {
		bsTable.selectionIds = posIds.split(",")
	    }
	    options.columns = columnsSelect;
	    
	    if(isSingleSelect){
		options.singleSelect=true;
		bsTable.initTable("dataList", options,true);
	    }else{		
		bsTable.initTable("dataList", options);
	    }

	}
	
	
    }
    // 得到查询的参数
    mainList.queryParams = function(params) {
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	    pageSize : params.pageSize, // 页面大小
	    pageNumber : params.pageNumber, // 页码
	    sortField:"code",
	    sortDir:"asc"
	};
	$("#pagenumber").val(params.pageNumber)
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
	    layer.open({
		type : 2,
		title : "添加部门",
		shade : [ 0.5, '#000', true ],
		shade : [ 0 ],
		area : [ '600px', '700px' ],
		anim : 2,
		content : [ webPath + 'sys/position/form', 'no' ], // iframe的url，no代表不显示滚动条
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
		title : "调整岗位",
		shade : [ 0.5, '#000', true ],
		// closeBtn: 0, //不显示关闭按钮
		shade : [ 0 ],
		area : [ '600px', '700px' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/position/form?id=' + id, 'no' ], // iframe的url，no代表不显示滚动条
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
	    $.ajax({
		url : webPath + "/sys/position/batchdelete",
		data : data,
		type : "POST",
		dataType : "json",
		success : function(result) {
		    if (result.code == "200") {
			$("#dataList").bootstrapTable('refresh', {
			    silent : true
			});
			 var depId=$("#dep-selected-id").val();
			 refreshList(depId);
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
    };

    return oInit;
};