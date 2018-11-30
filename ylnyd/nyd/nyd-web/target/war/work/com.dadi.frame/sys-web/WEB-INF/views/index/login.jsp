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
<link href="<%=path%>/pages/userbase/css/bootstrap.min.css"
	rel="stylesheet">
<link href="<%=path%>/pages/userbase/css/font-awesome.css?v=4.4.0"
	rel="stylesheet">
<link href="<%=path%>/pages/userbase/css/animate.css" rel="stylesheet">
<link href="<%=path%>/pages/userbase/css/style.css" rel="stylesheet">
<link href="<%=path%>/pages/userbase/css/login.css" rel="stylesheet">
<style>

/*  #loginForm{  */
/*  	display:none  */
/*  }  */
</style>
<script src="<%=path%>/pages/userbase/js/jquery.min.js"
	type="text/javascript" charset="utf-8"></script>
<script
	src="<%=path%>/pages/common2017/js/plugins/QRcode/jquery.qrcode.min.js"
	type="text/javascript" charset="utf-8"></script>
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
	<div class="signinpanel">
		<div class="row">
			<div class="col-sm-7">
				<div class="signin-info">
					<div class="logopanel m-b">
						<h1 style="margin: 0;">西安大地测绘股份有限公司</h1>
					</div>
					<div class="m-b"></div>
					<h4>
						<strong> </strong>
					</h4>
					<ul class="m-b ul1">
						<li><i class="glyphicon glyphicon-triangle-right">&nbsp;</i>实时沟通，让工作更简单</li>
						<li><i class="glyphicon glyphicon-triangle-right">&nbsp;</i>专业、高效,成就现代化管理</li>
						<li><i class="glyphicon glyphicon-triangle-right">&nbsp;</i>用品质和服务打造大地品牌</li>
					</ul>
					<h4 id="cx">
						<strong>创新&nbsp;&nbsp;</strong><strong>务实&nbsp;&nbsp;</strong><strong>涵养&nbsp;&nbsp;</strong><strong>拼搏&nbsp;&nbsp;</strong><strong>共赢&nbsp;&nbsp;</strong>
						
					</h4>
				</div>
			</div>
			<div class="col-sm-5 aa animated fadeInDown">

				<form id="loginForm" method="post" action="<%=path%>/login">
					<h4 class="no-margins">密码登录：</h4>
					<div id="changemd">
						<div class="saoma">
							扫码登录
							<div></div>
						</div>
												<INPUT type="hidden" id="sessionId" value="${sessionId}">
						<div class="Zchangeimg">
							<img src="<%=path%>/pages/common2017/img/QRcode.png" />
						</div>
					</div>
					<div id="toggleTerrace">
						<p class="m-t-md">登录到大地测绘管理平台</p>

						<input type="text" class="form-control uname" placeholder="用户名"
							id="account" name="account" /> <input type="password"
							class="form-control pword m-b" name="password" placeholder="密码"
							id="password" /> <a
							style="color: green; font-weight: bolder; margin-right: 10px;"
							id="msgtip" href="#"><c:if test="${!empty msg }">${msg}</c:if></a>
						<input class="btn btn-success bb btn-block" type="button"
							value="提交" id="loginBtn">
					</div>
					<br />
					<div class="QRenter" id="QRenter"></div>
				</form>

			</div>
		</div>
		<div class="signup-footer">
			<div class="pull-left" style="margin-top:-20%">&copy; 版权所有 : 西安大地测绘股份有限公司
				陕ICP备05005798号-1</div>
		</div>

	</div>
</body>
<script type="text/javascript">
	var waitPrm = true;
	var oTimer = null;
// 	setTimeout(function(){
// 		location.reload();
// 	},1000)
	

	$(function() {
		
		oTimer=setInterval(function(){
// 			loadWaiting()
// 			console.log(1)
		},1500)
		

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

	var sessionId = $('#sessionId').val();
	var str = 'http://xa.dadisurvey.com/ddcrm/weChat/common/getcode/'
			+ sessionId + ',webScanLogin/m';
	$("#QRenter").qrcode({

		width : 164,
		height : 164,
		text : str
	});

	var flagz = true;
// 	$('#changemd .Zchangeimg').on('click', function() {
// // 		showMsg('即将开放，敬请期待。。。');
// 				if(flagz){
// 					$('#loginForm .no-margins').text('扫码登录')
// 					$('#loginForm .saoma').text('密码登录')
// 					$('#toggleTerrace').css('display','none')
// 					$(this).find('img').attr('src',webBasePath+'/pages/common2017/img/cpter.png')
// 				}else{
// 					$('#loginForm .no-margins').text('密码登录')
// 					$('#loginForm .saoma').text('扫码登录')
// 					$('#toggleTerrace').css('display','block')
// 					$(this).find('img').attr('src',webBasePath+'/pages/common2017/img/QRcode.png')
// 				}
// 				flagz=!flagz
// 	})

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
