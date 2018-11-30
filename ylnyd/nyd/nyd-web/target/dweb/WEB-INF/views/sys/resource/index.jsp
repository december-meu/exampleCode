<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ taglib prefix="res" tagdir="/WEB-INF/tags/auth"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="row">
			<div class="col-sm-2 col-md-2">
				<res:resTree resUrl="sys/res/menus"></res:resTree>
			</div>

			<div class="col-sm-10 animated fadeInRight">
				<form id="searchForm" class="form-horizontal">
					<div class="form-group">
						<div class="col-sm-2 col-xs-2">
							<input type="text" class="form-control" id="search-name" name="filter_LIKE_name" placeholder="姓名" value="">
						</div>

						<div class="col-sm-2 col-xs-2">
							<input type="text" class="form-control customSelect" id="search-type" msg="类型" name="filter_LIKE_type.id" placeholder="名称" value=""
								data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-resource'}}">
						</div>
						<shiro:hasPermission name="res:edit">
						<div class="col-sm-3">
							<button id="btn_search" type="button" class="btn btn-info dd-btn-search" data-form="searchForm" data-table="dataList">查询</button>
							<button id="btn_reset" type="button" class="btn btn-danger dd-btn-reset" data-form="searchForm" data-table="dataList">重置</button>
						</div>
						</shiro:hasPermission>
					</div>
				</form>


				<div id="toolbar">
					<button id="btn_add" type="button" class="btn btn-primary">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
					</button>
					<button id="btn_edit" type="button" class="btn btn-primary">
						<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改
					</button>
					<button id="btn_delete" type="button" class="btn btn-danger">
						<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
					</button>
				</div>
				<table id="dataList"></table>
			</div>
		</div>
	</div>
	<!--全局js -->
	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<!--自定义js -->
	<script type="text/javascript" src="${ctx}/views/sys/resource/js/index.js"></script>

</body>

</html>
