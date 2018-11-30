		
$(function(){
	
	//注册登录
	
	
	    spaRouters.map('/login',function(transition){
	      spaRouters.asyncFun(webBasePath+"static/mobile/login_js/login.js",transition)
	  	})
		spaRouters.map('/register',function(transition){
	      spaRouters.asyncFun(webBasePath+"static/mobile/login_js/register.js",transition)
	  	})
	  	spaRouters.map('/Verification',function(transition){
	  		spaRouters.asyncFun(webBasePath+"static/mobile/login_js/Verification.js",transition)
	  	})
   
	//应用
	  	spaRouters.map('/application',function(transition){
	  		spaRouters.asyncFun(webBasePath+"static/mobile/home_js/application.js",transition)
	  	})
	  	spaRouters.map('/order',function(transition){
	  		spaRouters.asyncFun(webBasePath+"static/mobile/home_js/order.js",transition)
	  	})
	  	spaRouters.map('/mine',function(transition){
	  		spaRouters.asyncFun(webBasePath+"static/mobile/home_js/mine.js",transition)
	  	})
	  	spaRouters.map('/account',function(transition){
	  		spaRouters.asyncFun(webBasePath+"static/mobile/home_js/mine/account.js",transition)
	  	})
	  	spaRouters.map('/consumeDetail',function(transition){
	  		spaRouters.asyncFun(webBasePath+"static/mobile/home_js/mine/consumeDetail.js",transition)
	  	})
	  	spaRouters.map('/myproject',function(transition){
	  		spaRouters.asyncFun(webBasePath+"static/mobile/home_js/mine/myProject.js",transition)
	  	})
	  	spaRouters.map('/mycard',function(transition){
	  		spaRouters.asyncFun(webBasePath+"static/mobile/home_js/mine/myCard.js",transition)
	  	})
	  	
	  	//入职信息
	  	spaRouters.map('/entryPage',function(transition){
	  		spaRouters.asyncFun(webBasePath+"static/mobile/entryInformation_js/homePage.js",transition)
	  	})
	  	spaRouters.map('/basicInformation',function(transition){
	  		spaRouters.asyncFun(webBasePath+"static/mobile/entryInformation_js/basicInformation.js",transition)
	  	})
	  	spaRouters.map('/educationBg',function(transition){
	  		spaRouters.asyncFun(webBasePath+"static/mobile/entryInformation_js/educationBg.js",transition)
	  	})
	  	spaRouters.map('/jobExperience',function(transition){
	  		spaRouters.asyncFun(webBasePath+"static/mobile/entryInformation_js/jobExperience.js",transition)
	  	})
	  	spaRouters.map('/family',function(transition){
	  		spaRouters.asyncFun(webBasePath+"static/mobile/entryInformation_js/family.js",transition)
	  	})
	  	spaRouters.map('/certificate',function(transition){
	  		spaRouters.asyncFun(webBasePath+"static/mobile/entryInformation_js/certificate.js",transition)
	  	})
	  	
	  	
	  	spaRouters.init();
})
		