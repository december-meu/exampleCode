<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
</head>
<body>
	<input type="hidden" id="proDefKey" value="${proDefKey}">
	<input type="hidden" id="businessName" value="${businessName}">
	<input type="hidden" id="taskKey" value="${taskKey}">
<%-- 	<%@include file="/WEB-INF/views/workflow/include/process_head.jsp"%> --%>
	<div class="wrapper wrapper-content">
		<form id="inputForm" class="form-horizontal">
			<c:if test="${!empty role}">
				<input type="hidden" name="id" value="${role.id}" />
			</c:if>


			<div class="form-group">
				<label for="role_type" class="col-sm-2 col-xs-2 text-left">类型:</label>
				<div class="col-sm-10 col-xs-10">
					<input id="role_type" class="customSelect" name="type.id" value="${!empty role.type?role.type.id:''}"
						data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-role'}}"></input>
				</div>
			</div>

			<div class="form-group">
				<label for="name" class="col-sm-2 col-xs-2 text-left">名称:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="name" name="name" value="${!empty role?role.name:''}">
				</div>
			</div>
			<!-- 			<div class="form-group"> -->
			<!-- 				<label for="code" class="col-sm-2 col-xs-2 text-left">编码:</label> -->
			<!-- 				<div class="col-sm-10 col-xs-10"> -->
			<%-- 					<input type="text" class="form-control" id="code" name="code" value="${!empty role?role.code:''}"> --%>
			<!-- 				</div> -->
			<!-- 			</div> -->
			<div class="form-group">
				<label for="description" class="col-sm-2 col-xs-2 text-left">描述:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="description" name="description" value="">
				</div>
			</div>

			<div class="form-group">
				<div class="col-sm-offset-2 col-xs-offset-2  col-sm-10 col-xs-offset-10">
					<button id="btnSubmit" type="button" class="btn btn-success pull-right">提交</button>
				</div>
				<div class="col-sm-offset-2 col-xs-offset-2  col-sm-10 col-xs-offset-10">
					<button id="btnStartProcess" type="button" class="btn btn-success pull-right">发起申请</button>
				</div>
			</div>
		</form>
	</div>

	<%@include file="/WEB-INF/views/include/footer.jsp"%>
<%-- 	<script type="text/javascript" src="${ctx}/views/sys/role/js/form.js"></script> --%>
	<script type="text/javascript" src="${ctx}/views/sys/role/js/task.js"></script>
<%-- 	<script type="text/javascript" src="${ctx}/views/workflow/include/process.js"></script> --%>

</body>

</html>
