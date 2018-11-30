


SPA_RESOLVE_INIT = function(transition){
	var aa='';
		aa='<div class="Dtitle">工作流管理</div>'+
           		'<ul class="tree">'+
           			'<li>综合管理部常用流程</li>'+
           			'<li>'+
           				'<b class="Db">人事</b>'+
	           			'<ul>'+
	           				'<li><a href="#/faqi/renshi_1">招聘岗位申请流程</a></li>'+
	           				'<li><a href="#/faqi/renshi_2">面试阶段考核流程</a></li>'+
	           				'<li><a href="#/faqi/renshi_3">员工转正申请流程</a></li>'+
	           				'<li><a href="#/faqi/renshi_4">员工异动申请流程</a></li>'+
	           				'<li><a href="#/faqi/renshi_5">职称评定申请流程</a></li>'+
	           				'<li><a href="#/faqi/renshi_6">员工离职办理流程</a></li>'+
	           				'<li><a href="#/faqi/renshi_7">员工入职办理流程</a></li>'+
	           			'</ul>'+
           			'</li>'+
           			'<li>'+
           				'<b class="Db">行政</b>'+
	           			'<ul>'+
	           				'<li><a href="#/faqi/xingzheng_1">用车记录填报流程</a></li>'+
	           				'<li><a href="#/faqi/xingzheng_2">宣传材料核发流程</a></li>'+
	           				'<li><a href="#/faqi/xingzheng_3">新闻材料核发流程</a></li>'+
	           				'<li><a href="#/faqi/xingzheng_4">其他事项审批流程</a></li>'+
	           			'</ul>'+
           			'</li>'+
           			'<li>'+
           				'<b class="Db">考勤</b>'+
	           			'<ul>'+
	           				'<li><a href="#/faqi/kaoqin_1">加班出差申请流程</a></li>'+
	           				'<li><a href="#/faqi/kaoqin_2">月度考勤审批流程</a></li>'+
	           				'<li><a href="#/faqi/kaoqin_3">员工请假申请处理流程</a></li>'+
	           			'</ul>'+
           			'</li>'+
           			'<li>'+
           				'<b class="Db">总结</b>'+
	           			'<ul>'+
	           				'<li><a href="#/faqi/zongjie_1">年度工作总结提交</a></li>'+
	           				'<li><a href="#/faqi/zongjie_2">技术总结报告提交</a></li>'+
	           			'</ul>'+
           			'</li>'+
           		'</ul>'+
              	'<ul class="tree">'+
           			'<li>项目管理常用流程</li>'+
           			'<li>'+
           				'<b class="Db">方案</b>'+
	           			'<ul>'+
	           			'	<li><a href="#/faqi/fangan_1">项目生产方案审批流程</a></li>'+
	           				'<li><a href="#/faqi/fangan_2">项目生产方案变更审批流程</a></li>'+
	           			'</ul>'+
           			'</li>'+
           			'<li>'+
           				'<b class="Db">汇报</b>'+
	           			'<ul>'+
	           				'<li><a href="#/faqi/huibao_1">生产日计划与汇报流程</a></li>'+
	           				
	           			'</ul>'+
           			'</li>'+
           			'<li>'+
           				'<b class="Db">评价</b>'+
	           			'<ul>'+
	           				'<li><a href="#/faqi/pingjia_1">项目最终检查流程</a></li>'+
	           				'<li><a href="#/faqi/pingjia_2">项目过程检查流程</a></li>'+
	           			'</ul>'+
           			'</li>'+
           			'<li>'+
           				'<b class="Db">结算</b>'+
	           			'<ul>'+
	           				'<li><a href="#/faqi/jiesuan_1">项目工资分配意见反馈流程</a></li>'+
	           			'</ul>'+
           			'</li>'+
           		'</ul>'+
           		'<ul class="tree">'+
           			'<li>培训管理常用流程</li>'+
           			'<li>'+
	           			'<ul>'+
	           				'<li><a href="#/faqi/peixun_1">培训成果总结评审流程</a></li>'+
	           			'</ul>'+
           			'</li>'+
           		'</ul>'+
 				'<ul class="tree">'+
           			'<li>资料室常用流程</li>'+
           			'<li>'+
	           			'<ul>'+
	           				'<li><a href="#/faqi/zhishi_1">知识产权申报申请流程</a></li>'+
	           			'</ul>'+
           			'</li>'+
           			'<li>'+
           				'<b class="Db">资料</b>'+
	           			'<ul>'+
	           				'<li><a href="#/faqi/ziliao_1">项目资料提交流程</a></li>'+
	           				'<li><a href="#/faqi/ziliao_2">纸质资料借阅流程</a></li>'+
	           			'</ul>'+
           			'</li>'+
           			'<li>'+
           				'<b class="Db">设备</b>'+
	           			'<ul>'+
	           				'<li><a href="#/faqi/shebei_1">设备领用申请流程</a></li>'+
	           			'</ul>'+
           			'</li>'+
           			'<li>'+
           				'<b class="Db">物资</b>'+
	           			'<ul>'+
	           				'<li><a href="#/faqi/wuzi_1">采购申请流程</a></li>'+
	           				'<li><a href="#/faqi/wuzi_2">办公用品领用申请流程</a></li>'+
	           			'</ul>'+
           			'</li>'+
           		'</ul>'+
           		'<ul class="tree">'+
           			'<li>客户管理常用流程</li>'+
           			'<li>'+
           				'<b class="Db">售后</b>'+
	           			'<ul>'+
	           				'<li><a href="#/faqi/shouhou_1">问题反馈处理流程</a></li>'+
	           				'<li><a href="#/faqi/shouhou_2">客户投诉处理流程</a></li'+
	           			'</ul>'+
           			'</li>'+
           		'</ul>'
           		$('#content-main').html(aa)
$('.tree').css({"float":"left"})

//	$('#content-main > .tree li:first').on('click',function(){
//		$('#content-main > .tree li').not(':first').slideToggle(1500)
//	})
	$('#content-main').find(".Db").on('click',function(){
		$(this).next().slideToggle()
	})
	
	console.log("首页回调日常" + JSON.stringify(transition))
}


