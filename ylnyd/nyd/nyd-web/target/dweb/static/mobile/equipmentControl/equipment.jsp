<!DOCTYPE html>
<%@page import="java.util.Random"%>
<%@page
	import="org.springframework.web.bind.support.WebBindingInitializer"%>
<html>
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>设备查询</title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<script type='text/javascript' src='http://res.wx.qq.com/open/js/jweixin-1.2.0.js' charset='utf-8'></script>

<%@include file="/WEB-INF/views/mobile/include/taglibs.jsp"%>
<%@include file="/WEB-INF/views/mobile/include/header.jsp"%>

<style>
header{
	height:55px!important;
	padding:0!important;
}
header .row{
	margin-left:0;
}
header .row .col-25{
	height:55px;
	border-right:1px solid #ccc;
	text-align: center;
	line-height: 55px;
	width:25%;
	margin:0;
}
header .row .col-25:last-of-type{
	border-right:0;
}

header .row .col-25 span{
	padding: 0.5rem 0rem 0.5rem 0.5rem;
	font-size:0.6rem;
}
.grid-demo{
	text-align: center;
	margin:0.8rem 0;
}
.content .row{
	margin: 0 0 0 -8%;
	padding: 3% 0;
} 
</style>

<body style="font-family:'微软雅黑';background:white">
<input type="hidden" id="stateH" value="">
<input type="hidden" id="manuH" value="">
<input type="hidden" id="typeH" value="">
<input type="hidden" id="nameH" value="">
<header class="bar bar-nav">
   <div class="row">
      <div class="col-25" id="state">状态<span class="icon icon-caret"></span></div>
      <div class="col-25" id="manu">厂家<span class="icon icon-caret"></span></div>
      <div class="col-25" id="type">类型<span class="icon icon-caret"></span></div>
      <div class="col-25" id="name">名称<span class="icon icon-caret"></span></div>
    </div>
</header>
<div class="content">
	<div class="content-padded grid-demo" id="content">
	    
	</div>
</div>
    
<%@include file="/WEB-INF/views/mobile/include/footer.jsp"%>
<script id="test" type="text/html">

    <?for(i = 0; i < rows.length; i ++) {?>
    <div class="row">
      <div class="col-33"><?=rows[i].eqpName?></div>
      <div class="col-33 code"><?=rows[i].eqpCode?></div>
      <?if(rows[i].eqpStatus=='0'){?>
 			<div class="col-33 ccc" style="color:blue">空闲状态</div>
	  <?}else if(state[i].eqpStatus==1){?>
		    <div class="col-33 ccc" style="color:red">维护状态</div>
	  <?}?>
    </div>
    <?}?>
</script>



<script>
/* $(function(){
	var data = {
	    state:[
	           {"name":'设备一',"type":'A-2152155',"state":'使用状态'},
	           {"name":'设备二',"type":'A-8512456',"state":'空闲状态'},
	           {"name":'设备三',"type":'A-2156415',"state":'维护状态'},
	           {"name":'设备四',"type":'A-8545154',"state":'使用状态'},
	           {"name":'设备五',"type":'A-7861568',"state":'维护状态'},
	           {"name":'设备五',"type":'A-7861568',"state":'维护状态'},
	           {"name":'设备五',"type":'A-7861568',"state":'维护状态'},
	           {"name":'设备五',"type":'A-7861568',"state":'维护状态'},
	           {"name":'设备五',"type":'A-7861568',"state":'维护状态'},
	           {"name":'设备五',"type":'A-7861568',"state":'维护状态'},
	           {"name":'设备五',"type":'A-7861568',"state":'维护状态'},
	           {"name":'设备五',"type":'A-7861568',"state":'维护状态'},
	           {"name":'设备五',"type":'A-7861568',"state":'维护状态'},
	           {"name":'设备五',"type":'A-7861568',"state":'维护状态'},
	           {"name":'设备五',"type":'A-7861568',"state":'维护状态'},
	           {"name":'设备五',"type":'A-7861568',"state":'维护状态'}
	           ]
	};
	var html = template('test', data);
	document.getElementById('content').innerHTML = html;
	equipState();
	selectEquip();
}) */
var params={};
allList(params);
function allList(params){
	
	$.ajax({
		type:'post',
		url:webBasePath+'eqp/wechat/list',
		data:params,
		success:function(data){
			var html = template('test', data);
			$('#content').html(html);
			selectEquip();
			
		},
		error:function(data){
			
		}
	})
}

function selectEquip(){
	$('.content').off('touchstart','.row');
	$('.content').on('touchstart','.row',function(){
		$(this).css('background','#ccc');
	}).on('touchend','.row',function(){
		$(this).css('background','#fff');
		var code=$(this).find('.code').text();
		window.location.href=webBasePath+'pages/equipmentInformation.jsp?'+code+'?'+123;
	}).on('touchmove','.row',function(){
		$(this).css('background','#fff');
	})
}
equipState();
function equipState(){
	$.ajax({
		type:'get',
		url:webBasePath+'eqp/wechat/getEqpDownList',
		success:function(data){
			console.log(data);
			costNameJson('state',data,'eqpStatus');
			costNameJson('manu',data,'manu');
			costNameJson('type',data,'eqpType');
			costNameJson('name',data,'eqpName');
		}
	})
}
		
function costNameJson(pickerId,data,state){
			   var dataprm;
	           if(state=='eqpStatus'){
	        	   dataprm=[0,1];
	        	   displayDataprm=['可用','不可用'];
	           }else if(state=='manu'){
	        	   dataprm=data.data.manu;
	        	   displayDataprm=data.data.manu;
	           }else if(state=='eqpType'){
	        	   dataprm=initPRJRPickerId(data.data.eqpType);
	        	   displayDataprm=initPRJRPicker(data.data.eqpType);
	        	   
	           }else if(state=='eqpName'){
	        	   dataprm=data.data.eqpName;
	        	   displayDataprm=data.data.eqpName;
	           }
			   
	           console.log(dataprm);
// 			   var pickerData = initPRJRPicker(dataprm);
			 //初始化picker
				 $('#'+pickerId).picker({
					 //弹出框的工具栏模板
					  toolbarTemplate: '<header class="bar bar-nav">\<button class="button button-link pull-right close-picker">确定</button>\<h1 class="title">请选择</h1>\</header>',
					 //picker的值
					  cols : [ {
							textAlign : 'center',
							displayValues : displayDataprm,
  							values : dataprm
 							
						} ],
					 //弹出框滑动选中时调用
					  formatValue : 
						  function(picker, value,displayValues) {
							$('#'+pickerId+'H').val(value);
							return displayValues;
						}, 
						onClose : function() {
// 							alert($('#'+pickerId+'H').val())
							var dictName=$('#nameH').val();	
							var manu=$('#manuH').val();	
							var eqpType=$('#typeH').val();	
							var eqpStatus=$('#stateH').val();	
							var params={
									"dictName":dictName,
									"manu":manu,
									"eqpType":eqpType,
									"eqpStatus":eqpStatus
							}
							allList(params);
						}
							
					}); 
}	
//将post结果由list转为数组
function initPRJRPicker(dataprm) {
	var values = new Array();

		var j = 0;
	for(var i = 0; i < dataprm.length; i++) {
 		values[j] = dataprm[i].dictName;
		j++;
	}
	return values;
}	
function initPRJRPickerId(dataprm) {
	var values = new Array();

		var j = 0;
	for(var i = 0; i < dataprm.length; i++) {
 		values[j] = dataprm[i].id;
		j++;
	}
	return values;
}	
</script>

  
</body>
</html>