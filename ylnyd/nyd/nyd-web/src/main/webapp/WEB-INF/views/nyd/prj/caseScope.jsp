<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<link href="${ctx}/views/nyd/prj/css/form.css" rel="stylesheet">
<link rel="stylesheet" href="${ctxStatic}/common/js/bootstrap-fileinput/css/fileinput.css">
<%-- <link rel="stylesheet" href="${ctxStatic}/common/css/prjForm.css"> --%>

</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<input type="hidden" name="prjId" id="prjId" value="${prjId }">
		<div style="padding-top: 30px;">
			<label class="col-xs-4 control-label text-right">当前项目用地界址点</label>
			<div class="col-xs-8">
				<input id="input-file1" name="files" filePlural="文件" multiple type="file" data-show-caption="true" accept="text/csv">
			</div>

		</div>
		<div style="padding-top: 20px;clear:both;">
			<label class="col-xs-4 control-label text-right">附属设施用地界址点</label>
			<div class="col-xs-8">
				<input id="input-file2" name="files" filePlural="文件" multiple type="file" data-show-caption="true" accept="text/csv">
			</div>
		</div>
		<!-- 		<div  style="padding-top: 20px;width:160px;margin:0 auto;" > -->
		<!-- 			<a href="javascript:;" class="btn btn-primary" id="sure" >确定</a> -->
		<!-- 			<a style="marign-left:16px;" id="del" href="javascript:;" class="btn btn-warning" >取消</a> -->
		<!-- 		</div> -->
	</div>



	<!--全局js -->
	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<!--自定义js -->
	<script type='text/javascript' src="${ctxStatic}/common/js/bootstrap-fileinput/js/fileinput.js"></script>
	<script type="text/javascript" src="${ctx}/views/nyd/prj/js/caseScope.js"></script>
	<script type='text/javascript' src="${ctxStatic}/common/js/bootstrap-fileinput/js/locales/zh.js"></script>

</body>

</html>
