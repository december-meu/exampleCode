var prjId = $('#prjId').val()
console.log(prjId)

var validator;
var vaildatorRule = {};
function initValidator() {
	vaildatorRule = {
		message : '内容不能为空!',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			applier : {
				// 提示消息
				message : '申请人不能为空',
				// 需要做的验证
				validators : {
					// 验证项
					notEmpty : {
						message : '申请人不能为空'
					},
				}
			},
			prjName : {
				// 提示消息
				message : '项目名称不能为空',
				// 需要做的验证
				validators : {
					// 验证项
					notEmpty : {
						message : '项目名称不能为空'
					},
				}
			},
			prjLeader : {
				// 提示消息
				message : '项目负责人不能为空',
				// 需要做的验证
				validators : {
					// 验证项
					notEmpty : {
						message : '项目负责人不能为空'
					},
				}
			},
			idcard : {
				// 提示消息
				message : '填写正确的身份证号码',
				// 需要做的验证
				validators : {
					notEmpty : {
						message : '身份证号码不能为空'
					},
					regexp : {/* 只需加此键值对，包含正则表达式，和提示 */
						regexp : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
					// message: '身份证号'
					},
				}
			},
			phone : {
				// 提示消息
				message : '填写正确的电话号码',
				// 需要做的验证
				validators : {
					// 验证项
					notEmpty : {
						message : '手机号码不能为空'
					},
					regexp : {/* 只需加此键值对，包含正则表达式，和提示 */
						regexp : /^1[23456789]\d{9}$/,
					// message: '身份证号'
					},
				}
			},
			location : {
				// 提示消息
				message : '土地座落不能为空',
				// 需要做的验证
				validators : {
					// 验证项
					notEmpty : {
						message : '土地座落不能为空'
					},
				}
			},
			recordType : {
				// 提示消息
				message : '类型备案为必选',
				// 需要做的验证
				validators : {
					// 验证项
					notEmpty : {
						message : '类型备案为必选'
					},
				}
			},
			boundary : {
				// 提示消息
				message : '设施用地不能为空',
				// 需要做的验证
				validators : {
					// 验证项
					notEmpty : {
						message : '设施用地不能为空'
					},
				}
			},
			prjStartTime : {
				// 提示消息
				message : '开始时间不能为空',
				// 需要做的验证
				validators : {
					// 验证项
					notEmpty : {
						message : '开始时间不能为空'
					},
				}
			},
			prjEndTime : {
				// 提示消息
				message : '结束时间不能为空',
				// 需要做的验证
				validators : {
					// 验证项
					notEmpty : {
						message : '结束时间不能为空'
					},
				}
			},
			prodYonDoc : {
				// 提示消息
				message : '承诺书为必选',
				// 需要做的验证
				validators : {
					// 验证项
					notEmpty : {
						message : '承诺书为必选'
					},
				}
			},
			attachYonDoc : {
				// 提示消息
				message : '承诺书为必选',
				// 需要做的验证
				validators : {
					// 验证项
					notEmpty : {
						message : '承诺书为必选'
					},
				}
			},
			assortTotalDoc : {
				// 提示消息
				message : '承诺书和方案为必选',
				// 需要做的验证
				validators : {
					// 验证项
					notEmpty : {
						message : '承诺书和方案为必选'
					},
				}
			}

		// prjManager : {
		// // 提示消息
		// message : '项目经理',
		// // 需要做的验证
		// validators : {
		// // 验证项
		// notEmpty : {
		// message : '项目经理',
		// callback : {
		// message : "项目经理不能为空",
		// callback : function(value, validator) {
		//
		// if (!value || value == "") {
		//
		// return false;
		// } else {
		// return true;
		// }
		//
		// }
		// }
		// },
		// }
		// },

		}
	};

}

