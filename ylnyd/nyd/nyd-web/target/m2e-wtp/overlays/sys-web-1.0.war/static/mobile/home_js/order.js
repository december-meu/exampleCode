SPA_RESOLVE_INIT = function(transition){
	order={
			addActive:function(){
				$('.pic1 img').attr('src',webBasePath+'static/mobile/images/nav/application.png')
				$('.pic2 img').attr('src',webBasePath+'static/mobile/images/nav/orderActive.png')
				$('.pic3 img').attr('src',webBasePath+'static/mobile/images/nav/forum.png')
				$('.pic4 img').attr('src',webBasePath+'static/mobile/images/nav/mine.png')
				$('#navbottom a').removeClass('active');
				$('#navbottom .order').addClass('active');
				$('#navbottom').css('display','block');
				$('#home').css('margin-bottom','12%').css('background','#efefef');
				this.addHtml();
			},
			addHtml:function(){
				$('#home').html(
						'<div class="bar bar-header-secondary">'+
						  '<div class="searchbar">'+
						    '<a class="searchbar-cancel">搜索</a>'+
						    '<div class="search-input">'+
						      '<label class="icon icon-search" for="search"></label>'+
						      '<input type="search" id="search" placeholder="输入应用名称查找..."/>'+
						    '</div>'+
						  '</div>'+
						  '<div id="email">'+
						  	'<img src="'+webBasePath+'static/mobile/images/email.png">'+
						  '</div>'+
						'</div>'+
					  '<div class="buttons-tab" style="margin-top: 12%">'+
					    '<a href="#tab1" class="tab-link active button">全部</a>'+
					    '<a href="#tab2" class="tab-link button">已完成</a>'+
					    '<a href="#tab3" class="tab-link button">未完成</a>'+
					  '</div>'+
					  '<div class="content-block" style="margin:0;padding:0">'+
					    '<div class="tabs">'+
					      '<div id="tab1" class="tab active">'+
					        '<div class="content-block" style="margin:0;padding:0;background:white;padding-top: 5%">'+
					          
					          '<div class="content-block-title"><img style="width: 5%;position:absolute" src="'+webBasePath+'static/mobile/images/application/toolMini.png">'+
					            '<span style="margin-left: 6%">工具类</span>'+
					            '<span style="float: right;margin-right: 3%;color:#FF5722">交易未完成</span>'+
					          '</div>'+
						        '<div class="list-block media-list">'+
						          '<ul>'+
						            '<li>'+
						              '<div class="item-content">'+
						                '<div class="item-media"><img style="width: 4rem;" src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" style="width: 2.2rem;"></div>'+
						                '<div class="item-inner">'+
						                  '<div class="item-title-row">'+
						                    '<div class="item-title" style="width:100%;letter-spacing: 1px;font-size:0.8rem"><span>实时化测绘服务平台</span><span style="float:right;font-weight:900">￥25元</span></div>'+
						                  '</div>'+
						                  '<div class="item-subtitle" style="color:#ccc;float:right;margin-top:2%">使用时长：<span>5小时</span></div>'+
						                  '<div class="item-subtitle" style="float:right;margin-top:2%;font-size:0.75rem">共1个应用 合计：￥<span>25元</span></div>'+
						                '</div>'+
						              '</div>'+
						              '<p style="width: 25%;position: relative;left: 70%;bottom: 10px;"><a href="#" class="button button-fill button-round">立即付款</a></p>'+
						            '</li>'+
						          '</ul>'+
						        '</div>'+
					        '</div>'+
					      '</div>'+
					      '<div id="tab2" class="tab">'+
					        '<div class="content-block">'+
					          '<p>This is tab 2 content</p>'+
					        '</div>'+
					      '</div>'+
					      '<div id="tab3" class="tab">'+
					        '<div class="content-block">'+
					          '<p>This is tab 3 content</p>'+
					        '</div>'+
					      '</div>'+
					    '</div>'+
					  '</div>'
				);
			}
	}
	order.addActive();
}