<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
</head>
<body>
	<div class="wrapper wrapper-content">
<%-- 		<c:if test="${!empty user}"> --%>
<%-- 			<p>${fns:toJsonStringObj(user)}</p> --%>
<%-- 		</c:if> --%>
		<form id="inputForm" class="form-horizontal">
			<c:if test="${!empty user}">
				<input type="hidden" name="id" value="${user.id}" />
			</c:if>
            <c:if test="${!empty user.id}">
			<div class="form-group">
				<label for="code" class="col-sm-2 col-xs-2 text-right">类型:</label>
				<div class="col-sm-10 col-xs-10">
					<input id="role_type" class="customSelect" name="type.id" value="${!empty user.type?user.type.id:''}"
						data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-user'}}"></input>
				</div>
			</div>
			</c:if>
			<div class="form-group">
				<label for="account" class="col-sm-2 col-xs-2 text-right">账号:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="account" name="account" value="${!empty user?user.account:''}">
				</div>
			</div>
			<c:if test="${empty user.id}">
				<div class="form-group">
					<label for="password" class="col-sm-2 col-xs-2 text-right">密码:</label>
					<div class="col-sm-10 col-xs-10">
						<input type="password" class="form-control" id="password" name="password" value="${!empty user?user.account:''}">
					</div>
				</div>
				<div class="form-group">
					<label for="_password" class="col-sm-2 col-xs-2 text-right">密码确认:</label>
					<div class="col-sm-10 col-xs-10">
						<input type="password" class="form-control" id="_password" name="_password" value="">
					</div>
				</div>
			</c:if>
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-right" for="cellphone">手机:</label>
				<div class="col-sm-10 col-xs-10">
					<c:if test="${!empty user.id}">
						<input type="text" class="form-control" id="cellphone" name="cellphone" value="${!empty user?user.cellphone:''}" readonly="readonly">
					</c:if>
					<c:if test="${empty user.id}">
						<input type="text" class="form-control" id="cellphone" name="cellphone" value="">
					</c:if>
				</div>
			</div>
			<div class="form-group">
				<label for="username" class="col-sm-2 col-xs-2 text-right">姓名:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="username" name="username" value="${!empty user?user.username:''}">
				</div>
			</div>
			<%-- <div class="form-group">
			<label for="username" class="col-sm-2 col-xs-2 text-right">性别:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="username" name="username" value="${!empty user?user.sex:''}">
				</div>
				<label class="col-lg-3 control-label">Gender</label>
				<div class="col-lg-5">
					<div class="radio">
						<label> <input type="radio" name="sex" value="male" /> Male
						</label>
					</div>
					<div class="radio">
						<label> <input type="radio" name="sex" value="female" /> Female
						</label>
					</div>
					<div class="radio">
						<label> <input type="radio" name="sex" value="other" /> Other
						</label>
					</div>
				</div>
			</div> --%>


			<div class="form-group">
				<label for="email" class="col-sm-2 col-xs-2 text-right">性别:</label>
				<div class="col-sm-10 col-xs-10">
				<input id="role_sex" class="customSelect" name="sex" value="${!empty user.sex?user.sex:''}"
				data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-sex'}}"></input>
<!-- 					<select name="sex" class="form-control" > -->
<!-- 						<option value="">请选择</option> -->
<!-- 						<option value="男">男</option> -->
<!-- 						<option value="女">女</option> -->
<!-- 					 </select> -->
				</div>
			</div>
			<div class="form-group">
				<label for="email" class="col-sm-2 col-xs-2 text-right">邮箱:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="email" name="email" value="${!empty user?user.email:''}">
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-offset-2 col-xs-offset-2  col-sm-10 col-xs-offset-10" style ="text-align:right">
					<button id="btnSubmit" type="button" class="btn btn-primary">提交</button>
				</div>
			</div>
		</form>
	</div>

	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<script type="text/javascript" src="${ctx}/views/sys/user/js/form.js"></script>

</body>

</html>
