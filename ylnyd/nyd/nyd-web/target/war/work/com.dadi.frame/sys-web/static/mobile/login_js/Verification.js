SPA_RESOLVE_INIT = function(transition){
	$('#content').html(
		'<div class="content" style="overflow:hidden">'+
			'<div id="bg_img">'+
				'<img style="width:100%;" src="'+webBasePath+'/static/mobile/images/bg.jpg">'+
			'</div>'+
			  '<div class="list-block" id="login_bg">'+
			      '<ul>'+
					  '<li>'+
					    '<div class="item-content">'+
					      '<div class="item-inner" id="border_color" style="margin:0;padding:0;width:93%">'+
									'<img style="width: 8%" src="'+webBasePath+'/static/mobile/images/phone.png">'+
					          '<input type="tel" id="phone" placeholder="请输入手机号" style="letter-spacing:5px;font-weight:bold;color: white;">'+
					      '</div>'+
					   ' </div>'+
//					   ' <p style="margin:0;margin-left:11%;margin-top:-3%"><a href="#" class="open-about" style="font-size:8px;color:#ffc107">已阅读并同意注册协议，可点击查看。</a></p>'+
					  '</li>'+
					  '<li style="margin-top:6%">'+
					  	'<div class="item-content">'+
					      '<div class="item-inner" id="border_color" style="margin:0;padding:0;width:93%">'+
					      	  '<img style="width: 8%" src="'+webBasePath+'/static/mobile/images/valid.png">'+
					          '<input type="text" id="yanzheng" placeholder="请输入随机数" style="letter-spacing:5px;font-weight:bold;width: 71%;">'+
					          '<input type="button" class="button" id="math" readonly="readonly" style="margin-left: 3%;letter-spacing:5px;font-weight:bold;width: 30%;background:#ccc;border-radius: 3%;border: 0;">'+
					          
					      '</div>'+
					    '</div>'+
					  '</li>'+
					  '<li style="margin-top:6%">'+
					    '<div class="item-content">'+
				          '<div class="item-inner" id="borderColor" style="margin:0;padding:0;width:93%">'+
							  '<img style="width: 8%" src="'+webBasePath+'/static/mobile/images/valid.png">'+
				              '<input type="tel" id="code" placeholder="请输入短信验证码" style="letter-spacing:5px;font-weight:bold;width: 67%;">'+	  
				              '<input type="button" class="button" id="send_num" style="margin-left: 3%;color:#ffc107;font-size:17px;height:32px;padding: 0;border:0;width: 30%;margin-bottom: 3%;border: 1px solid;" value="获取验证码">'+
				          '</div>'+
				        '</div>'+
					  '</li>'+
					  '<li>'+
					  '</li>'+
					'</ul>'+
					'<p style="margin-top:30%"><a href="#" class="button button-fill button-round button-big" style="width:85%;margin:20% auto;height:38px;" id="startRegister">下一步 </a></p>'+
			  '</div>'+
		'</div>'
		
	)
	
	
	
	$(function(){
		var ddd='';
		startRegister();
		math();
	})
	var btn=false;
	var ee=false;
	//获取url参数
	function GetRequest() {
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
		}
	var Request = new Object();
	Request = GetRequest();
		$('#phone').focus(function(){
			$('#border_color').css('border-color','rgb(232, 157, 18)');
		}).blur(function(){
			$('#border_color').css('border-color','#ccc');
		})
		$('#code').focus(function(){
			$('#borderColor').css('border-color','rgb(232, 157, 18)');
		}).blur(function(){
			$('#borderColor').css('border-color','#ccc');
		})
		$(document).on('click','.open-about', function () {
	  		$.popup('.popup-about');
		});
		
		
		//验证手机号码是否存在
		function testifyPhone(){
				var phone=$('#phone').val();
				if(phone!=''){
					var param={};
					param.phone=phone;
					$.ajax({
						type:'post',
						data:param,
						url:webBasePath+'sys/user/existcheck/phone/common',
						success:function(data){
							console.log(data);
							if(data.valid){
								checkMath();
								$('#phone').css('color','#3d4145');
							}else{
								tt=false;
								$.toast('该手机号码已存在，请用其他号码重新注册');
								$('#phone').css('color','red');
							}
						}
					})
				}else{
					$.toast('请输入手机号码');
				}
			}
		//发送手机号码
		$('#send_num').on('click',function(){
			testifyPhone();
		})
		
	function startRegister(){

			$('#startRegister').on('click',function(){
				if($('#code').val()==''){
					$.toast('请输入短信验证码');
				}else{
					var phone=$('#phone').val();
					var validateCode = $('#code').val();
					var secret = localStorage.getItem('secret');
					var params={};
					params.phone=phone;
					params.validateCode=validateCode;
					params.secret=secret;
					$.ajax({
						type:"post",
						data:params,
						url:webBasePath+'weChat/public/validate/phone/login',
						async: false,
						success:function(data){
//		 					localStorage.clear();
							if(data.code==200){
								var phone=localStorage.getItem('phone');
								var headimgurl=$('#headimgurl').val();
								var openid=$('#openId').val();
								var unionid=$('#unionId').val();
								localStorage.clear();
								setTimeout(function(){
									window.location.hash='#/register?&phone='+phone+'&headimgurl='+headimgurl
									+'&openid='+openid
									+'&unionid='+unionid;
								},30)
								
							}else{
								$.toast('验证码不正确，请重新输入！');
							}
						
							
						},
						error:function(){
							$.toast('验证码不正确，请重新输入！');
						}
					})
					
				}
//	 			if(btn==true){
//	 				var phone=localStorage.getItem('phone');
//	 				localStorage.clear();
//	 				window.location.href=webBasePath+'/pages/mobile/weChat/register/register.jsp?&phone='+phone;
//	 			}else{
//	 				$.alert('请先进行短信验证！');
//	 			}
				
			})
		

	}

	function math(){
		$.ajax({
			type:'post',
			url:webBasePath+'/weChat/public/addImgValidate',
			success:function(data){
//	 			alert(JSON.stringify(data));
				console.log('随机数');
				console.log(data.imgValidate.imgValidateCode);
				$('#math').val(data.imgValidate.imgValidateCode);
			    ddd=data.imgValidate.id;
			},
			error:function(data){
//	 			alert(12);
//	 			alert(data);
				
			}
		})
	}




	//验证随机数
	function checkMath(){
		var param={};
		if($('#yanzheng').val()==''){
			$.toast('请输入随机数验证码');
			tt=false;
			return;
		}
		param.imgvalidateCode=$('#yanzheng').val();
		param.id=ddd;
		param.phone=$('#phone').val();
		$.ajax({
			type:'get',
			url:webBasePath+'weChat/public/send/validate/phone/login',
			data:param,
			success:function(data){
					if(data.code==206){
						$.toast('随机码输入错误');
						ee=false;
					}else{
						$.toast(data.msg);
						localStorage.secret=data.data.secret;
						localStorage.seqId=data.data.seqId;
	 					localStorage.phone=$('#phone').val();
					}
				
			},
			error:function(){
				$.toast('随机码输入错误');
			}
		})
	}
	changeCode();
	function changeCode(){
		$('#math').one('click',function(){
			setTimeout(function(){
				math();
				changeCode();
			},1000)
			
		})
	}


	
	
	
	
	
	
	
	
	
	
	
	
	
}