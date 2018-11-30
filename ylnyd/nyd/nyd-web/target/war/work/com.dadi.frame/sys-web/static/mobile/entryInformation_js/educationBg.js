SPA_RESOLVE_INIT = function(transition){

	var educationBg={
			addHtml:function(){
				$('#content').html(
						'<header class="bar bar-nav">'+
						  '<button class="button button-link button-nav pull-left">'+
						    '<span class="icon icon-left"></span>'+
						    '返回'+
						  '</button>'+
						  '<h1 class="title" style="font-size: 1rem">教育背景</h1>'+
						'</header>'+
						'<div class="content">'+
						  '<div class="content-block">'+
					        '<p><a href="#" class="button button-round button-fill button-big open-about">添加教育背景</a></p>'+
					      '</div>'+
					      '<div class="list-block media-list">'+
					        '<ul class="inforList">'+
					          
					        '</ul>'+
					      '</div>'+
						'</div>'+
						
						
						//添加信息框
						'<div class="popup popup-about">'+
						  '<div class="content-block">'+
							  '<div class="list-block">'+
							  	'<form id="edu">'+
								    '<ul>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-calendar"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">就读开始时间</div>'+
								            '<div class="item-input">'+
								              '<input type="text" id="birthdaydate6" class="" name="eduBeginDate" placeholder="必填"/>'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-calendar"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">就读结束时间</div>'+
								            '<div class="item-input">'+
								              '<input type="text" name="eduEndDate" id="birthdaydate7" class="" placeholder="必填"/>'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">毕业学校</div>'+
								            '<div class="item-input">'+
								              '<input type="text" name="school" placeholder="必填">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">专业</div>'+
								            '<div class="item-input">'+
								              '<input type="text" placeholder="必填" name="profession">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-gender"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">学历</div>'+
								           ' <div class="item-input">'+
								              /*'<select style="margin-left: 37%;" name="edu.id">'+
								                '<option class="default">-请选择-</option>'+
								                '<option>大专</option>'+
								                '<option>本科</option>'+
								                '<option>研究生</option>'+
								              '</select>'+*/
								              '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-edu" class="form-control customSelect" id="edu" name="edu.id" placeholder="学历" value="" msg="学历">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-gender"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">学位</div>'+
								           ' <div class="item-input">'+
								              /*'<select style="margin-left: 37%;" name="degree.id">'+
								                '<option class="default">-请选择-</option>'+
								                '<option>大专</option>'+
								                '<option>本科</option>'+
								                '<option>研究生</option>'+
								              '</select>'+*/
								              '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-degree" class="form-control customSelect" id="degree" name="degree.id" placeholder="学位" value="" msg="学位">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-gender"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">学习方式</div>'+
								           ' <div class="item-input">'+
								              /*'<select style="margin-left: 37%;" name="learn.id">'+
								                '<option class="default">-请选择-</option>'+
								                '<option>大专</option>'+
								                '<option>本科</option>'+
								                '<option>研究生</option>'+
								              '</select>'+*/
								              '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-learn" class="form-control customSelect" id="learn" name="learn.id" placeholder="学习方式" value="" msg="学习方式">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-gender"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">毕业/肄业</div>'+
								           ' <div class="item-input">'+
								              /*'<select style="margin-left: 37%;" name="graduate.id">'+
								                '<option class="default">-请选择-</option>'+
								                '<option>毕业</option>'+
								                '<option>肄业</option>'+
								              '</select>'+*/
								              '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-graduate" class="form-control customSelect" id="graduate" name="graduate.id" value="">'+
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
							      '<div class="col-50"><a href="#" class="button button-fill button-big button-default eductionBtn">保存</a></div>'+
							    '</div>'+
							  '</div>'+
						  '</div>'+
						'</div>'
		
				);
				tt=currentTime();
				laydate.render({
					  elem: '#birthdaydate6', //指定元素
				      calendar:true
					});
				   laydate.render({
						  elem: '#birthdaydate7', //指定元素
					      calendar:true
						});
				$('#content').on('click','.open-about', function () {
					  $.popup('.popup-about');
					});
				this.goBack();
				this.saveDatas();
				this.showData();
				selectForm('.customSelect');
			},
			goBack:function(){
				$('#content').off('click','.pull-left');
				$('#content').on('click','.pull-left',function(){
					window.location.hash="#/entryPage"
				})
			},
			saveDatas:function(){
				var that=this;
				$('#content').off('click','.eductionBtn');
				$('#content').on('click','.eductionBtn',function(){
					var inp=$('#edu input');
					var sel=$('#edu select');
					for(var i=0;i<inp.length;i++){
						if(inp.eq(i).val()==''){
							$.toast('请完善信息');
							return
						}
					};
					for(var i=0;i<sel.length;i++){
						if(sel.eq(i).val()=='-请选择-'){
							$.toast('请完善信息');
							return
						}
					};
					educat=true;
					var ee=formtoJsonTrim('edu');
					ee.empId=employeeId;
					$.ajax({
					type:'post',
					url:webBasePath+'hr/entry/addEdu/m',
					data:ee,
					success:function(data){
						$.toast('数据上传成功');
						$('input').val('');
						$('textarea').val('');
					},
					error:function(data){
						$.toast('数据上传失败');
					}
				})
				 ee.eduName=$('#edu-Select').val();
					$('.inforList').append(
						  '<li>'+
							'<div class="item-content">'+
				              '<div class="item-inner">'+
				                '<div class="item-title-row">'+
				                  '<div class="item-title" style="font-weight: 500;color: #9e9e9e;font-size: 0.8rem;">'+ee.eduBeginDate+'一一'+ee.eduEndDate+'</div>'+
				                '</div>'+
				                '<div class="item-subtitle" style="font-size:0.9rem;margin: 1% 0;">'+ee.school+'</div>'+
				                '<div class="item-subtitle" style="color: #9e9e9e">'+ee["eduName"]+'|'+ee["profession"]+'</div>'+
				              '</div>'+
				             '</div>'+
				          '</li>'
					    )
					arrayEdu.push(ee);
					console.log(arrayEdu);
					var arr=[];
					for(var i=0;i<arrayEdu.length;i++){
						arr.push(JSON.stringify(arrayEdu[i]))
					}
					ee=arr.join('|');
					console.log(ee);
					
					localStorage.setItem("education", ee);
					$.closeModal('.popup-about');
				})
			},
			showData:function(){
				 if(localStorage.getItem('education')){
					 var rr=localStorage.getItem('education');
					 console.log(rr);
					 rr=rr.split('|');
					 var arr=[];
					 for(var i=0;i<rr.length;i++){
						 arr.push(JSON.parse(rr[i]));
					 }
					 console.log(arr);
					 for(var i=0;i<arr.length;i++){
						 $('.inforList').append(
								  '<li>'+
									'<div class="item-content">'+
						              '<div class="item-inner">'+
						                '<div class="item-title-row">'+
						                  '<div class="item-title" style="font-weight: 500;color: #9e9e9e;font-size: 0.8rem;">'+arr[i].eduBeginDate+'一一'+arr[i].eduEndDate+'</div>'+
						                '</div>'+
						                '<div class="item-subtitle" style="font-size:0.9rem;margin: 1% 0;">'+arr[i].school+'</div>'+
						                '<div class="item-subtitle" style="color: #9e9e9e">'+arr[i]["eduName"]+' | '+arr[i]["profession"]+'</div>'+
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