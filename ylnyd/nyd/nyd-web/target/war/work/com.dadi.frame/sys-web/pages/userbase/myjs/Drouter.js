	
	
	//第一版
	$(function(){
		spaRouters.map('/faqi',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Dworking1/richang_1/richang_1.js',transition)
	  	})
		
		spaRouters.map('/faqi/renshi_1',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Dworking1/richang_1/renshi_1.js',transition)
	  	})
	  	
		
		
		
		
		
	
	//第二版
	  	//主页
	  	spaRouters.map('/home',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/home/home.js',transition)
	  	})
	  	//生产项目报销单
	  	spaRouters.map('/shengchan',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/renshixinxi/production.js',transition)
	  	})
	  	//职能部门报销单
	  	spaRouters.map('/departmentB',function(transition){
		      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/renshixinxi/functionalDepartment.js',transition)
		  	})
		spaRouters.map('/ruzhi',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/renshixinxi/ruzhi.js',transition)
	  	})

		//listperson人员列表
		spaRouters.map('/listperson',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/renshixinxi/list.js',transition)
	  	})
		//测试显示用户角色ER图
		spaRouters.map('/testuserER',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/test/test.js',transition)
	  	})
	  	//项目管理主页
		spaRouters.map('/projectIndex',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/project/projectIndex.js',transition)
	  	})
	  	//客户管理主页
		spaRouters.map('/crmIndex',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/crm/crmIndex.js',transition)
	  	})
	  	//客户字典
		spaRouters.map('/dictionaries',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/crm/dictionaries.js',transition)
	  	})
	  	//代办申请
		spaRouters.map('/waitingApply',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/project/waitingApply.js',transition)
	  	})
	  	//已完成申请
		spaRouters.map('/doneApply',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/project/doneApply.js',transition)
	  	})
	  			//详细信息
		spaRouters.map('/xxxx',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/renshixinxi/xxxx.js',transition)
	  	})
	  	
	  	//合同列表
	  	spaRouters.map('/contractList',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/contract/contract.js',transition)
	  	})
	  	//开票回款管理
	  	//开票申请
	  	spaRouters.map('/backBill',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/backBill/backBill.js',transition)
	  	})
	  	//回款管理
	  	spaRouters.map('/returnedMoney',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/backBill/returnedMoney.js',transition)
	  	})
	  	//申请列表
		spaRouters.map('/backBillList',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/backBill/backBillList.js',transition)
	  	})
	  	//工作日志问题反馈列表
		spaRouters.map('/logbookproblem',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/project/logbookproblem.js',transition)
	  	})
	  	//工作日志列表
		spaRouters.map('/logbook',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/project/logbook.js',transition)
	  	})
	  	//客户字典表
	  	//工作日志列表
		spaRouters.map('/crm_dic',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/dictionary/dictionary.js',transition)
	  	})
	  	//开发者token机制的secret列表
		spaRouters.map('/developerToken',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/developer/developerToken.js',transition)
	  	})
	  	//应用中心
		spaRouters.map('/useCenter',function(transition){
	      spaRouters.asyncFun(webBasePath+'pages/userbase/myjs/Daffair2/crm/useCenter.js',transition)
	  	})
	})

	  	
	  	spaRouters.init()
////第三版
//	$(function(){
//		spaRouters.map('/listperson',function(transition){
//	      spaRouters.asyncFun('myjs/Dworking1/list.js',transition)
//	  	})
//	})
//	
	