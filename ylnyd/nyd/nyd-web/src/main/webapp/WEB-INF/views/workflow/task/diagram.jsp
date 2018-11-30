<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ taglib prefix="wfl" tagdir="/WEB-INF/tags/wfl"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<meta http-equiv="Content-Type"
	content="text/html; charset=charset=UTF-8" />
<title>流程图查看</title>
</head>
<body>

	<div>
		<img id="trace_diagram"
			src="<%=path%>/process/task/resource/${processInstanceId}?type=${resourceType}"
			style="position: absolute; left: 0px; top: 0px;">

		<div id="trace_legend"
			style="position: absolute; width: 400px; left: 20px; top: 30px;">
			<table cellspacing="10">
				<tr>
					<td style="font-weight: bold;">图例：</td>
					<td>
						<div
							style="display: inline-block; border-radius: 3px; border: 3px solid red; width: 16px; height: 16px"></div>
						<sapn>当前活动</span>
					</td>
					<td>
						<div
							style="display: inline-block; border-radius: 3px; border: 3px solid green; width: 16px; height: 16px"></div>
						<sapn>历史活动</span>
					</td>
				</tr>
			</table>
		</div>
		<!-- 给执行的节点加框 -->
		<c:if test="${empty activitiTrace}">
			<div
				style="position: absolute; border-radius: 15px; border: 5px solid red; left: 300px; top: 300px; width: 300px; height: 80px;">
				<h1>流程已结束！！！</h1>
			</div>

		</c:if>
		<c:if test="${!empty activitiTrace}">
			<c:forEach items="${activitiTrace }" var="item">
				<c:if test="${item.isCurrentActiviti==1}">
					<div id="div_highlight"
						style="position:absolute;border-radius: 3px; border:3px solid red;left:${item.x }px;top:${item.y}px;width:${item.width }px;height:${item.height }px;"></div>
				</c:if>
				<c:if test="${item.isHistoricActiviti==1}">
					<div id="div_highlight"
						style="position:absolute;border-radius: 3px; border:3px solid green;left:${item.x }px;top:${item.y}px;width:${item.width }px;height:${item.height }px;"></div>
				</c:if>
			</c:forEach>
		</c:if>
	</div>
	<script type="text/javascript">
		$(function() {
			return;
			var imgSrc = $("#trace_diagram").attr("src");
			getImageWidth(imgSrc, function(w, h) {
				console.log({
					width : w,
					height : h
				});
				$('#trace_legend').css({top:h,left:150})
			});
		});

		function getImageWidth(url, callback) {
			var img = new Image();
			img.src = url;

			// 如果图片被缓存，则直接返回缓存数据
			if (img.complete) {
				callback(img.width, img.height);
			} else {
				// 完全加载完毕的事件
				img.onload = function() {
					callback(img.width, img.height);
				}
			}

		}
	</script>
</body>
</html>