<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link type="text/css"
	href="<%=request.getContextPath()%>/res/css/error.css" rel="stylesheet" />
<style type="text/css">
#decorator_main_content {
	padding-bottom: 20px;
}
</style>
<title>操作出错</title>
</head>
<body>
	<div
		style="width: 100%; height: 100%; position: relative; float: left;">
		<div id="error_main_container">
			<div class="error_title_div">
				<h3>权限不足</h3>
			</div>
			<div id="error_content">
				<h3 class="error_title_h3">
					<span>非常抱歉，你没有相关权限！</span>
				</h3>
				<dl class="error_dl">
					<dt>您可以联系管理员,申请分配先关权限！</dt>
					<dd>${msg}</dd>
				</dl>
				<dl class="error_dl">
					<dt>你还可以进行以下操作：</dt>
					<dd>
						<a href="javascript:history.back(-1)" class="error_href_class">返回</a>
					</dd>
				</dl>
			</div>
		</div>
	</div>
</body>