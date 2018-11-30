SPA_RESOLVE_INIT = function(transition){
	order={
			addActive:function(){
				$('#navbottom').css('display','none');
				$('#home').css('margin-bottom',0).css('background','white');
				$('#home').off('click','.pull-left');
				$('#home').on('click','.pull-left',function(){
					window.location.hash="#/account";
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
						  '<h1 class="title">充值-消费记录</h1>'+
						'</header>'+
						'<div class="" style="margin-top:15%">'+
							'<div class="row" style="padding: 4% 7% 4% 4%">'+
								'<div class="col-80">'+
									'<div class="col-100" style="color: #656363;letter-spacing: 1px;">'+
										'<span>支付报表精灵使用费用</span>'+
									'</div>'+
									'<div class="col-100" style="margin-top: 3%;color: #b9b7b7;">'+
										'<span>2018-04-10 08:30:00</span>'+
									'</div>'+
								'</div>'+
								'<div class="col-20">'+
									'<span>-158.00</span>'+
								'</div>'+
							'</div>'+
							'<div class="row" style="padding: 4% 7% 4% 4%">'+
								'<div class="col-80">'+
									'<div class="col-100" style="color: #656363;letter-spacing: 1px;">'+
										'<span>支付日记账使用费用</span>'+
									'</div>'+
									'<div class="col-100" style="margin-top: 3%;color: #b9b7b7;">'+
										'<span>2018-04-10 08:30:00</span>'+
									'</div>'+
								'</div>'+
								'<div class="col-20">'+
									'<span>-200.00</span>'+
								'</div>'+
							'</div>'+
							'<div class="row" style="padding: 4% 7% 4% 4%">'+
								'<div class="col-80">'+
									'<div class="col-100" style="color: #656363;letter-spacing: 1px;">'+
										'<span>账户充值</span>'+
									'</div>'+
									'<div class="col-100" style="margin-top: 3%;color: #b9b7b7;">'+
										'<span>2018-04-10 08:30:00</span>'+
									'</div>'+
								'</div>'+
								'<div class="col-20">'+
									'<span>+1000.00</span>'+
								'</div>'+
							'</div>'+
						'</div>'
				);
			}
	}
	order.addActive();
}