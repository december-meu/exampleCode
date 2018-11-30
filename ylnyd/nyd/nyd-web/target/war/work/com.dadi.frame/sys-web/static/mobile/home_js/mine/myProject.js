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
						  '<h1 class="title">我的项目</h1>'+
						'</header>'+
						'<div class="bar bar-header-secondary" style="margin-top:10%">'+
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
						'<div class="content" style="top:4rem;">'+
						  '<div class="buttons-tab">'+
						    '<a href="#tab1" class="tab-link active button">全部</a>'+
						    '<a href="#tab2" class="tab-link button">进行中</a>'+
						    '<a href="#tab3" class="tab-link button">已完成</a>'+
						  '</div>'+
						  '<div class="content-block" style="margin:0;padding:0">'+
						    '<div class="tabs">'+
						      '<div id="tab1" class="tab active">'+
						        '<div class="content-block" style="margin:0;padding:0">'+
							      '<div class="list-block cards-list">'+
							        '<ul id="allProject">'+
							          '<li class="card">'+
							            '<div class="card-header" style="font-weight:900;">实时化测绘服务平台项目</div>'+
							            '<div class="card-content">'+
							              '<div class="card-content-inner">实时化测绘服务平台项目简介实时化测绘服务平台项目简介实时化测绘服务平台项目简介实时化测绘服务平台项目简介实时化测绘服务平台项目简介</div>'+
							            '</div>'+
							            '<div class="card-footer">'+
							            	'<div class="row" style="width:100%">'+
							            		'<div class="col-80">'+
							            			'开始时间：2018-03-31'+
							            		'</div>'+
							            		'<div class="col-20">'+
							            			'<span class="progress">进行中</span>'+
							            		'</div>'+
							            	'</div>'+
							            '</div>'+
							          '</li>'+
							          '<li class="card">'+
							            '<div class="card-header" style="font-weight:900;">实时化测绘服务平台项目</div>'+
							            '<div class="card-content">'+
							              '<div class="card-content-inner">实时化测绘服务平台项目简介实时化测绘服务平台项目简介实时化测绘服务平台项目简介实时化测绘服务平台项目简介实时化测绘服务平台项目简介</div>'+
							            '</div>'+
							            '<div class="card-footer">'+
							            	'<div class="row" style="width:100%">'+
							            		'<div class="col-80">'+
							            			'开始时间：2018-03-31'+
							            		'</div>'+
							            		'<div class="col-20">'+
							            			'<span class="already">已完成</span>'+
							            		'</div>'+
							            	'</div>'+
							            '</div>'+
							          '</li>'+
							          '<li class="card">'+
							            '<div class="card-header" style="font-weight:900;">实时化测绘服务平台项目</div>'+
							            '<div class="card-content">'+
							              '<div class="card-content-inner">实时化测绘服务平台项目简介实时化测绘服务平台项目简介实时化测绘服务平台项目简介实时化测绘服务平台项目简介实时化测绘服务平台项目简介</div>'+
							            '</div>'+
							            '<div class="card-footer">'+
							            	'<div class="row" style="width:100%">'+
							            		'<div class="col-80">'+
							            			'开始时间：2018-03-31'+
							            		'</div>'+
							            		'<div class="col-20">'+
							            			'<span class="progress">进行中</span>'+
							            		'</div>'+
							            	'</div>'+
							            '</div>'+
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
						  '</div>'+
						'</div>'
				);
			}
	}
	order.addActive();
}