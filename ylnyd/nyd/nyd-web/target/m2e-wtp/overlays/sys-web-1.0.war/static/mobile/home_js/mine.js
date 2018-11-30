SPA_RESOLVE_INIT = function(transition){
	mine={
			addActive:function(){
				$('.pic1 img').attr('src',webBasePath+'static/mobile/images/nav/application.png')
				$('.pic2 img').attr('src',webBasePath+'static/mobile/images/nav/order.png')
				$('.pic3 img').attr('src',webBasePath+'static/mobile/images/nav/forum.png')
				$('.pic4 img').attr('src',webBasePath+'static/mobile/images/nav/mineActive.png')
				$('#navbottom a').removeClass('active');
				$('#navbottom .mine').addClass('active');
				$('#navbottom').css('display','block');
				$('#home').css('margin-bottom','12%').css('background','#efefef');
				this.addHtml();
			},
			addHtml:function(){
				 $('#home').html(
						 '<div class="content-padded grid-demo" style="background:#0e8ae4;height: 130px;margin:0">'+
						    '<div class="row">'+
						      '<div class="col-33">'+
						          '<div style="width: 80px;margin: 0;margin-top: 25px;margin-left: 20%;" id="img_head">'+
						      	  '</div>'+
						      '</div>'+
						      '<div class="col-50" style="width:60%;margin-left:0">'+
							      '<div class="row" style="margin-top:14%">'+
							      	'<div class="col-50" id="img_name" style="margin-left: 10%;width:100%;margin-top: 4%;color: white;font-size:1rem;"></div>'+
								  '</div>'+
								  '<div class="row" style="margin-top:-0.5em">'+
//								    '<div class="col-50" id="img_bumen" style="margin-left:0%;width:100%;font-size: 0.7rem;color:#bdb8b8;margin-top:-1%">部门：<span></span></div>'+
								    '<div class="col-50" id="img_account" style="margin-left: 10%;width:100%;font-size: 0.7rem;color:#f3cb58;margin-top: 6%;"></div>'+
							     '</div>'+
						      '</div>'+
						    '</div>'+
						 '</div>'+
						 '<div id="toolList" style="background:white">'+
							'<ul>'+
								'<li id=""><img style="width:30%" src="'+webBasePath+'static/mobile/images/useRecords.png"><p>使用记录</p></li>'+
								'<li id=""><img src="'+webBasePath+'static/mobile/images/cardCouponsOfCenter.png"><p>卡券中心</p></li>'+
								'<li id="card"><img style="width: 40%;margin-top: 8%" src="'+webBasePath+'static/mobile/images/myCardCoupons.png"><p>我的卡券</p></li>'+
							'</ul>'+
						'</div>'+
						'<div id="rechage" style="background:white;margin-top:10px;padding-left:13%;height:60px;line-height:60px;position:relative;font-family: '+'微软雅黑'+';font-size: 16px;">'+
					      '<img src="'+webBasePath+'static/mobile/images/mine/balance.png" style="width: 25px;top: 13px;position: absolute;left: 16px">'+
				    	  '账户余额·充值<span style="float:right;margin-right: 5%;color: #777676;margin-left: -5%;" class="icon icon-right"></span><span style="float:right;margin-right: 7%;">1258.00</span>'+
				        '</div>'+
				        '<div id="myProject" style="background:white;margin-top:1px;padding-left:13%;height:60px;line-height:60px;position:relative;font-family: '+'微软雅黑'+';font-size: 16px;">'+
					      '<img src="'+webBasePath+'static/mobile/images/mine/project.png" style="width: 25px;top: 13px;position: absolute;left: 16px">'+
				    	  '我的项目<span style="float:right;margin-right: 5%;color: #777676;margin-left: -5%;" class="icon icon-right"></span>'+
				        '</div>'+
				        '<div id="" style="background:white;margin-top:1px;padding-left:13%;height:60px;line-height:60px;position:relative;font-family: '+'微软雅黑'+';font-size: 16px;">'+
					      '<img src="'+webBasePath+'static/mobile/images/mine/recommend.png" style="width: 25px;top: 13px;position: absolute;left: 16px">'+
				    	  '推荐给朋友<span style="float:right;margin-right: 5%;color: #777676;margin-left: -5%;" class="icon icon-right"></span>'+
				        '</div>'
				 )
				 this.showImg();
				 this.link('#rechage','account');
				 this.link('#myProject','myproject');
				 this.link('#card','mycard');
			},
			showImg:function(){
				var imgUrl=$('#wx_head').val();
		    	var imgName=$('#wx_name').val();
		    	$('#img_name').text('用户名');
		    	$('#img_account').text('超级会员');
//		    	$('#img_account span').text($('#wx_account').val());
//		    	alert($('#wx_account').val());
		    	$('#img_head').html('<img style="width:100%;border-radius: 50%;" src="'+webBasePath+'static/mobile/images/application/tool.png">');
		    	$('#img_head').on('click',function(){
		    		wx.previewImage({
		    			current: '', // 当前显示图片的http链接
		    			urls: [imgUrl] // 需要预览的图片http链接列表
		    			});
		    	})
			},
			link:function(id,hash){
				$('#home').off('touchstart',id);
				$('#home').on('touchstart',id,function(){					
					$(this).css('background','#ccc');
				}).on('touchend',id,function(){
					$(this).css('background','white');
					window.location.hash="#/"+hash;
				})
				/*$('#home').off('click','#card');
				$('#home').on('click','#card',function(){
					window.location.hash="#/mycard";
				})*/
			}
	}
	mine.addActive();
}