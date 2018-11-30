var currentDepId;
var loaddingIndex;
$(function(){
    $('#btn_upload').click(function(){
	$('#txt_file').fileinput('upload');
    });
    
    
});
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
