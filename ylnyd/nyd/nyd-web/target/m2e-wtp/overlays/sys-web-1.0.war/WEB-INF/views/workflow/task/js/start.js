var currentDepId;
var loaddingIndex;
$(function() {
    //    var mainList = new MainList();
    //    mainList.Init();

    initGrid();
    var oButtonInit = new ButtonInit();
    oButtonInit.Init()

    laydate({
	elem : '#kaishiTime',
	type : 'datetime',
	format : 'YYYY-MM-DD'
    });
    laydate({
	elem : '#jieshuTime',
	type : 'datetime',
	format : 'YYYY-MM-DD'
    });
});

/**
 * 类型树选择回调事件
 */
function onItemNodeSelected(cid) {

    console.log("cid select=" + cid);
    $("#category-selected-id").val(cid);// form中隐藏的部门
    if (_roles == "") {
	layer.alert("请联系管理员，为您设置角色！")
	return;
    }

    //    refreshList(cid);

    var url = webPath + "process/manager/latest/list/" + cid;
    $.ajax({
	url : url,
	type : "POST",
	dataType : "json",
	success : function(result) {
	    var data = result.rows;

	    if (result.total == 0) {
		console.log("该类型下没有可申请的流程!");
	    }

	    var proDefs = getMyProcessDef(data)

	    if (proDefs.length == 1) {
		launch(proDefs[0].key, proDefs[0].formWidth, proDefs[0].formHeight);
	    } else if (proDefs.length > 1) {
		var content = "<ul>";
		for (i in proDefs) {
		    var item = proDefs[i];
		    var key = '"' + item.key + '"';
		    var w = '"' + item.formWidth + '"';//宽
		    var h = '"' + item.formHeight + '"';//高
		    content += "<li><a href='javascript:void(0)' onclick='launch(" + key + "," + w + "," + h + ")" + "'>" + item.name + "</a></li>";
		}
		//		for(i in proDefs){
		//		    var item=proDefs[i];
		//		    var key='"'+item.key+'"';
		//		    content+="<li><a href='javascript:void(0)' onclick='launch("+key+"</a></li>";
		//		}
		content += "</ul>";

		layer.open({
		    title : '请选择适当流程!',
		    content : content,
		});

	    }
	    //	    if (result.code == "200") {
	    //		$("#dataList").bootstrapTable('refresh', {
	    //		    silent : true
	    //		});
	    //		parent.layer.closeAll();
	    //	    } else {
	    //		layer.alert(result.msg);
	    //	    }

	},
	error : function(error) {
	    parent.layer.closeAll();
	    layer.alert("请求出错！");
	}
    });

}
/**
 * 根据自己的角色找到自己可以发起的流程
 * @param data
 */
function getMyProcessDef(data) {
    var myRoles = _roles;

    var myProDef = [];
    var n = 0;
    var defaultProDef;
    for (i in data) {
	var proDefRoles = data[i].startRoles;
	var proRoles = (proDefRoles != null && "" != proDefRoles.trim()) ? proDefRoles.split(",") : [];
	if (proRoles.length == 0) {
	    defaultProDef = data[i];
	    n++;
	}
	var valide = false;
	for (j in proRoles) {
	    if (_hasRole(proRoles[j])) {
		valide = true
		break;
	    }
	}
	if (valide) {
	    myProDef.push(data[i]);
	}
    }
    if (myProDef.length == 0 && n == 1) {
	myProDef.push(defaultProDef);
    }

    console.log("myProDef length=" + myProDef.length);
    return myProDef;

}

/**
 * 格努流程类型启动流程
 */
