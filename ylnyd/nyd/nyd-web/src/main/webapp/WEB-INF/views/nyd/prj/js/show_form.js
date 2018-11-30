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

	$("body").on("click", ".changeImg", function() {
		var _this = $(this);// 将当前的pimg元素作为_this传入函数
		imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
	});
})
function imgShow(outerdiv, innerdiv, bigimg, _this) {
	var src = _this.data("src");// 获取当前点击的pimg元素中的src属性
	$(bigimg).attr("src", src);// 设置#bigimg元素的src属性

	/* 获取当前点击图片的真实大小，并显示弹出层及大图 */
	$("<img/>").attr("src", src).load(function() {
		var windowW = $(window).width();// 获取当前窗口宽度
		var windowH = $(window).height();// 获取当前窗口高度
		var realWidth = this.width;// 获取图片真实宽度
		var realHeight = this.height;// 获取图片真实高度
		var imgWidth, imgHeight;
		var scale = 0.8;// 缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

		if (realHeight > windowH * scale) {// 判断图片高度
			imgHeight = windowH * scale;// 如大于窗口高度，图片高度进行缩放
			imgWidth = imgHeight / realHeight * realWidth;// 等比例缩放宽度
			if (imgWidth > windowW * scale) {// 如宽度扔大于窗口宽度
				imgWidth = windowW * scale;// 再对宽度进行缩放
			}
		} else if (realWidth > windowW * scale) {// 如图片高度合适，判断图片宽度
			imgWidth = windowW * scale;// 如大于窗口宽度，图片宽度进行缩放
			imgHeight = imgWidth / realWidth * realHeight;// 等比例缩放高度
		} else {// 如果图片真实高度和宽度都符合要求，高宽不变
			imgWidth = realWidth;
			imgHeight = realHeight;
		}
		$(bigimg).css("width", imgWidth);// 以最终的宽度对图片缩放

		var w = (windowW - imgWidth) / 2;// 计算图片与窗口左边距
		var h = (windowH - imgHeight) / 2;// 计算图片与窗口上边距
		$(innerdiv).css({
			"top" : h,
			"left" : w
		});// 设置#innerdiv的top和left属性
		$(outerdiv).fadeIn("fast");// 淡入显示#outerdiv及.pimg
	});

	$(outerdiv).click(function() {// 再次点击淡出消失弹出层
		$(this).fadeOut("fast");
	});
}
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
			if (row.attachUrl) {
				if (row.attachUrl.indexOf(".pdf") != -1 || row.attachUrl.indexOf(".PDF") != -1) {
					return "<a style='color:#1AB394' href='" + webPath + "nyd/prj/gotoViewer?id=" + row.id + "' target='_blank' >查看</a>"
				} else {
					return "<a class='changeImg' style='color:#1AB394' data-src='" + domainPath + row.attachUrl + "'  href='javascript:;' >查看</a>"
				}
			}

		},
		align : "center"
	}

	];
	mainList.Init = function() {
		var option = getBsTableOptions(url, "toolbar", columns, mainList.queryParams, null, null, "300px");
		option.onLoadSuccess = function(data) {
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