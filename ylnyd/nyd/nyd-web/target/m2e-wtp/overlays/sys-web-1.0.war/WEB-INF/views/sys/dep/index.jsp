<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ taglib prefix="sys" tagdir="/WEB-INF/tags/sys"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>

<script type="text/javascript">
    var isSelectForm = false;
</script>
<c:if test="${!empty admParent||!empty admOrg}">
	<script type="text/javascript">
	isSelectForm = true;
    </script>
</c:if>
</head>

<body class="gray-bg">
	<input type="hidden" id="admParentId" value="${!empty admParent?admParent.id:''}">
	<input type="hidden" id="depIds" value="${!empty admParent?admParent.admChildIds:(!empty admOrg?admOrg.depIds:'')}">
	<div class="wrapper wrapper-content">
		<div class="row">
			<c:if test="${empty admParent&&empty admOrg}">
				<div class="col-xs-4 col-sm-3 col-md-2" >
					<sys:deptree ></sys:deptree>
				</div>
			</c:if>

			<div class="${empty admParent&&empty admOrg?col-xs-12:col-xs-8} col-sm-9 col-md-10 animated fadeInRight">
				<form id="searchForm" class="form-horizontal">
					<input type="hidden" id="dep-selected-id" name="filter_EQ_parent.id" value="">
					<div class="form-group">
						<div class="col-sm-2 col-md-2 col-xs-6">
							<input type="text" class="form-control" id="search-name" name="filter_LIKE_name" placeholder="名称" value="">
						</div>
						<div class="col-sm-2 col-md-2 col-xs-6">
							<input type="text" class="form-control" id="search-code" name="filter_LIKE_code" placeholder="编码" value="">
						</div>
						<div class="col-sm-2 col-md-2 col-xs-6 ">
							<input type="text" class="form-control customSelect" id="search-type" msg="类型" name="filter_LIKE_type.id" placeholder="名称" value=""
								data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-dep'}}">
						</div>
						<div class="col-sm-3 col-xs-6">
							<button id="btn_search" type="button" class="btn btn-info dd-btn-search" data-form="searchForm" data-table="dataList">查询</button>
							<button id="btn_reset" type="button" class="btn btn-danger dd-btn-reset" data-form="searchForm" data-table="dataList">重置</button>
						</div>
					</div>
				</form>
				<c:if test="${empty admParent&&empty admOrg}">
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
					<button id="btn_setLeader" type="button" class="btn btn-info">
						<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>指定负责人
					</button>
					<button id="btn_setPosition" type="button" class="btn btn-info">
						<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>分配岗位
					</button>
                                        <!-- 配置行政管理层面的子部门 -->
<!-- 					<button id="btn_setAdmChildren" type="button" class="btn btn-info">
						<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>子部门
					</button> -->
				</div>
				</c:if>
				<table id="dataList"></table>
			</div>
		</div>
	</div>
	<!--全局js -->
	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<!--自定义js -->
	<script type="text/javascript" src="${ctx}/views/sys/dep/js/index.js"></script>

</body>

</html>
