//流程
$(function() {
    initBtns();
})
function initBtns() {

    var isAssign = $('#taskAssign').val();
    // console.log("isAssign:" + isAssign);
    if (isValidStr(isAssign)) {
	$('#assign').show();
	$('#candidate').hide();
	$('#assignHint').text("待办理");
    } else {
	$('#assign').hide();
	$('#candidate').show();
	$('#assignHint').text("待签收");

    }
}
function claim(taskId, userId) {
    alert("res");
    var params = {};
    var posting = $.post(webPath + '/process/task/claim/' + taskId, params, function(data) {
	if (data.code == 200) {
	    var userId = data.data;
	    $('#taskAssign').val(userId);
	    initBtns();
	}
    });
    posting.fail(function(data) {
	if(data.msg){	    
	    layer.alert(data.msg);
	}
    });

}
function complete(op) {
    var taskId = $('#taskId').val();
    var comment = $('#comment').val();
    if (!isValidStr(comment)) {
	comment = "blank";
    }

    var params = {};
    switch (op) {
    case "approve":
	params = {
	    keys : 'outcome,comment,reject',
	    values : 'true,' + comment + ",false",
	    types : 'S,S,S'
	}
	break;
    case "reject":
	if (comment == 'blank') {
	    layer.alert("请先输入驳回意见！");
	    return;
	}
	params = {
	    keys : 'outcome,comment,reject',
	    values : 'false,' + comment + ',true',
	    types : 'S,S,S'
	}
	break;
    case "submit":

	params = {
	    keys : 'comment,reject',
	    values : comment + ',false',
	    types : 'S,S,S'
	}
	break;
    case "reApply":
	params = {
	    keys : 'outcome,comment,reject',
	    values : 'true,' + comment + ',false',
	    types : 'S,S,S'
	}
	break;
    case "end":
	params = {
	    keys : 'outcome,comment,reject,end',
	    values : 'false,' + comment + ',false,true',
	    types : 'S,S,S'
	}
	break;

    default:
	break;
    }
    var posting = $.post(webPath + 'process/task/complete/' + taskId, params, function(result) {
	if (result.code == "200") {
	    parent.$("#dataList").bootstrapTable('refresh', {
		silent : true,
	    });
	    parent.layer.closeAll();
	} else {
	    layer.alert(result.msg);
	}
    });
    posting.error = function(data) {
	console.log("request fail")
	if(data.msg)
	layer.alert(result.msg);
	
    };
}
function closeFin() {
    // $('#detailList').datagrid('reload');
    // closeFinDialog();
    $('#myFinDialog').dialog("close");
}
function showFinDialog(options) {
    if (options.href && options.href != '') {
	options.href = webBasePath + options.href;
    }
    // $("#MyDialogIframe").src = options.href;
    $('#myFinDialog').dialog(options);
}
function closeFinDialog() {
    $('#myFinDialog').dialog("close");
}
function rollbackSingle(taskId) {
    var comment = $('#comment').val();
    // console.log(comment)
    if (!isValidStr(comment)) {
	comment = "blank";
    }
    if (comment == 'blank') {
	layer.alert("请先输入驳回意见！");
	return;
    }
    params = {
	keys : 'comment,reject',
	values : comment + ",true",
	types : 'S,S'
    }
    var posting = $.post(webPath + 'process/task/rollback/' + taskId + "/", params, function(result) {
	if (result.code == "200") {
	    parent.$("#dataList").bootstrapTable('refresh', {
		silent : true,
	    });
	    parent.layer.closeAll();
	} else {
	    layer.alert(result.msg);
	}
    });
    posting.fail = function(data) {
	if (data.msg) {
	    layer.alert(result.msg);
	} else {
	    layer.alert("操作失败！");
	}
    };
}
// 1表示向后跳转（回退）,2表示向前跳转
function jump(backOrForword, taskId) {
    // var taskId = $('#taskId').val();
    var comment = $('#comment').val();
    // console.log(comment)
    if (!isValidStr(comment)) {
	comment = "blank";
    }
    if (comment == 'blank') {
	if(backOrForword==1){	    
	    layer.alert("请先输入驳回意见！");
	}else if(backOrForword==2){
	    layer.alert("请输入跳转原因!")
	}
	return;
    }
    layer.open({
	type : 2,
	title : "分配资源",
	scrollbar: true,
	shade : [ 0.5, '#000', true ],
	// closeBtn: 0, //不显示关闭按钮
	shade : [ 0 ],
	area : [ '100%', '100%' ],
	// offset: 'rb', //右下角弹出
	// time: 2000, //2秒后自动关闭
	anim : 2,
	content :  webPath + 'process/task/activitis/' + backOrForword + '/' + taskId + "?comment=" + comment , // iframe的url，no代表不显示滚动条

	cancel : function() {
	    // 右上角关闭回调
	},
	end : function() { // 此处用于演示

	}
    });
}
function rollbackMulti() {
    var taskId = $('#taskId').val();
    var comment = $('#comment').val();
    // console.log(comment)
    if (!isValidStr(comment)) {
	comment = "blank";
    }
    if (comment == 'blank') {
	layer.alert("请先输入驳回意见！");
	return;
    }
    layer.open({
	type : 2,
	title : "分配资源",
	shade : [ 0.5, '#000', true ],
	// closeBtn: 0, //不显示关闭按钮
	shade : [ 0 ],
	area : [ '500', '600' ],
	// offset: 'rb', //右下角弹出
	// time: 2000, //2秒后自动关闭
	anim : 2,
	content : [ webPath + 'process/task/before/activitis/' + taskId + "?comment=" + comment, 'no' ], // iframe的url，no代表不显示滚动条

	cancel : function() {
	    // 右上角关闭回调
	},
	end : function() { // 此处用于演示

	}
    });
}
function jumpComplete(backOrForwrad, activitiId) {

    var taskId = $("#taskId").val();
    var comment = $('#comment').val();
    var params;

    var backOrForward = $('#back-forward').val();
    if (backOrForward == 1) {

	params = {
	    keys : 'comment,reject',
	    values : comment + ",true",
	    types : 'S,S'
	}
    } else {
	params = {
	    keys : 'comment,jump',
	    values : comment + ",true",
	    types : 'S,S'
	}
    }
    var posting = $.post(webPath + 'process/task/rollback/' + taskId + "/" + activitiId, params, function(data) {
	parent.$("#dataList").bootstrapTable('refresh', {
	    silent : true,
	});
	parent.layer.closeAll();
    });
    posting.fail(function(data) {
	if (data.msg) {
	    layer.alert(data.msg);
	} else {
	    layer.alert("操作失败")
	}
    });

}

