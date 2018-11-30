<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>

<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

<title>西安大地测绘登录</title>
<link href="${ctxStatic}/Hplus/css/login.css" rel="stylesheet">
<style>

 #loginForm{  
  	width:300px; 
  	margin:0 auto;
  }  
</style>
<!--[if lt IE 9]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->

<script>
	if (window.top !== window.self) {
		window.top.location = window.location;
	}
</script>

</head>

<body class="signin">
	<div id="lylogo">
		
	</div>
	<div class="signinpanel">
		<div class="row">
			<div class="col-xs-12 aa animated fadeInDown">
				<form id="loginForm" method="post" action="<%=path%>/login">
					<h4 class="no-margins">用户登录</h4>
						<input type="hidden" id="sessionId" value="${sessionId}">
						<p class="m-t-md">&nbsp;</p>
						<input type="text" class="form-control uname" placeholder="请输入用户名"
							id="account" name="account" /> <input type="password"
							class="form-control pword m-b" name="password" placeholder="请输入密码"
							id="password" /> <a
							style="color: green; font-weight: bolder; margin-right: 10px;"
							id="msgtip" href="#"><c:if test="${!empty msg }">${msg}</c:if></a>
						<input class="btn btn-primary bb btn-block" type="button"
							value="提交" id="loginBtn">
				</form>
			</div>
		</div>
	</div>
		<div class="signup-footer">
			<div style="text-align:center;">&copy; 版权所有 : 西安大地测绘股份有限公司
				陕ICP备05005798号-1</div>
		</div>
</body>
<script type="text/javascript">
	var waitPrm = true;
	var oTimer = null;
	$(function() {
		var isLogining = false;
		$('#loginBtn').on('click', function() {
			// 		$("#password").focus()
			var account = $('#account').val();
			var pwd = $('#password').val();
			if (!isValidStr(account)) {
				// 			showMsg("帐号不能为空！");
				$("#msgtip").text("帐号不能为空！")
				return;
			}
			if (account.indexOf(" ") != -1) {
				$("#msgtip").text("账号中不能有空格！");
				return;
			}
			if (!isValidStr(pwd)) {
				// 			showMsg("密码不能为空！");
				$("#msgtip").text("密码不能为空！")
				return;
			}
			if (!isLogining) {
				$('#loginForm').submit();
			}
			isLogining = true;
		})
		document.onkeydown = function() {
			if (event.keyCode == 13) {
				$('#loginBtn').click()
				event.returnValue = false;
			}
		}
	});


	var flagz = true;

	function loadWaiting() {
		$.post(webBasePath + "/user/web/scan/login", {}, function(response) {
			if (response) {
				// 					console.log(JSON.stringify(response));
				// 					setInterval(loadWaiting(),1200);
				if (response.code == 200) {
					console.log(JSON.stringify(response));
// 					clearTimeout(oTimer)
					location.href="<%=path%>/pages/userbase/index.jsp";
				}
			}
		});

	}

</script>
</html>
