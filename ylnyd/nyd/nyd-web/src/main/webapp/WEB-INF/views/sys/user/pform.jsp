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
			<input type="hidden" class="form-control" readonly="readonly" id="userId" name="userId" value="${!empty user?user.id:''}">
			<sys:depSelect depId="${!empty user.department?user.department.id:''}" depname="${!empty user.department?user.department.name:''}"></sys:depSelect>
			<div class="form-group">
				<label for="code" class="col-sm-2 col-xs-2 text-left">岗位</label>
				<div class="col-sm-10 col-xs-10">
					<input id="position_select" class="customSelect" name="position.id" value="${!empty user&&!empty user.position?user.position.id:''}"
						data-option="{url:'${ctx}/sys/dep/position/json',textField:'name',valueField:'id',parameter:{depId:'${ !empty user&&!empty user.department?user.department.id:''}'}}"></input>
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
	<script type="text/javascript" src="${ctx}/views/sys/user/js/pform.js"></script>

</body>

</html>
