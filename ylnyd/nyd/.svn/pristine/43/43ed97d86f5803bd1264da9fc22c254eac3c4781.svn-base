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
	var mainList = new Object();
	var url =webPath+ "process/manager/deployList";
	var columns = [{
		checkbox: true
	},
	{
		field: "id",
		title: "id",
		align:"center"
	},
	{
		field: "key",
		title: "标识",
		align:"center"
	},
	{
		title: "类型",
		align:"center",
		formatter: function(value, row, index) {
			if (row.categoryName) {
				return row.categoryName
			} else {
				return ""
			}
		}
	},
	{
		field: "name",
		title: "名称",
		align:"center"
	},{
	    field: "version",
		title: "版本",
		align:"center"
	},{
	    field: "deploymentId",
	    title: "部署id",
		align:"center"

	},{
	    field: "deploymentTime",
	    title: "部署时间",
		align:"center"
	}, {
		field : '_op',
		align: 'center',
		title : '操作',
		formatter : function(value, row, index) {
		    var str = '<ul class="op" style="list-style:none;width:164px;margin: 0 auto">';
		    	if(row.isSuspend==1){
		    	    str += '<li style="margin-left:10px"><a class="active ml10" href="javascript:void(0)" title="激活"><i class="glyphicon glyphicon-deploy">激活</i></a></li>';		    	    
		    	}else{
		    	    str += '<li style="margin-left:10px"><a class="suspend ml10" href="javascript:void(0)" title="挂起"><i class="glyphicon glyphicon-deploy">挂起</i></a></li>';		    	    		    	    
		    	}
		    	str += '<li style="margin-left:10px"><a class="convertToModel ml10" href="javascript:void(0)" title="转换为模型"><i class="glyphicon glyphicon-deploy">转换为模型</i></a></li>';
			str += '<li style="margin-left:10px"><a class="delete ml10" href="javascript:void(0)" title="删除"><i style="color:red;" class="glyphicon glyphicon-deploy">删除</i></a></li>';
			
		    return str+='</ul>';
		},
		events : {
		    'click .suspend' : function(e, value, row, index) {
			
			suspendProcess(row.id);
// loaddingIndex=layer.load(0, {shade: false});
		    },
		    'click .active' : function(e, value, row, index) {
			
			activeProcess(row.id);
// loaddingIndex=layer.load(0, {shade: false});
		    },
		    'click .delete' : function(e, value, row, index) {
			deleteProcess(row.deploymentId);
// editModel(row.id);
// loaddingIndex=layer.load(0, {shade: false});
		    },
		    'click .convertToModel' : function(e, value, row, index) {
			convertToModel(row.id);
// deleteProcess(row.deploymentId);
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
		url: webPath + "/process/manager/deployment/delete",
		data: {deploymentId:id},
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
		$("#btn_deploy").click(function() {
			console.log("click");
			layer.open({
				type: 2,
				title: "添加",
				shade: [0.5, "#000", true],
				shade: [0],
				area: ["500px", "600px"],
				anim: 2,
				content: [webPath + "process/manager/toDeploy", "no"],
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
		
		
		
		
		/**
		 * 分配角色
		 */
		$("#btn_setParams").click(function() {
		    
		    var rows = $('#dataList').bootstrapTable('getAllSelections');
		    if (rows.length == 0) {
			layer.alert("请选择一条数据！");
			return;
		    }
		    if (rows.length > 1) {
			layer.alert("只能选择一条数据！");
			return;
		    }
		    var id = rows[0].key;

		    layer.open({
			type : 2,
			title : "添加资源",
			shade : [ 0.5, '#000', true ],
			shade : [ 0 ],
			area : [ '500', '300' ],
			anim : 2,
			content : [ webPath + 'process/manager/param/set/page?proDefKey=' + id ], // iframe的url，no代表不显示滚动条
			end : function() { // 此处用于演示

			}
		    });
//		    layer.open({
//			type : 2,
//			title : "分配角色",
//			shade : [ 0.5, '#000', true ],
//			// closeBtn: 0, //不显示关闭按钮
//			shade : [ 0 ],
//			area : [ '500', '300' ],
//			// offset: 'rb', //右下角弹出
//			// time: 2000, //2秒后自动关闭
//			anim : 2,
//			content : [ webPath + 'process/manager/param/set/page?proDefKey=' + id], // iframe的url，no代表不显示滚动条
//			btn : [ '确定', '关闭' ],
//			yes : function(index) {
//			    // 当点击‘确定’按钮的时候，获取弹出层返回的值
//			    var res = window["layui-layer-iframe" + index].callback();
//			    var roleIds = res.join();
//			    // 打印返回的值，看是否有我们想返回的值。
//			    console.log(roleIds);
//			    var data = {
//				formWidth : res.formWidth,
//				formHeight : res.formHeight
//			    }
//			    $.ajax({
//				url : webPath + "/process/manager/role/set",
//				data : data,
//				type : "POST",
//				dataType : "json",
//				success : function(result) {
//				    if (result.code == "200") {
//					$("#dataList").bootstrapTable('refresh', {
//					    silent : true
//					});
//					layer.close(index);
//				    } else {
//					layer.alert(result.msg);
//				    }
//				    
//				},
//				error : function(error) {
//				    // 最后关闭弹出层
//				    layer.close(index);
//				    layer.alert("请求出错！");
//				}
//			    });
//			    
//			    // 最后关闭弹出层
//			    layer.close(index);
//			},
//			cancel : function() {
//			    // 右上角关闭回调
//			},
//			end : function() { // 此处用于演示
//			    
//			}
//		    });
		    
		});
		/**
		 * 分配角色
		 */
		$("#btn_setRoles").click(function() {
		
		var rows = $('#dataList').bootstrapTable('getAllSelections');
		    if (rows.length == 0) {
			layer.alert("请选择一条数据！");
			return;
		    }
		    if (rows.length > 1) {
			layer.alert("只能选择一条数据！");
			return;
		    }
		    var id = rows[0].key;
		    layer.open({
			type : 2,
			title : "分配角色",
			shade : [ 0.5, '#000', true ],
			// closeBtn: 0, //不显示关闭按钮
			shade : [ 0 ],
			area : [ '650', '90%' ],
			// offset: 'rb', //右下角弹出
			// time: 2000, //2秒后自动关闭
			anim : 2,
			content : [ webPath + 'process/manager/role/select?proDefKey=' + id], // iframe的url，no代表不显示滚动条
			btn : [ '确定', '关闭' ],
			yes : function(index) {
			    // 当点击‘确定’按钮的时候，获取弹出层返回的值
			    var res = window["layui-layer-iframe" + index].callback();
			    var roleIds = res.join();
			    // 打印返回的值，看是否有我们想返回的值。
			    console.log(roleIds);
			    var data = {
			        proDefKey : id,
			        roleIds : roleIds
			    }
			    $.ajax({
			        url : webPath + "/process/manager/role/set",
			        data : data,
			        type : "POST",
			        dataType : "json",
			        success : function(result) {
				    if (result.code == "200") {
				        $("#dataList").bootstrapTable('refresh', {
					    silent : true
				        });
				        layer.close(index);
				    } else {
				        layer.alert(result.msg);
				    }

			        },
			        error : function(error) {
				    // 最后关闭弹出层
				    layer.close(index);
				    layer.alert("请求出错！");
			        }
			    });

			    // 最后关闭弹出层
			    layer.close(index);
			},
			cancel : function() {
			    // 右上角关闭回调
			},
			end : function() { // 此处用于演示

			}
		    });
		
		});
		
	};
	return oInit
};