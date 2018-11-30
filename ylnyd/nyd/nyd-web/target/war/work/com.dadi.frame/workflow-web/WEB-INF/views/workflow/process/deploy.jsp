<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<%@ taglib prefix="wfl" tagdir="/WEB-INF/tags/wfl"%>
<link href="${ctxStatic}/plugins/bootstrap/css/fileinput.min.css" rel="stylesheet">
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="row">
			<div class="col-sm-12 animated fadeInRight">
				<form id="inputForm" class="form-horizontal" style="padding-right: 30px">
<!-- 					<div class="form-group"> -->
<!-- 						<label for="role_type" class="col-sm-1 col-xs-2 text-left">类型:</label> -->
<!-- 						<div class="col-sm-2 col-xs-6"> -->
<%-- 							<input id="category_type" class="customSelect" name="category" value="${!empty app.type?app.type.id:''}" --%>
<%-- 								data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-process'}}"></input> --%>
<!-- 						</div> -->
<!-- 					</div> -->
					<wfl:categorySelect labelClass="col-sm-1 col-xs-2 text-left" contentClass="col-sm-2 col-xs-6"></wfl:categorySelect>
					<div class="form-group">
						<label for="role_type" class="col-sm-1 col-xs-2 text-left">请选择部署文件:</label>
						<div class="col-sm-4 col-xs-10">
							<input type="file" name="file" id="txt_file" multiple class="file-loading" placeholder="请选择上传文件"/>
						</div>
						<div class="col-sm-4 col-xs-12">
							<span class="help-inline pull-right-xs">支持文件格式：zip、bar、bpmn、bpmn20.xml</span>
						</div>
					</div>
					<div class="col-sm-3 col-md-offset-4">
							<button id="btn_upload" type="button" class="btn btn-primary glyphicon glyphicon-upload">上传部署</button>
					</div>

				</form>
			</div>
		</div>
	</div>
	<!--全局js -->
	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<!--自定义js -->
	<script src="${ctxStatic}/plugins/bootstrap/js/fileinput.min.js"></script>
	<script src="${ctxStatic}/plugins/bootstrap/js/fileinput-zh.js"></script>
	<script type="text/javascript" src="${ctx}/views/workflow/process/js/deploy.js"></script>
	<script type="text/javascript">
	$(function() {
	    //0.初始化fileinput
	    var oFileInput = new FileInput();
	    oFileInput.Init("txt_file", webPath + "/process/manager/deploy");
        });

        //初始化fileinput
        var FileInput = function() {
	    var oFile = new Object();

	    //初始化fileinput控件（第一次初始化）
	    oFile.Init = function(ctrlName, uploadUrl) {
	        var control = $('#' + ctrlName);

	        //初始化上传控件的样式
	        control.fileinput({
	            language : 'zh', //设置语言
	            uploadUrl : uploadUrl, //上传的地址
	            allowedFileExtensions : [ 'jpg', 'gif', 'png', 'xml','zip' ],//接收的文件后缀
	            showUpload : false, //是否显示上传按钮
	            showCaption : true,//是否显示标题
	            browseClass : "btn btn-primary", //按钮样式     
	            dropZoneEnabled : false,//是否显示拖拽区域
	            //minImageWidth: 50, //图片的最小宽度
	            //minImageHeight: 50,//图片的最小高度
	            //maxImageWidth: 1000,//图片的最大宽度
	            //maxImageHeight: 1000,//图片的最大高度
	            //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
	            //minFileCount: 0,
	            maxFileCount : 10, //表示允许同时上传的最大文件个数
	            uploadClass:'btn btn-primary',
	            removeClass:'btn btn-danger',
	            browseClass:"btn btn-info",
	            enctype : 'multipart/form-data',
	            validateInitialCount : true,
	            previewFileIcon : "<i class='glyphicon glyphicon-king'></i>",
	            msgFilesTooMany : "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
	            uploadExtraData: function(previewId, index) {   //额外参数的关键点
	                    var obj = {};
	                    obj.category=$("select[name='category'] option:selected").val();
	                    console.log("cgry="+JSON.stringify(obj));
	                    return obj;
	                }
	        });

	        //导入文件上传完成之后的事件
	        $("#txt_file").on("fileuploaded", function(event, data, previewId, index) {
		    var data = data.response;
		    if (data == undefined) {
		        layer.alert('文件格式类型不正确');
		        return;
		    } else {
		        if (data.code != 200) {
			    layer.alert(data.msg);
		        }
		    }
	        });
	    }
	    return oFile;
        };
    </script>
</body>

</html>
