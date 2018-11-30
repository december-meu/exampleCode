<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ taglib prefix="res" tagdir="/WEB-INF/tags/auth"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="row">
			<div class="col-sm-12">
				<c:if test="${!empty role}">
					<res:resTree isSelectView="true" selectedIds="${role.resIds}"></res:resTree>
				</c:if>
			</div>
		</div>
	</div>
	<!--全局js -->
	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<!--自定义js -->
	<script type="text/javascript" src="${ctx}/views/sys/resource/js/select.js"></script>

</body>

</html>
