var prjId = $('#prjId').val()

$(function() {
	initFileInput("input-files");
})

function initFileInput(ctrlName) {
	var control = $('.' + ctrlName);
	control.fileinput({
		language : 'zh', // 设置语言
		uploadUrl : webPath + "nyd/prj/uploadCaseFile", // 上传的地址
		uploadExtraData : function() {
			// @@@ 缺prjID 地址未换 参数不定
			// if (prjId == null || prjId == '') {
			// return;
			// }
			var params = {};
			params.prjId = prjId;
			return params;
		}, // 接收额外的参数
		allowedFileExtensions : null,// 接收的文件后缀 [ 'pdf', 'doc',
		// 'docx',"xlsx" ,"xls"]
		uploadAsync : false, // 默认异步上传
		showUpload : true, // 是否显示上传按钮
		actionUpload : '',
		showRemove : true, // 显示移除按钮
		showPreview : false, // 是否显示预览
		showCaption : false,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		dropZoneEnabled : false,// 是否显示拖拽区域
		// minImageWidth: 50, //图片的最小宽度
		// minImageHeight: 50,//图片的最小高度
		// maxImageWidth: 1000,//图片的最大宽度
		// maxImageHeight: 1000,//图片的最大高度
		// maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
		// minFileCount: 0,
		// maxFileCount: 10, //表示允许同时上传的最大文件个数
		enctype : 'multipart/form-data',
		validateInitialCount : true,
		previewFileIcon : "<i class='glyphicon glyphicon-king'></i>",
		msgFilesTooMany : "选择上传的文件数量({n}) 超过允许的最大数值{m}！",

	}).on("fileuploaded", function(event, data, previewId, index) { // 一个文件上传成功
		console.log('文件上传成功！' + data.id);
	}).on('fileerror', function(event, data, msg) { // 一个文件上传失败
		console.log('文件上传失败！' + data.id);
		// parent.$('#resultTable').bootstrapTable('refresh');
		// parent.layer.closeAll();
	}).on('filebatchuploadsuccess', function() {
		layer.msg("上传成功")
		setTimeout(function() {
		parent.layer.closeAll();
		},1000)
	})
}
