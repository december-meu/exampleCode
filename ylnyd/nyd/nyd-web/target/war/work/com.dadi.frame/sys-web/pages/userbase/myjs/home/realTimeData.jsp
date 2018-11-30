<!DOCTYPE html>
<html>
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<%@include file="/pages/common2017/header/header.jsp"%>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="renderer" content="webkit">
<title>实时化仪表盘</title>
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>pages/common2017/css/plugins/bootstrap-table/bootstrap-table.min.css">
<link href="<%=path%>/pages/userbase/css/animate.css" rel="stylesheet">
<link href="<%=path%>/pages/userbase/css/style.css?v=4.1.0"
	rel="stylesheet">
<link href="<%=path%>/pages/userbase/js/plugins/layer/skin/layer.css"
	rel="stylesheet">
<link href="<%=path%>/pages/userbase/css/common.css" rel="stylesheet" />

<style>
#header {
	height: 100px;
	border-bottom: 1px solid #ccc;
	position: relative;
}

#header h1 {
	color: black;
	left: 210px;
}

#header .headerPosition {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}

#header img {
	left: 100px;
}

#nav {
	border: 1px solid #ccc;
	border-top: none;
	width: 245px;
}

#nav ul li {
	border: none;
	margin: 0 3px;
	font-size: 16px;
	position: relative;
	font-family: '微软雅黑';
	color: #333;
}

#nav ul li a {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 116px;
	left: -58px;
	margin-left: 50%;
	text-align: center;
	color:#333;
}

#nav ul li:hover {
	background: #408ad1;
	cursor: pointer;
}
#nav ul li:hover a{
	color: white;
}
#nav .mark {
	position: relative;
	margin-top: 10px;
	background: #408ad1;
	font-weight: 600;
	font-size: 18px;
	margin: 15px 3px;
	font-family: '微软雅黑';
}
#nav .mark a {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 100px;
	left: -50px;
	margin-left: 50%;
	text-align: center;
	color: white;
}

#nav .mark img {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 38px;
}

#content {
	width: 1444px;
	margin-top: 100px;
}

#select {
	width: 1090px;
	margin-top: 70px;
	text-align: left;
}

#select a {
	width: 246px;
	height: 100px;
	display: inline-block;
	cursor: pointer;
	position:relative;
	transition: width 2s, height .5s;
	-webkit-transition: transform .5s;
}

#select a p {
	width: 247px;
	height: 100px;
/* 	background: #408ad1; */
	text-align: center;
	line-height: 100px;
	color: white;
	font-size: 19px;
}

#select .diff {
	margin-left: 30px;
	margin-bottom: 30px;
}

#select a:hover {
	transform: scale(1.05);
}

.hearddata {
	line-height: 100px;
	font-size: 20px;
	color: white;
}
.jumpImgStyle{
	position: absolute;
	top: 40%;
	transform: translateY(-50%);
	margin-left:50%;
	left:-10px;
}
.jumpTextStyle{
	position: absolute;
	top: 70%;
	transform: translateY(-50%);
	margin-left:50%;
	left:-15px;
	font-size:18px;
	color:white;
}
#jumpDiv:hover{
	opacity:0.8;
}
.waitDevelop{
	background:#ccc!important;
}
</style>
</head>

