


SPA_RESOLVE_INIT = function(transition){
	var aa='';
	aa='<div class="container" style="border: 1px solid #22AD9A; border-radius: 6px;"><br>'+
		   	'<div id="login" class="panel panel-primary">'+
		    	'<div class="panel-heading" style="font-size: 16px;text-align: center;">招聘岗位申请表'+
		        '</div>'+
		        '<div class="panel-body col-lg-4">'+
		        	'<div class="form-group">'+
		                '<label>申请人:</label><input type="text"  class="form-control"><br>'+
		                '<label>需求岗位:</label><input type="text"  class="form-control"><br>'+
		                '<label>工作职责:</label> <input type="text"  class="form-control"><br>'+
		                '<label>任职条件:</label><input type="text"  class="form-control"><br>'+
		                '<label>学历:</label> <input type="text"  class="form-control">'+
		            '</div>'+
		        '</div>'+
		        '<div class="panel-body col-lg-4">'+
		        	'<div class="form-group">'+
		        		 '<label>申请部门:</label><input type="text"  class="form-control"><br>'+
		                 '<label>需求人数:</label><input type="text"  class="form-control"><br>'+
		                ' <label>工作职责:</label> <input type="text"  class="form-control"><br>'+
		                 '<label>专业:</label><input type="text"  class="form-control">'+
		            '</div>'+
		        '</div>'+
		        '<div class="clearfix"></div>'+
		        '<div class="panel-body col-lg-5">'+
		        	'<div class="form-group">'+
		        		'<label >收件人:</label><input type="text"  class="form-control"><br>'+
		                 '<label>抄送:</label><input type="text"  class="form-control"><br>'+
		                  '<label>主题:</label> <input type="text"  class="form-control">'+
		            '</div>'+
		        '</div>'+
		        '<div class="panel-body col-lg-5">'+
		        	'<div class="form-group"><br />'+
		                 '<label>意见:</label><textarea  style="resize:none;" class="form-control"></textarea><br />'+
		                 '<input type="button" value="确定" class="btn-lg btn-primary pull-right">'+
		           ' </div>'+
		        '</div>'+
		    '</div>'+
		'</div>'
		$('#content-main').html(aa)
		$('.form-control').css({"border":'1px solid #ccc'})
		
		$('.dropdown-menu li').hover(function(){
			$(this).children('a').css({'background':'#22ad9a'}).parent().siblings().children('a').css({'background':'white'})
		})
	console.log("首页回调12" + JSON.stringify(transition))
}


