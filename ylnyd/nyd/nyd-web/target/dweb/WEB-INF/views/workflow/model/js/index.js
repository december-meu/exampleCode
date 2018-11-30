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
	var url =webPath+ "/process/model/list";
	var columns = [ {
		checkbox: true
	},{  
            field : 'id',  
            title : 'ID',  
            align: 'center'
        }, {  
            field : 'key',  
            title : 'KEY',  
            align: 'center',
            sortable : true  
        }, {  
            field : 'name',  
            title : '名称',  
            align: 'center',
            sortable : true  
        }, {  
            field : 'version',  
            align: 'center',
            title : '版本'  
        }, {  
            field : 'createTime',  
            align: 'center',
            title : '创建时间'  
        }, {  
            field : 'lastUpdateTime',  
            align: 'center',
            title : '更新时间'  
        }, {  
            field : 'metaInfo',  
            align: 'center',
            title : '描述',
        	formatter: function(value, row, index) {
        	    try {
        		  var obj=JSON.parse(value);
              	    if(obj.description){
              		return obj.description;
              	    }else{
              		return "";
              	    }
                    } catch (e) {
                	return "";
                    }
        	  
		}
        }, {
	field : '_op',
	align: 'center',
	title : '操作',
	formatter : function(value, row, index) {
	    var str = '<ul class="op" style="list-style:none;width:160px;margin:0 auto;">';
		str += '<li style="margin-left:10px"><a class="export ml10" href="'+webPath+'/process/model/export?modelId='+row.id+'" title="导出"><i class="glyphicon glyphicon-deploy">导出</i></a></li>';
		str += '<li style="margin-left:10px"><a class="deploy ml10" href="javascript:void(0)" title="部署"><i class="glyphicon glyphicon-deploy">部署</i></a></li>';
		str += '<li style="margin-left:10px"><a class="edit ml10" href="javascript:void(0)" title="编辑"><i class="glyphicon glyphicon-deploy">编辑</i></a></li>';
		str += '<li style="margin-left:10px"><a class="delete ml10" href="javascript:void(0)" title="删除"><i style="color:red;" class="glyphicon glyphicon-deploy">删除</i></a></li>';
	    return str+='</ul>';
	},
	events : {
	    'click .deploy' : function(e, value, row, index) {
		
		deploy(row.id);
		loaddingIndex=layer.load(0, {shade: false});
	    },
	    'click .edit' : function(e, value, row, index) {
		
		editModel(row.id);
//		loaddingIndex=layer.load(0, {shade: false});
	    },
	    'click .delete' : function(e, value, row, index) {
		
		deleteModel(row.id);
//		loaddingIndex=layer.load(0, {shade: false});s
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


function deploy(modelId){
    console.log("loadingIndex="+loaddingIndex);
    $.ajax({
	url: webPath + "process/model/deploy",
	data:{modelId:modelId},
	type: "POST",
	dataType: "json",
	success: function(result) {
	    	layer.close(loaddingIndex);
		if (result.code == "200") {			
		    layer.alert(result.msg)
		} else {
		    layer.alert(result.msg)
		}
	},
	error: function(error) {
	    	layer.close(loaddiingIndex);
		parent.layer.closeAll();
		layer.alert("请求出错！")
	}
})
}
	function onDepNodeSelected(depId, code) {
		
	
	
	}

function editModel(modelId){
    var editUrl= webPath+"pages/modeler.html?modelId=" +modelId;
    layer.open({
	type: 2,
	title:false,
	closeBtn:0,
	shade: [0.5, "#000", true],
	shade: [0],
	area: ["100%", "100%"],
	anim: 2,
	content: [editUrl, "no"]
	,end: function(){ 
	    console.log("close event==========");
	    // 右上角关闭回调
	    $("#dataList").bootstrapTable('refresh', {
		silent : true,
	    });   
	}
})
    
    
}


function deleteModel(modelId){
    $.ajax({
	url: webPath + "process/model/delete/"+modelId,
	type: "POST",
	dataType: "json",
	async:false,
	success: function(result) {
		if (result.code == "200") {
			$("#dataList").bootstrapTable("refresh", {
				silent: true
			});
			parent.layer.closeAll()
		} else {
			layer.alert(result.msg)
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
					title: "流程基本信息",
					shade: [0.5, "#000", true],
					shade: [0],
					area: ["500px", "300px"],
					anim: 2,
					content: [webPath + "process/model/form", "no"],
					end: function() {
					    
					}
				})
			
			
// window.open(webPath+"/process/model/create")
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
			var modelId=rows[0].id;

			
			layer.open({
				type: 2,
				title: "修改",
				shade: [0.5, "#000", true],
				shade: [0],
				area: ["500px", "400px"],
				anim: 2,
				content: [webPath + "process/model/form?id=" + modelId],
				end: function() {}
			})
		    
// window.open(webPath+"pages/modeler.html?modelId=" + modelId);
		});
		$("#btn_delete").click(function() {
			var rows = $("#dataList").bootstrapTable("getAllSelections");
			if (rows.length == 0) {
				layer.alert("请选择一条数据！");
				return
			}
			if (rows.length > 1) {
				layer.alert("只能选择一条数据！");
				return
			}
			var modelId=rows[0].id;
			$.ajax({
				url: webPath + "process/model/delete/"+modelId,
				type: "POST",
				dataType: "json",
				async:false,
				success: function(result) {
					if (result.code == "200") {
						$("#dataList").bootstrapTable("refresh", {
							silent: true
						});
						parent.layer.closeAll()
					} else {
						layer.alert(result.msg)
					}
				},
				error: function(error) {
					parent.layer.closeAll();
					layer.alert("请求出错！")
				}
			})
		})
		$("#btn_export").click(function() {
		    var rows = $("#dataList").bootstrapTable("getAllSelections");
		    if (rows.length == 0) {
			layer.alert("请选择一条数据！");
			return
		    }
		    if (rows.length > 1) {
			layer.alert("只能选择一条数据！");
			return
		    }
		    var modelId=rows[0].id;
		    $.ajax({
			url: webPath + "/process/model/export",
			data: {modelId:modelId},
			type: "POST",
			async:false,
			error: function(error) {
			    parent.layer.closeAll();
			    layer.alert("请求出错！")
			}
		    })
		})
		$("#btn_deploy").click(function() {
		    var rows = $("#dataList").bootstrapTable("getAllSelections");
		    if (rows.length == 0) {
			layer.alert("请选择一条数据！");
			return
		    }
		    if (rows.length > 1) {
			layer.alert("只能选择一条数据！");
			return
		    }
		    var modelId=rows[0].id;
		    $.ajax({
			url: webPath + "/process/model/deploy",
			data: {modelId:modelId},
			type: "POST",
			success: function(result) {
			    if (result.code == "200") {			
				    layer.alert(result.msg)
				} else {
				    layer.alert(result.msg)
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