var prjId = $('#prjId').val()
console.log(prjId)

$(function() {

	$(".form-control").attr("disabled", true)

	$("#navUl").on("click", "li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		$("#divmap .divChange").eq($(this).index()).show().siblings().hide()
	})

	var mainList = new MainList();
	mainList.Init();

	initDomEvent();
})

var MainList = function() {

	var mainList = new Object();
	var url = webPath + "nyd/prj/getAllUploadedAttach?prjId=" + prjId;
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
		// field: "",
		title : "附件名称",
		formatter : function(value, row, index) {
			if (row.attachType) {
				return row.attachType.name
			} else {
				return ""
			}
		},
		align : "center"
	}, {
		field : "",
		title : "上传状态",
		formatter : function(value, row, index) {
			if (!row.attachUrl) {
				return "待上传"
			} else {
				return "已上传"
			}
		},
		align : "center"
	}, {
		field : "createDate",
		title : "上传时间",
		align : "center"
	}, {
		field : "",
		title : "操作",
		formatter : function(value, row, index) {
			return "<a  download='" + row.attachType.name + "' href='" + domainPath + row.attachUrl + "' style='color:#337ab7;' >查看</a>"
		},
		align : "center"
	}

	];
	mainList.Init = function() {
		var option = getBsTableOptions(url, "toolbar", columns, mainList.queryParams, null, null, "300px");
		option.onLoadSuccess = function(data) {
			console.log(data)
			// initFileInput(this)
			// console.log($(".input-files").length)
			// for (i=0;i<$(".input-files").length;i++){
			// initFileInput("FileInput"+i)
			// }
			$(".input-files").each(function() {
				var that = $(this)
				initFileInput("FileInput" + that.data("index"))
			})
		}
		$("#tableBs").bootstrapTable(option);

	};
	mainList.queryParams = function(params) {
		var temp = {
			pageSize : params.pageSize,
			pageNumber : params.pageNumber,
		};
		return temp
	};
	return mainList
}

// 下拉框回调函数
function refreshValidator() {
	$("select").attr("disabled", true)
}

function initDomEvent() {

	// 提交
	$('#btnStartProcess').click(function() {
		var proDefKey = $('#proDefKey').val();
		var businessName = $('#businessName').val();
		var variable = {
//				keys : 'days',
//				values : days,
//				types : 'F'
			}
		var businessKey=businessName+"_"+prjId;
		startProcess(proDefKey, businessKey, variable);
	});

	/**
	 * 发起申请 proDefKey:流程定义key businessKey:业务关联字段,由businessname_+业务数据id构成
	 * vaiable，形如 {keys:'a,b,c', values:'1,2,3', types:'I,I,I'//I代表Integer.class }
	 * S(String.class), I(Integer.class), L(Long.class), F(Float.class),
	 * N(Double.class), D(Date.class), SD(java.sql.Date.class), B(
	 * Boolean.class);
	 */
	function startProcess(proDefKey, busisnessKey, variable) {

		$.ajax({
			url : webPath + "/process/task/start/" + proDefKey + "/" + busisnessKey,
			type : "POST",
			data : variable,
			dataType : "json",
			success : function(result) {
				if (result.code == "200") {
					if (parent.parent.refresh && typeof (parent.parent.refresh) == 'function') {
						parent.parent.refresh();
					}
					;
					parent.parent.layer.closeAll();
					top.layer.alert("已成功发起申请!");

				} else {
					top.layer.alert("发起申请失败!");
				}
			}
		});
	}
}