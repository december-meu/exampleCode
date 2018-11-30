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
			<input type="hidden" name="id" value="${res.id}"/>
			<div class="form-group">
				<label for="parent_name" class="col-sm-2 col-xs-2 text-right">上级资源:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="parent_name"  value="${!empty parent?parent.name:!empty res.parent?res.parent.name:''}" readonly="readonly">
					<input type="hidden" class="form-control" id="parent_id" name="parent.id" value="${!empty parent?parent.id:!empty res.parent?res.parent.id:''}" readonly="readonly">
				</div>
			</div>
			<div class="form-group">
				<label for="res_type" class="col-sm-2 col-xs-2 text-left">资源类型</label>
				<div class="col-sm-10 col-xs-10">
					<input id="res_type" class="customSelect" name="type.id" value="${!empty res&&!empty res.type?res.type.id:''}"
						data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-resource'}}"></input>
				</div>
			</div>
			
			
			<div class="form-group">
				<label for="url" class="col-sm-2 col-xs-2 text-right">资源链接:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="url" name="url" value="${!empty res?res.url:''}">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-right" for="name">资源名称:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="name"  name="name" value="${!empty res?res.name:''}">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-right" for="permission">资源标识:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="permission"  name="permission" value="${!empty res?res.permission:''}">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-xs-2 text-right" for="icon">资源图标:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="permission"  name="icon" value="${!empty res?res.icon:''}">
				</div>
			</div>
			
			<div class="form-group">
				<label for="desc" class="col-sm-2 col-xs-2 text-right">资源描述:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="desc" name="description" value="${!empty res?res.description:''}">
				</div>
			</div>
		
			<div class="form-group">
				<label for="sort" class="col-sm-2 col-xs-2 text-right">排序:</label>
				<div class="col-sm-10 col-xs-10">
					<input type="text" class="form-control" id="sort" name="sortNum" value="${!empty res?res.sortNum:''}">
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
	<script type="text/javascript" src="${ctx}/views/sys/resource/js/form.js"></script>

</body>

</html>
