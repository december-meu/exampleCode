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
			<c:if test="${!empty category }">
				<input type="hidden" name="id" value="${category.id}" />
				<input type="hidden" name="code" value="${category.code}" />
			</c:if>

		
			<div class="form-group">
				<label for="code" class="col-sm-2 col-xs-2 text-left">上级类别</label>
				<div class="col-sm-10 col-xs-10">
					<input class="form-control" value="${!empty parent?parent.name:''}" readonly="readonly"> <input type="hidden" name="parent.id" value="${parent.id}" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-left" for="name">类别名称:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="name" name="name" value="${!empty category?category.name:''}">
				</div>
			</div>
			<div class="form-group">
				<label for="desc" class="col-sm-2 col-xs-2 text-left">类别描述:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="desc" name="description" value="${!empty category?category.description:''}">
				</div>
			</div>
			<div class="form-group">
				<label for="desc" class="col-sm-2 col-xs-2 text-left">序号:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="number" class="form-control" id="sortNum" name="sortNum" value="${!empty category&&!empty category.sortNum?category.sortNum:0}" step="5"
                                   min="0" data-bv-greaterthan-inclusive="true" data-bv-greaterthan-message="序号必须大于或等于0"
                                   max="1000" data-bv-lessthan-inclusive="true" data-bv-lessthan-message="序号必须小于或等于1000">
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
	<script type="text/javascript" src="${ctx}/views/workflow/category/js/form.js"></script>

</body>

</html>
