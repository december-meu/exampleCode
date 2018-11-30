$(function() {
    // 1.初始化Table
    var mainList = new MainList();
    mainList.Init();

    //    bsTalbe.iinitTable();

    // 2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

});

function refreshList(resId) {
    $('#dataList').bootstrapTable('refresh');
    $('#selectedList').bootstrapTable('refresh');
}
var callback = function() {
    return bsTable.selectionIds;
}

var MainList = function() {
    var mainList = new Object();
    var url = webPath + 'sys/role/list';
    
    var columnOnly = [
    	{
			field : 'id',
			visible : false,
			title : "id",
		    }, {
	    	field : 'name',
	    	title : '名称'
		 }
    ];
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
	field : 'name',
	title : '名称'
    }, {
	field : 'description',
	title : '描述 '
    } ]

    mainList.Init = function() {
	var options = getBsTableOptions(url, "toolbar", columns, null, null);
	var optionOnly = getBsTableOptions(url, "toolbar", columnOnly, mainList.queryParams, null);
	optionOnly.pageList = [];
	optionOnly.pageSize = 9999;
	if (!isSelectForm) {
	    $('#dataList').bootstrapTable(options);
	    $('#selectedList').bootstrapTable(optionOnly);
	} else {
	    var roleIds = $('#roleIds').val();
	    if (roleIds != "") {
		bsTable.selectionIds = roleIds.split(",")
	    }
	    options.columns = columnsSelect;
	    bsTable.initTable("dataList", options);
	    bsTable.initTable("selectedList", optionOnly);

	}

    }
    // 得到查询的参数
    mainList.queryParams = function(params) {
    var roleIdsOnly = $('#roleIds').val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	    pageSize : 9999, // 页面大小
	    pageNumber :1, // 页码
	};
    if(roleIdsOnly != ''){
    	temp["filter_IN_id"]=roleIdsOnly;
    }else {
    	temp["filter_IN_id"]="-1";
    }
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
	// 初始化页面上面的按钮事件

	$('#btn_add').click(function() {

	    layer.open({
		type : 2,
		title : "添加资源",
		shade : [ 0.5, '#000', true ],
		shade : [ 0 ],
		area : [ '500', '300' ],
		anim : 2,
		content : [ webPath + 'sys/role/form' ], // iframe的url，no代表不显示滚动条
		end : function() { // 此处用于演示

		}
	    });

	});
	$('#btn_edit').click(function() {
//	    console.log("click");
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
		title : "修改角色",
		shade : [ 0.5, '#000', true ],
		// closeBtn: 0, //不显示关闭按钮
		shade : [ 0 ],
		area : [ '500px', '400px' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/role/form?id=' + id], // iframe的url，no代表不显示滚动条
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
//	    console.log("rows=" + JSON.stringify(rows));
//	    console.log("ids=" + ids);
	    data = {
		id : rows[0].id
	    };
	    $.ajax({
		url : webPath + "/sys/role/delete",
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
	/**
	 * 分配资源
	 */
	$("#btn_setRes").click(function() {
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
		title : "分配资源",
		shade : [ 0.5, '#000', true ],
		// closeBtn: 0, //不显示关闭按钮
		shade : [ 0 ],
		area : [ '500', '600' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/role/res/select?id=' + id], // iframe的url，no代表不显示滚动条
		btn: ['确定','关闭'],
                yes: function(index){
                    //当点击‘确定’按钮的时候，获取弹出层返回的值
                    var resIds = window["layui-layer-iframe" + index].bsTree.callback();
                   
                    //打印返回的值，看是否有我们想返回的值。
//                    console.log("res="+resIds);
                    var data={
                	roleId:id,
                	resIds:resIds
                    }
                    $.ajax({
        		url : webPath + "/sys/role/res/set",
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
        		  //最后关闭弹出层
                            layer.close(index);
        		    layer.alert("请求出错！");
        		}
        	    });
                    
                    
                    //最后关闭弹出层
                    layer.close(index);
                },
                cancel: function(){
                    //右上角关闭回调
                },
		end : function() { // 此处用于演示

		}
	    });

	});
	/**
	 * 分配资源
	 */
	$("#btn_setDep").click(function() {
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
		title : "数据范围",
		shade : [ 0.5, '#000', true ],
		// closeBtn: 0, //不显示关闭按钮
		shade : [ 0 ],
		area : [ '500', '600' ],
		// offset: 'rb', //右下角弹出
		// time: 2000, //2秒后自动关闭
		anim : 2,
		content : [ webPath + 'sys/role/dep/select?id=' + id], // iframe的url，no代表不显示滚动条
		btn: ['确定','关闭'],
		yes: function(index){
		    //当点击‘确定’按钮的时候，获取弹出层返回的值
		    var depIds = window["layui-layer-iframe" + index].bsTree.callback();
		    
		    //打印返回的值，看是否有我们想返回的值。
                    console.log("depIds="+depIds);
		    var data={
			roleId:id,
			depIds:depIds
		    }
		    $.ajax({
			url : webPath + "/sys/role/dep/set",
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
			    //最后关闭弹出层
			    layer.close(index);
			    layer.alert("请求出错！");
			}
		    });
		    
		    
		    //最后关闭弹出层
		    layer.close(index);
		},
		cancel: function(){
		    //右上角关闭回调
		},
		end : function() { // 此处用于演示
		    
		}
	    });
	    
	});
	/*$("#btn_confirm").click(function() {
	   console.log("selectIds="+bsTable.slectIds);
	   var row=isValidSelect("dataList");
	   var id=row.id;
	   data={
	       roleId:id,
	       resIds:bsTable.selectIds
	   }
	   $.ajax({
		url : webPath + "/sys/role/res/set",
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
	});*/

    };

    return oInit;
};