<body>
	<div id="header">
		<img class="headerPosition"
			src="<%=path%>/pages/userbase/myjs/home/image/logo.png">
		<h1 class="headerPosition">实时化测绘服务平台-实时化仪表盘</h1>
	</div>
	<div class="col-sm-2" style="padding: 0">
		<div id="nav">
			<div class="mark">
				<img src="<%=path%>/pages/userbase/myjs/home/image/home.png"><a href='javascript:'>首页</a>
			</div>
			<div class="mark">
				<img src="<%=path%>/pages/userbase/myjs/home/image/tongyong.png"><a href='javascript:'>通用指标</a>
			</div>
			<ul>
				<li class="person"><a href='#'>人事</a></li>
				<li class="waitDevelop1"><a href='#'>客户</a></li>
				<li class="contract"><a href='#'>合同</a></li>
				<li class="waitDevelop1"><a href='#'>财务</a></li>
				<li class="software"><a href='#'>软件</a></li>
				<li class="waitDevelop1"><a href='#'>成果</a></li>
				<li class="project"><a href='#'>项目</a></li>
			</ul>
			<div class="mark">
				<img src="<%=path%>/pages/userbase/myjs/home/image/special.png"><a href="javascript:">专题类</a>
			</div>
			<ul>
				<li class="kfqfgs"><a href='javascript:'>开发区日常管理</a></li>
				<li class="kfqstatistic"><a href='javascript:'>开发区项目统计</a></li>
				<li class="news"><a href='javascript:'>今日快报</a></li>
				<li class="checkContract"><a href='javascript:'>合同数据核对</a></li>
			</ul>
		</div>
	</div>
	<div class="col-sm-10">
		<div style="text-align: center; font-family: '微软雅黑'">
			<div id="content">
				<div class="col-sm-3">
					<div>
						<img src="<%=path%>/pages/userbase/myjs/home/image/yibiaopan.jpg">
					</div>
				</div>
				<div class="col-sm-9" style="position: relative; height: 610px">
					<div style="width: 990px; height: 100px; background: #f95656">
						<span class="hearddata">当前合同额：<span>1000</span>万
						</span> <span class="hearddata" style="margin: 0 100px">当前花费：<span>300</span>万
						</span> <span class="hearddata">当前人员：<span>369</span>人
						</span>
						<a href="javascript:" id="jumpDiv" target="_blank" style="position: absolute; width: 100px; height: 100px; right: -22px; top: 0; background: #d04141;cursor: pointer;">
							<img class="jumpImgStyle" src="<%=path%>/pages/userbase/myjs/home/image/access.png">
							<p class="jumpTextStyle">详情</p>
						</a>
					</div>
					<div id="select">
						<a href="#" class="person" style="margin-bottom: 30px; background: #408ad1" class="waitDevelop">
							<p>人事</p>
						</a>
						<a href="#" class="diff waitDevelop">
							<p>客户</p>
						</a>
						<a href="#" class="diff contract" style="background: #408ad1;">
							<p>合同</p>
						</a>
						<a href="#" class="diff waitDevelop">
							<p>财务</p>
						</a>
						<a href="#" class="software" style="margin-bottom: 30px; background: #408ad1;">
							<p>软件</p>
						</a>
						<a href="#" class="diff waitDevelop">
							<p>成果</p>
						</a>
						<a href="#" class="diff project" style="margin-bottom: 30px; background: #408ad1;">
							<p>项目</p>
						</a>
						<a class="kfqfgs" href='javascript:'
							style="width: 247px; height: 100px; background: #408ad1; position: absolute; bottom: 0; left: 15px">
							<p>开发区日常管理</p>
						</a>
						<a class="kfqstatistic" href='javascript:'
							style="width: 247px; height: 100px; background: #408ad1; position: absolute; bottom: 0; left:295px">
							<p>开发区项目统计</p>
						</a>
						<a class="news" href='javascript:'
							style="width: 247px; height: 100px; background: #408ad1; position: absolute; bottom: 0; left:575px">
							<p>今日快报</p>
						</a>
						<a class="checkContract" href='javascript:'
							style="width: 247px; height: 100px; background: #408ad1; position: absolute; bottom: 0; left:855px">
							<p>合同数据核对</p>
						</a>
					</div>
				</div>
				<div></div>
			</div>
		</div>
	</div>


	<!-- 全局js -->
	<script src="<%=path%>/pages/userbase/js/jquery.min.js?v=2.1.4"></script>
	<script src="<%=path%>/pages/userbase/js/bootstrap.min.js?v=3.3.6"></script>
	<script
		src="<%=path%>/pages/userbase/js/plugins/layer/laydate/laydate.js"></script>
	<!-- 日期插件  -->
	<script src="<%=path%>/pages/userbase/js/plugins/layer/layer.min.js"></script>
	<script>
		//设置各种弹性尺寸
		flexibleSize();
		function flexibleSize() {
			var windowHeight = $(window).height();
			$('#nav').css('height', windowHeight - 120 + 'px');
			$('#nav ul li').css('height', windowHeight / 10 * 0.55 + 'px');
			$('#nav .mark').css('height', windowHeight / 10 * 0.55 + 'px');
		}
		wite();
		function wite() {
			$('.waitDevelop').on('click', function() {
				layer.msg('功能暂未开放，敬请期待！',{time:1000});
			})
			$('.waitDevelop1').on('click', function() {
				layer.msg('功能暂未开放，敬请期待！',{time:1000});
			})
		}
		jumpPage();
		function jumpPage(){
			$('.kfqfgs').on('click',function(){
				var url='http://192.168.128.5/ReportServerPortal/powerbi/KFQFGS/WoWoXiang?rs:embed=true';
				var title='开发区实时化驾驶舱';
				window.open(webBasePath+'pages/userbase/myjs/home/changeTitle.jsp?&'+url+'&'+title);
			})
			$('#jumpDiv').on('click',function(){
				var url='http://192.168.128.5/ReportServerPortal/powerbi/PublicGraphic/XiaoMaGu?rs:embed=true';
				var title='大地实时化驾驶舱';
				window.open(webBasePath+'pages/userbase/myjs/home/changeTitle.jsp?&'+url+'&'+title);
			})
			$('.software').on('click',function(){
				var url='http://192.168.128.5/ReportServerPortal/powerbi/Soft/LanPangZi?rs:embed=true';
				var title='软件实时化驾驶舱';
				window.open(webBasePath+'pages/userbase/myjs/home/changeTitle.jsp?&'+url+'&'+title);
			})
			$('.news').on('click',function(){
				var url='http://192.168.128.5/ReportServerPortal/powerbi/publicgraphic/JinRiKuaiBao?rs:embed=true';
				var title='今日快报';
				window.open(webBasePath+'pages/userbase/myjs/home/changeTitle.jsp?&'+url+'&'+title);
			})
			$('.contract').on('click',function(){
				var url='http://192.168.128.5/ReportServerPortal/powerbi/publicgraphic/HeTong?rs:embed=true';
				var title='实时化合同驾驶舱';
				window.open(webBasePath+'pages/userbase/myjs/home/changeTitle.jsp?&'+url+'&'+title);
			})
			$('.kfqstatistic').on('click',function(){
				var url='http://192.168.128.5/ReportServerPortal/powerbi/KFQFGS/ShengChanChanZhi?rs:embed=true';
				var title='开发区项目统计';
				window.open(webBasePath+'pages/userbase/myjs/home/changeTitle.jsp?&'+url+'&'+title);
			})
			$('.person').on('click',function(){
				var url='http://192.168.128.5/ReportServerPortal/powerbi/PublicGraphic/RenShi?rs:embed=true';
				var title='人事';
				window.open(webBasePath+'pages/userbase/myjs/home/changeTitle.jsp?&'+url+'&'+title);
			})
			$('.checkContract').on('click',function(){
				var url='http://192.168.128.5/ReportServerPortal/powerbi/PublicGraphic/CheckContract?rs:embed=true';
				var title='合同数据核对';
				window.open(webBasePath+'pages/userbase/myjs/home/changeTitle.jsp?&'+url+'&'+title);
			});
			$('.project').on('click',function(){
				var url='http://192.168.128.5/reportserverportal/powerbi/PublicGraphic/ProjectManage?rs:embed=true';
				var title='项目';
				window.open(webBasePath+'pages/userbase/myjs/home/changeTitle.jsp?&'+url+'&'+title);
			})
		}
	</script>
</body>
</html>





















