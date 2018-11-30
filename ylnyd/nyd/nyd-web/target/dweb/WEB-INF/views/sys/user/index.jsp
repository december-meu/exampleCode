<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ taglib prefix="fns" uri="/WEB-INF/tlds/sys/sys.tld"%>
<!DOCTYPE html>
<html>
<head>

<script type="text/javascript">
    var isSelectForm = false;
    var isSingleSelect = false;
    console.log("user"+_userId+"||"+_roles+"||"+_permissions);
</script>
<c:if test="${!empty group||!empty dep||!empty superior||!empty admOrg}">
	<script type="text/javascript">
	isSelectForm = true;
	isSingleSelect=${!empty singleSelect&&singleSelect==1}
    </script>
</c:if>

<c:if test="${!empty isSelectForm&&isSelectForm==1}">
	<script type="text/javascript">
    isSelectForm=true;
    isSingleSelect=${!empty singleSelect&&singleSelect==1}
    </script>
</c:if>
<%@include file="/WEB-INF/views/include/header.jsp"%>
</head>

<body class="gray-bg">
	<input type="hidden" id="superiorId" value="${!empty superior?superior.id:'' }">
	<div class="wrapper wrapper-content">
		<div class="row">
		<c:choose>
			<c:when test="${!empty group||!empty dep||!empty superior||!empty admOrg}">
				<div class="col-sm-3">
					<h4 style="margin-top:45px;margin-bottom:-11px;"> 已选择人员列表</h4>
					<table id="selectedList"></table>
				</div>
				<div class="col-sm-9 animated fadeInRight dataframe">
			</c:when>
			<c:otherwise>
				<div class="col-sm-12 animated fadeInRight dataframe">
			</c:otherwise>
		</c:choose>
				<input type="hidden" id="userIds" value="${!empty group?group.userIds:(!empty dep?dep.depLeader.id:(!empty superior?superior.subordinateIds:(!empty admOrg?admOrg.leader.id:'')))}">
				<form id="searchForm" class="form-horizontal">
					<div class="form-group">
						<div class="col-sm-2 col-md-2 col-xs-4">
							<input type="text" class="form-control" id="search-name" name="filter_LIKE_username" placeholder="名称" value="">
						</div>
						<div class="col-sm-2 col-md-2 col-xs-4">
							<input type="text" class="form-control customSelect" id="search-type" msg="类型" name="filter_LIKE_type.id" placeholder="名称" value=""
								data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-user'}}">
						</div>
						<sys:depSelect wrapped="N" depId="${!empty user.department?user.department.id:''}" depname="${!empty user.department?user.department.name:''}" disableLabel="true" contentClass="col-sm-2 col-md-2 col-xs-4"></sys:depSelect>
						<div class="col-sm-2 col-md-2 col-xs-4">
							<button id="btn_search" type="button" class="btn btn-info dd-btn-search" data-form="searchForm" data-table="dataList">查询</button>
							<button id="btn_reset" type="button" class="btn btn-danger dd-btn-reset clear-hidden">重置</button>
						</div>
					</div>
				</form>
				<c:if test="${(1!=isSelectForm)&&empty group&&empty dep&&empty superior&&empty admOrg}">
					<div id="toolbar">
						<shiro:hasPermission name="user:add">
							<button id="btn_add" type="button" class="btn btn-primary">
								<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
							</button>
						</shiro:hasPermission>
						<shiro:hasPermission name="user:edit">
							<button id="btn_edit" type="button" class="btn btn-primary">
								<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改
							</button>
						</shiro:hasPermission>
						
						<shiro:hasPermission name="user:edit">
							<button id="btn_setRole" type="button" class="btn btn-info">
								<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>分配角色
							</button>
						</shiro:hasPermission>
						<shiro:hasPermission name="user:edit">
							<button id="btn_setOrgInfo" type="button" class="btn btn-info">
								<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>设置机构信息
							</button>
						</shiro:hasPermission>
						<shiro:hasPermission name="user:edit">
							<button id="btn_updatePhone" type="button" class="btn btn-info">
								<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改手机号
							</button>
						</shiro:hasPermission>
						<shiro:hasPermission name="user:edit">
							<button id="btn_setSubordinate" type="button" class="btn btn-info">
								<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>设置直接下属
							</button>
						</shiro:hasPermission>
                        <shiro:hasPermission name="user:edit">
                              <button id="btn_editPassword" type="button" class="btn btn-info">
                                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改密码
                              </button>
                            </shiro:hasPermission>
						<shiro:hasPermission name="user:delete">
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
	<script type="text/javascript" src="${ctx}/views/sys/user/js/index.js"></script>

</body>

</html>
