SPA_RESOLVE_INIT = function(transition){
	order={
			addActive:function(){
				
				$('#navbottom').css('display','none');
				$('#home').css('margin-bottom',0).css('background','white');
				$('#home').off('click','.pull-left');
				$('#home').on('click','.pull-left',function(){
					window.location.hash="#/mine";
				})
				$('#home').off('click','.accountDetails');
				$('#home').on('click','.accountDetails',function(){
					window.location.hash="#/consumeDetail";
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
						  '<h1 class="title">账户余额-充值</h1>'+
						'</header>'+
						'<div style="text-align:center;padding: 2%;background:white;margin-top: 10%;">'+
							'<p class="accountDetails" style="font-size: 0.9rem;color: #ccc;margin-left: 80%;margin-top: 4%;">明细</p>'+
							'<p style="color:red;margin-top:-4%;font-size:0.9rem"><span style="font-size: 1.5rem;font-weight: 900;margin-right:1%">1250.00</span>元</p>'+
						'</div>'+
					    '<div class="row" style="margin:0;background:white">'+
					    	'<div class="col-50" style="text-align:center;font-size:0.8rem;padding:5% 0;width:50%;margin:0;border: 1px solid #ddd;">'+
					    		'<div>现金余额：<span>258.00</span></div>'+
					    	'</div>'+
					    	'<div class="col-50" style="text-align:center;font-size:0.8rem;padding:5% 0;width:50%;margin:0;border: 1px solid #ddd;border-left:none">'+
					    	    '<div>卡券余额：<span>1000.00</span></div>'+
					    	'</div>'+
					    '</div>'+
					    '<div class="recharge">'+
					    	'<span>充值(人民币)</span>'+
					    	'<div class="rechargeNum" style="">'+
					    		'<div style="">50元</div>'+
					    		'<div class="mar">500元</div>'+
					    		'<div style="">100元</div>'+
					    		'<div class="mar">1000元</div>'+
					    		'<div>200元</div>'+
					    		'<div class="mar">2000元</div>'+
					    	'</div>'+
					    '</div>'+
					    '<div class="content-block" style="margin: 7.75rem 0 0 0;">'+
					    	'<p><a href="#" class="button button-big button-round button-fill">确认充值</a></p>'+
					    '</div>'
				);
			}
	}
	order.addActive();
}