function jumpMulti() {
    var taskId = $('#taskId').val();
    var comment = $('#comment').val();
    // console.log(comment)
    if (!isValidStr(comment)) {
	comment = "blank";
    }
    if (comment == 'blank') {
	layer.alert("请先输入跳转原因！");
	return;
    }
    layer.open({
	type : 2,
	title : "分配资源",
	shade : [ 0.5, '#000', true ],
	// closeBtn: 0, //不显示关闭按钮
	shade : [ 0 ],
	area : [ '500', '600' ],
	// offset: 'rb', //右下角弹出
	// time: 2000, //2秒后自动关闭
	anim : 2,
	content : [ webPath + 'process/task/after/activitis/' + taskId + "?comment=" + comment, 'no' ], // iframe的url，no代表不显示滚动条

	cancel : function() {
	    // 右上角关闭回调
	},
	end : function() { // 此处用于演示

	}
    });
}

function viewDiagram(taskId) {
    params = {
	keys : 'comment,reject',
	values : comment + ",true",
	types : 'S,S'
    }
    var getting = $.get(webBasePath + 'process/trace/' + taskId, params, function(data) {
	// $('#dataList').datagrid('reload');
	// closeDialog();
	if (data.msg) {
	    layer.alert(data.msg);
	}
    });
    posting.fail(function(data) {
	if (data.msg) {
	    layer.alert(data.msg);
	}
    });
}

function endProcess(taskId, userId) {
    var params = {
	"userId" : userId
    }
    var posting = $.post(webPath + 'process/task/end/' + taskId, params, function(data) {
	parent.$("#dataList").bootstrapTable('refresh', {
	    silent : true,
	});
	parent.layer.closeAll();
    });
    posting.fail(function(data) {
	if (data.msg) {
	    layer.alert(data.msg);
	}
    });
}

function closeThis() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}