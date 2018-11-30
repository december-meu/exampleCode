<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ taglib prefix="wfl" tagdir="/WEB-INF/tags/wfl"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<title>添加 用户</title>
<title>Insert title here</title>
<style>
.non_tip {
	margin-top: 50px;
	margin-left: 30px;
}

.wrap {
	position: relative;
}

.subwrap {
	position: absolute;
	top: 50%;
}

.content {
	position: relative;
	top: -50%;
}
</style>
</head>
<body class="gray-bg">
	<div>
		<div class="easyui-panel myPanel" style="padding: 5px; width: 100%; height: 40px">
			<a href="#" class="btn btn-danger op_btn" data-options="iconCls:'icon-cancel'" onclick="closeThis()">关闭</a>
			<c:if test="${!empty activitiTrace}">
				<a href="#" class="btn btn-primary op_btn" data-options="iconCls:'icon-ok'" onclick="javascript:confirm(${backOrForward})">确定</a>
			</c:if>
			<input type="hidden" id="back-forward" value="${backOrForward }">
		</div>
		<!-- 给执行的节点加框 -->
		<form id="activity_select">
			<c:if test="${!empty activitiTrace}">
				<c:forEach items="${activitiTrace}" var="item" varStatus="state">
					<c:if test="${item.isCurrentActiviti==1}">
						<div id="div_highlight" style="position:absolute;border-radius:15px; border:5px solid red;left:${item.x-5 }px;top:${item.y-5 }px;width:${item.width }px;height:${item.height }px;"></div>
					</c:if>
					<c:if test="${item.isHistoricActiviti==1}">
						<div id="div_highlight" style="position:absolute;border-radius:15px; border:5px solid green;left:${100+state.index*180}px;top:100px;width:120px;height:80px;">
							<div align="center" style="position: relative;">
								<input type="radio" style="position: absolute; left: 1px; top: 1px; width: 18px; height: 18px;" name="activitId" value="${item.activityId}">
								<div align="center" style="position: absolute; left: 20px; top: 20px;">${item.activityName}</div>
							</div>
						</div>
						<c:if test="${!state.last }">
							<div style="position:absolute;left: ${230+state.index*180};top:100px;width:50px;height:80px;text-align:center;line-height:80px;">
								<img style="position: relative; top: 20px; magin: auto:0;" " src="<%=path%>/static/images/arrow-right.png" />
							</div>
						</c:if>
					</c:if>

				</c:forEach>
			</c:if>
			<c:if test="${empty activitiTrace}">
				<div class="non_tip">
					<c:if test="${backOrForward==1}">
						<h1>已经是起始节点,不可以回退！</h1>
					</c:if>
					<c:if test="${backOrForward==2}">
						<h1>已经是最终节点,不可以向前跳转！</h1>
					</c:if>
				</div>

			</c:if>

		</form>
	</div>
<script type="text/javascript" src="${ctx}/views/workflow/task/js/select.js"></script>
</body>
</html>