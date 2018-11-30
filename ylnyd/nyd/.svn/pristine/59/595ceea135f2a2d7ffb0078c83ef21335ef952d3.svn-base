$(function() {

    // 1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    // 1.初始化Table
    var mainList = new MainList();
    mainList.Init();

    // 2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

});

var MainList = function() {
    var mainList = new Object();
    var url = webPath + 'sys/dict/list';
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
	field : 'name',
	title : '名称'
    }, {
	field : 'description',
	title : '描述',
    }, {
	field : 'sortNum',
	title : '序号',
    } ];
    mainList.Init = function() {
    	$('#dict_list').bootstrapTable(getBsTableOptions(url, "toolbar", columns,mainList.queryParams,null,{field:"sortNum",dir:'asc'}));
    	var data = formtoJsonTrim("searchForm");
	    $("#dict_list").bootstrapTable("refresh");
    }
    // 得到查询的参数
    mainList.queryParams = function(params) {
    	var type_id = $("#dict_type").val();
    	if(type_id == "" || type_id == undefined){
    		type_id = "-1";
    	}
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	    pageSize : params.pageSize, // 页面大小
	    pageNumber : params.pageNumber, // 页码
	    typeId:type_id
	};
	return temp;
    };
    return mainList;
};

var TableInit = function() {
    var oTableInit = new Object();
    var url = webPath + 'sys/dictType/list/all';

    var columns = [ {
	checkbox : true,
	field : 'checked',
    }, {
	field : 'id',
	visible : false,
	title : "id",
    }, {
	field : 'code',
	title : '编码',
	visible:false
    }, {
	field : 'name',
	title : '名称'
    }, {
	field : 'sortNum',
	title : '序号'
    }, {
	field : 'description',
	visible:false,
	title : '描述'
    } ];
    oTableInit.Init = function() {
	var options = getBsTableOptions(url, "typeToolbar", columns,null,false,{field:"sortNum",dir:'asc'});
	options.onCheck = function(row, dom) {
	    var id = row.id;
	    $("#dict_type").val(id);
	    $('#dict_list').bootstrapTable('refresh', {
		query : {
		    typeId : id,
		}
	    });
	};
	$('#dict_type_list').bootstrapTable(options);
    }
    // 得到查询的参数
    oTableInit.queryParams = function(params) {
	console.log("params=" + JSON.stringify(params));
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	    pageSize : params.pageSize, // 页面大小
	    pageNumber : params.pageNumber, // 页码
	};
	return temp;
    };
    return oTableInit;
};

var ButtonInit = function() {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function() {
	// 初始化页面上面的按钮事件
	$('#btn_type_add').click(function() {
	    console.log("click");
	    layer.open({
		type : 2,
		title : false,
		shade : [ 0.5, '#000', true ],
		shade : [ 0 ],
		area : [ '500px', '400px' ],
		anim : 2,
		content : [ webPath + 'sys/dictType/form', 'no' ], // iframe的url，no代表不显示滚动条
		end : function() { // 此处用于演示

		}
	    });

	});
	$('#btn_type_edit').click(function() {
	    console.log("click");
	    var rows = $('#dict_type_list').bootstrapTable('getAllSelections');
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
		title : false,
		shade : [ 0.5, '#000', true ],
		// closeBtn: 0, //不显示关闭按钮
		shade : [ 0 ],
		area : [ '500px', '400px' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/dictType/form?id=' + id, 'no' ], // iframe的url，no代表不显示滚动条
		end : function() { // 此处用于演示

		}
	    });

	});

	$("#btn_type_delete").click(function() {
	    var rows = $('#dict_type_list').bootstrapTable('getAllSelections');
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
		url : webPath + "/sys/dictType/batchDelete",
		data : data,
		type : "POST",
		dataType : "json",
		success : function(result) {
		    if (result.code == "200") {
			$("#dict_type_list").bootstrapTable('refresh', {
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

	$("#btn_typeSearch").click(function() {
	    var data = formtoJsonTrim("type-searchForm");
	    console.log("data="+JSON.stringify(data));
	    $("#dict_type_list").bootstrapTable("refresh", {
		query : data
	    });
	});
	$("#btnSearch").click(function() {
	    var data = formtoJsonTrim("searchForm");
	    var typeId=$('#dict_type').val();
	    console.log("data="+JSON.stringify(data));
	    data.typeId=typeId;
	    $("#dict_list").bootstrapTable("refresh", {
		query : data
	    });
	});

	// 初始化页面上面的按钮事件
	$('#btn_add').click(function() {
	    console.log("click");
	    var rows = $('#dict_type_list').bootstrapTable('getAllSelections');
	    if (rows.length == 0) {
		layer.alert("请先选择左边字典类型！");
		return;
	    }
	    if (rows.length > 1) {
		layer.alert("只能选择一个类型！");
		return;
	    }
	    var typeId = rows[0].id;
	    layer.open({
		type : 2,
		title : false,
		shade : [ 0.5, '#000', true ],
		shade : [ 0 ],
		area : [ '500px', '400px' ],
		anim : 2,
		content : [ webPath + 'sys/dict/form?typeId=' + typeId, 'no' ], // iframe的url，no代表不显示滚动条
		end : function() { // 此处用于演示

		}
	    });

	});
	$('#btn_edit').click(function() {
	    var rows = $('#dict_list').bootstrapTable('getAllSelections');
	    if (rows.length == 0) {
		layer.alert("请选择一条数据！");
		return;
	    }
	    if (rows.length > 1) {
		layer.alert("只能选择一条数据！");
		return;
	    }
	    var id = rows[0].id;
	    var typeId = $('#dict_type').val();
	    layer.open({
		type : 2,
		title : false,
		shade : [ 0.5, '#000', true ],
		// closeBtn: 0, //不显示关闭按钮
		shade : [ 0 ],
		area : [ '500px', '400px' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/dict/form?id=' + id + '&typeId=' + typeId, 'no' ], // iframe的url，no代表不显示滚动条
		end : function() { // 此处用于演示

		}
	    });

	});
	$("#btn_delete").click(function() {
	    var rows = $('#dict_list').bootstrapTable('getAllSelections');
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
		url : webPath + "/sys/dict/batchDelete",
		data : data,
		type : "POST",
		dataType : "json",
		success : function(result) {
		    if (result.code == "200") {
			var typeId = $("#dict_type").val();
			$("#dict_list").bootstrapTable('refresh', {
			    silent : true,
			    query : {
			        typeId : typeId
			    }
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