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
				<div id="toolbar">
					<button id="btn_add" type="button" class="btn btn-primary btn-sm">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
					</button>
					<button id="btn_edit" type="button" class="btn btn-primary btn-sm">
						<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑
					</button>
					<button id="btn_delete" type="button" class="btn btn-danger btn-sm">
						<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
					</button>
				</div>
				<div>
					<table id="dataList"></table>
				</div>
			</div>
		</div>
	</div>
	<!--全局js -->
	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<!--自定义js -->
	<script type="text/javascript" src="${ctx}/views/nyd/prj/js/index.js"></script>

</body>

</html>
