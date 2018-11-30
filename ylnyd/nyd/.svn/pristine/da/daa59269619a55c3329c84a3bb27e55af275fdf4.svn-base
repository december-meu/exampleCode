<%@page import="org.apache.shiro.subject.Subject"%>
<%@page import="com.dadi.sys.entity.User"%>
<%@page import="org.apache.shiro.SecurityUtils"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>

<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<link rel="stylesheet" href="${ctxStatic}/common/css/prjForm.css">
<style type="text/css">
html {
	margin: 0;
	padding: 0;
}

#wrappe, body.full-height-layout #page-wrapper {
	overflow-y: hidden;
}
.ibox{
	clear:none;
	padding-right:10px;
	margin-bottom:-20px;
	
}
.titlespanr{
	float: right;padding:4px 12px;color:#fff;background:#ed5565;margin-right:10px;margin-top:-4px;border-radius:3px;
}
.titlespanb{
	float: right;padding:4px 12px;color:#fff;background:#66b7ef;margin-right:10px;margin-top:-4px;border-radius:3px;
}
.titlespanz{
	float: right;padding:4px 12px;color:#fff;background:#a48ad4;margin-right:10px;margin-top:-4px;border-radius:3px;
}
.titlespanl{
	float: right;padding:4px 12px;color:#fff;background:#1eb5ac;margin-right:10px;margin-top:-4px;border-radius:3px;
}

.font30{
	font-size:30px;
}
.font16{
	font-size:16px;
}
p{
	margin:0;
}
#lineMap{
	height:350px;
	width:75%;
}
#sysList li,#prjList li{
	border-bottom:1px solid #e7eaec;
	padding-bottom:12px;
}
#sysList  .num,#prjList .num{
	padding:1px 6px;
	color:#fff;
	background:#ebc61c;
	border-radius:3px;
	margin-right:12px;
}
#sysList .itemson,#prjList .itemson{
	overflow:hidden;
}
#sysList .title a,#prjList .title a{
	color:#000;
}
#sysList .times,#prjList .times{
	padding-left:38px;
}
#prjList .mins{
	color:#ebc61c;
	font-weight:bolder;
}
</style>
</head>

<%
	Subject subject = SecurityUtils.getSubject();
	if (subject.isRunAs()) {
		User previousUser = (User) subject.getPreviousPrincipals().getPrimaryPrincipal();

		if (previousUser != null)
			System.out.println("before========main========" + previousUser.getAccount());

	}
%>


