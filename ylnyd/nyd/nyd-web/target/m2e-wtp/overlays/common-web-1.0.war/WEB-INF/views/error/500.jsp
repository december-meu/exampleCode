<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>

<head>

  <%@include file="/WEB-INF/views/include/header.jsp"%>

</head>

<body class="gray-bg">


    <div class="middle-box text-center animated fadeInDown">
        <h1>500</h1>
        <h3 class="font-bold">服务器内部错误</h3>

        <div class="error-desc">
            服务器好像出错了...
            <br/>您可以返回主页看看
            <br/><a href="index.html" class="btn btn-primary m-t">主页</a>
        </div>
        
        
        <div id="error_content">
				<h3 class="error_title_h3">
					<span>非常抱歉，操作失败！</span>
				</h3>
				<dl class="error_dl">
					<dt>可能出现以下问题：</dt>
					<dd>${msg}</dd>
				</dl>
				<dl class="error_dl">
					<dt>造成原因是：</dt>
					<dd>${cause}</dd>
				</dl>
				<dl class="error_dl">
					<dt>错误位置：</dt>
					<dd>${location}</dd>
				</dl>
				<dl class="error_dl">
					<dt>你还可以进行以下操作：</dt>
					<dd>
						<a href="javascript:history.back(-1)" class="error_href_class">返回</a>
					</dd>
				</dl>
			</div>
        
        
    </div>

    <!-- 全局js -->
    <script src="/static/Hplus/js/jquery.min.js?v=2.1.4"></script>
    <script src="/static/Hplus/js/bootstrap.min.js?v=3.3.6"></script>

    <!--统计代码，可删除-->

</body>

</html>
