<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="row">
			<div class="col-sm-2">
				<form id="type-searchForm" class="form-horizontal">
					<div class="form-group">
						<div class="col-sm-8 col-xs-8">
							<input type="text" class="form-control" id="search-name" name="filter_LIKE_name" placeholder="名称" value="">
						</div>
						<div class="col-sm-4 col-xs-4">
							<button id="btn_typeSearch" type="button" class="btn btn-info">查询</button>
							
						</div>
					</div>
				</form>


				<div id="typeToolbar">
					<button id="btn_type_add" type="button" class="btn btn-primary">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
					</button>
					<button id="btn_type_edit" type="button" class="btn btn-primary">
						<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改
					</button>
					<button id="btn_type_delete" type="button" class="btn btn-danger">
						<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
					</button>
				</div>
				<table id="dict_type_list"></table>
			</div>
			<div class="col-sm-10 animated fadeInRight">
			
			<form id="searchForm" class="form-horizontal">
					<div class="form-group">
						<div class="col-sm-3 col-xs-3">
							<input type="text" class="form-control" id="search-name" name="filter_LIKE_name" placeholder="名称" value="">
						</div>
						<div class="col-sm-3">
							<button id="btnSearch" type="button" class="btn btn-info">查询</button>
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
				<input type="hidden" id="dict_type" value=""></input>
				<table id="dict_list"></table>
			</div>
		</div>
	</div>
	<!--全局js -->
	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<!--自定义js -->
	<script type="text/javascript" src="${ctx}/views/sys/dict/js/index.js"></script>

</body>

</html>
