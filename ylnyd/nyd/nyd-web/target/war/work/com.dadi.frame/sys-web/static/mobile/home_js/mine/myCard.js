SPA_RESOLVE_INIT = function(transition){
	order={
			addActive:function(){
				
				$('#navbottom').css('display','none');
				$('#home').css('margin-bottom',0).css('background','white');
				$('#home').off('click','.pull-left');
				$('#home').on('click','.pull-left',function(){
					window.location.hash="#/mine";
				})
				
				this.addHtml();
			},
			addHtml:function(){
				$('#home').html(
						'<header class="bar bar-nav" style="background:white;border-bottom:1px solid #ddd">'+
						  '<button class="button button-link button-nav pull-left">'+
						    '<span class="icon icon-left"></span>'+
						    '返回'+
						  '</button>'+
						  '<h1 class="title">我的卡券</h1>'+
						'</header>'+
						'<div class="content">'+
							'<div class="list-block contacts-block">'+
							    '<div class="list-group">'+
							      '<ul id="cardList">'+
							        '<li>'+
							          '<div class="item-content">'+
							            '<div class="item-inner">'+
							              '<img src="'+webBasePath+'static/mobile/images/mine/card1.png">'+
							            '</div>'+
							          '</div>'+
							        '</li>'+
							        '<li>'+
							          '<div class="item-content">'+
							            '<div class="item-inner">'+
							              '<img src="'+webBasePath+'static/mobile/images/mine/card1.png">'+
							            '</div>'+
							          '</div>'+
							        '</li>'+
							        '<li>'+
							          '<div class="item-content">'+
							            '<div class="item-inner">'+
							              '<img src="'+webBasePath+'static/mobile/images/mine/card1.png">'+
							            '</div>'+
							          '</div>'+
							        '</li>'+
							    '</div>'+
						    '</div>'+
							'<div id="remark"></div>'+
							'<div id="remark1"></div>'+
						'<div>'
					
						
				);
				this.aaa();
			},
			aaa:function(){
				$.ajax({
					type:'post',
					url:webBasePath+'appc/info/list/info/m?appType=HYLX001',
					success:function(data){
						var data=JSON.parse(data);
						console.log(data);
//						$('#remark').html(data.value[0].fun_des);
//						$('#remark1').html(data.value[0].help_content);
					}
					
				})
			}
	}
	order.addActive();
}