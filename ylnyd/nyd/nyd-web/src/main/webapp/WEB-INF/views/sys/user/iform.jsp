<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ taglib prefix="sys" tagdir="/WEB-INF/tags/sys"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>

</head>
<body>
<script type="text/javascript">

console.log("id=${!empty employee.department?employee.department.id:''}")
</script>
	<div class="wrapper wrapper-content">
		<form id="inputForm" class="form-horizontal" style="padding-right: 30px">
			<c:if test="${!empty user.id }">
				<input type="hidden" name="id" value="${user.id}" />

			</c:if>
		
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-left" for="name">帐号:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" readonly="readonly" id="account" value="${!empty user?user.account:''}">
				</div>
			</div>
			<div class="form-group">
				<label for="user-phone" class="col-sm-2 col-xs-2 text-left">手机:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="user-phone" name="cellphone" value="${!empty user?user.cellphone:''}">
				</div>
			</div>
			
			<div class="form-group">
				<div class="col-sm-offset-10 col-xs-offset-2  col-sm-10 col-xs-offset-10">
					<button id="btnSubmit" type="button" class="btn btn-success pull-right">提交</button>
				</div>
			</div>
		</form>
	</div>

	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<script type="text/javascript" src="${ctx}/views/sys/user/js/iform.js"></script>

</body>

</html>
