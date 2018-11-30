$(function() {
	var mainList = new MainList();
	mainList.Init();
	var oButtonInit = new ButtonInit();
	oButtonInit.Init()
	
	$("body").on("click", ".prjDetails", function() {
		var id = $(this).data("id");
		console.log(id)
		layershow("项目详情", webPath + "nyd/prj/showForm?prjId=" + id, "100%", '100%');
    })
	
    // 上传备案通知书附件
// $("body").on("click", ".prjDetails", function() {
// var id = $(this).data("id");
// console.log(id)
// layershow("上传附件", webPath + "nyd/prj/upload/caseAttach?prjId=" + id, "80%",
// '30%');
// })
});
function refreshList(depId) {
	$("#dataList").bootstrapTable("refresh")
}

var MainList = function() {
	var mainList = new Object();
	var url =webPath+ "nyd/prj/list";
	var columns = [{
		checkbox: true
	},
	{
		field: "id",
		visible: false,
		title: "id",
	},
	{
		field: "",

		title: "序号",
		formatter: function(value, row, index) {
			return index+1
		},
		align:"center"

	},
	{
		field: "prjCode",
		title: "项目编号",
		align:"center"
	},
	{
		field: "prjName",
		title: "项目名称",
		align:"center"
	},
	{
		field: "applier",
		title: "申请人",
		align:"center"
	},
	{
		field: "phone",
		title: "联系电话",
		align:"center"
	},
	{
		field: "createDate",
		title: "录入时间",
		align:"center"
	},
	{
		field: "createUserName",
		title: "录入人",
		align:"center"
	},
	{
		field: "",
		title: "流程状态(<span class='lvses'>绿色</span>:通过,<span class='reds'>红色</span>:未通过)",
		align:"center",
		formatter : function(value, row, index) {
//			console.log(row)
//			console.log(row.status.yonSubmit);
			var a = row.status.yonSubmit == null ? "<span class=''>提交</span>----":row.status.yonSubmit == 1?"<span class='lvses'>提交</span>----" : "<span class='reds'>提交</span>----";
			var b = row.status.yonAudit == null ? "<span class=''>审核</span>----":row.status.yonAudit == 1?"<span class='lvses'>审核</span>----" : "<span class='reds'>审核</span>----";
			var c = row.status.yonReaudit == null ? "<span class=''>复审</span>----":row.status.yonReaudit == 1? "<span class='lvses'>复审</span>----" : "<span class='reds'>复审</span>----";
			var d = row.status.yonApprove == null ? "<span class=''>批准</span>----":row.status.yonApprove == 1?"<span class='lvses'>批准</span>----" : "<span class='reds'>批准</span>----";
			var e = row.status.yonRecord == null ? "<span class=''>备案通知</span>":row.status.yonRecord == 1? "<span class='lvses'>备案通知</span>" : "<span class='reds'>备案通知</span>";
			return "<p>"+a+b+c+d+e+"</p>";
		}
	},
	{
		field: "",
		title: "操作",
		formatter : function(value, row, index) {
			return "<a class='prjDetails' data-id='" + row.id + "' href='javascript:;'>查看详情</a>"
		},
		align:"center"
	}
	];
	mainList.Init = function() {
		$("#dataList").bootstrapTable(getBsTableOptions(url, "toolbar", columns, mainList.queryParams, null))
	};
	mainList.queryParams = function(params) {
		var temp = {
			pageSize: params.pageSize,
			pageNumber: params.pageNumber,
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
var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};
	oInit.Init = function() {
		$("#btn_add").click(function() {
			layershow("新增", webPath + "nyd/prj/form", '100%', '100%')
		});
		
		$("#btn_edit").click(function() {
			var rows = $("#dataList").bootstrapTable("getAllSelections");
			if (rows.length == 0) {
				layer.msg("请选择一条数据！");
				return
			}
			if (rows[0].processInstanceId) {
				layer.msg("该项目已经入流程，不可编辑");
				return
			}
			var id = rows[0].id;
			console.log("id",id)
			layershow("编辑", webPath + "nyd/prj/form?prjId=" + id, '100%', '100%')
		});
		
		$("#btn_delete").click(function() {
			var rows = $("#dataList").bootstrapTable("getAllSelections");
			if (rows.length == 0) {
				layer.msg("请选择一条数据！");
				return
			}
			if (rows.length > 1) {
				layer.msg("只能选择一条数据！");
				return
			}
			if (rows[0].processInstanceId) {
				layer.msg("该项目已经入流程，不可删除");
				return
			}
			layer.confirm('确定删除吗?', {
			    btn : [ '确定', '取消' ],
			    title : "提示"
			}, function(index) {
				    $.ajax({
                        		url : webPath + "nyd/prj/delete",
                        		data:{
                        		   id: rows[0].id
                        		},
                        		type : "post",
                        		success : function(data) {
                        		    layer.close(index);
                        		    $('#dataList').bootstrapTable("refresh");
                        		},
                        		error : function(error) {
                        		    layer.close(index);
                        		    layer.alert("请求出错！");
                        		}
                        	    })
			})
		})
	};
	return oInit
};