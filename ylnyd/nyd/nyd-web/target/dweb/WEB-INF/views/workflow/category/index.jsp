<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ taglib prefix="wfl" tagdir="/WEB-INF/tags/wfl"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="row">
			<div class="col-sm-2">
				<wfl:categoryTree></wfl:categoryTree>
			</div>


			<div class="col-sm-10 animated fadeInRight">
				<form id="searchForm" class="form-horizontal">
					<input type="hidden" id="dep-selected-id" name="filter_EQ_parent.id" value="">
					<div class="form-group">
						<div class="col-sm-2 col-xs-2">
							<input type="text" class="form-control" id="search-name" name="filter_LIKE_name" placeholder="名称" value="">
						</div>
						<div class="col-sm-3">
							<button id="btn_search" type="button" class="btn btn-info dd-btn-search" data-form="searchForm" data-table="dataList">查询</button>
							<button id="btn_reset" type="button" class="btn btn-danger dd-btn-reset" data-form="searchForm" data-table="dataList">重置</button>
						</div>
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
	<script type="text/javascript" src="${ctx}/views/workflow/category/js/index.js"></script>

</body>

</html>