$(function() {

	$("#navUl").on("click", "li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		$("#divmap .divChange").eq($(this).index()).show().siblings().hide()
	})

	$("#divmap").on("click", ".jzdForm", function() {
		layershow("加载项目界址点信息", webPath + "nyd/prj/upload/caseScope?prjId=" + prjId, "900px", '30%');
	})

	var mainList = new MainList();
	mainList.Init();

	$("#tableFather").on("click", ".upLoadFile", function() {
		var id = $(this).data("id");
	})
	$("body").on("click", ".delFile", function() {
		var id = $(this).data("id");
		layer.confirm('确定删除吗?', {
			btn : [ '确定', '取消' ],
			title : "提示"
		}, function(index) {
			$.ajax({
				url : webPath + "nyd/prj/deleteFile?id=" + id,
				type : "post",
				success : function(data) {
					$('#tableBs').bootstrapTable('refresh');
					layer.close(index);
				}
			})
		})
	})

	laydate.render({
		elem : '#prjStartTime',
		position : 'fixed',
		theme : 'molv',
		format : "yyyy-MM-dd",
		btns : [ 'clear', 'now' ],
		done : function(value, date) {
			validator.updateStatus("prjStartTime", "NOT_VALIDATED", null);
			validator.validateField("prjStartTime");
		}
	});
	laydate.render({
		elem : '#prjEndTime',
		position : 'fixed',
		theme : 'molv',
		format : "yyyy-MM-dd",
		btns : [ 'clear', 'now' ],
		done : function(value, date) {
			validator.updateStatus("prjEndTime", "NOT_VALIDATED", null);
			validator.validateField("prjEndTime");
		}
	});
	initValidator()
	$("#tableFather").bootstrapValidator(vaildatorRule);
	validator = $("#tableFather").data('bootstrapValidator');
	$("#saveMsgBtn").on("click", function() {
		validator.validate();
		if (!validator.isValid()) {
			return;
		}
		var a = formtoJsonTrim('tableFather');
		// console.log(a)
		$.ajax({
			url : webPath + "nyd/prj/save",
			type : "post",
			// async:false,
			data : a,
			success : function(data) {
				console.log(data)
				$('#prjId').val(data.data.id)
				prjId = data.data.id;
				saveMap(data.data.id);
				layer.msg("保存成功")
				mainList.Init();
				parent.$('#dataList').bootstrapTable('refresh');
				// setTimeout(function() {
				// $('#tableBs').bootstrapTable('refresh');
				// parent.layer.closeAll();
				// }, 1000)
			}
		})
	})

	// 数据库关联地图数据
	function saveMap(prjId) {
		var attachids = $('#attachids').val()
		console.log(attachids)
		$.ajax({
			url : webPath + "nyd/prjBoundary/saveLandByPrjId",
			type : "post",
			// async:false,
			data : {
				attachId : attachids,
				prjId : prjId
			},
			success : function(data) {
				console.log("保存成功")
			}
		})
	}

	$(".shengchanCash").keyup(function() {
		$(this).val($(this).val().replace(/[^\d\.]/g, ""))
		$(this).val($(this).val().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'))
		var str = 0;
		$(".shengchanCash").each(function() {
			str += Number(this.value);
		})
		$("#scMoney").val(str)
	})

	$(".fsscCash").keyup(function() {
		$(this).val($(this).val().replace(/[^\d\.]/g, ""))
		$(this).val($(this).val().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'))
		var str = 0;
		$(".fsscCash").each(function() {
			str += Number(this.value);
		})
		$("#fsscMoney").val(str)
	})
	$(".ptCash").keyup(function() {
		$(this).val($(this).val().replace(/[^\d\.]/g, ""))
		$(this).val($(this).val().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'))
		var str = 0;
		$(".ptCash").each(function() {
			str += Number(this.value);
		})
		$("#ptMoney").val(str)
	})
	 $("body").on("click",".changeImg",function(){  
         var _this = $(this);//将当前的pimg元素作为_this传入函数  
         imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);  
     });
})
function imgShow(outerdiv, innerdiv, bigimg, _this){  
    var src = _this.data("src");//获取当前点击的pimg元素中的src属性  
    $(bigimg).attr("src", src);//设置#bigimg元素的src属性  
  
        /*获取当前点击图片的真实大小，并显示弹出层及大图*/  
    $("<img/>").attr("src", src).load(function(){  
        var windowW = $(window).width();//获取当前窗口宽度  
        var windowH = $(window).height();//获取当前窗口高度  
        var realWidth = this.width;//获取图片真实宽度  
        var realHeight = this.height;//获取图片真实高度  
        var imgWidth, imgHeight;  
        var scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放  
          
        if(realHeight>windowH*scale) {//判断图片高度  
            imgHeight = windowH*scale;//如大于窗口高度，图片高度进行缩放  
            imgWidth = imgHeight/realHeight*realWidth;//等比例缩放宽度  
            if(imgWidth>windowW*scale) {//如宽度扔大于窗口宽度  
                imgWidth = windowW*scale;//再对宽度进行缩放  
            }  
        } else if(realWidth>windowW*scale) {//如图片高度合适，判断图片宽度  
            imgWidth = windowW*scale;//如大于窗口宽度，图片宽度进行缩放  
                        imgHeight = imgWidth/realWidth*realHeight;//等比例缩放高度  
        } else {//如果图片真实高度和宽度都符合要求，高宽不变  
            imgWidth = realWidth;  
            imgHeight = realHeight;  
        }  
                $(bigimg).css("width",imgWidth);//以最终的宽度对图片缩放  
          
        var w = (windowW-imgWidth)/2;//计算图片与窗口左边距  
        var h = (windowH-imgHeight)/2;//计算图片与窗口上边距  
        $(innerdiv).css({"top":h, "left":w});//设置#innerdiv的top和left属性  
        $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg  
    });  
      
    $(outerdiv).click(function(){//再次点击淡出消失弹出层  
        $(this).fadeOut("fast");  
    });  
}
function initFileInput(ctrlName) {
	var control = $("#" + ctrlName);
	// console.log(control)
	control.fileinput({
		language : 'zh', // 设置语言
		uploadUrl : webPath + "nyd/prj/upload", // 上传的地址
		uploadExtraData : function() {
			var params = {};
			params.prjId = control.data("prjid");
			params["attachType.id"] = control.data("aid");
			params.id = control.data('id');
			// console.log(control.data('id'))
			return params;
		}, // 接收额外的参数
		allowedFileExtensions : [ 'pdf', 'jpg', 'png', 'gif', "PDF", "PNG", "JPG" ],
		uploadAsync : false, // 默认异步上传
		showUpload : false, // 是否显示上传按钮
		actionUpload : '',
		showRemove : false, // 显示移除按钮
		showPreview : false, // 是否显示预览
		showCaption : false,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		dropZoneEnabled : false,// 是否显示拖拽区域
		// previewFileType:["image"],
		// minImageWidth: 50, //图片的最小宽度
		// minImageHeight: 50,//图片的最小高度
		// maxImageWidth: 1000,//图片的最大宽度
		// maxImageHeight: 1000,//图片的最大高度
		// maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
		// minFileCount: 0,
		maxFileCount : 1, // 表示允许同时上传的最大文件个数
		enctype : 'multipart/form-data',
		validateInitialCount : true,
		previewFileIcon : "<i class='glyphicon glyphicon-king'></i>",
		msgFilesTooMany : "选择上传的文件数量({n}) 超过允许的最大数值{m}！",

	}).on("filebatchselected", function(event, files) {
		console.log(prjId)
		if (prjId) {
			$(this).fileinput("upload");
		} else {
			layer.msg("请先保存项目信息");
			$(this).fileinput("reset");
		}
	}).on("fileuploaded", function(event, data, previewId, index) { // 一个文件上传成功
		$('#tableBs').bootstrapTable('refresh');
	}).on('fileerror', function(event, data, msg) { // 一个文件上传失败
		console.log('文件上传失败！' + data.id);
		// parent.$('#resultTable').bootstrapTable('refresh');
		// parent.layer.closeAll();
	}).on('filebatchuploadsuccess', function(event, data) {
		console.log("data.response", data)
		if (data.response.code != 200) {
			layer.msg("文件格式不对");
		}

		$('#tableBs').bootstrapTable('refresh');
	})
}

var MainList = function() {

	var mainList = new Object();

	var columns = [
			{
				checkbox : true
			},
			{
				field : "id",
				visible : false,
				title : "id",
			},
			{
				field : "",
				title : "序号",
				formatter : function(value, row, index) {
					return index + 1
				},
				align : "center"
			},
			{
				// field: "",
				title : "附件名称",
				formatter : function(value, row, index) {
					if (prjId) {
						if (row.attachType) {
							return row.attachType.name
						} else {
							return ""
						}
					} else {
						return row.dictname
					}
				},
				align : "center"
			},
			{
				field : "",
				title : "上传状态",
				formatter : function(value, row, index) {
					if (prjId) {
						if (!row.attachUrl) {
							return "待上传"
						} else {
							return "已上传"
						}
					} else {
						return "待上传"
					}
				},
				align : "center"
			},
			{
				field : "createDate",
				title : "上传时间",
				align : "center"
			},
			{
				field : "",
				title : "操作",
				formatter : function(value, row, index) {
					if(prjId){
						if (!row.attachUrl) {
							return '<div style="width:500px;float:right;"><input id="FileInput' + index + '" data-index="' + index + '" class="input-files" data-id="' + row.id + '" data-aid="'
							+ row.attachType.id + '" data-prjid="' + row.prjId
							+ '"  class="input-files" name="files" filePlural="文件" type="file" data-show-caption="true" accept="image/gif,image/png,image/jpg,application/pdf"></div>'
						} else {
							if(row.attachUrl.indexOf(".pdf")!=-1||row.attachUrl.indexOf(".PDF")!=-1){
								return "<a style='color:#1AB394' href='"+webPath+"nyd/prj/gotoViewer?id="+row.id+"' target='_blank' >查看</a>&nbsp;&nbsp;&nbsp;<a href='javascript:;' data-id='"+row.id+"' class='reds delFile'>删除</a>"
								}else{
									return "<a class='changeImg' style='color:#1AB394' data-src='"+domainPath + row.attachUrl+"'  href='javascript:;' >查看</a>&nbsp;&nbsp;&nbsp;<a href='javascript:;' data-id='"+row.id+"' class='reds delFile'>删除</a>"
//									return "<a  style='color:#1AB394' download='" + row.attachType.name + "' href='" + domainPath + row.attachUrl + "' >查看</a>&nbsp;&nbsp;&nbsp;<a href='javascript:;' data-id='"+row.id+"' class='reds delFile'>删除</a>"
								}
						}
					}else{
						return	'<div style="width:500px;float:right;"><input id="FileInput' + index + '" data-index="' + index + '" class="input-files"  class="input-files" name="files" filePlural="文件" type="file" data-show-caption="true" accept="image/gif,image/png,image/jpg,application/pdf"></div>'
					}
				},
				align : "center"
			}, ];
	mainList.Init = function() {
		if (prjId) {
			var url = webPath + "nyd/prj/getAttach?prjId=" + prjId;
		} else {
			var url = webPath + "nyd/prj/getPrjAttachDict";
		}
		$("#tableBs").bootstrapTable('destroy');
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
