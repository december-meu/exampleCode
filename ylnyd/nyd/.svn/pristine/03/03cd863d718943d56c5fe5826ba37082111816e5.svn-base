$(function() {
    // 1.初始化Table
    var mainList = new MainList();
    mainList.Init();

    // 2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();
});
/**
 * 资源树选择回调事件
*/
function onNodeSelected(resId){
//    $("#dep-selected-id").val(resId);//form中隐藏的部门
    refreshList(resId);
}

function refreshList(resId) {
    $('#dataList').bootstrapTable('refresh', {
	query : {
	    'filter_EQ_parent.id' : resId
	}
    });
}

var queryCallback=function(data){
	 var key='filter_EQ_parent.id';
	 data[key]=getSelectedNodeId();
	 return data;
}

var resetCallback=function(data){
	 var key='filter_EQ_parent.id';
	 data[key]=getSelectedNodeId();
	 return data;
}

var MainList = function() {
    var mainList = new Object();
    var url = webPath + 'sys/res/list';

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
	field : 'name',
	title : '名称'
    }, {
	field : 'url',
	title : '链接'
    }, {
	field : 'permission',
	title : '标识'
    }, {
	field : 'icon',
	title : '图标'
    },{
	field : 'description',
	title : '描述',
    },{
	field : 'sortNum',
	title : '排序'
    }];
    mainList.Init = function() {
	$('#dataList').bootstrapTable(getBsTableOptions(url, "toolbar", columns, null,null,{field:'sortNum',dir:'asc'}));
    }
    // 得到查询的参数
    mainList.queryParams = function(params) {
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	    pageSize : params.pageSize, // 页面大小
	    pageNumber : params.pageNumber, // 页码
	    sortField: "sortNum",
	    sortDir:"asc"
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
	    var pid=getSelectedNodeId();
	    if(pid==""){
		layer.alert("请选择上级资源");
		return;
	    }
	    layer.open({
		type : 2,
		title : "添加资源",
		shade : [ 0.5, '#000', true ],
		shade : [ 0 ],
		area : [ '600px', '700px' ],
		anim : 2,
		content : [ webPath + 'sys/res/form?pid='+pid, 'no' ], // iframe的url，no代表不显示滚动条
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
		// closeBtn: 0, //不显示关闭按钮
		shade : [ 0 ],
		area : [ '600px', '700px' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/res/form?id=' + id, 'no' ], // iframe的url，no代表不显示滚动条
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
	    data = {
		id : rows[0].id
	    };
	    $.ajax({
		url : webPath + "/sys/res/delete",
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
	
    };

    return oInit;
};