$(function() {
	var mainList = new MainList();
	mainList.Init();

	$("body").on("click", ".prjDetails", function() {
		var id = $(this).data("id");
		var taskId = $(this).data("taskid");
		var processInstanceId = $(this).data("processinstanceid");
		console.log(id)
		console.log(taskId)
		console.log(processInstanceId)
		if(!taskId && !processInstanceId){
			layershow("项目详情", webPath + "process/task/launch/detail?bizId=" + id + "&taskId=" + taskId 
					+ "&processInstanceId=" + processInstanceId + "&proDefKey=PrjInfo", "100%", '100%');
		}else if(taskId && processInstanceId){
			layershow("项目详情", webPath+"/process/task/detail?sourcePage=1&taskId="+ taskId+ "&proDefKey=PrjInfo", "100%", '100%');
		}
		
	})

	// 上传备案通知书附件
	// $("body").on("click", ".prjDetails", function() {
	// var id = $(this).data("id");
	// console.log(id)
	// layershow("上传附件", webPath + "nyd/prj/upload/caseAttach?prjId=" + id,
	// "650px", '200px');
	// })
});
function refreshList(depId) {
	$("#dataList").bootstrapTable("refresh")
}

var MainList = function() {
	var mainList = new Object();
	var url = webPath + "nyd/prj/list";
	var columns = [ {
		checkbox : true
	}, {
		field : "id",
		visible : false,
		title : "id",
	}, {
		field : "",
		title : "序号",
		formatter : function(value, row, index) {
			return index + 1
		},
		align : "center"

	}, {
		field : "prjCode",
		title : "项目编号",
		align : "center"
	}, {
		field : "prjName",
		title : "项目名称",
		align : "center"
	}, {
		field : "applier",
		title : "申请人",
		align : "center"
	}, {
		field : "phone",
		title : "联系电话",
		align : "center"
	}, {
		field : "createDate",
		title : "录入时间",
		align : "center"
	}, {
		field : "createUserName",
		title : "录入人",
		align : "center"
	}, {
		field : "",
		title : "流程状态(<span class='lvses'>绿色</span>:通过,<span class='reds'>红色</span>:未通过)",
		align : "center",
		formatter : function(value, row, index) {
			console.log(row)
			console.log(row.status.yonSubmit)
			var a = row.status.yonSubmit == null ? "<span class=''>提交</span>----":row.status.yonSubmit == 1?"<span class='lvses'>提交</span>----" : "<span class='reds'>提交</span>----";
			var b = row.status.yonAudit == null ? "<span class=''>审核</span>----":row.status.yonAudit == 1?"<span class='lvses'>审核</span>----" : "<span class='reds'>审核</span>----";
			var c = row.status.yonReaudit == null ? "<span class=''>复审</span>----":row.status.yonReaudit == 1? "<span class='lvses'>复审</span>----" : "<span class='reds'>复审</span>----";
			var d = row.status.yonApprove == null ? "<span class=''>批准</span>----":row.status.yonApprove == 1?"<span class='lvses'>批准</span>----" : "<span class='reds'>批准</span>----";
			var e = row.status.yonRecord == null ? "<span class=''>备案通知</span>":row.status.yonRecord == 1? "<span class='lvses'>备案通知</span>" : "<span class='reds'>备案通知</span>";
			return "<p>" + a + b + c + d + e + "</p>";
		}
	}, {
		field : "",
		title : "操作",
		formatter : function(value, row, index) {
			var taskId = "";
			var taskName = "";
			if (row.processModel) {
				taskId = row.processModel.taskId
				taskName = row.processModel.taskName
			}
			return "<a class='prjDetails' data-id='" + row.id + "' data-taskid='" + taskId + "' data-processinstanceid='" + row.processInstanceId +"' data-taskName='" + taskName + "' href='javascript:;'>立即办理</a>"
		},
		align : "center"
	} ];
	mainList.Init = function() {
		$("#dataList").bootstrapTable(getBsTableOptions(url, "toolbar", columns, mainList.queryParams, null))
	};
	mainList.queryParams = function(params) {
		var temp = {
			pageSize : params.pageSize,
			pageNumber : params.pageNumber,
		};
		var data = formtoJsonTrim('searchForm');
		if (data) {
			temp = $.extend(temp, data);
		}
		// temp.sortField ="sortnum";
		// temp.sortDir = "asc"
		return temp
	};
	return mainList
};
