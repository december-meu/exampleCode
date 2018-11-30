SPA_RESOLVE_INIT = function(transition){

	application={
			addActive:function(){
				$('.pic1 img').attr('src',webBasePath+'static/mobile/images/nav/applicationActive.png')
				$('.pic2 img').attr('src',webBasePath+'static/mobile/images/nav/order.png')
				$('.pic3 img').attr('src',webBasePath+'static/mobile/images/nav/forum.png')
				$('.pic4 img').attr('src',webBasePath+'static/mobile/images/nav/mine.png')
				$('#navbottom a').removeClass('active');
				$('#navbottom .application').addClass('active');
				
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
				    '<div id="slider" class="swiper-container">'+
					'<div class="swiper-wrapper">'+
				      '<div class="swiper-slide"><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1n3rZHFXXXXX9XFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg"></div>'+
				      '<div class="swiper-slide"><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i4/TB10rkPGVXXXXXGapXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg"></div>'+
				    '</div>'+
					    '<!-- Add Pagination -->'+
					'<div class="swiper-pagination"></div>'+
					'</div>'+
					'<div id="appList" style="background:white">'+
						'<ul id="tools">'+
							'<li id=""><img src="'+webBasePath+'static/mobile/images/application/tool.png"><p>工具类</p></li>'+
							'<li id=""><img src="'+webBasePath+'static/mobile/images/application/applications.png"><p>应用类</p></li>'+
							'<li id=""><img src="'+webBasePath+'static/mobile/images/application/data.png"><p>数据类</p></li>'+
							'<li id=""><img src="'+webBasePath+'static/mobile/images/application/management.png"><p>管理类</p></li>'+
						'</ul>'+
					'</div>'+
					'<div id="title_content">'+
					  '<div class="content-block-title"><img style="width: 5%;position:absolute" src="'+webBasePath+'static/mobile/images/heart.png"><span style="margin-left: 6%">最新推荐</span></div>'+
					    '<div class="list-block media-list">'+
					      '<ul>'+
					        '<li>'+
					          '<div class="item-content">'+
					            '<div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg"></div>'+
					            '<div class="item-inner">'+
					              '<div class="item-title-row">'+
					                '<div class="item-title" style="font-size:0.8rem">实时化测绘服务平台</div>'+
					              '</div>'+
					            '<div class="item-subtitle" style="font-size:0.7rem">子标题</div>'+
					            '<div class="item-subtitle" style="font-size:0.7rem">子标题</div>'+
					          '</div>'+
					        '</div>'+
					      '</li>'+
					      '<li>'+
				          '<div class="item-content">'+
				            '<div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg"></div>'+
				            '<div class="item-inner">'+
				              '<div class="item-title-row">'+
				                '<div class="item-title" style="font-size:0.8rem">标题</div>'+
				              '</div>'+
				            '<div class="item-subtitle" style="font-size:0.7rem">子标题</div>'+
				          '</div>'+
				        '</div>'+
				      '</li>'+
				      '<li>'+
			          '<div class="item-content">'+
			            '<div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg"></div>'+
			            '<div class="item-inner">'+
			              '<div class="item-title-row">'+
			                '<div class="item-title" style="font-size:0.8rem">标题</div>'+
			              '</div>'+
			            '<div class="item-subtitle" style="font-size:0.7rem">子标题</div>'+
			          '</div>'+
			        '</div>'+
			      '</li>'+
					    '</ul>'+
					  '</div>'+
					'</div>'
					);
				var swiper = new Swiper('.swiper-container', {
    	            loop: true,
    	            grabCursor: true,
    	            spaceBetween: 30,
    	            centeredSlides: true,
    	            autoplay: {
    	              delay: 3500,
    	              disableOnInteraction: false,
    	            },
    	            pagination: {
    	              el: '.swiper-pagination',
    	              clickable: true,
    	              dynamicBullets: true,
    	            },
    	          });
//				this.instrument();
			},
			instrument:function(){
				$.ajax({
					type:'post',
					url:webBasePath+'/appc/info/list/type/m?appType=HYLX',
					success:function(data){
						var imgg=['']
						var data=JSON.parse(data);
						console.log(data);
						if(data.code==200){
							var im=['guotu.png','guanxian.png','diji.png','chengshiguihua.png','shuili.png','jiaotong.png','fangchan.png','tongyong.png']
							console.log(data);
							for(var i=0;i<data.value.length;i++){
//								alert(i)
								$('#home #tools').append(
									'<li data-code="'+data.value[i].dic_code+'" id="'+data.value[i].id+'"><img src="'+webBasePath+'static/mobile/images/nav/'+im[i]+'"><p>'+data.value[i].dic_name+'</p></li>'
								)
							}
							
						}
					}
				})
			}
	}
	application.addActive();
}