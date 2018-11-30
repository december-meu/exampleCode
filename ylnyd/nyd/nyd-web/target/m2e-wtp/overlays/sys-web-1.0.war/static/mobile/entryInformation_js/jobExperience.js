SPA_RESOLVE_INIT = function(transition){
	var educationBg={
			addHtml:function(){
				$('#content').html(
						'<header class="bar bar-nav">'+
						  '<button class="button button-link button-nav pull-left">'+
						    '<span class="icon icon-left"></span>'+
						    '返回'+
						  '</button>'+
						  '<h1 class="title" style="font-size: 1rem">工作经历</h1>'+
						'</header>'+
						'<div class="content">'+
						  '<div class="content-block">'+
					        '<p><a href="#" class="button button-round button-fill button-big open-about">添加工作经历</a></p>'+
					      '</div>'+
					      '<div class="list-block media-list">'+
					        '<ul class="jobList">'+
					          
					        '</ul>'+
					      '</div>'+
						'</div>'+
						
						
						//添加信息框
						'<div class="popup popup-about">'+
						  '<div class="content-block">'+
							  '<div class="list-block">'+
							     '<form id="jobe">'+
								    '<ul>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-calendar"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">开始时间</div>'+
								            '<div class="item-input">'+
								              '<input type="text" name="beginDate" id="birthdaydate8" class="" placeholder="必填"/>'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-calendar"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">截止时间</div>'+
								            '<div class="item-input">'+
								              '<input type="text" name="endDate" id="birthdaydate9" class="" placeholder="必填"/>'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">工作单位</div>'+
								            '<div class="item-input">'+
								              '<input type="text" placeholder="必填" name="company">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">工作地点</div>'+
								            '<div class="item-input">'+
								              '<textarea class="autoo" rows="1" placeholder="必填" name="comAddress"></textarea>'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">担任职务</div>'+
								            '<div class="item-input">'+
								              '<input type="text" placeholder="必填" name="duty">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">工作内容</div>'+
								            '<div class="item-input">'+
								            '<textarea class="autoo" rows="1" placeholder="必填" name="remark"></textarea>'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">月薪</div>'+
								            '<div class="item-input">'+
								              '<input type="text" placeholder="必填" name="salary">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">离职原因</div>'+
								            '<div class="item-input">'+
								            '<textarea class="autoo" rows="1" placeholder="必填" name="reasonLeave"></textarea>'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								    '</ul>'+
							    '</form>'+
							  '</div>'+
							  '<div class="content-block">'+
							    '<div class="row">'+
							      '<div class="col-50"><a href="#" class="close-popup button button-big button-fill button-danger">取消</a></div>'+
							      '<div class="col-50"><a href="#" class="button button-fill button-big button-default jobBtn">保存</a></div>'+
							    '</div>'+
							  '</div>'+
						  '</div>'+
						'</div>'
		
				);
				textareaAutoHeight('.autoo');
				tt=currentTime();
				laydate.render({
					  elem: '#birthdaydate8', //指定元素
				      calendar:true
					});
				   laydate.render({
						  elem: '#birthdaydate9', //指定元素
					      calendar:true
						});
				$('#content').on('click','.open-about', function () {
					  $.popup('.popup-about');
					});
				this.goBack();
				this.saveDatas();
				this.showData();
			},
			goBack:function(){
				$('#content').off('click','.pull-left');
				$('#content').on('click','.pull-left',function(){
					window.location.hash="#/entryPage"
				})
			},
			saveDatas:function(){
				var that=this;
				$('#content').off('click','.jobBtn');
				$('#content').on('click','.jobBtn',function(){
					var inp=$('#jobe input');
					var txt=$('#jobe textarea');
					for(var i=0;i<inp.length;i++){
						if(inp.eq(i).val()==''){
							$.toast('请完善信息');
							return
						}
					};
					for(var i=0;i<txt.length;i++){
						if(txt.eq(i).val()==''){
							$.toast('请完善信息');
							return
						}
					};
		
					job=true;
					var jj=formtoJsonTrim('jobe');
					jj.empId=employeeId;
					console.log(jj);
					$.ajax({
					type:'post',
					url:webBasePath+'hr/entry/addExperience/m',
					data:jj,
					success:function(data){
						$.toast('数据上传成功');
						$('input').val('');
						$('textarea').val('');
					},
					error:function(data){
						$.toast('数据上传失败');
					}
				})
					$('.jobList').append(
						  '<li>'+
							'<div class="item-content">'+
				              '<div class="item-inner">'+
				                '<div class="item-title-row">'+
				                  '<div class="item-title" style="font-weight: 500;color: #9e9e9e;font-size: 0.8rem;">'+jj.beginDate+'一一'+jj.endDate+'</div>'+
				                '</div>'+
				                '<div class="item-subtitle" style="font-size:0.9rem;margin: 1% 0;">'+jj.company+'</div>'+
				                '<div class="item-subtitle" style="color: #9e9e9e">'+jj.duty+' | '+jj.salary+'</div>'+
				              '</div>'+
				             '</div>'+
				          '</li>'
					    )
					arrayJob.push(jj);
					var arr=[];
					for(var i=0;i<arrayJob.length;i++){
						arr.push(JSON.stringify(arrayJob[i]))
					}
					jj=arr.join('|');
					localStorage.setItem("job", jj);
					$.closeModal('.popup-about');
				})
			},
			showData:function(){
				 if(localStorage.getItem('job')){
					 var rr=localStorage.getItem('job');
					 rr=rr.split('|');
					 var arr=[];
					 for(var i=0;i<rr.length;i++){
						 arr.push(JSON.parse(rr[i]));
					 }
					 for(var i=0;i<arr.length;i++){
						 $('.jobList').append(
								  '<li>'+
									'<div class="item-content">'+
						              '<div class="item-inner">'+
						                '<div class="item-title-row">'+
						                  '<div class="item-title" style="font-weight: 500;color: #9e9e9e;font-size: 0.8rem;">'+arr[i].beginDate+'一一'+arr[i].endDate+'</div>'+
						                '</div>'+
						                '<div class="item-subtitle" style="font-size:0.9rem;margin: 1% 0;">'+arr[i].company+'</div>'+
						                '<div class="item-subtitle" style="color: #9e9e9e">'+arr[i].duty+' | '+arr[i].salary+'</div>'+
						              '</div>'+
						             '</div>'+
						          '</li>'
							    )
					 }
				 }
				
			}
	}
	educationBg.addHtml();
}