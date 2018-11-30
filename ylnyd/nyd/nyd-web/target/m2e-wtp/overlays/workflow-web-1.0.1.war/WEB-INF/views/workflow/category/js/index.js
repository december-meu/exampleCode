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
function onItemNodeSelected(cid){
    $("#category-selected-id").val(cid);//form中隐藏的部门
    refreshList(cid);
}

function refreshList(cid) {
    $('#dataList').bootstrapTable('refresh', {
	query : {
	    'filter_EQ_parent.id' : cid
	}
    });
}

var queryCallback=function(data){
	 var key='filter_EQ_parent.id';
	 data[key]=getSelectedNode();
	 return data;
}

var resetCallback=function(data){
	 var key='filter_EQ_parent.id';
	 data[key]=getSelectedNode();
	 return data;
}

var MainList = function() {
    var mainList = new Object();
    var url = webPath + 'process/category/list';

    var columns = [ {
	checkbox : true
    }, {
	field : 'id',
	visible : false,
	title : "id",
	align:"center"
    }, {
	field : 'code',
	title : '编码',
	align:"center"
    }, {
	field : 'name',
	title : '名称',
	align:"center"
    },{
	field : 'description',
	title : '描述',
	align:"center"
    },{
	field : 'sortNum',
	title : '排序',
	align:"center"
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
	    var pid=getSelectedNode();
	    if(pid==""){
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
		content : [ webPath + 'process/category/form?parentId='+pid, 'no' ], // iframe的url，no代表不显示滚动条
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
	    var pid=getSelectedNode();
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
		content : [ webPath + 'process/category/form?id=' + id+'&parentId='+pid, 'no' ], // iframe的url，no代表不显示滚动条
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
	    layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
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
		url : webPath + "process/category/batchdelete",
		data : data,
		type : "POST",
		dataType : "json",
		success : function(result) {
		    if (result.code == "200") {
			$("#dataList").bootstrapTable('refresh', {
			    silent : true
			});
			layer.closeAll();
		    } else {
			layer.alert(result.msg);
		    }

		},
		error : function(error) {
		    layer.closeAll();
		    layer.alert("请求出错！");
		}
	    });
	    });
	});
    };

    return oInit;
};