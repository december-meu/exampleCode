<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<link href="${ctx}/views/nyd/prj/css/index.css" rel="stylesheet">
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class=" float-e-margins">
			<div class="ibox-title">
				<h5>项目列表</h5>
			</div>
			<div class="ibox-content">
				<!-- <div id="toolbar">
					<button id="btn_add" type="button" class="btn btn-primary btn-sm">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>编辑
					</button>
				</div> -->
				<div>
					<table id="dataList"></table>
				</div>
			</div>
		</div>
	</div>
	<!--全局js -->
	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<!--自定义js -->
	<script type="text/javascript" src="${ctx}/views/nyd/prj/change/js/index.js"></script>

</body>

</html>