<body class="gray-bg">
			<div class="wrapper wrapper-content animated fadeInUp">
					<div class="ibox col-xs-3">
						<div class="ibox-title">
							<h5 class="fl">申请备案项目</h5> <span class="titlespanr">全年</span>
						</div>
						<div class="ibox-content" style="padding-bottom:40px;padding-left:36px;">
							<div style="background:url('${ctx}/views/nyd/prj/img/sqbeian.png') no-repeat right center;background-size:58px 60px;">
							 <p style="color:#ed5565"><b class="font30">56</b><b class="font16">个</b></p>
							 <p>申请备案</p>
							 </div>
						</div>
					</div>
					<div class="ibox col-xs-3">
						<div class="ibox-title">
							<h5 class="fl">备案通过项目</h5> <span class="titlespanb">全年</span>
						</div>
						<div class="ibox-content" style="padding-bottom:40px;padding-left:36px;">
							<div style="background:url('${ctx}/views/nyd/prj/img/beiantg.png') no-repeat right center;background-size:58px 60px;">
							 <p style="color:#66b7ef"><b class="font30">8</b><b class="font16">个</b></p>
							 <p>备案通过</p>
							 </div>
						</div>
					</div>
					<div class="ibox col-xs-3">
						<div class="ibox-title">
							<h5 class="fl">撤销备案项目</h5> <span class="titlespanz">全年</span>
						</div>
						<div class="ibox-content" style="padding-bottom:40px;padding-left:36px;">
							<div style="background:url('${ctx}/views/nyd/prj/img/cxbeian.png') no-repeat right center;background-size:58px 60px;">
							 <p style="color:#a48ad4"><b class="font30">40</b><b class="font16">个</b></p>
							 <p>撤销备案</p>
							 </div>
						</div>
					</div>
					<div class="ibox col-xs-3">
						<div class="ibox-title">
							<h5 class="fl">核验通过项目</h5><span class="titlespanl">全年</span>
						</div>
						<div class="ibox-content" style="padding-bottom:40px;padding-left:36px;">
							<div style="background:url('${ctx}/views/nyd/prj/img/hytg.png') no-repeat right center;background-size:58px 60px;">
							 <p style="color:#1eb5ac"><b class="font30">8</b><b class="font16">个</b></p>
							 <p>核验通过</p>
							 </div>
						</div>
					</div>
					
						<div class="ibox col-xs-12">
						<div class="ibox-title">
							<h5 class="fl">核验通过项目</h5> 
						</div>
						<div class="ibox-content" style="padding-bottom:40px;padding-left:36px;">
							<div class="col-xs-9" id="lineMap">
								
							</div>
							<div class="col-xs-3">
								<ul>
									<li>
										<p style="color:#ed5565"><b class="font30">56</b><b class="font16">个</b></p>
							 			<p>申请备案项目</p>
							 			<div class="progress" style="background:#e7eaec">
										  <div class="progress-bar"  role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;background:#c12e34">
										    <span class="sr-only">60% Complete</span>
										  </div>
										</div>
									</li>
									<li>
										<p style="color:#e6b600"><b class="font30">56</b><b class="font16">个</b></p>
							 			<p>批准通过项目</p>
							 			<div class="progress" style="background:#e7eaec">
										  <div class="progress-bar"  role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;background:#e6b600">
										    <span class="sr-only">60% Complete</span>
										  </div>
										</div>
									</li>
									<li>
										<p style="color:#0098d9"><b class="font30">56</b><b class="font16">个</b></p>
							 			<p>校验通过项目</p>
							 			<div class="progress" style="background:#e7eaec">
										  <div class="progress-bar"   role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;background:#0098d9">
										    <span class="sr-only">60% Complete</span>
										  </div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="ibox col-xs-6">
						<div class="ibox-title">
							<h5 class="fl">获批项目</h5>
						</div>
						<div class="ibox-content" style="padding-left:36px;">
							<ul id="sysList">
								<li>
									<div class="item1">
										<div class="itemson">
											<span class="num fl" style="background:#e5363d" >1</span>
											<span class="title fl"><a href="javascript:;" class="weight" >杨凌设施农用地备案管理系统</a></span>
											<span class="mins fr">20分钟前</span>
										</div>
										<div class="times">2018/10/25--2058/10/25</div>
									</div>
								</li>
								<li>
									<div class="item1">
										<div class="itemson">
											<span class="num fl" style="background:#eb821c" >2</span>
											<span class="title fl"><a href="javascript:;" class="weight" >培训通知管理系统</a></span>
											<span class="mins fr">60分钟前</span>
										</div>
										<div class="times">2018/10/25--2058/10/25</div>
									</div>
								</li>
								<li>
									<div class="item1">
										<div class="itemson">
											<span class="num fl"  >3</span>
											<span class="title fl"><a href="javascript:;" class="weight" >杨凌设施农用地备案管理系统</a></span>
											<span class="mins fr">一天前</span>
										</div>
										<div class="times">2018/10/25--2058/10/25</div>
									</div>
								</li>
								<li>
									<div class="item1">
										<div class="itemson">
											<span class="num fl"  >4</span>
											<span class="title fl"><a href="javascript:;" class="weight" >培训通知管理系统</a></span>
											<span class="mins fr">二天前</span>
										</div>
										<div class="times">2018/10/25--2058/10/25</div>
									</div>
								</li>
								<li>
									<div class="item1">
										<div class="itemson">
											<span class="num fl"  >5</span>
											<span class="title fl"><a href="javascript:;" class="weight" >杨凌设施农用地备案管理系统</a></span>
											<span class="mins fr">三天前</span>
										</div>
										<div class="times">2018/10/25--2058/10/25</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="ibox col-xs-6">
						<div class="ibox-title">
							<h5 class="fl">到期项目提醒</h5>
						</div>
						<div class="ibox-content" style="padding-left:36px;">
							<ul id="prjList">
								<li>
									<div class="item1">
										<div class="itemson">
											<span class="num fl" style="background:#e5363d" >1</span>
											<span class="title fl"><a href="javascript:;" class="weight" >杨凌设施农用地备案管理系统</a></span>
											<span class="mins fr" style="color:#e5363d">距离项目到期还有<b>05</b>天</span>
										</div>
										<div class="times">2018/10/25--2058/10/25</div>
									</div>
								</li>
								<li>
									<div class="item1">
										<div class="itemson">
											<span class="num fl" style="background:#eb821c" >2</span>
											<span class="title fl"><a href="javascript:;" class="weight" >杨凌设施农用地备案管理系统</a></span>
											<span class="mins fr" style="color:#eb821c">距离项目到期还有<b>08</b>天</span>
										</div>
										<div class="times">2018/10/25--2058/10/25</div>
									</div>
								</li>
								<li>
									<div class="item1">
										<div class="itemson">
											<span class="num fl"  >3</span>
											<span class="title fl"><a href="javascript:;" class="weight" >杨凌设施农用地备案管理系统</a></span>
											<span class="mins fr">距离项目到期还有<b>10</b>天</span>
										</div>
										<div class="times">2018/10/25--2058/10/25</div>
									</div>
								</li>
								<li>
									<div class="item1">
										<div class="itemson">
											<span class="num fl"  >4</span>
											<span class="title fl"><a href="javascript:;" class="weight" >杨凌设施农用地备案管理系统</a></span>
											<span class="mins fr">距离项目到期还有<b>21</b>天</span>
										</div>
										<div class="times">2018/10/25--2058/10/25</div>
									</div>
								</li>
								<li>
									<div class="item1">
										<div class="itemson">
											<span class="num fl"  >5</span>
											<span class="title fl"><a href="javascript:;" class="weight" >杨凌设施农用地备案管理系统</a></span>
											<span class="mins fr">距离项目到期还有<b>45</b>天</span>
										</div>
										<div class="times">2018/10/25--2058/10/25</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
			</div>


