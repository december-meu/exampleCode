var currentDepId;
var loaddingIndex;
$(function() {
	var mainList = new MainList();
	mainList.Init();
	var oButtonInit = new ButtonInit();
	oButtonInit.Init()
});
function refreshList(depId) {
	$("#dataList").bootstrapTable("refresh")
}
var MainList = function() {
//	public String activityId;
//	public String id;
//	public String parentId;
//	public String processInstanceId;
//	public boolean isEnded;
//	public String businessKey;
//	public String deploymentId;
//	public String description;
	var mainList = new Object();
	var url =webPath+ "process/manager/instance/list";
	var columns = [{
		checkbox: true
	},
	{
		field: "id",
		visible: false,
		title: "id",
		align:"center"
	},
	{
		field: "processDefinitionName",
		title: "流程名称",
		align:"center"
	},
	{
	    field: "processInstanceId",
	    title: "流程实例id",
		align:"center"
	},
	{
	    field: "processDefinitionId",
	    title: "流程定义id",
		align:"center"
	},
	{
		field: "activityId",
		title: "当前环节",
		align:"center"
	}, {
		field : '_op',
		align: 'center',
		title : '操作',
		formatter : function(value, row, index) {
		    var str = '<ul class="op" style="list-style:none;width:104px;margin: 0 auto">';
		    	if(row.isSuspend==1){
		    	    str += '<li style="margin-left:10px"><a class="active ml10" href="javascript:void(0)" title="激活"><i class="glyphicon glyphicon-deploy">激活</i></a></li>';		    	    
		    	}else{
		    	    str += '<li style="margin-left:10px"><a class="suspend ml10" href="javascript:void(0)" title="挂起"><i class="glyphicon glyphicon-deploy">挂起</i></a></li>';		    	    		    	    
		    	}
			str += '<li ><a class="delete ml10" style="color:red;margin-left:20px;" href="javascript:void(0)" title="删除"><i class="glyphicon glyphicon-deploy">删除</i></a></li>';
//			str += '<li style="margin-left:10px"><a class="convertToModel ml10" href="javascript:void(0)" title="转换为模型"><i class="glyphicon glyphicon-deploy">转换为模型</i></a></li>';
		    return str+='</ul>';
		},
		events : {
		    'click .suspend' : function(e, value, row, index) {
			
			suspendProcess(row.id);
//			loaddingIndex=layer.load(0, {shade: false});
		    },
		    'click .active' : function(e, value, row, index) {
			
			activeProcess(row.id);
//			loaddingIndex=layer.load(0, {shade: false});
		    },
		    'click .delete' : function(e, value, row, index) {
			deleteProcess(row.processInstanceId);
//			editModel(row.id);
// loaddingIndex=layer.load(0, {shade: false});
		    },
		    'click .convertToModel' : function(e, value, row, index) {
			convertToModel(row.id);
//			deleteProcess(row.deploymentId);
			loaddingIndex=layer.load(0, {shade: false});
		    },
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


function suspendProcess(id){
    
    layer.confirm('确定要挂起流程?', function(index){
	 $.ajax({
		url: webPath + "/process/manager/update/suspend",
		data: {procDefId:id},
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
		})
	  
	  layer.close(index);
    },function(index){
	layer.close(index);
    })
    
}
function activeProcess(id){
    
    $.ajax({
	url: webPath + "/process/manager/update/active",
	data: {procDefId:id},
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
    })
    
}
function deleteProcess(id){
    layer.confirm('确定要删除流程?', function(index){

	    $.ajax({
		url: webPath + "/process/manager/instance/delete",
		data: {procInsId:id},
		type: "POST",
		dataType: "json",
		success: function(result) {
		    if (result.code == "200") {
			$("#dataList").bootstrapTable("refresh", {
			    silent: true
			});
			layer.closeAll();
		    } else {
			layer.alert(result.msg);
		    }
		},
		error: function(error) {
		    parent.layer.closeAll();
		    layer.alert("请求出错！")
		}
	    })
	  
	  layer.close(index);
   },function(index){
	layer.close(index);
   })
}
function convertToModel(id){
    $.ajax({
	url: webPath + "/process/manager/convert/toModel",
	data: {procDefId:id},
	type: "POST",
	dataType: "json",
	success: function(result) {
	    if (result.code == "200") {
		$("#dataList").bootstrapTable("refresh", {
		    silent: true
		});
		layer.closeAll();
		layer.alert(result.msg);
	    } else {
		layer.alert(result.msg);
	    }
	},
	error: function(error) {
	    parent.layer.closeAll();
	    layer.alert("请求出错！")
	}
    })
    
    
}
var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};
	oInit.Init = function() {
		$("#btn_add").click(function() {
			console.log("click");
			layer.open({
				type: 2,
				title: "添加",
				shade: [0.5, "#000", true],
				shade: [0],
				area: ["500px", "400px"],
				anim: 2,
				content: [webPath + "eqp/app/form", "no"],
				end: function() {}
			})
		});
		$("#btn_edit").click(function() {
			var rows = $("#dataList").bootstrapTable("getAllSelections");
			if (rows.length == 0) {
				layer.alert("请选择一条数据！");
				return
			}
			if (rows.length > 1) {
				layer.alert("只能选择一条数据！");
				return
			}
			var id = rows[0].id;
			layer.open({
				type: 2,
				title: "修改",
				shade: [0.5, "#000", true],
				shade: [0],
				area: ["500px", "400px"],
				anim: 2,
				content: [webPath + "eqp/app/form?id=" + id],
				end: function() {}
			})
		});
		$("#btn_delete").click(function() {
			var rows = $("#dataList").bootstrapTable("getAllSelections");
			if (rows.length == 0) {
				layer.alert("请选择一条数据！");
				return;
			}
			if (rows.length > 1) {
				layer.alert("只能选择一条数据！");
				return;
			}
			data = {
				id: rows[0].id
			};
			$.ajax({
				url: webPath + "/eqp/app/delete",
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
			})
		})
	};
	return oInit
};