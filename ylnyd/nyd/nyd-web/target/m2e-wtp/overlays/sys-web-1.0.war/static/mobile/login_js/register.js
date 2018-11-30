SPA_RESOLVE_INIT = function(transition){
	$('#content').html(
		/*'<header class="bar bar-nav">'+
		  '<button class="button button-link button-nav pull-left">'+
		    '<span class="icon icon-left"></span>'+
		    '返回'+
		  '</button>'+
		  '<h1 class="title">注册</h1>'+
		'</header>'+*/
		'<div class="content" style="overflow:hidden">'+
			'<div id="bg_img">'+
				'<img style="width:100%;" src="'+webBasePath+'/static/mobile/images/bg.jpg">'+
			'</div>'+
			  '<div class="list-block" id="login_bg">'+
			     '<ul>'+
					'<li style="margin-top:3%">'+
					    '<div class="item-content"  style="margin:0;padding:0">'+
				          '<div class="item-inner" id="borderColor" style="margin:0;padding:0">'+
							  '<img style="width: 8%" src="'+webBasePath+'/static/mobile/images/name.png">'+
				              '<input type="text" id="login" readonly="readonly" style="margin-left:5%" placeholder="请填写用户名">	         '+ 
				          '</div>'+
				        '</div>'+
					  '</li>'+
					  '<li style="margin-top:3%;display:none">'+
					    '<div class="item-content"  style="margin:0;padding:0">'+
				          '<div class="item-inner" id="borderColor" style="margin:0;padding:0">'+
							  '<img style="width: 8%" src="'+webBasePath+'/static/mobile/images/valid.png">'+
				              '<input type="text" id="phone" readonly="readonly" placeholder="电话">'+
				          '</div>'+
				        '</div>'+
					  '</li>'+
					  '<li style="margin-top:3%">'+
					    '<div class="item-content"  style="margin:0;padding:0">'+
				          '<div class="item-inner" id="borderColor" style="margin:0;padding:0">'+
							  '<img style="width: 8%" src="'+webBasePath+'/static/mobile/images/userName1.png">'+
				              '<input type="text" id="userName" placeholder="请填写昵称" style="margin-left:5%">'+
				          '</div>'+
				        '</div>'+
					  '</li>'+
					  '<li style="margin-top:3%">'+
					    '<div class="item-content"  style="margin:0;padding:0">'+
				          '<div class="item-inner" id="borderColor" style="margin:0;padding:0">'+
							  '<img style="width: 8%" src="'+webBasePath+'/static/mobile/images/password1.png">'+
				              '<input type="password" id="password" placeholder="请输入密码" style="margin-left:5%">'+
				          '</div>'+
				        '</div>'+
					  '</li>'+
					  '<li style="margin-top:3%">'+
					    '<div class="item-content"  style="margin:0;padding:0">'+
				          '<div class="item-inner" id="borderColor" style="margin:0;padding:0">'+
							  '<img style="width: 8%" src="'+webBasePath+'/static/mobile/images/password1.png">'+
				              '<input type="password" id="confirm" placeholder="确认密码" style="margin-left:5%">'+
				          '</div>'+
				        '</div>'+
					  '</li>'+
			    '</ul>'+
			    '<p><a href="javascript:" id="submit"  class="button button-fill button-round button-big" style="width:85%;margin:20% auto;height:45px;">注册</a></p>'+
			  '</div>'+
		'</div>'
	);
	
	var pp=false;
	var hh=false;
	var register={
			GetRequest:function () {
				  var url = window.location.href; //获取url中"?"符后的字串
				   var theRequest = new Object();
				   if (url.indexOf("?") != -1) {
				      var str = url.substr(1);
				      strs = str.split("&");
				      for(var i = 0; i < strs.length; i ++) {
				         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
				      }
				   }
				   return theRequest;
				},
				register:function (){
					var that=this;
					var Request = new Object();
					Request = that.GetRequest();
					$('#phone').val(decodeURI(Request["phone"]));
					$('#login').val(decodeURI(Request["phone"]));
					$('#userName').val($('#nickname').val());
					$('#content').off('click','#submit');
					$('#content').on('click','#submit',function(){
						
						var phone=$('#phone').val();
						var password=$('#password').val();
						if(password==''){
							$.toast('密码不能为空！');
							return;
						}
						that.testifyPassword();
						var userName=$('#userName').val();
						var login=$('#login').val();
						var params={};
						params.cellphone = phone;
						params.password = password;
						params.username = userName;
						params.sex = $('#sex').val();
//						params.sex= decodeURI(Request["sex"]);
						params.account = login;
				 		params.wechatServiceId = decodeURI(Request["openid"]);
				 		params.wechatOpenPlatformId = decodeURI(Request["unionid"]);
				 		params.headIcon = $('#headimgurl').val();
//				 		alert(JSON.stringify(params));
							if(hh==true){
								$.ajax({
									type:'post',
									data:params,
									url:webBasePath+'sys/user/regist/common',
									success:function(data){
									  if(data.code==200){
									    $.toast('注册成功！');
									  }else{
									    if(data.msg){
									      $.toast(data.msg);
									    }
									   }
										window.location.hash="#/login"
									},
									error:function(){
										$.toast('注册失败！');
									}
								})
							}else{
								$.toast('请检查数据');
							}
					})
				},
				testifyPassword:function(){
				var pass1=$('#password').val();
				var pass2=$('#confirm').val();
				if(pass1==pass2){
					hh=true;
				}else{
					hh=false;
					$.toast('两次密码输入不同，请检查后重新输入！');
					$('#confirm').val('');
					return;
				}
			}
	}
	register.register()
}