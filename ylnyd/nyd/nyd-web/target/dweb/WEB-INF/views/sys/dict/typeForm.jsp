<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
</head>
<body>
	<div class="wrapper wrapper-content">
		<form id="inputForm" class="form-horizontal">
			<c:if test="${!empty dictType }">
				<input type="hidden" name="id" value="${dictType.id}"/>
			</c:if>
			<div class="form-group">
				<label for="type_code" class="col-sm-2 col-xs-2 text-right">类别编码:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="type_code" name="code" value="${!empty dictType?dictType.code:''}">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-right" for="type_name">类别名称:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="type_name"  name="name" value="${!empty dictType?dictType.name:''}">
				</div>
			</div>
			
			<div class="form-group">
				<label for="type_desc" class="col-sm-2 col-xs-2 text-right">类别描述:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="type_desc" name="description" value="${!empty dictType?dictType.description:''}">
				</div>
			</div>
			<div class="form-group">
				<label for="type_sortNum" class="col-sm-2 col-xs-2 text-right">序号:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="type_sortNum" name="sortNum" value="${!empty dictType&&!empty dictType.sortNum?dictType.sortNum:0}">
				</div>
			</div>

			<div class="form-group">
				<div class="col-sm-offset-2 col-xs-offset-2  col-sm-10 col-xs-offset-10">
					<button id="btnSubmit" type="button" class="btn btn-default">提交</button>
				</div>
			</div>
		</form>
	</div>

	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<script type="text/javascript" src="${ctx}/views/sys/dict/js/typeForm.js"></script>

</body>

</html>