function startProcess(cid) {
    $.ajax({
	url : webPath + "/sys/org/batchdelete",
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

function refresh() {
	
    var cid = $("#category-tree-Select-id").val();
    refreshList(cid);
}

function refreshList(cid) {

    $('#dataList').bootstrapTable('refresh', {
	query : {
	    'category' : cid
	}
    });
}

//function refreshList(category) {
//    
//    
//    $("#dataList").bootstrapTable("refresh", {
//	query : {
//	    category : category
//	}
//    });
//}
var MainList = function() {
    var mainList = new Object();
    var url = webPath + "process/manager/latest/list";
    var columns = [
	{
	    field : "name",
	    title : "申请名称",
	    align : "center"
	},
	{
	    field : "version",
	    title : "当前环节",
	    align : "center"
	},
	{
	    field : "deploymentTime",
	    title : "申请时间",
	    align : "center"
	},
	{
	    field : '_op',
	    align : 'center',
	    title : '操作',
	    formatter : function(value, row, index) {

	        var str = '<ul class="op" style="list-style:none;width:105px;margin:0 auto;">';
	        str += '<li style="margin-left:10px"><a class="launch" style="float:left;" href="javascript:void(0)" title="查看"><i class="glyphicon glyphicon-deploy">查看</i></a><a class=" " href="javascript:void(0)" style="float:left;margin-left:20px;color:red" title="撤销"><i class="glyphicon glyphicon-deploy">撤销</i></a></li></li>';
	        return str += '</ul>';
	    },
	    events : {
	        'click .launch' : function(e, value, row, index) {
	            launch(row.key);
	            // loaddingIndex=layer.load(0, {shade: false});
	        },
	        'click .launch' : function(e, value, row, index) {
	            launch(row.key);
	            // loaddingIndex=layer.load(0, {shade: false});
	        },

	    }
	}

    ];
    mainList.Init = function() {
	$("#dataList").bootstrapTable(getBsTableOptions(url, "toolbar", columns, null, null))
    };
    mainList.queryParams = function(params) {
	var temp = {
	    pageSize : params.pageSize,
	    pageNumber : params.pageNumber,
	};
	return temp
    };
    return mainList
};
// 发起申请 w:表单弹框宽，h:表单弹框高
function launch(proDefKey, w, h) {
    //    layer.close(layer.index);
    var rows = $("#dataList").bootstrapTable("getAllSelections");
    // data = {
    // id: rows[0].key
    // };
    // var url=webPath + "/process/task/launch/detail"+prodefId;
    // self.location=url;
    //    var url = webPath + "/process/task/launch/detail?proDefKey=" + proDefKey;
    //    self.location = url;
    var size = [];
    if (w != null && h != null) {
	size.push(w, h);
    } else {
	size = [ '100%', '100%' ];
    }

    layer.open({
	//	closeBtn: 0,
	type : 2,
	title : "发起申请",
	shade : [ 0.5, '#000', true ],
	//         closeBtn: 0, //不显示关闭按钮
	shade : [ 0 ],
	area : size,
	// offset: 'rb', //右下角弹出
	// time: 2000, //2秒后自动关闭
	anim : 2,
	//         content : [ webPath+"/process/task/todo/detail/"+ taskId, 'no' ], // iframe的url，no代表不显示滚动条
	content : [ webPath + "/process/task/launch/detail?proDefKey=" + proDefKey ], // iframe的url，no代表不显示滚动条

	cancel : function() {
	    //右上角关闭回调
	},
	end : function() { // 此处用于演示

	}
    });
}
function initGrid() {
    // 		alert("ok");
    var columns = [ [
	{
	    field : 'id',
	    checkbox : true
	},
	{
	    field : 'initator',
	    title : '申请人',
	    align : 'center',

	    sortable : false,
	    formatter : function(value, row, index) {
	        if (row.initator) {
		    return row.initator.username;
	        } else {
		    return "";
	        }

	    }

	},
	{
	    field : 'processName',
	    title : '申请名称',
	    align : 'center',
	    sortable : false

	},
	{
	    field : 'startTime',
	    title : '申请时间',
	    align : 'center',

	    sortable : false

	},
	{
	    field : 'taskName',
	    title : '当前环节',
	    align : 'center',
	    formatter : function(value, row, index) {
	        if (row.canceled) {
		    return "已撤销";
	        } else {
		    return value;
	        }

	    }

	// 				hidden : true
	},
	{
	    field : '_op',
	    title : '操作',
	    align : 'center',

	    formatter : function(value, row, index) {
	        //            return "<a href='javascript:;' onclick=detaillist('" + row.proDefKey + "','" + row.proInstanceId + "')>查看</a>"
	        var str = '<ul class="op" style="list-style:none;width:105px;margin:0 auto;">';
	        str += '<li style="margin-left:10px"><a class="" style="float:left;" href="javascript:void(0)" title="查看" onclick=detaillist("'
	            + row.proDefKey
	            + '","'
	            + row.proInstanceId
	            + '")><i class="glyphicon glyphicon-deploy">查看</i></a>'
	            if(!row.canceled&&row.cancelAble){
	        	str+='<a data-id="'+row.proInstanceId+'" class=" " href="javascript:void(0)" style="float:left;margin-left:20px;color:red" title="撤销" onclick=cancelProcess("'
		            + row.proDefKey + '","' + row.proInstanceId + '")><i class="glyphicon glyphicon-deploy">撤销</i></a>'
	            }
	            str+='</li></li>';
	        return str += '</ul>';
	    }

	} ] ];
    var url = webPath + 'process/task/search/list?initiatorId=' + _userId;
    var options=getBsTableOptions(url, "toolbar", columns, null, null);
    $("#dataList").bootstrapTable(options);
    
    
}
/**
 * 查看明细账
 */
function detaillist(proDefKey, processInstanceId) {
    // 			console.log("rowData="+rowData);
    // 			var rows = $('#dataList').datagrid('getSelections');
    //	data = JSON.stringify(rows);
    //	alert(rows[0].id);
    // 			var id = rowData.id;
    // 			var taskId=rowData.taskId;
    console.log("idkey:" + proDefKey + ",processInsatanceId=" + processInstanceId);
    var fromPage = 2;
    if (proDefKey != null) {
	layer.open({
	    type : 2,
	    title : "查看明细",
	    shade : [ 0.5, '#000', true ],
	    // closeBtn: 0, //不显示关闭按钮
	    shade : [ 0 ],
	    area : [ '100%', '100%' ],
	    // offset: 'rb', //右下角弹出
	    // time: 2000, //2秒后自动关闭
	    anim : 2,
	    //	            content : [ webPath+"process/task/search/detail/" + processInstanceId,, 'no' ], // iframe的url，no代表不显示滚动条
	    content : [ webPath + "process/task/detail?sourcePage=2&processInstanceId=" + processInstanceId + "&proDefKey=" + proDefKey ], // iframe的url，no代表不显示滚动条

	    cancel : function() {
		//右上角关闭回调
	    },
	    end : function() { // 此处用于演示

	    }
	});
    }
}
/**
 * 撤销
 * @param taskId
 * @param userId
 */
function cancelProcess(proDefKey, processInstanceId) {
    var params = {
    //	"userId" : userId
    }
    var posting = $.post(webPath + 'process/task/cancel/' + processInstanceId, params, function(data) {
	if (data.code == 200) {
	    $("#dataList").bootstrapTable('refresh', {
		silent : true,
	    });
	    layer.alert("已撤销!")
	} else {
	    if (data.msg) {
		layer.alert(data.msg);
	    }
	}
    });
    posting.fail(function(data) {
	if (data.msg) {
	    layer.alert(data.msg);
	}
    });
}

var ButtonInit = function() {
    var oInit = new Object();
    var postdata = {};
    oInit.Init = function() {

    };
    return oInit
};

function queryCallback(data){
	data.startTime = data.startTime+" 00:00:00";
	data.endTime = data.endTime+" 23:59:59";
	return data;
}
function resetCallback(data){
	data.category=""
	return data
}