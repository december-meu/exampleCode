SPA_RESOLVE_INIT = function(transition){
	var basicInformation={
			addHtml:function(){
				$('#content').html(
						'<header class="bar bar-nav">'+
						  '<button class="button button-link button-nav pull-left">'+
						    '<span class="icon icon-left"></span>'+
						    '返回'+
						  '</button>'+
						  '<h1 class="title" style="font-size: 1rem">个人信息</h1>'+
						'</header>'+
						'<div class="content">'+
						  '<div class="list-block">'+
						  '<form class="" id="formm" role="form">'+
						    '<ul>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-medi a"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">姓名</div>'+
						            '<div class="item-input">'+
						              '<input type="text" class="tet addData" name="user.username" placeholder="必填">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-calendar"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">出生日期</div>'+
						            '<div class="item-input">'+
						              '<input type="text" name="birthday" id="birthdaydate1" class="tet addData" placeholder="必填"/>'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-email"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">邮箱</div>'+
						            '<div class="item-input">'+
						              '<input type="email" class="tet addData" name="user.email" placeholder="E-mail">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">QQ</div>'+
						            '<div class="item-input">'+
						              '<input type="number" class="tet addData" name="qqCode" placeholder="必填">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-gender"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">性别</div>'+
						           ' <div class="item-input">'+
						              '<select class="addData" style="margin-left: 87%;" name="user.sex">'+
//						                '<option class="default">-请选择-</option>'+
						                '<option>男</option>'+
						                '<option>女</option>'+
						              '</select>'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-gender"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">婚姻状况</div>'+
						           ' <div class="item-input">'+
						/*              '<select class="addData" style="margin-left: 42%;" name="maritalStatus">'+
						                '<option class="default">-请选择-</option>'+
						                '<option>已婚</option>'+
						                '<option>未婚</option>'+
						                '<option>离异</option>'+
						              '</select>'+*/
						              '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-marital" class="form-control addData customSelect" id="marital" name="maritalStatus.id" placeholder="婚姻状况" value="" msg="">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">民族</div>'+
						            '<div class="item-input">'+
						                '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-nation" class="form-control addData customSelect" id="nation" name="nation.id">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">身份证号</div>'+
						            '<div class="item-input">'+
						              '<input class="tet addData" type="text" placeholder="必填" name="user.idCard">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-gender"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">政治面貌</div>'+
						           ' <div class="item-input">'+
						                '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-political" class="form-control addData customSelect" id="political" name="political.id" placeholder="政治面貌" value="" msg="政治面貌">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">体重</div>'+
						            '<div class="item-input">'+
						              '<input class="tet addData" type="text" placeholder="必填" name="weight">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">星座</div>'+
						            '<div class="item-input">'+
						            '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-constellation" class="form-control addData customSelect" id="constellation" name="constellation.id" placeholder="" value="" msg="">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">鞋码</div>'+
						            '<div class="item-input">'+
						              '<input class="tet addData" type="text" placeholder="必填" name="shoesCode">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">身高</div>'+
						            '<div class="item-input">'+
						              '<input class="tet addData" type="text" placeholder="必填" name="height">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">腰围</div>'+
						            '<div class="item-input">'+
						              '<input class="tet addData" type="text" placeholder="必填" name="waistline">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">血型</div>'+
						            '<div class="item-input">'+
						            '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-bloodType" class="form-control addData customSelect" id="bloodType" name="bloodType.id" placeholder="" value="" msg="">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-email"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">籍贯</div>'+
						            '<div class="item-input">'+
						            	'<textarea class="autoo addData" rows="1" placeholder="必填" name="nativePlace"></textarea>'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-email"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">户籍地址</div>'+
						            '<div class="item-input">'+
						            	'<textarea class="autoo addData" rows="1" placeholder="必填" name="censusAddress"></textarea>'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-email"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">现住址</div>'+
						            '<div class="item-input">'+
						            	'<textarea class="autoo addData" rows="1" placeholder="必填" name="homeAddress"></textarea>'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-email"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">紧急联系人</div>'+
						            '<div class="item-input">'+
						            	'<input class="tet addData" type="text" placeholder="必填" name="emergencyPerson">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">紧急联系电话</div>'+
						            '<div class="item-input">'+
						              '<input class="tet addData" type="number"  placeholder="必填" name="emergencyTel">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">开户银行</div>'+
						            '<div class="item-input">'+
						              '<input class="tet addData" type="text"  placeholder="选填" name="bank">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">银行卡号</div>'+
						            '<div class="item-input">'+
						              '<input type="number" class="tet addData"  placeholder="选填" name="bankAccount">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">人才中心档案号</div>'+
						            '<div class="item-input">'+
						              '<input type="text" class="tet addData"  placeholder="选填" name="archivesGov">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-email"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">档案托管地</div>'+
						            '<div class="item-input">'+
						            	'<textarea class="autoo addData" rows="1" placeholder="必填" name="recordAddress"></textarea>'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-calendar"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">入职时间</div>'+
						            '<div class="item-input">'+
						              '<input type="text" name="entryDate" id="birthdaydate2" class="tet addData" placeholder="必填"/>'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">电话号码</div>'+
						            '<div class="item-input">'+
						              '<input type="number" class="tet addData" placeholder="必填" name="user.telephone">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-calendar"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">参加工作时间</div>'+
						            '<div class="item-input">'+
						              '<input type="text" name="workDate" id="birthdaydate3" class="tet addData" placeholder="必填"/>'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      /*'<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">语言能力</div>'+
						            '<div class="item-input">'+
						            '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-languageAbility" class="form-control addData customSelect" id="languageAbility" name="type-languageAbility" placeholder="" value="" msg="">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">计算机能力</div>'+
						            '<div class="item-input">'+
						            '<input type="text" data-url="'+webBasePath+'hr/dict/list/all/m" data-textField="name" data-valueField="id" data-parameter="typeCode:type-computerAbility" class="form-control addData customSelect" id="computerAbility" name="type-computerAbility" placeholder="" value="" msg="">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+*/
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">爱好</div>'+
						            '<div class="item-input">'+
						            '<textarea class="autoo addData" name="hobby" rows="1" placeholder="必填"></textarea>'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">是否独生子女</div>'+
						            '<div class="item-input">'+
						            '<select class="addData " style="margin-left: 40%;text-align-last: center;" name="yonOneChild">'+
						                '<option class="default">-请选择-</option>'+
						                '<option value = "0">是</option>'+
						                '<option value = "1">否</option>'+
						                '</select>'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">是否有房</div>'+
						            '<div class="item-input">'+
						            '<select class="addData tet" style="margin-left: 40%;text-align-last: center" name="yonHasHouse">'+
						                '<option class="default">-请选择-</option>'+
						                '<option value = "0">是</option>'+
						                '<option value = "1">否</option>'+
						                '</select>'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">是否首套房</div>'+
						            '<div class="item-input">'+
						            '<select class="addData tet" style="margin-left: 40%;text-align-last: center" name="yonFirstHouse">'+
						                '<option class="default">-请选择-</option>'+
						                '<option value = "0">是</option>'+
						                '<option value = "1">否</option>'+
						                '</select>'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">是否有房贷</div>'+
						            '<div class="item-input">'+
						            '<select class="addData tet" style="margin-left: 40%;text-align-last: center" name="yonHousingLoan">'+
						                '<option class="default">-请选择-</option>'+
						                '<option value = "0">是</option>'+
						                '<option value = "1">否</option>'+
						                '</select>'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">房屋地址:</div>'+
						            '<div class="item-input">'+
						            '<textarea class="autoo addData" name="houseaddress" rows="1" placeholder=""></textarea>'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						      
						      '<li>'+
						        '<div class="item-content">'+
						          '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
						          '<div class="item-inner">'+
						            '<div class="item-title label">'+
						            	'身份证照片'+
						            '</div>'+
						            '<div class="item-input" id="IDpci">'+
						               '<input id="submitIdCard" class="submitIdCard" type="text" readonly="readonly" placeholder="同时上传身份证正反面照片">'+
						            '</div>'+
						          '</div>'+
						        '</div>'+
						      '</li>'+
						    '</ul>'+
						    '</form>'+
						    '<span style = "font-size:12px;padding-left:10px;margin-bottom:-5px;">为落实个人所得税改革政策，请将房屋信息录入完整</span>'+
						  '</div>'+
						  '<div class="content-block" style="margin:0;padding:0">'+
						      '<a href="#" class="button button-big button-big button-fill button-default basicBtn">提交</a>'+
						  '</div>'+
						'</div>'
				);
				textareaAutoHeight('.autoo');
				this.goBack();
				this.getsign();
				this.inputHeight();
				this.selectFormm('.customSelect');
				this.addData('basic','formm');
				//this.submitPic();
				   laydate.render({
					  elem: '#birthdaydate1', //指定元素
				      calendar:true
					});
				   laydate.render({
						  elem: '#birthdaydate2', //指定元素
					      calendar:true
						});
				   laydate.render({
						  elem: '#birthdaydate3', //指定元素
					      calendar:true
						});
				
				if(localStorage.getItem('bimg')){
					 var rr=localStorage.getItem('bimg');
					 rr=rr.split(',');
					$('#submitIdCard').css('display','none');
					var img="";
					var imgHead="<img class='submitIdCard' src='";
					var onclick="' onclick='basicInformation.previewImage(";
					var imgEnd=")' height='50' width='50' />";
					for(var i=0;i<rr.length;i++){
						img+=imgHead+rr[i]+onclick+JSON.stringify(123)+","+i+imgEnd;
					}
					$('#IDpci').html(img);
				}
					
				//如果已经提交过数据，不能重复提交!
				if(localStorage.getItem('basic')){
					$('.button-default').addClass('disabled');
				}
			},
			selectFormm:function (cla){
				var that=this;
				$(cla).each(function(i, k) {
					var _this = $(k);
					var _name = _this.attr('name');
					var _id = _this.attr('id') + '-Select';
					var _refid = _this.attr('refid');
					var _thisvalue = _this.val();
				    var _parameter = _this.data('parameter');
				    var arr=_parameter.split(':');
				    var param={};
				    param[arr[0]]=arr[1];
				    var _url = _this.data('url');
				    var _text = _this.data('textField');
				    var _value = _this.data('valueField');
				    
				    _this.attr('boxname="' + _name + '"');
				    _this.removeAttr('name');
				    _this.removeClass('customSelect');
				    _this.css('display','none');

				    $.ajax({
						url : _url,
						data : param,
						type : "post",
						dataType : "json",
						success : function(data) {
							console.log(data)
						    var html = '<input type="text" id="'+_id+'" class="" placeholder="必填">'+
						    			'<input type="hidden" class="addData" name="'+_name+'" id="'+_id+'1">'
						    var _p = _this.parent();
						    _p.html(html);
						    costNameJson(_id,data)
						    that.showData();
						},
						error : function(error) {
						}

					    });
				})
			},
			goBack:function(){
				$('#content').on('click','.pull-left',function(){
					window.location.hash="#/entryPage"
				})
			},
			getsign:function (){
				var that=this;
// 				alert(location.href.split('#')[0]);
				var appId=$('#appId').val();// 必填，企业号的唯一标识，此处填写企业号corpid
				var timestamp=$('#timestamp').val();  // 必填，生成签名的时间戳
				timestamp=parseInt(timestamp);
			   	var nonceStr=$('#nonceStr').val(); // 必填，生成签名的随机串
			    var signature=$('#signature').val(); // 必填，签名，见附录1
//  			    alert("appId:" +JSON.stringify(appId)+"signature:" +JSON.stringify(signature)+"timestamp:" +JSON.stringify(timestamp)+"nonceStr:" +JSON.stringify(nonceStr));
				wx.config({
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: appId, // 必填，企业号的唯一标识，此处填写企业号corpid
				    timestamp: timestamp, // 必填，生成签名的时间戳
				    nonceStr: nonceStr, // 必填，生成签名的随机串
				    signature: signature,// 必填，签名，见附录1
				    jsApiList: [
				                'checkJsApi',
				                'onMenuShareTimeline',
				                'onMenuShareAppMessage',
				                'onMenuShareQQ',
				                'onMenuShareWeibo',
				                'onMenuShareQZone',
				                'hideMenuItems',
				                'showMenuItems',
				                'hideAllNonBaseMenuItem',
				                'showAllNonBaseMenuItem',
				                'translateVoice',
				                'startRecord',
				                'stopRecord',
				                'onVoiceRecordEnd',
				                'playVoice',
				                'onVoicePlayEnd',
				                'pauseVoice',
				                'stopVoice',
				                'uploadVoice',
				                'downloadVoice',
				                'chooseImage',
				                'previewImage',
				                'uploadImage',
				                'downloadImage',
				                'getNetworkType',
				                'openLocation',
				                'getLocation',
				                'hideOptionMenu',
				                'showOptionMenu',
				                'closeWindow',
				                'scanQRCode',
				                'chooseWXPay',
				                'openProductSpecificView',
				                'addCard',
				                'chooseCard',
				                'openCard'
				                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				
				wx.ready(function(){
// 					 console.log("wx.ready");
// 					document.querySelector('#chooseImage').onclick = function () { chooseImage(); }
					that.chooseInvoiceImage();
				});
				wx.error(function(){
					$.alert('获取接口失败');
				})
			},
			//选择图片
			chooseInvoiceImage:function (){
				var that=this;
				$('#content').off('click','#IDpci .submitIdCard');
				$('#content').on('click','#IDpci .submitIdCard',function(){
					 wx.chooseImage({
						    count: 2, // 默认9
						    sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
						    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
						    success: function (res) {
						    	var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片 
//						    	alert(JSON.stringify(localIds))
						    	that.thumbnailInvoice(res);
						    	 
						    }
						});
				})
			},
			//加载缩略图
			thumbnailInvoice:function (res){
				if(res.localIds.length<2){
					$.toast('请同时上传身份证的正面与反面照片');
					return;
				}
				$('#submitIdCard').css('display','none');
				var img="";
				var imgHead="<img class='submitIdCard' src='";
				var onclick="' onclick='basicInformation.previewImage(";
				var imgEnd=")' height='50' width='50' />";
				  bimg=[];
				for(var i = 0; i < res.localIds.length; i++){
					bimg.push(res.localIds[i]);
					var bb=bimg.join(',');
					localStorage.setItem("bimg", bb);
					img+=imgHead+res.localIds[i]+onclick+JSON.stringify(res.localIds)+","+i+imgEnd;
				}
				$('#IDpci').html(img);
				this.uploadInvoiceImage(bimg);
				
			},
			//预览图片
			previewImage:function (localIds,i){
// 				console.log(arguments.length+","+arguments);

					this.chooseInvoiceImage();
			},
			//上传图片
			uploadInvoiceImage:function (ids){
				var id1=ids[0].toString();
				var id2=ids[1].toString();
				this.submitPic(id1,id2);
				
			},
			uploadOne:function(id1,id2){
				var that=this;
				 wx.uploadImage({  
		                localId: id1, // 需要上传的图片的本地ID，由chooseImage接口获得  
		                isShowProgressTips: 1, // 默认为1，显示进度提示  
		                success: function (res) {  
		                   var mediaId = res.serverId; // 返回图片的服务器端ID  
		                    var param={};
		                	param.mediaId=mediaId;
		                	param.empId=employeeId;
		                    $.ajax({
		                    	type:'post',
		                    	url:webBasePath+'hr/entry/downloadIdcardPic/m',
		                    	data:param,
		                    	success:function(data){
		                    		$.toast('身份证正面照上传成功')
		                    		setTimeout(function(){
				                    	that.uploadTwo(id2);
				                    },1000)
		                    	},
		                    	error:function(data){
		                    		$.alert('身份证上传失败')
		                    		$.hidePreloader();
		                    	}
		                    })
		                    
		                },  
		                fail: function (error) {  
		                    picPath = '';  
		                    localIds = '';  
		                    $.alert(Json.stringify(error));  
		                }  
		            });  
			},
			uploadTwo:function(id2){
				var that=this;
				 wx.uploadImage({  
		                localId: id2, // 需要上传的图片的本地ID，由chooseImage接口获得  
		                isShowProgressTips: 1, // 默认为1，显示进度提示  
		                success: function (res) {  
		                   var mediaId = res.serverId; // 返回图片的服务器端ID  
		                   var param={};
		                	param.mediaId=mediaId;
		                	param.empId=employeeId;
		                    $.ajax({
		                    	type:'post',
		                    	url:webBasePath+'hr/entry/downloadIdcardPic/m',
		                    	data:param,
		                    	success:function(data){
		                    		$.toast('身份证反面照上传成功');
		                    		setTimeout(function(){
		                    			that.submitMsg();
		                    		},1000)
		                    		
		                    	},
		                    	error:function(data){
		                    		$.alert('身份证上传失败')
		                    		$.hidePreloader();
		                    	}
		                    })
		                   
		                },  
		                fail: function (error) {  
		                    picPath = '';  
		                    localIds = '';  
		                    $.alert(Json.stringify(error));  
		  
		                }  
		  
		            });  
			},
			submitPic:function(id1,id2){
				var that=this;
				$('#content').off('click','.basicBtn');
				$('#content').on('click','.basicBtn',function(){
					if($(this).hasClass('disabled')){
						$.toast('不能重复提交');
						return
					}
					var inp=$('#formm .tet');
					var texta=$('#formm textarea');
					var sel=$('#formm select');
					for(var i=0;i<inp.length;i++){
						if(inp.eq(i).val()==''){
						  if(inp.eq(i).attr('placeholder')!="选填"){
						    $.toast('请完善信息');
					      return
						  }
						}
					}
					for(var i=0;i<texta.length;i++){
						if(texta.eq(i).val()==''){
							$.toast('请完善信息');
							return
						}
					}
					for(var i=0;i<sel.length;i++){
						if(sel.eq(i).val()=='-请选择-'){
							$.toast('请完善信息');
							return
						}
					}
/*					if($('#IDpci input')){
						$.toast('请上传身份证照片');
						return
					}*/
					$.showPreloader();
					//that.submitMsg();     //删掉
					that.uploadOne(id1,id2);   //打开
				
				})
			},
			submitMsg:function(){
				basic=true;
				var tt=formtoJsonTrim('formm');
				tt.id=employeeId;
				tt['user.id']=userid;
				$.ajax({
					type:'post',
					url:webBasePath+'hr/entry/updateEmployee/m',
					data:tt,
					success:function(data){
						$.toast('数据上传成功');
						$.hidePreloader();
					},
					error:function(data){
						$.toast('数据上传失败');
						$.hidePreloader();
					}
				})
				$(this).addClass('disabled');
				tt.marital=$('#marital-Select').val();
				tt.nation=$('#nation-Select').val();
				tt.political=$('#political-Select').val();
				tt.constellation=$('#constellation-Select').val();
				tt.bloodType=$('#bloodType-Select').val();
//				tt.languageAbility=$('#languageAbility-Select').val();
//				tt.computerAbility=$('#computerAbility-Select').val();
				tt=JSON.stringify(tt);
				localStorage.setItem("basic", tt);
			},
			addData:function(ele,id){
				assignment(ele,id);
			},
			inputHeight:function(){
				var h=$(window).height();
				$('.addData').on('focus',function(){
					var l=$('.content').scrollTop();
					var eleH=$(this).offset().top;
					if(eleH>h/2){
						$('.content').scrollTop(l+eleH-h/3);
					}
				})
			},
			showData:function(){
				 if(localStorage.getItem('basic')){
					 var rr=localStorage.getItem('basic');
					 rr=JSON.parse(rr);
					 var ele=$('.addData');
					 for(var i=0;i<ele.length;i++){
							 var name=ele.eq(i).attr("name");
						     ele.eq(i).val(rr[name]);
					 }
					$('#marital-Select').val(rr.marital);
					$('#nation-Select').val(rr.nation);
					$('#political-Select').val(rr.political);
					$('#constellation-Select').val(rr.constellation);
					$('#bloodType-Select').val(rr.bloodType);
//					$('#languageAbility-Select').val(rr.languageAbility);
//					$('#computerAbility-Select').val(rr.computerAbility);
				 }
			}


	}
	basicInformation.addHtml();
	
}