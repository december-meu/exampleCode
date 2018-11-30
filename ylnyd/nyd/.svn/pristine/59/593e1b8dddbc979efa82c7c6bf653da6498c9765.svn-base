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
			<c:if test="${!empty org }">
				<input type="hidden" name="id" id="id" value="${org.id}" />
			</c:if>

			<div class="form-group">
				<label for="code" class="col-sm-2 col-xs-2 text-left">机构类型</label>
				<div class="input-group col-sm-10 col-xs-10">
					<input id="org_type" class="customSelect" name="typeId" value="${!empty org&&!empty org.type?org.type.id:''}"
						data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-org'}}"></input>
				</div>
			</div>
			<div class="form-group">
				<label for="code" class="col-sm-2 col-xs-2 text-left">机构代码:</label>
				<div class="input-group col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="code" name="code" value="${!empty org?org.code:''}">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-left" for="name">机构名称:</label>
				<div class="input-group col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="name" name="name" value="${!empty org?org.name:''}">
				</div>
			</div>
			<div class="form-group">
				<label for="registTime" class="col-sm-2 col-xs-2 text-left">注册时间:</label>
				<div id="registTimeDiv" class="input-group date form_datetime  col-sm-10 col-xs-10">
					<input class="form-control" id="registTime" name="registTime" type="text" value="<fmt:formatDate  pattern='yyyy-MM-dd' value='${!empty org?org.registTime:\"\"}'/>" readonly/> <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
				</div>
<!-- 				<div class="input-append date form_datetime"> -->
<!-- 					<input size="16" type="text" value="" readonly> <span class="add-on"><i class="icon-th"></i></span> -->
<!-- 				</div> -->
<%-- 				<input type="hidden" id="registTime" name="registTime" value="${!empty org?org.registTime:''}" /><br /> --%>
			</div>



			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-left" for="registAddress">注册地址:</label>
				<div class="input-group col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="registAddress" name="registAddress" value="${!empty org?org.registAddress:''}">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-left" for="leader">法人代表:</label>
				<div class="input-group col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="leader" name="legalPerson" value="${!empty org?org.legalPerson:''}">
				</div>
			</div>
			
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-left" for="tax">税号:</label>
				<div class="input-group col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="tax" name="tax" value="${!empty org?org.tax:''}">
				</div>
			</div>

			<div class="form-group">
				<label for="desc" class="col-sm-2 col-xs-2 text-left">机构地址:</label>
				<div class="input-group col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="address" name="address" value="${!empty org?org.address:''}">
				</div>
			</div>
			<div class="form-group">
				<label for="desc" class="col-sm-2 col-xs-2 text-left">机构描述:</label>
				<div class="input-group col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="desc" name="description" value="${!empty org?org.description:''}">
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
	<script type="text/javascript" src="${ctx}/views/sys/org/js/form.js"></script>

</body>

</html>
