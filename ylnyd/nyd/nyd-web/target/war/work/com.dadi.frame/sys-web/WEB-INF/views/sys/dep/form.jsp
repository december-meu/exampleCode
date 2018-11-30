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
			<c:if test="${!empty dep }">
				<input type="hidden" name="id" value="${dep.id}" />
			</c:if>

<!-- 			<div class="form-group"> -->
<!-- 				<label for="code" class="col-sm-2 col-xs-2 text-left">组织机构</label> -->
<!-- 				<div class="col-sm-10 col-xs-10"> -->
<%-- 					<input class="form-control" value="${!empty org?org.name:''}" readonly="readonly"> <input id="org_id" type="hidden" name="orgId" value="${org.id}" /> --%>
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 			<div class="form-group"> -->
<!-- 				<label for="code" class="col-sm-2 col-xs-2 text-left">上级部门</label> -->
<!-- 				<div class="col-sm-10 col-xs-10"> -->
<%-- 					<input class="form-control" value="${!empty parent?parent.name:''}" readonly="readonly"> <input type="hidden" name="pid" value="${parent.id}" /> --%>
<!-- 				</div> -->
<!-- 			</div> -->
			
			<sys:depSelect depId="${!empty parent?parent.id:''}" depname="${!empty parent?parent.name:''}" orgClass="hidden" orgLabel="上级部门"></sys:depSelect>
			
			<div class="form-group">
				<label for="code" class="col-sm-2 col-xs-2 text-left">部门类型</label>
				<div class="col-sm-10 col-xs-10">
					<input id="dep_type" class="customSelect" name="typeId" value="${!empty dep&&!empty dep.type?dep.type.id:''}"
						data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-dep'}}"></input>
				</div>
			</div>
			<div class="form-group">
				<label for="code" class="col-sm-2 col-xs-2 text-left">部门代码:</label>
				<div class="input-group input-group-xs input-group-sm  col-sm-10 col-xs-10 ">
					<c:if test="${empty dep||empty dep.id}">
						<div class="input-group-addon">${!empty org?org.code:""}-</div>
					</c:if>
					<input type="text" class="form-control" id="code" name="code" value="${!empty dep&&!empty dep.code?dep.code:''}">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-left" for="name">部门名称:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="name" name="name" value="${!empty dep?dep.name:''}">
				</div>
			</div>
			<div class="form-group">
				<label for="desc" class="col-sm-2 col-xs-2 text-left">部门缩写:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="shortName" name="shortName" value="${!empty dep?dep.shortName:''}">
				</div>
			</div>
			<div class="form-group">
				<label for="desc" class="col-sm-2 col-xs-2 text-left">部门描述:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="desc" name="description" value="${!empty dep?dep.description:''}">
				</div>
			</div>
			<div class="form-group">
				<label for="desc" class="col-sm-2 col-xs-2 text-left">序号:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="number" class="form-control" id="sortNum" name="sortNum" value="${!empty dep&&!empty dep.sortNum?dep.sortNum:0}" step="5"
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
	<script type="text/javascript" src="${ctx}/views/sys/dep/js/form.js"></script>

</body>

</html>
