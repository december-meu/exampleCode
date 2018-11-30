<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ taglib prefix="sys" tagdir="/WEB-INF/tags/sys"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<script type="text/javascript">
    var isSelectForm = false;
    var isSingleSelect = false;
</script>
<c:if test="${!empty dep}">
	<script type="text/javascript">
	isSelectForm = true;
    </script>
</c:if>
<c:if test="${!empty singleSelect&&singleSelect==1}">
	<script type="text/javascript">
	isSingleSelect = true;
        console.log("singleSelec" + isSingleSelect);
    </script>

</c:if>


</head>



<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="row">
			<!-- 			<div class="col-sm-2"> -->
			<%-- 				<sys:deptree></sys:deptree> --%>
			<!-- 			</div> -->
			<input type="hidden" id="positionIds" value="${!empty dep?dep.positionIds:''}">
			<input type="hidden" id="pagenumber" value="">
			<div class="col-sm-12 animated fadeInRight">

				<form id="searchForm" class="form-horizontal">
					<input type="hidden" id="dep-selected-id" name="filter_EQ_department.id" value="">
					<div class="form-group">
						<div class="col-sm-2 col-xs-6">
							<input type="text" class="form-control" id="search-name" name="filter_LIKE_name" placeholder="名称" value="">
						</div>
						<div class="col-sm-2 col-xs-6">
							<input type="text" class="form-control customSelect" id="search-type" msg="类型" name="filter_LIKE_type.id" placeholder="名称" value=""
								data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-position'}}">
						</div>
						<div class="col-sm-2 col-xs-6 col-xs-offset-6">
							<button id="btn_search" type="button" class="btn btn-info dd-btn-search" data-form="searchForm" data-table="dataList">查询</button>
							<button id="btn_reset" type="button" class="btn btn-danger dd-btn-reset" data-form="searchForm" data-table="dataList">重置</button>
						</div>
					</div>
				</form>
				<c:if test="${empty dep}">
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
				</c:if>
				<table id="dataList"></table>
			</div>
		</div>
	</div>
	<!--全局js -->
	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<!--自定义js -->
	<script type="text/javascript" src="${ctx}/views/sys/position/js/index.js"></script>

</body>

</html>
