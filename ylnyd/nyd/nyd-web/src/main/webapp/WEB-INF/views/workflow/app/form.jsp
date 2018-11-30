<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
</head>
<body>
	<div class="wrapper wrapper-content">
		<form id="inputForm" class="form-horizontal" style="padding-right: 30px">
			<c:if test="${!empty app }">
				<input type="hidden" name="id" value="${app.id}" />

			</c:if>

			
			<div class="form-group">
				<label for="role_type" class="col-sm-2 col-xs-2 text-right">类型:</label>
				<div class="col-sm-10 col-xs-10">
					<input id="role_type" class="customSelect" name="type.id" value="${!empty app.type?app.type.id:''}"
						data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-app'}}"></input>
				</div>
			</div>

			<div class="form-group">
				<label for="name" class="col-sm-2 col-xs-2 text-right">名称:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="name" name="name" value="${!empty app?app.name:''}">
				</div>
			</div>
			<div class="form-group">
				<label for="code" class="col-sm-2 col-xs-2 text-right">编码:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="code" name="code" value="${!empty app?app.code:''}">
				</div>
			</div>
	

			<div class="form-group">
				<div class="col-sm-offset-2 col-xs-offset-2  col-sm-10 col-xs-offset-10">
					<button id="btnSubmit" type="button" class="btn btn-success pull-right">提交</button>
				</div>
			</div>
		</form>
	</div>

	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<script type="text/javascript" src="${ctx}/views/prj/app/js/form.js"></script>

</body>

</html>
