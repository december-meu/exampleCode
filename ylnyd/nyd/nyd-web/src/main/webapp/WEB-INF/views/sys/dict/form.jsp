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
			<c:if test="${!empty dict }">
				<input type="hidden" name="id" value="${dict.id}" />
			</c:if>

			<div class="form-group">
				<label for="code" class="col-sm-2 col-xs-2 text-right">字典类型:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="type" value="${dictType.name}" readonly="readonly"> <input type="hidden" class="form-control" id="typeId" name="typeId" value="${dictType.id}"
						readonly="readonly">
				</div>
			</div>
			<!-- 			<div class="form-group"> -->
			<!-- 				<label for="code" class="col-sm-2 col-xs-2 text-right">字典编码:</label> -->
			<!-- 				<div class="col-sm-10 col-xs-10"> -->
			<%-- 					<input type="text" class="form-control" id="code" name="code" value="${!empty dict?dict.code:''}"> --%>
			<!-- 				</div> -->
			<!-- 			</div> -->
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-right" for="name">字典名称:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="name" name="name" value="${!empty dict?dict.name:''}">
				</div>
			</div>

			<div class="form-group">
				<label for="desc" class="col-sm-2 col-xs-2 text-right">字典描述:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="desc" name="description" value="${!empty dict?dict.description:''}">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-right" for="sortNum">字典序号:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="sortNum" name="sortNum" value="${!empty dict&&!empty dict.sortNum?dict.sortNum:0}">
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
	<script type="text/javascript" src="${ctx}/views/sys/dict/js/form.js"></script>

</body>

</html>
