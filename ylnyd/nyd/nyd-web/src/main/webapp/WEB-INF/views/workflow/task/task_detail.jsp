<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ taglib prefix="wfl" tagdir="/WEB-INF/tags/wfl"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<style type="text/css">
.searchForm td {
	font-size: 0.6rem;
}

.td_label {
	direction: rtl;
}
</style>
</head>
<body class="gray-bg" style="overflow-y:auto">
	<input type="hidden" id="prodefKey" value="${prodefKey}">
	<c:if test="${empty flag&&('start'!=flag)}">
	<%@include file="/WEB-INF/views/workflow/include/process_head.jsp"%>
	</c:if>
	<iframe style="width:100%;height:100%;" src="${taskFormUrl}"  id="taskFormFrame" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" onLoad="iFrameHeight()"> </iframe>
	<script type="text/javascript" src="${ctx}/views/workflow/include/process.js"></script>
	<script type="text/javascript">
	function iFrameHeight() {
	    var ifm = document.getElementById("taskFormFrame");
	    var subWeb = document.frames ? document.frames["taskFormFrame"].document : ifm.contentDocument;
	    if (ifm != null && subWeb != null) {
	        ifm.height = subWeb.body.scrollHeight;
	        ifm.width = subWeb.body.scrollWidth;
	    	}
       	}
    </script>
</body>
</html>