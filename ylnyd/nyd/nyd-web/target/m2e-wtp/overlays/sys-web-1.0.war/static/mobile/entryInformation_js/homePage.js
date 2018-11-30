SPA_RESOLVE_INIT = function(transition){
	var homePage={
			addHtml:function(){
				var that=this;
				$('#content').html(
				    '<div class="header">'+
						'<div class="header_img">'+
							'<img class="submitHeader" style="border-radius:50%;width: 82px;height: 82px;" src="'+webBasePath+'/static/mobile/images/entryInformation/headCamera.png">'+
							'<p>上传证件照</p>'+
						'</div>'+
					'</div>'+
					'<div class="contentPage">'+

						'<div class="list-block media-list">'+
						  '<ul>'+
						    '<li>'+
						     ' <a href="#/basicInformation" class="item-link item-content">'+
						        '<div class="item-inner">'+
						          '<div class="row">'+
									'<div class="col-80">'+
										'<img src="'+webBasePath+'/static/mobile/images/entryInformation/basicInformation.png">'+
										'<span>基础信息</span>'+
									'</div>'+
									'<div class="col-20">'+
										'<span class="basicTF">未填</span>'+
									'</div>'+
								 ' </div>'+
						        '</div>'+
						      '</a>'+
						    '</li>'+
						    '<li>'+
						     ' <a href="#/educationBg" class="item-link item-content">'+
						        '<div class="item-inner">'+
						         ' <div class="row">'+
									'<div class="col-80">'+
										'<img src="'+webBasePath+'/static/mobile/images/entryInformation/educationBg.png">'+
										'<span>教育背景</span>'+
									'</div>'+
									'<div class="col-20">'+
										'<span class="educatTF">未填</span>'+
									'</div>'+
								  '</div>'+
						        '</div>'+
						      '</a>'+
						    '</li>'+
						    '<li>'+
						      '<a href="#/jobExperience" class="item-link item-content">'+
						        '<div class="item-inner">'+
						          '<div class="row">'+
									'<div class="col-80">'+
										'<img src="'+webBasePath+'/static/mobile/images/entryInformation/jobExperience.png">'+
										'<span>工作经历</span>'+
									'</div>'+
									'<div class="col-20">'+
										'<span class="jobTF">未填</span>'+
									'</div>'+
								  '</div>'+
						        '</div>'+
						      '</a>'+
						    '</li>'+
						    '<li>'+
						      '<a href="#/family" class="item-link item-content">'+
						        '<div class="item-inner">'+
						          '<div class="row">'+
									'<div class="col-80">'+
										'<img src="'+webBasePath+'/static/mobile/images/entryInformation/family.png">'+
										'<span>家庭成员</span>'+
									'</div>'+
									'<div class="col-20">'+
										'<span class="famTF">未填</span>'+
									'</div>'+
								  '</div>'+
						        '</div>'+
						      '</a>'+
						    '</li>'+
						   ' <li>'+
						      '<a href="#/certificate" class="item-link item-content">'+
						        '<div class="item-inner">'+
						          '<div class="row">'+
									'<div class="col-80">'+
										'<img src="'+webBasePath+'/static/mobile/images/entryInformation/certificate.png">'+
										'<span>职称证书</span>'+
									'</div>'+
									'<div class="col-20">'+
										'<span class="certifTF">未填</span>'+
									'</div>'+
								  '</div>'+
						        '</div>'+
						      '</a>'+
						    '</li>'+
						  '</ul>'+
						'</div>'+
						'<div class="" style="">'+
						   '<p><a href="#" class="button button-big button-fill complete">确认填写完成</a></p>'+
						'</div>'+
					'</div>'
						
				)
				
				this.headerH();
				this.getsign();
				this.aaa();
				if(localStorage.getItem('aimg')){
					var aimg=localStorage.getItem('aimg');
					$('.header_img img').attr('src',aimg);
				/*	$('.header_img img').off('click');
					$('.header_img img').on('click',function(){
						that.previewImage(aimg);
					})*/
				}
			},
			aaa:function (){
				 var complete=true;
				 if(localStorage.getItem('basic')){
					 $('.basicTF').text('已填');
					}else{
					 $('.basicTF').text('未填');
					 complete=false;
					}
				 if(localStorage.getItem('education')){
					 $('.educatTF').text('已填');
				 }else{
					 $('.educatTF').text('未填');
					 complete=false;
				 }
				 if(localStorage.getItem('job')){
					 $('.jobTF').text('已填');
				 }else{
					 $('.jobTF').text('未填');
//					 complete=false;
				 }
				 if(localStorage.getItem('family')){
					 $('.famTF').text('已填');
				 }else{
					 $('.famTF').text('未填');
					 complete=false;
				 }
				 if(localStorage.getItem('certificate1')||localStorage.getItem('certificate2')){
					 $('.certifTF').text('已填');
				 }else{
					 $('.certifTF').text('未填');
				
				 }
				
					 $('.complete').off('click');
					 $('.complete').on('click',function(){
						 if(complete){
							 $('#bgColor').css('display','block');
							 $.alert('入职信息填写完毕，请联系人事部门并退出页面');
						 }else{
							 $('#bgColor').css('display','none');
							 $.toast('请先完善信息后再确认')
						 }
					 })
			 },
			headerH:function(){
				$('.header').css('height',$('body').height()*0.25);
				 $('#content').on('touchstart','.contentPage ul li',function(){
					 $(this).css('background','#D9D9D9');
				 }).on('touchend','.contentPage ul li',function(){
					 $(this).css('background','white');
				 }).on('touchmove','.contentPage ul li',function(){
					 $(this).css('background','white');
				 })
			},
			getsign:function (){
				var that=this;
// 				alert(location.href.split('#')[0]);
				var appId=$('#appId').val();// 必填，企业号的唯一标识，此处填写企业号corpid
				var timestamp=$('#timestamp').val();  // 必填，生成签名的时间戳
				timestamp=parseInt(timestamp);
			   	var nonceStr=$('#nonceStr').val(); // 必填，生成签名的随机串
			    var signature=$('#signature').val(); // 必填，签名，见附录1
 // 			    alert("appId:" +JSON.stringify(appId)+"signature:" +JSON.stringify(signature)+"timestamp:" +JSON.stringify(timestamp)+"nonceStr:" +JSON.stringify(nonceStr));
				wx.config({
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: appId, // 必填，企业号的唯一标识，此处填写企业号corpid
				    timestamp: timestamp, // 必填，生成签名的时间戳
				    nonceStr: nonceStr, // 必填，生成签名的随机串
				    signature: signature,// 必填，签名，见附录1
				    jsApiList: [
				                'checkJsApi',
				                'onMenuShareTimeline',
				                'onMenuShareAppMessage',
				                'onMenuShareQQ',
				                'onMenuShareWeibo',
				                'onMenuShareQZone',
				                'hideMenuItems',
				                'showMenuItems',
				                'hideAllNonBaseMenuItem',
				                'showAllNonBaseMenuItem',
				                'translateVoice',
				                'startRecord',
				                'stopRecord',
				                'onVoiceRecordEnd',
				                'playVoice',
				                'onVoicePlayEnd',
				                'pauseVoice',
				                'stopVoice',
				                'uploadVoice',
				                'downloadVoice',
				                'chooseImage',
				                'previewImage',
				                'uploadImage',
				                'downloadImage',
				                'getNetworkType',
				                'openLocation',
				                'getLocation',
				                'hideOptionMenu',
				                'showOptionMenu',
				                'closeWindow',
				                'scanQRCode',
				                'chooseWXPay',
				                'openProductSpecificView',
				                'addCard',
				                'chooseCard',
				                'openCard'
				                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				
				wx.ready(function(){
// 					 console.log("wx.ready");
// 					document.querySelector('#chooseImage').onclick = function () { chooseImage(); }
					that.chooseInvoiceImage();
				});
				wx.error(function(){
					$.alert('获取接口失败');
				})
			},
			//选择图片
			chooseInvoiceImage:function (){
				var that=this;
				$('#content').off('click','.submitHeader');
				$('#content').on('click','.submitHeader',function(){
					 wx.chooseImage({
						    count: 1, // 默认9
						    sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
						    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
						    success: function (res) {
						    	var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片 
	 				//	    	 alert("localIds="+JSON.stringify(localIds));
						    	that.thumbnailInvoice(res);
						    	that.uploadInvoiceImage(localIds);
						    },
						    fail:function(res){
						    }
						});
				})

			},
			//加载缩略图
			thumbnailInvoice:function (res){
					var that=this;
					aimg=res.localIds;
					localStorage.setItem("aimg", aimg);
					$('.header_img img').attr('src',res.localIds);
					$('.header_img img').on('click',function(){
						that.previewImage(JSON.stringify(res.localIds))
					})
			},
			//预览图片
			previewImage:function (localIds){
				var that=this;
// 				console.log(arguments.length+","+arguments);
				$('#content').off('click','.header_img img');
				$('#content').on('click','.header_img img',function(){
					that.chooseInvoiceImage();
				})
			},
			//上传图片
			uploadInvoiceImage:function (id){
				id=id.toString();
				 wx.uploadImage({  
		                localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得  
		                isShowProgressTips: 1, // 默认为1，显示进度提示  
		                success: function (res) {  
		                	
		                    mediaId = res.serverId; // 返回图片的服务器端ID  
		                    var param={};
		                	param.mediaId=mediaId;
		                	param.empId=employeeId;
//		                	alert(JSON.stringify(param));
		                    $.ajax({
		                    	type:'post',
		                    	url:webBasePath+'hr/entry/downloadManPic/m',
		                    	data:param,
		                    	success:function(data){
		                    		$.toast('头像上传成功')
		                    	},
		                    	error:function(data){
		                    		$.toast('头像上传失败')
		                    	}
		                    })
		                    
		                },  
		                fail: function (error) {  
		                    picPath = '';  
		                    localIds = '';  
		                    $.alert(JSON.stringify(error));  
		  
		                }  
		  
		            });  
			},
			readLocalStorageData:function(arr,name){
				
				if(localStorage.getItem(name)){
					 var rr=localStorage.getItem(name);
					 console.log(rr);
					 rr=rr.split('|');
					 for(var i=0;i<rr.length;i++){
						 arr.push(JSON.parse(rr[i]));
					 }
				}
			}
			
			
	}
	homePage.addHtml();
	homePage.readLocalStorageData(arrayEdu,'education');
	homePage.readLocalStorageData(arrayFamily,'family');
	homePage.readLocalStorageData(arrayJob,'job');
	homePage.readLocalStorageData(arrayCert1,'certificate1');
	homePage.readLocalStorageData(arrayCert2,'certificate2');
}