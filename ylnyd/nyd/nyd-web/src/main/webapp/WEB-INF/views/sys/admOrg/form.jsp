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
			<c:if test="${!empty admOrg }">
				<input type="hidden" name="id" value="${admOrg.id}" />
			</c:if>			
			
			<div class="form-group">
				<label for="code" class="col-sm-2 col-xs-2 text-left">机构类型</label>
				<div class="col-sm-10 col-xs-10">
					<input id="admOrg_type" class="customSelect" name="typeId" value="${!empty admOrg&&!empty admOrg.type?admOrg.type.id:''}"
						data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-org'}}"></input>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-left" for="name">区域名称:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="name" name="name" autocomplete="off" value="${!empty admOrg?admOrg.name:''}">
				</div>
			</div>
			<div class="form-group">
				<label for="desc" class="col-sm-2 col-xs-2 text-left">区域描述:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="desc" name="description" value="${!empty admOrg?admOrg.description:' '}">
				</div>
			</div>
			<div class="form-group">
				<label for="desc" class="col-sm-2 col-xs-2 text-left">序号:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="number" class="form-control" id="sortNum" name="sortNum" value="${!empty admOrg&&!empty admOrg.sortNum?admOrg.sortNum:0}" step="5"
                                   min="0" data-bv-greaterthan-inclusive="true" data-bv-greaterthan-message="序号必须大于或等于0"
                                   max="1000" data-bv-lessthan-inclusive="true" data-bv-lessthan-message="序号必须小于或等于1000">
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
	<script type="text/javascript" src="${ctx}/views/sys/admOrg/js/form.js"></script>
</body>
</html>
