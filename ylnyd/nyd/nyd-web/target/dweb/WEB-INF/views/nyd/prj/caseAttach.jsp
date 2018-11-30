<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<link href="${ctx}/views/nyd/prj/css/form.css" rel="stylesheet">
<link rel="stylesheet" href="${ctxStatic}/common/js/bootstrap-fileinput/css/fileinput.css">
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content">
	<input type="hidden" name = "prjId" id ="prjId" value = "${prjId }"></input>
		<div style="width: 90%; padding-left: 10%; padding-top: 30px;">
			<input class="input-files" name="files" filePlural="文件" multiple type="file" data-show-caption="true">
		</div>
	</div>
	<!--全局js -->
	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<!--自定义js -->
	<script type='text/javascript' src="${ctxStatic}/common/js/bootstrap-fileinput/js/fileinput.js"></script>
	<script type="text/javascript" src="${ctx}/views/nyd/prj/js/caseAttach.js"></script>
	<script type='text/javascript' src="${ctxStatic}/common/js/bootstrap-fileinput/js/locales/zh.js"></script>

</body>

</html>
