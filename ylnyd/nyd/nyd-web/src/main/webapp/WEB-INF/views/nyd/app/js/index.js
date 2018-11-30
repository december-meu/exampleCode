var currentDepId;
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
	var url =webPath+ "nyd/app/list";
	var columns = [{
		checkbox: true
	},
	{
		field: "id",
		visible: false,
		title: "id",
	},
	{
		field: "code",
		title: "编码"
	},
	{
		title: "类型",
		formatter: function(value, row, index) {
			if (row.type) {
				return row.type.name
			} else {
				return ""
			}
		}
	},
	{
		field: "name",
		title: "名称"
	}];
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
				content: [webPath + "nyd/app/form", "no"],
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
				content: [webPath + "nyd/app/form?id=" + id],
				end: function() {}
			})
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
			data = {
				id: rows[0].id
			};
			$.ajax({
				url: webPath + "/nyd/app/delete",
				data: data,
				type: "POST",
				dataType: "json",
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
	};
	return oInit
};