$(function() {
    // 1.初始化Table
    var mainList = new MainList();
    mainList.Init();

    // 2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();
    laydate({
        elem : '#start',
        type : 'datetime',
        format : 'YYYY-MM-DD',
        
      });

      laydate({
        elem : '#end',
        type : 'datetime',
        format : 'YYYY-MM-DD',
        
      });

});
//function queryCallback(data){
//
//    data.sortField="createDate"
//    data.sortDir="asc"
//	return data;
//}
function refreshList(resId) {

    $('#dataList').bootstrapTable('refresh');
}
var callback = function() {
    return bsTable.selectionIds;
}
var MainList = function() {
    var mainList = new Object();
    var url = webPath + 'sys/log/list';

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
	field : 'content',
	title : '内容'
    }, {
	field : 'execption',
	title : '异常信息'
    }, {
	field : 'className',
	title : '类'
    }, {
	field : 'methodName',
	title : '方法'
    }, {
	field : 'createDate',
	title : '时间'
    }, {
	title : '操作人',
	field:"username"
	
    } ];

    columnsSelect = [ {
	field : 'checkStatus',
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
	field : 'username',
	title : '姓名'
    }, {
	field : 'cellphone',
	title : '手机号'
    } ];

    mainList.Init = function() {
	var options = getBsTableOptions(url, "toolbar", columns, mainList.queryParams, null);
	options.onLoadSuccess = function(data) { //加载成功时执行  
	    if (data.msg) {
		layer.msg(data.msg);
	    }
	}, options.onLoadError = function(data) {
	    "load error" + JSON.stringify(data)
	    if (data.code == 417) {
		console.log("load error" + JSON.stringify(data));
		layer.alert("抱歉权限不足");
	    }
	    $('#table').bootstrapTable('removeAll');
	};
	bsTable.initTable("dataList", options);

    }
    // 得到查询的参数
    mainList.queryParams = function(params) {
 	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	    pageSize : params.pageSize, // 页面大小
	    pageNumber : params.pageNumber, // 页码
	    'filter_GT[DTIME]_createDate':$("#start").val()?$("#start").val()+" 00:00:00":"",
	    'filter_LT[DTIME]_createDate':$("#end").val()?$("#end").val()+" 23:59:59":"",
	    'filter_LIKE_username':$("#userren").val()		
	};
	return temp;
    };
    return mainList;
};
/**
 * 初始按钮事件
 */
var ButtonInit = function() {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function() {

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
		url : webPath + "/sys/log/deleteLog",
		data : data,
		type : "POST",
		dataType : "json",
		success : function(result) {
		    if (result.code == "200") {
		            layer.msg("删除成功")
			$("#dataList").bootstrapTable('refresh', {
			    silent : true
			});
//			parent.layer.closeAll();
		    } else {
			layer.alert(result.msg);
		    }

		},
		error : function(error) {
//		    parent.layer.closeAll();
		    layer.alert("请求出错！");
		}
	    });
	});

    };

    return oInit;
}