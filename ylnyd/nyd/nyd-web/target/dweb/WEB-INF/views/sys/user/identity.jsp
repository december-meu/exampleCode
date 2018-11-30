<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ taglib prefix="fns" uri="/WEB-INF/tlds/sys/sys.tld"%>
<!DOCTYPE html>
<html>
<head>

<script type="text/javascript">
    var isSelectForm = false;
    var isSingleSelect = false;
</script>
<c:if test="${!empty group}">
	<script type="text/javascript">
	isSelectForm = true;
    </script>
</c:if>
<%@include file="/WEB-INF/views/include/header.jsp"%>
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="row">
			<div class="col-sm-4 col-xs-4">
				<form class="form-horizontal">

					<div class="form-group">
						<div class="col-sm-12 col-xs-12">
							<input class="form-control" type="text" value="兼职身份" readonly="readonly">
						</div>
					</div>
				</form>
				<div id="id_toolbar">
					<button id="btn_identity_add" type="button" class="btn btn-primary">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
					</button>
					<button id="btn_identity_delete" type="button" class="btn btn-danger">
						<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
					</button>
				</div>
				<table id="identity_list"></table>
			</div>
			<div class="col-sm-4 col-xs-4">
				<form class="form-horizontal">

					<div class="form-group">
						<div class="col-sm-12 col-xs-12">
							<input class="form-control" type="text" value="委托人列表" readonly="readonly">
						</div>
					</div>
				</form>
				<div id="from_toolbar">
					<button id="btn_from_add" type="button" class="btn btn-primary">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>查看
					</button>
				</div>
				<table id="from_list"></table>
			</div>
			<div class="col-sm-4 col-xs-4">
				<form class="form-horizontal">

					<div class="form-group">
						<div class="col-sm-12 col-xs-12">
							<input class="form-control" type="text" value="受托人列表" readonly="readonly">
						</div>
					</div>
				</form>
				<div id="to_toolbar">
					<button id="btn_to_add" type="button" class="btn btn-primary">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
					</button>
					<button id="btn_to_update" type="button" class="btn btn-primary">
						<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改
					</button>
					<button id="btn_to_delete" type="button" class="btn btn-danger">
						<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
					</button>
				</div>
				<table id="to_list"></table>
			</div>
		</div>
	</div>
	</div>
	<!--全局js -->
	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<!--自定义js -->
	<script type="text/javascript" src="${ctx}/views/sys/user/js/identity.js"></script>

</body>

</html>
