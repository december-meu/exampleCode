SPA_RESOLVE_INIT = function(transition){
	var educationBg={
			addHtml:function(){
				$('#content').html(
						'<header class="bar bar-nav">'+
						  '<button class="button button-link button-nav pull-left">'+
						    '<span class="icon icon-left"></span>'+
						    '返回'+
						  '</button>'+
						  '<h1 class="title" style="font-size: 1rem">职称证书</h1>'+
						'</header>'+
						'<div class="content">'+
						  '<div class="content-block">'+
						  	'<div class="row">'+
						  	  '<div class="col-50">'+
						        '<p><a href="#" class="button button-round button-fill button-big open-title">添加职称</a></p>'+
					          '</div>'+
					          '<div class="col-50">'+
						        '<p><a href="#" class="button button-round button-fill button-big open-certificate">添加证书</a></p>'+
					          '</div>'+
					        '</div>'+
					      '</div>'+
					      '<div class="content-block-title">职称</div>'+
					      '<div class="list-block media-list">'+
					        '<ul class="zhiList">'+
					          
					        '</ul>'+
					      '</div>'+
					      '<div class="content-block-title">证书</div>'+
					      '<div class="list-block media-list">'+
					        '<ul class="zhengList">'+
					          
					        '</ul>'+
					      '</div>'+
						'</div>'+
						//添加职称
						'<div class="popup popup-title">'+
						  '<div class="content-block">'+
							  '<div class="list-block">'+
							  	'<form id="zhic">'+
								    '<ul>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-calendar"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">评定时间</div>'+
								            '<div class="item-input">'+
								              '<input type="text" name="judgeDate" id="birthdaydate4" class="" placeholder="必填"/>'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">名称</div>'+
								            '<div class="item-input">'+
								              '<input type="text" placeholder="必填" name="name">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">评定单位</div>'+
								            '<div class="item-input">'+
								              '<input type="text" placeholder="必填" name="unit">'+
								            '</div>'+
								          '</div>'+
								        '</div>'+
								      '</li>'+
								      '<li>'+
								        '<div class="item-content">'+
								          '<div class="item-media"><i class="icon icon-form-gender"></i></div>'+
								          '<div class="item-inner">'+
								            '<div class="item-title label">级别</div>'+
								           ' <div class="item-input">'+
								              '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-titleGrade" class="form-control customSelect" id="grade" name="grade.id" placeholder="级别" value="" msg="级别">'+
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
							      '<div class="col-50"><a href="#" class="button button-fill button-big button-default zhicheng">保存</a></div>'+
							    '</div>'+
							  '</div>'+
						  '</div>'+
						'</div>'+
						
						//添加证书
						'<div class="popup popup-certificate">'+
						  '<div class="content-block">'+
							  '<div class="list-block">'+
							  '<form id="zhengs">'+
							    '<ul>'+
							      '<li>'+
							        '<div class="item-content">'+
							          '<div class="item-media"><i class="icon icon-form-calendar"></i></div>'+
							          '<div class="item-inner">'+
							            '<div class="item-title label">颁发时间</div>'+
							            '<div class="item-input">'+
							              '<input type="text" name="awardDate" id="birthdaydate5" class="" placeholder="必填"/>'+
							            '</div>'+
							          '</div>'+
							        '</div>'+
							      '</li>'+
							      '<li>'+
							        '<div class="item-content">'+
							          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
							          '<div class="item-inner">'+
							            '<div class="item-title label">名称</div>'+
							            '<div class="item-input">'+
							              '<input type="text" placeholder="必填" name="name">'+
							            '</div>'+
							          '</div>'+
							        '</div>'+
							      '</li>'+
							      '<li>'+
							        '<div class="item-content">'+
							          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
							          '<div class="item-inner">'+
							            '<div class="item-title label">证书序列号</div>'+
							            '<div class="item-input">'+
							              '<input type="text" placeholder="必填" name="number">'+
							            '</div>'+
							          '</div>'+
							        '</div>'+
							      '</li>'+
							      '<li>'+
							        '<div class="item-content">'+
							          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
							          '<div class="item-inner">'+
							            '<div class="item-title label">颁发机构</div>'+
							            '<div class="item-input">'+
							              '<input type="text" placeholder="必填" name="unit">'+
							            '</div>'+
							          '</div>'+
							        '</div>'+
							      '</li>'+
							      '<li>'+
							        '<div class="item-content">'+
							          '<div class="item-media"><i class="icon icon-form-gender"></i></div>'+
							          '<div class="item-inner">'+
							            '<div class="item-title label">级别</div>'+
							           ' <div class="item-input">'+
							               '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-certificateGrade" class="form-control customSelect" id="certificateGrade" name="grade.id" placeholder="级别" value="" msg="级别">'+
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
							      '<div class="col-50"><a href="#" class="button button-fill button-big button-default zhengshu">保存</a></div>'+
							    '</div>'+
							  '</div>'+
						  '</div>'+
						'</div>'
		
				);
				tt=currentTime();
				 laydate.render({
					  elem: '#birthdaydate4', //指定元素
				      calendar:true
					});
				   laydate.render({
						  elem: '#birthdaydate5', //指定元素
					      calendar:true
						});
				$('#content').on('click','.open-title', function () {
					  $.popup('.popup-title');
					});
				$('#content').on('click','.open-certificate', function () {
					$.popup('.popup-certificate');
				});
				this.goBack();
				this.saveZhiDatas();
				this.showZhiData();
				this.saveZhengDatas();
				this.showZhengData();
				selectForm('.customSelect');
			},
			goBack:function(){
				$('#content').on('click','.pull-left',function(){
					window.location.hash="#/entryPage"
				})
			},
			saveZhiDatas:function(){
				var that=this;
				$('#content').off('click','.zhicheng');
				$('#content').on('click','.zhicheng',function(){
					var inp=$('#zhic input');
					var sel=$('#zhic select');
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
					certif=true;
					var cc=formtoJsonTrim('zhic');
					cc.empId=employeeId;
					console.log(cc);
					$.ajax({
					type:'post',
					url:webBasePath+'hr/entry/addTitle/m',
					data:cc,
					success:function(data){
						$.toast('数据上传成功');
						$('input').val('');
						$('textarea').val('');
					},
					error:function(data){
						$.toast('数据上传失败');
					}
				     })
					$('.zhiList').append(
						  '<li>'+
							'<div class="item-content">'+
				              '<div class="item-inner">'+
				                '<div class="item-title-row">'+
				                  '<div class="item-title" style="font-weight: 500;color: #9e9e9e;font-size: 0.8rem;">'+cc.judgeDate+'</div>'+
				                '</div>'+
				                '<div class="item-subtitle" style="font-size:0.9rem;margin: 1% 0;">'+cc.name+'</div>'+
				                '<div class="item-subtitle" style="color: #9e9e9e">'+cc["unit"]+'</div>'+
				              '</div>'+
				             '</div>'+
				          '</li>'
					    )
					arrayCert1.push(cc);
					var arr=[];
					for(var i=0;i<arrayCert1.length;i++){
						arr.push(JSON.stringify(arrayCert1[i]))
					}
					aa=arr.join('|');
					localStorage.setItem("certificate1", aa);
//					console.log(aa);
					$.closeModal('.popup-title');
				})
			},
			saveZhengDatas:function(){
				var that=this;
				$('#content').off('click','.zhengshu');
				$('#content').on('click','.zhengshu',function(){
					var inp=$('#zhengs input');
					var sel=$('#zhengs select');
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
					certif=true;
					var zz=formtoJsonTrim('zhengs');
					zz.empId=employeeId;
					$.ajax({
					type:'post',
					url:webBasePath+'hr/entry/addCertificate/m',
					data:zz,
					success:function(data){
						$.toast('数据上传成功');
						$('input').val('');
						$('textarea').val('');
					},
					error:function(data){
						$.toast('数据上传失败');
					}
				    })
				
					$('.zhengList').append(
						  '<li>'+
							'<div class="item-content">'+
				              '<div class="item-inner">'+
				                '<div class="item-title-row">'+
				                  '<div class="item-title" style="font-weight: 500;color: #9e9e9e;font-size: 0.8rem;">'+zz.awardDate+'</div>'+
				                '</div>'+
				                '<div class="item-subtitle" style="font-size:0.9rem;margin: 1% 0;">'+zz.name+'</div>'+
				                '<div class="item-subtitle" style="color: #9e9e9e">'+zz["unit"]+'</div>'+
				              '</div>'+
				             '</div>'+
				          '</li>'
					    )
					arrayCert2.push(zz);
					var arr=[];
					for(var i=0;i<arrayCert2.length;i++){
						arr.push(JSON.stringify(arrayCert2[i]))
					}
					bb=arr.join('|');
					localStorage.setItem("certificate2", bb);
					$.closeModal('.popup-certificate');
				})
			},
			showZhiData:function(){
				 if(localStorage.getItem('certificate1')){
					 var rr=localStorage.getItem('certificate1');
					 rr=rr.split('|');
					 var arr=[];
					 for(var i=0;i<rr.length;i++){
						 arr.push(JSON.parse(rr[i]));
					 }
					 console.log(rr);
					 for(var i=0;i<arr.length;i++){
						 $('.zhiList').append(
								  '<li>'+
									'<div class="item-content">'+
						              '<div class="item-inner">'+
						                '<div class="item-title-row">'+
						                  '<div class="item-title" style="font-weight: 500;color: #9e9e9e;font-size: 0.8rem;">'+arr[i].judgeDate+'</div>'+
						                '</div>'+
						                '<div class="item-subtitle" style="font-size:0.9rem;margin: 1% 0;">'+arr[i].name+'</div>'+
						                '<div class="item-subtitle" style="color: #9e9e9e">'+arr[i]["unit"]+'</div>'+
						              '</div>'+
						             '</div>'+
						          '</li>'
							    )
					 }
				 }
				
			},
			showZhengData:function(){
				 if(localStorage.getItem('certificate2')){
					 var rr=localStorage.getItem('certificate2');
					 rr=rr.split('|');
					 var arr=[];
					 for(var i=0;i<rr.length;i++){
						 arr.push(JSON.parse(rr[i]));
					 }
					 console.log(rr);
					 for(var i=0;i<arr.length;i++){
						 $('.zhengList').append(
								  '<li>'+
									'<div class="item-content">'+
						              '<div class="item-inner">'+
						                '<div class="item-title-row">'+
						                  '<div class="item-title" style="font-weight: 500;color: #9e9e9e;font-size: 0.8rem;">'+arr[i].awardDate+'</div>'+
						                '</div>'+
						                '<div class="item-subtitle" style="font-size:0.9rem;margin: 1% 0;">'+arr[i].name+'</div>'+
						                '<div class="item-subtitle" style="color: #9e9e9e">'+arr[i]["unit"]+'</div>'+
						              '</div>'+
						             '</div>'+
						          '</li>'
							    )
					 }
				 }
				
			},

	}
	educationBg.addHtml();
}