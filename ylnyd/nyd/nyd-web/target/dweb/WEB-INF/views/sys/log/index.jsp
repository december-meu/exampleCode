<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ taglib prefix="fns" uri="/WEB-INF/tlds/sys/sys.tld"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="row">
			<div class="col-sm-12 animated fadeInRight dataframe">
				<form id="searchForm" class="form-horizontal">
					<div class="form-group">
						<div class="col-sm-2 col-xs-2">
							<input type="text" class="form-control" id="userren" name="filter_LIKE_username" placeholder="操作人" value="">
						</div>
						<div class="col-sm-2 col-xs-2">
							<input type="text" class="form-control layer-date laydate-icon" id="start" name="" placeholder="开始时间" value="">
						</div>
						<div class="col-sm-2 col-xs-2">
							<input type="text" class="form-control layer-date laydate-icon" id="end" name="" placeholder="结束时间" value="">
						</div>
						<div>
							<div class="col-sm-2 col-md-2 col-xs-4">
								<button id="btn_search" type="button" class="btn btn-info dd-btn-search" data-form="searchForm" data-table="dataList">查询</button>
								<button id="btn_search" type="button" class="btn btn-danger dd-btn-reset">重置</button>
							</div>
						</div>
						</div>
				</form>

			</div>
		</div>
		<div class="wrapper-content">
		
		<div id="toolbar">
			<%-- 					<shiro:hasPermission name="log:delete"> --%>
			<button id="btn_delete" type="button" class="btn btn-danger">
				<span class="glyphicon glyphicon三-remove" aria-hidden="true"></span>删除
			</button>
			<%-- 					</shiro:hasPermission> --%>
		</div>
		<table id="dataList"></table>
		</div>
	</div>
	<!--全局js -->
	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<!--自定义js -->
	<script type="text/javascript" src="${ctx}/views/sys/log/js/index.js"></script>

</body>

</html>
