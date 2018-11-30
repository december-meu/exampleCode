SPA_RESOLVE_INIT = function(transition){
	
$('#content-main').html(
'<div class="" id="homeImg" style="width:1320px;position:relative;margin-left:-660px;left:50%">'+
	'<div class="col-sm-4" style="margin:0;padding:0;width:500px">'+
	     '<div class="col-sm-12" id="header" data-hash="" style="margin:0;padding:0;width:500px;height:400px"><img src="'+webBasePath+'pages/userbase/myjs/home/image/1.jpg">'+
	     	'<img class="clock" src="'+webBasePath+'pages/userbase/myjs/home/image/clock.png">'+
	     	'<div id="location"><h1 style="font-size:25px">欢迎您，<span></span></h1></div>'+
	     	'<div id="detail"><p style="font-size:18px"><span style="font-size: 19px"></span><span style="margin-left: 25px;margin-right: 25px;"></span>距离年底还有<span style="margin-left: 7px;margin-right: 7px;font-size:25px;font-weight: bolder;text-decoration:underline"></span>天</p></div>'+
	     '</div>'+
	     '<div class="col-sm-6 pos" data-hash="listperson" data-power="" data-name="人事管理" style="margin:0;padding:0;margin-top:20px;width:240px;height:190px"><img src="'+webBasePath+'pages/userbase/myjs/home/image/ComprehensiveAdministration.png">'+
	     	'<img class="clock" src="'+webBasePath+'pages/userbase/myjs/home/image/clock.png">'+
	     '</div>'+
	     '<div class="col-sm-6 pos" id="AchievementManagement" data-hash="listpppperson" data-power="" data-name="成果管理" style="margin:0;padding:0;margin-top:20px;width:240px;height:190px;margin-left:20px"><img src="'+webBasePath+'pages/userbase/myjs/home/image/AchievementManagement.png">'+
	     	'<img class="clock" src="'+webBasePath+'pages/userbase/myjs/home/image/clock.png">'+
	     '</div>'+
	'</div>'+
	'<div class="col-sm-4" style="margin:0;padding:0;width:500px;margin-left:20px">'+
		'<div class="col-sm-6 pos" data-hash="shengchan" data-power="" data-name="财务管理" style="margin:0;padding:0;width:240px;height:190px"><img src="'+webBasePath+'pages/userbase/myjs/home/image/financialManagement.png">'+
			'<img class="clock" src="'+webBasePath+'pages/userbase/myjs/home/image/clock.png">'+
		'</div>'+
		'<div class="col-sm-6 pos" data-hash="crmIndex" data-power="" data-name="客户管理" style="margin:0;padding:0;width:240px;height:190px;margin-left:20px"><img src="'+webBasePath+'pages/userbase/myjs/home/image/customerManagement.png">'+
			'<img class="clock" src="'+webBasePath+'pages/userbase/myjs/home/image/clock.png">'+
		'</div>'+
		'<div class="col-sm-12 pos" data-hash="projectIndex" data-power="" data-name="项目管理" style="margin:0;padding:0;margin-top:20px;width:500px;height:190px"><img src="'+webBasePath+'pages/userbase/myjs/home/image/projectManagement.png">'+
			'<img class="clock" src="'+webBasePath+'pages/userbase/myjs/home/image/clock.png">'+
		'</div>'+
		'<div class="col-sm-6 pos" data-hash="contractList" data-power="" data-name="合同管理" style="margin:0;padding:0;margin-top:20px;width:240px;height:190px"><img src="'+webBasePath+'pages/userbase/myjs/home/image/contractManagement.png">'+
			'<img class="clock" src="'+webBasePath+'pages/userbase/myjs/home/image/clock.png">'+
		'</div>'+
		'<div class="col-sm-6 pos backBill" data-hash="backBillList" data-power="" data-name="开票回款" style="margin:0;padding:0;margin-top:20px;width:240px;height:190px;margin-left:20px"><img src="'+webBasePath+'pages/userbase/myjs/home/image/InvoiceAndReturn.png">'+
			'<img class="clock" src="'+webBasePath+'pages/userbase/myjs/home/image/clock.png">'+
		'</div>'+
	'</div>'+
	'<div class="col-sm-3" style="margin:0;padding:0;width:297px">'+
		'<div class="col-sm-12 application pos" data-name="应用中心" style="margin:0;padding:0;margin-left:20px"><img src="'+webBasePath+'pages/userbase/myjs/home/image/application.png">'+
		'</div>'+
		'<div class="col-sm-12 pos" data-hash="real" data-power="havePower" data-name="实时化仪表盘" style="margin:0;padding:0;margin-left:20px;margin-top:20px"><img src="'+webBasePath+'pages/userbase/myjs/home/image/yibiaopan.png">'+
			'<img class="clock" src="'+webBasePath+'pages/userbase/myjs/home/image/clock.png">'+
		'</div>'+
		
	'</div>'+
'</div>'
);

var headUrl='';
var url=basePath;
if(url=='http://192.168.132.161:8060/ddcrm/'){
	headUrl=$('#wx_head1').val()
}else{
	headUrl=$('#wx_head').val()
}

if(headUrl!=''){
	$('#header').append('<img id="headImg" src="'+headUrl+'">');
}

//$('#homeImg img').css('width','100%');
$('#content-main').css('margin','0');

	function router(){
		var name=$('.pos');
	    var btn=false;
		$.ajax({
			url:webBasePath+"resource/menus?sysType=prj",
			type:"post",
			async:false,
			success:function(data){
				console.log(data);
				var haveName=[];
				var roleIds=$('#roleIds').val();
				roleIds=roleIds.split(',');
				for(var j=0;j<data.length;j++){
						haveName.push(data[j].name);
				}
				if(haveName.indexOf('合同管理')!=-1){
					haveName.push('开票回款');
				}
				if(haveName.indexOf('人事管理')==-1){
					haveName.push('人事管理');
				}
				console.log(haveName);
				for(var i=0;i<name.length;i++){
					var tt=name.eq(i).data('name');
					if(haveName.indexOf(tt)==-1){
						if(tt=="财务管理"){
							name.eq(i).attr('data-power','special');
							name.eq(i).find('.clock').css('display','none');
						}else if(tt=="实时化仪表盘"){
							if(roleIds.indexOf('113')==-1){
								if($('#currentUserName').val()=='武澄'){
									name.eq(i).attr('data-power','special1');
									name.eq(i).find('.clock').css('display','none');
								}else{
								name.eq(i).attr('data-power','noPower');
								name.eq(i).find('.clock').css('display','block');
								}
							}else{
								name.eq(i).attr('data-power','special1');
								name.eq(i).find('.clock').css('display','none');
							}
						}else if(tt=="成果管理"){
							if($('#flagUser').val()==0){
								name.eq(i).find('.clock').css('display','none');
								name.eq(i).attr('data-power','achievement');
							}else{
								name.eq(i).find('.clock').css('display','block');
								name.eq(i).attr('data-power','noPower');
							}
						}else{
							name.eq(i).attr('data-power','noPower');
							name.eq(i).find('.clock').css('display','block');
						}
					}else{
						if(tt=="财务管理"){
							name.eq(i).attr('data-power','special');
							name.eq(i).find('.clock').css('display','none');
						}else if(tt=="成果管理"){
							if($('#flagUser').val()==0){
								name.eq(i).find('.clock').css('display','none');
								name.eq(i).attr('data-power','achievement');
							}else{
								name.eq(i).find('.clock').css('display','block');
								name.eq(i).attr('data-power','noPower');
							}
						}else if(tt=="实时化仪表盘"){
							
							if(roleIds.indexOf('113')==-1){
									name.eq(i).attr('data-power','noPower');
									name.eq(i).find('.clock').css('display','block');
							}else{
								name.eq(i).attr('data-power','special1');
								name.eq(i).find('.clock').css('display','none');
							}
							
						}else if(tt=="人事管理"){
							name.eq(i).attr('data-power','special3');
							name.eq(i).find('.clock').css('display','none');
						}else{
							name.eq(i).attr('data-power','havePower');
							name.eq(i).find('.clock').css('display','none');
						}
			
					}
				}
				hash();
				showName();
			}
		})
	}
	router();
	function hash(){
		var token=$('#validateKey').val();
		$('#homeImg').off('click','.pos');
		$('#homeImg').on('click','.pos',function(){
			if($(this).data('power')=='noPower'){
				layer.msg('您没有操作权限！',{time:1000});
			}else if($(this).data('power')=='havePower'){
				location.hash="#/"+$(this).data('hash');
			}else if($(this).data('power')=='special'){
				window.open(webBasePath+"/tofin");
			}else if($(this).data('power')=='special1'){
				window.open(webBasePath+"/user/powerBI/statistic/website");
			}else if($(this).data('power')=='achievement'){
				window.open("http://192.168.128.104:8092?token="+token);
			}else if($(this).data('power')=='special3'){
				window.open('http://xa.dadisurvey.com/dweb');
			}
		});
		$('#homeImg').off('click','.application');
		$('#homeImg').on('click','.application',function(){
			window.open("http://xa.dadisurvey.com:8020/DisSolu/DisSolu");   
		})
	}
	function showName(){
		var userName=$('#currentUser').val();
		$('#homeImg h1 span').append(userName);

	}
	getNowFormatDate();
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
		var week = date.getDay(); //星期 
		var weeks = ["日","一","二","三","四","五","六"]; 
		var getWeek = "星期" + weeks[week]; 
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	    //设计倒计时
	    var nowyear=date.getFullYear(); 
	    var s1=nowyear+'-12-31';
	    s1 = new Date(s1.replace(/-/g, "/"));
	    var s2=new Date();
	    var days = s1.getTime() - s2.getTime();
	    var timer = parseInt(days / (1000 * 60 * 60 * 24));
	    $('#detail p span:nth-child(1)').text(currentdate);
	    $('#detail p span:nth-child(2)').text(getWeek);
	    $('#detail p span:nth-child(3)').text(timer+1);
	}
}