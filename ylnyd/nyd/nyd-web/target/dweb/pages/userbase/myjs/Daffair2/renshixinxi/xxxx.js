


SPA_RESOLVE_INIT = function(transition){
	console.log("4"+webBasePath+"userbase/userPager/d")
				
	 init()
	function init(){
		var loc=window.location.href
			var id= loc.split("?")[1]
		$.ajax({
			url:webBasePath+"userbase/userPager/d",
	  		type:"post",
	  		data:{
	  			id:id,flagUser:99
	  		},
	  		success:function(data){
	  			console.log(data)
	  			var len=data.rows.length
	  			for(var i=0;i<len;i++){
	  				var info=data.rows[i]
	  			
	  				if(id==info.id){
	  					var aa='';
	  					aa='<div class="container-fluid">'+
	  						'<div class="panel panel-default panel-responsive">'+
	  						    '<div class="panel-heading">'+
	  							    '<a href="#" type="button" class="btn btn-success">基础信息</a>'+
	  						        '<a href="#" type="button" class="btn btn-info">员工定岗</a>'+
	  						        '<a href="#" type="button" class="btn btn-warning">家庭状况</a>'+
	  						        '<a href="#" type="button" class="btn btn-danger">教育状况</a>'+
	  						        '<a href="#" type="button" class="btn btn-success">工作经历</a>'+
	  						    '</div>'+
	  						    '<div class="panel-body">'+
	  						       ' <div class="panel panel-success panel-responsive">'+
	  						            '<div class="panel-heading"><label>基础信息</label></div>'+
	  						                '<div class="panel-body border">'+
	  						                    '<div class="row">'+
	  						                    '<div class="col-xs-4">'+
	  				                          '<div class="col-xs-4 "><label class="text">工号</label></div>'+
	  				                          '<div class="col-xs-8  ">'+
	  				                              '<input type="text" value="'+info.wechatUserId+'" class="form-control ">'+
	  				                          '</div>'+
	  				                       '</div><br />'+
	  				                       '<div class="col-xs-4">'+
	  				                          ' <div class="col-xs-4 top "><label class="text">系统账号 <label class="text-muted">*</label></label></div>'+
	  				                           '<div class="col-xs-8 top ">'+
	  				                              '<input type="text" value="'+info.account+'" class="form-control">'+
	  				                           '</div>'+
	  				                       '</div><br />'+
	  				                    '</div>'+
	  				                    '<div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4"><label class="text">姓名 <label class="text-muted">*</label></label></div>'+
	  				                            '<div class="col-xs-8 ">'+
	  				                               ' <input type="text" value="'+info.userName+'" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4 "><label class="text">性别</label></div>'+
	  				                            '<div class="col-xs-8 ">'+
	  				                          ' <input type="text" value="'+info.sexType+'" class="form-control">'+
	  				                           ' </div>'+
	  				                       ' </div>'+
	  				                        '<div class="col-xs-4" id="pic">'+
	  				                            '<div><img /></div>'+
	  				                        '</div>'+
	  				                    '</div>'+
	  				                    '<div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4"><label class="text">身份证号码 <label class="text-muted">*</label></label></div>'+
	  				                            '<div class="col-xs-8">'+
	  				                               ' <input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4 "><label class="text">级别</label></div>'+
	  				                            '<div class="col-xs-8 ">'+
	  				                            	'<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4 "></div>'+
	  				                   ' </div>'+
	  				                   ' <div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                           ' <div class="col-xs-4"><label class="text">体重</label></div>'+
	  				                            '<div class="col-xs-8 c">'+
	  				                               ' <input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                           ' <div class="col-xs-4 "><label class="text">鞋码</label></div>'+
	  				                            '<div class="col-xs-8 ">'+
	  				                                '<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4 "></div>'+
	  				                    '</div>'+
	  				                    '<div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4"><label class="text">身高</label></div>'+
	  				                            '<div class="col-xs-8 c">'+
	  				                                '<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                           ' <div class="col-xs-4 "><label class="text">腰围</label></div>'+
	  				                            '<div class="col-xs-8 ">'+
	  				                                '<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4 "></div>'+
	  				                    '</div>'+
	  				                    '<div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4"><label class="text">出生日期</label></div>'+
	  				                            '<div class="col-xs-8 c">'+
	  				                               ' <input id="birthday" type="text"  class="laydate-icon form-control layer-date">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                       ' <div class="col-xs-4">'+
	  				                           ' <div class="col-xs-4 "><label class="text">婚姻状况</label></div>'+
	  				                           ' <div class="col-xs-8 ">'+
	  				                           		'<input type="text" class="form-control">'+
	  				                           ' </div>'+
	  				                        '</div>'+
	  				                        '<div class="col-xs-4 "></div>'+
	  				                    '</div>'+
	  				                    '<div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4"><label class="text">党团</label></div>'+
	  				                            '<div class="col-xs-8 c">'+
	  				                            	'<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4 "><label class="text">民族</label></div>'+
	  				                            '<div class="col-xs-8 ">'+
	  				                            	'<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4 ">'+
	  				                            '<div class="form-group">'+
	  				                              
	  				                            '</div>'+
	  				                        '</div>'+
	  				                    '</div>'+
	  				                    '<div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                           ' <div class="col-xs-4"><label class="text">籍贯</label></div>'+
	  				                           ' <div class="col-xs-8">'+
	  				                                '<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4 "><label class="text">户籍详细地址</label></div>'+
	  				                            '<div class="col-xs-8 ">'+
	  				                                '<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4 "></div>'+
	  				                    '</div>'+
	  				                    '<div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4"><label class="text">学历</label></div>'+
	  				                           ' <div class="col-xs-8">'+
	  				                               ' <input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                           ' <div class="col-xs-4 "><label class="text">专业</label></div>'+
	  				                           ' <div class="col-xs-8 ">'+
	  				                               ' <input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div>'+
	  				                    '</div>'+
	  				                    '<div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4"><label class="text">部门 <label class="text-muted">*</label></label></div>'+
	  				                            '<div class="col-xs-8">'+
	  				                                '<input type="text" value="'+info.department+'" class="form-control">'+
	  				                            '</div>'+
	  				                       ' </div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                           ' <div class="col-xs-4 "><label class="text">直接上级 </label></div>'+
	  				                            '<div class="col-xs-8 ">'+
	  				                               ' <input type="text" class="form-control ">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                       ' <div class="col-xs-4">'+
	  				                            '<div class="col-xs-4  "><label class="text">学位</label></div>'+
	  				                            '<div class="col-xs-8  ">'+
	  				                                '<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div>'+
	  				                    '</div>'+
	  				                    '<div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4"><label class="text">职级</label></div>'+
	  				                            '<div class="col-xs-8">'+
	  				                                '<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4 "><label class="text">职称 </label></div>'+
	  				                           ' <div class="col-xs-8 ">'+
	  				                               ' <input type="text" value="'+info.jobtitle+'" class="form-control">'+
	  				                           ' </div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                           ' <div class="col-xs-4  "><label class="text">评定日期</label></div>'+
	  				                           ' <div class="col-xs-8  ">'+
	  				                               ' <input id="assess" type="text"  class="laydate-icon form-control layer-date">'+
	  				                            '</div>'+
	  				                        '</div>'+
	  				                    '</div>'+
	  				                    '<div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4"><label class="text">联系电话 <label class="text-muted">*</label></label></div>'+
	  				                            '<div class="col-xs-8">'+
	  				                                '<input type="text" value="'+info.phone+'" class="form-control">'+
	  				                           ' </div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4 "><label class="text">邮箱</label></div>'+
	  				                            '<div class="col-xs-8 ">'+
	  				                                '<input type="text" value="'+info.email+'" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4  "><label class="text">QQ</label></div>'+
	  				                            '<div class="col-xs-8  ">'+
	  				                                '<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div>'+
	  				                    '</div>'+
	  				                   ' <div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4"><label class="text">档案托管地址</label></div>'+
	  				                            '<div class="col-xs-8 ">'+
	  				                                '<input type="text" class="form-control" style="width:260%;">'+
	  				                           ' </div>'+
	  				                        '</div>'+
	  				                        '<br />'+
	  				                    '</div>'+
	  				                    '<div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                        	'<br />'+
	  				                            '<div class="col-xs-4"><label class="text">员工来源</label></div>'+
	  				                            '<div class="col-xs-8 c">'+
	  				                            	'<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4 "><label class="text">推荐导师 </label></div>'+
	  				                           ' <div class="col-xs-8 ">'+
	  				                                '<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4  "><label class="text">实习日期</label></div>'+
	  				                            '<div class="col-xs-8  ">'+
	  				                               ' <input id="practice" type="text" class="laydate-icon form-control layer-date">'+
	  				                            '</div>'+
	  				                       ' </div>'+
	  				                    '</div>'+
	  				                    '<div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4"><label class="text">入职日期 <label class="text-muted">*</label></label></div>'+
	  				                            '<div class="col-xs-8">'+
	  				                               ' <input id="input" type="text"  class="laydate-icon form-control layer-date">'+
	  				                           ' </div>'+
	  				                        '</div><br />'+
	  				                       ' <div class="col-xs-4">'+
	  				                            '<div class="col-xs-4 ">'+
	  				                                '<label class="text">转正日期 </label></div>'+
	  				                            '<div class="col-xs-8 ">'+
	  				                                '<input id="trans" type="text" class="laydate-icon form-control layer-date">'+
	  				                            '</div>'+
	  				                       ' </div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4  "><label class="text">离职日期</label></div>'+
	  				                            '<div class="col-xs-8  ">'+
	  				                                '<input id="hello" type="text"  class="laydate-icon form-control layer-date">'+
	  				                            '</div>'+
	  				                        '</div>'+
	  				                   ' </div>'+
	  				                    '<div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                        	'<br />'+
	  				                            '<div class="col-xs-4"><label class="text">员工状态</label></div>'+
	  				                            '<div class="col-xs-8">'+
	  				                            	'<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                       ' </div>'+
	  				                     '<br />'+
	  				                        '<div class="col-xs-4">'+
	  				                        	'<br />'+
	  				                            '<div class="col-xs-4 ">'+
	  				                                '<label class="text">应聘推荐 </label></div>'+
	  				                            '<div class="col-xs-8 ">'+
	  				                               ' <input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div><br />'+
	  				                        '<div class="col-xs-4">'+
	  				                            '<div class="col-xs-4  "><label class="text">紧急联络人</label></div>'+
	  				                            '<div class="col-xs-8  ">'+
	  				                                '<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div>'+
	  				                    '</div>'+
	  				                  '  <div class="row">'+
	  				                        '<div class="col-xs-4">'+
	  				                           ' <div class="col-xs-4"><label class="text">有何特长</label></div>'+
	  				                            '<div class="col-xs-8 "> '+
	  				                                '<input type="text" class="form-control">'+
	  				                            '</div>'+
	  				                        '</div>'+
	  				                    '</div>'+
	  				                 '</div>'+
	  				            '</div>'+
	  				       ' </div>'+
	  				    '</div>'+
	  				'</div>'+
	  				    '<div class="panel-body">'+
	  				    '<div class="panel panel-warning">'+
	  									  '<div class="panel-heading">家庭成员</div>'+
	  										  '<table class="table">'+
	  										  	'<tr>'+
	  										    	'<th>姓名</th><th>关系</th><th>年龄</th><th>职业</th><th>单位/地址</th><th>邮编</th><th>电话</th>'+
	  										    '</tr>'+
	  										   ' <tr>'+
	  										    	'<td>1发送到</td>'+
	  										    	'<td>1ddfg</td>'+
	  										    	'<td>1dfgdf</td>'+
	  										    	'<td>1hfghfgh</td>'+
	  										    	'<td>1ghjghj</td>'+
	  										    	'<td>ghjf1</td>'+
	  										    	'<td>1ghdfs</td>'+
	  										   ' </tr>'+
	  										  '</table>'+
	  									'</div>'+
	  							'<div class="panel panel-primary">'+
	  									
	  									  '<div class="panel-heading">教育程度</div>'+
	  									  '<table class="table">'+
	  									  	'<tr>'+
	  									    	'<th>学校</th><th>就读时间</th><th>专业</th><th>学历</th><th>学习方式</th><th>毕业/肆业</th>'+
	  									    '</tr>'+
	  									    '<tr>'+
	  									    	'<td>1发送到</td>'+
	  									    	'<td>1ddfg</td>'+
	  									    	'<td>1dfgdf</td>'+
	  									    	'<td>1hfghfgh</td>'+
	  									    	'<td>1ghjghj</td>'+
	  									    	'<td>ghjf1</td>'+
	  									   ' </tr>'+
	  									  '</table>'+
	  									'</div>'+
	  									'<div class="panel panel-success">'+
	  									  '<div class="panel-heading">工作经历</div>'+
	  									  '<table class="table">'+
	  									  	'<tr>'+
	  									    	'<th>工作(服务)单位</th><th>起止时间</th><th>担任职务</th><th>月薪</th><th>地址/电话</th><th>离职原因</th>'+
	  									    '</tr>'+
	  									    '<tr>'+
	  									    	'<td>1发送到</td>'+
	  									    	'<td>1ddfg</td>'+
	  									    	'<td>1dfgdf</td>'+
	  									    	'<td>1hfghfgh</td>'+
	  									    	'<td>1ghjghj</td>'+
	  									    	'<td>1ghjghj</td>'+
	  									    '</tr>'+
	  									  '</table>'+
	  									'</div>'+
	  								'</div>'
	  					$('#content-main').html(aa)
	  					console.log("5 进入")
	$('input[type="text"]').css({'border':'1px solid #ccc'})
	$('input[type="text"]').attr({"readonly":"readonly"})
	$('#pic').css({"position":"relative"}).children().eq(0).css({"width":"200px","height":"300px","border":"1px solid red","overflow":"hidden","position":"absolute"})
	  break;
	  				}else{
	  					console.log("else 进入")
	  				}
	  				
	  			}
	  		}
		 })
	}
	console.log("xxxx6" + JSON.stringify(transition))
}