</body>
	<script type="text/javascript" src="${ctxStatic}/Hplus/js/plugins/echarts/echarts-all.js"></script>
<script>
	$(function(){
		var myChart = echarts.init(document.getElementById('lineMap'));
		var option = {
			    color:["#c12e34","#e6b600","#0098d9"],
			    tooltip: {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['申请备案项目','批准通过项目','核验通过项目']
			    },
			    toolbox: {
			        show: true,
			        feature: {
			            dataZoom: {
			                yAxisIndex: 'none'
			            },
			            dataView: {readOnly: false},
			            magicType: {type: ['line', 'bar']},
			            restore: {},
			            saveAsImage: {}
			        }
			    },
			    xAxis:  {
			        type: 'category',
			        boundaryGap: false,
			        data: ['2017/10','2017/11','2017/12','2018/1','2018/2','2018/3','2018/4']
			    },
			    yAxis: {
			        type: 'value'
			    },
			    series: [
			        {
			            name:'申请备案项目',
			            type:'line',
			            data:[12, 11, 15, 13, 12, 13, 17],

			        },
			        {
			            name:'批准通过项目',
			            type:'line',
			            data:[10, 10, 14, 12, 11, 12, 15],

			        },
			        {
			            name:'核验通过项目',
			            type:'line',
			            data:[8 ,8, 9, 10, 10, 8, 10],

			        }
			    ]
			};
		 myChart.setOption(option);
	})
	
</script>

</html>
