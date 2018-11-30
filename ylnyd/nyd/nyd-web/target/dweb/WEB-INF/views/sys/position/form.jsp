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
			<c:if test="${!empty position.id }">
				<input type="hidden" name="id" id="id" value="${position.id}" />

			</c:if>
			<div class="form-group">
				<label for="code" class="col-sm-2 col-xs-2 text-left">岗位类型</label>
				<div class="col-sm-10 col-xs-10">
					<input id="position_type" class="customSelect" name="type.id" value="${!empty position&&!empty position.type?position.type.id:''}"
						data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-position'}}"></input>
				</div>
			</div>

			<!-- 			<div class="form-group"> -->
			<!-- 				<label class="col-sm-2 col-xs-2 text-left" for="code">岗位编码:</label> -->
			<!-- 				<div class="col-sm-10 col-xs-10"> -->
			<%-- 					<input type="text" class="form-control" id="code" name="code" value="${!empty position?position.code:''}"> --%>
			<!-- 				</div> -->
			<!-- 			</div> -->
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-left" for="name">岗位名称:</label>
				<div class="col-sm-10 col-xs-10">
<%-- 					<input type="text" class="form-control" id="id" name="id" value="${!empty position?position.id:''}"> --%>
					<input type="text" class="form-control" id="name" name="name" value="${!empty position?position.name:''}">
				</div>
			</div>
			<div class="form-group">
				<label for="desc" class="col-sm-2 col-xs-2 text-left">岗位描述:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="desc" name="description" value="${!empty position?position.description:''}">
				</div>
			</div>
			<div class="form-group">
				<label for="sortNum" class="col-sm-2 col-xs-2 text-left">排序:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="sortNum" name="sortNum" value="${!empty position?position.sortNum:0}">
				</div>
			</div>

			<div class="form-group">
				<div class="col-sm-offset-2 col-xs-offset-2  col-sm-10 col-xs-offset-10">
					<button id="btnSubmit" type="button" class="btn btn-success">提交</button>
				</div>
			</div>
		</form>
	</div>

	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<script type="text/javascript" src="${ctx}/views/sys/position/js/form.js"></script>

</body>

</html>
