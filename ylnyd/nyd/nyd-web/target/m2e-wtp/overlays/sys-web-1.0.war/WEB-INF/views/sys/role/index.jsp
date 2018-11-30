<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript">
    var isSelectForm = false;
</script>
<c:if test="${!empty user||!empty group||!empty relationItem }">
	<script type="text/javascript">
	isSelectForm = true;
    </script>
</c:if>
<%@include file="/WEB-INF/views/include/header.jsp"%>
</head>

<body class="gray-bg">
	<input type="hidden" id="roleIds" value="${!empty user?user.roleIds:(!empty group?group.roleIds:(!empty selectedIds?selectedIds:''))}">
	<div class="wrapper wrapper-content">
		<div class="row">
		<c:choose>
			<c:when test="${!empty user||!empty group||!empty relationItem }">
				<div class="col-sm-3">
					<h4 style="margin-top:45px;margin-bottom:-11px;"> 已选择角色列表</h4>
					<table id="selectedList"></table>
				</div>
				<div class="col-sm-9 animated fadeInRight dataframe">
			</c:when>
			<c:otherwise>
				<div class="col-sm-12 animated fadeInRight dataframe">
			</c:otherwise>
		</c:choose>
				<form id="searchForm" class="form-horizontal">
					<div class="form-group">
						<div class="col-sm-2 col-xs-3">
							<input type="text" class="form-control" id="search-name" name="filter_LIKE_name" placeholder="名称" value="">
						</div>
						<div class="col-sm-2 col-xs-3">
							<input type="text" class="form-control" id="search-name" name="filter_LIKE_code" placeholder="编码" value="">
						</div>
						<div class="col-sm-2 col-xs-3">
							<input type="text" class="form-control customSelect" id="search-name" msg="类型" name="filter_EQ_type.id" placeholder="名称" value=""
								data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-role'}}">
						</div>
						<div class="col-sm-2 col-xs-3">
							<button id="btn_search" type="button" class="btn btn-info dd-btn-search" data-form="searchForm" data-table="dataList">查询</button>
							<button id="btn_reset" type="button" class="btn btn-danger dd-btn-reset">重置</button>
						</div>
					</div>
				</form>
					<c:if test="${empty user&&empty group&&empty relationItem}">
						<div id="toolbar">
							<button id="btn_add" type="button" class="btn btn-primary">
								<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
							</button>
							<shiro:hasPermission name="role:edit">
								<button id="btn_edit" type="button" class="btn btn-primary">
									<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改
								</button>
								<button id="btn_setRes" type="button" class="btn btn-info">
									<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>分配资源
								</button>
								<button id="btn_setDep" type="button" class="btn btn-info">
									<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>数据权限
								</button>
								<button id="btn_delete" type="button" class="btn btn-danger">
									<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
								</button>
							</shiro:hasPermission>
						</div>
					</c:if>
				<table id="dataList"></table>
			</div>
		</div>
	</div>
	<!--全局js -->
	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<!--自定义js -->
	<script type="text/javascript" src="${ctx}/views/sys/role/js/index.js"></script>

</body>

</html>
