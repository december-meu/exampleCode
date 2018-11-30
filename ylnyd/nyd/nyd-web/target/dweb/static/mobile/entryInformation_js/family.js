SPA_RESOLVE_INIT = function(transition){
	var educationBg={
			addHtml:function(){
				$('#content').html(
						'<header class="bar bar-nav">'+
						  '<button class="button button-link button-nav pull-left">'+
						    '<span class="icon icon-left"></span>'+
						    '返回'+
						  '</button>'+
						  '<h1 class="title" style="font-size: 1rem">家庭状况</h1>'+
						'</header>'+
						'<div class="content">'+
						  '<div class="content-block">'+
					        '<p><a href="#" class="button button-round button-fill button-big open-about">添加家庭成员</a></p>'+
					      '</div>'+
					      '<div class="list-block media-list">'+
					        '<ul class="famList">'+
					          
					        '</ul>'+
					      '</div>'+
					     
						'</div>'+
						
						
						//添加信息框
						'<div class="popup popup-about">'+
						  '<div class="content-block">'+
							  '<div class="list-block">'+
								  '<form id="family">'+
								    '<ul>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">家庭成员</div>'+
								            '<div class="item-input">'+
								              '<input type="text" placeholder="必填" name="Name">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-gender"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">称谓(关系)</div>'+
								           ' <div class="item-input">'+
								              /*'<select style="margin-left: 37%;">'+
								                '<option class="default" name="relationship.id">-请选择-</option>'+
								                '<option>父亲</option>'+
								                '<option>母亲</option>'+
								                '<option>兄弟</option>'+
								                '<option>姐妹</option>'+
								                '<option>兄妹</option>'+
								                '<option>姐弟</option>'+
								              '</select>'+*/
								              '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-relationship" class="form-control customSelect" id="relationship" name="relationship.id" value="">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-gender"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">政治面貌</div>'+
								              '<div class="item-input">'+
									              /*'<select style="margin-left: 37%;" name="political.id">'+
									                '<option class="default">-请选择-</option>'+
									                '<option>团员</option>'+
									                '<option>党员</option>'+
									                '<option>群众</option>'+
									              '</select>'+*/
								              '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-political" class="form-control customSelect" id="political" name="political.id" placeholder="政治面貌" value="" msg="政治面貌">'+
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
								            '<div class="item-title label">职务(职业)</div>'+
								            '<div class="item-input">'+
								              '<input type="text" placeholder="必填" name="job">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">电话</div>'+
								            '<div class="item-input">'+
								              '<input type="text" placeholder="必填" name="tel">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">年龄</div>'+
								            '<div class="item-input">'+
								              '<input type="text" placeholder="必填" name="age">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">邮编</div>'+
								            '<div class="item-input">'+
								              '<input type="text" placeholder="选填" name="zipCode">'+
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
							      '<div class="col-50"><a href="#" class="button button-fill button-big button-default familyBtn">保存</a></div>'+
							    '</div>'+
							  '</div>'+
						  '</div>'+
						'</div>'
		
				);
				
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
				$('#content').off('click','.familyBtn');
				$('#content').on('click','.familyBtn',function(){
					var inp=$('#family input');
					var sel=$('#family select');
					for(var i=0;i<inp.length;i++){
						if(inp.eq(i).val()==''&&inp.eq(i).attr('placeholder')=="必填"){
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
					fam=true;
					var ff=formtoJsonTrim('family');
					ff.empId=employeeId;
					$.ajax({
					type:'post',
					url:webBasePath+'hr/entry/addRapport/m',
					data:ff,
					success:function(data){
						$.toast('数据上传成功');
						$('input').val('');
						$('textarea').val('');
					},
					error:function(data){
						$.toast('数据上传失败');
					}
				})
			         ff.relationship=$('#relationship-Select').val();
					ff.political=$('#political-Select').val();
					$('.famList').append(
						  '<li>'+
							'<div class="item-content">'+
				              '<div class="item-inner">'+
				                '<div class="item-title-row">'+
				                  '<div class="item-title" style="font-weight: 500;color: #9e9e9e;font-size: 0.8rem;">'+ff.Name+'('+ff["relationship"]+')</div>'+
				                  '<div class="item-after" style="font-weight: 500;color: #9e9e9e;font-size: 0.8rem;">'+ff["political"]+'</div>'+
				                '</div>'+
				                '<div class="item-subtitle" style="font-size:0.9rem;margin: 1% 0;">'+ff.company+'</div>'+
				                '<div class="item-subtitle" style="color: #9e9e9e">'+ff["job"]+' | '+ff["tel"]+'</div>'+
				              '</div>'+
				             '</div>'+
				          '</li>'
					    )
					arrayFamily.push(ff);
					var arr=[];
					for(var i=0;i<arrayFamily.length;i++){
						arr.push(JSON.stringify(arrayFamily[i]))
					}
					ff=arr.join('|');
					console.log(ff);
					
					localStorage.setItem("family", ff);
					$.closeModal('.popup-about');
				})
			},
			showData:function(){
				 if(localStorage.getItem('family')){
					 var rr=localStorage.getItem('family');
					  rr=rr.split('|');
					 var arr=[];
					 for(var i=0;i<rr.length;i++){
						 arr.push(JSON.parse(rr[i]));
					 }
					 for(var i=0;i<arr.length;i++){
						 $('.famList').append(
								  '<li>'+
									'<div class="item-content">'+
						              '<div class="item-inner">'+
						                '<div class="item-title-row">'+
						                  '<div class="item-title" style="font-weight: 500;color: #9e9e9e;font-size: 0.8rem;">'+arr[i].Name+'('+arr[i]["relationship"]+')</div>'+
						                '</div>'+
						                '<div class="item-subtitle" style="font-size:0.9rem;margin: 1% 0;">'+arr[i]["company"]+'</div>'+
						                '<div class="item-subtitle" style="color: #9e9e9e">'+arr[i]["job"]+' | '+arr[i]["tel"]+'</div>'+
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