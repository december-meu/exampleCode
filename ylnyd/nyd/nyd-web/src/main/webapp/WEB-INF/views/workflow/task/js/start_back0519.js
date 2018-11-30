var currentDepId;
var loaddingIndex;
$(function() {
	var mainList = new MainList();
	mainList.Init();
	var oButtonInit = new ButtonInit();
	oButtonInit.Init()
});

/**
 * 部门树选择回调事件
*/
function onItemNodeSelected(cid){
    
    console.log("cid select="+cid);
    $("#category-selected-id").val(cid);//form中隐藏的部门
    refreshList(cid);
}

function refreshList(cid) {
    $('#dataList').bootstrapTable('refresh', {
	query : {
	    'category' : cid
	}
    });
}

function refreshList(category) {
	$("#dataList").bootstrapTable("refresh",{query:{category:category}});
}
var MainList = function() {
	var mainList = new Object();
	var url =webPath+ "process/manager/latest/list";
	var columns = [{
		checkbox: true
	},
	{
		field: "name",
		title: "名称"
	},{
	    field: "version",
		title: "版本"
	},{
	    field: "deploymentTime",
	    title: "部署时间"
	}, {
		field : '_op',
		align: 'center',
		title : '操作',
		formatter : function(value, row, index) {
		    var str = '<ul class="op" style="list-style:none;float:left">';
			str += '<li style="margin-left:10px"><a class="launch ml10" href="javascript:void(0)" title="发起申请"><i class="glyphicon glyphicon-deploy">发起申请</i></a></li>';
		    return str+='</ul>';
		},
		events : {
		    'click .launch' : function(e, value, row, index) {		
			launch(row.id);
//			loaddingIndex=layer.load(0, {shade: false});
		    }
		}
	}
	
	];
	mainList.Init = function() {
		$("#dataList").bootstrapTable(getBsTableOptions(url, "toolbar", columns, null, null))
	};
	mainList.queryParams = function(params) {
		var temp = {
			pageSize: params.pageSize,
			pageNumber: params.pageNumber,
		};
		return temp
	};
	return mainList
};
//发起申请
function launch(prodefId){
    var rows = $("#dataList").bootstrapTable("getAllSelections");
	if (rows.length == 0) {
		layer.alert("请选择一条数据！");
		return;
	}
	if (rows.length > 1) {
		layer.alert("只能选择一条数据！");
		return;
	}
//	data = {
//		id: rows[0].key
//	};
	var id=rows[0].key;
	url: webPath + "/process/task/start/form/"+id,
	self.location=url;
/*	$.ajax({
		url: webPath + "/process/task/start/form/"+id,
		data: data,
		type: "POST",
		dataType: "json",
		success: function(result) {
			if (result.code == "200") {
				$("#dataList").bootstrapTable("refresh", {
					silent: true
				});
				parent.layer.closeAll();
			} else {
				layer.alert(result.msg);
			}
		},
		error: function(error) {
			parent.layer.closeAll();
			layer.alert("请求出错！")
		}
	})*/
}
var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};
	oInit.Init = function() {

	};
	return oInit
};