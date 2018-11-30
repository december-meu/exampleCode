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
<title>设备信息</title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<script type='text/javascript' src='http://res.wx.qq.com/open/js/jweixin-1.2.0.js' charset='utf-8'></script>

<%@include file="/WEB-INF/views/mobile/include/taglibs.jsp"%>
<%@include file="/WEB-INF/views/mobile/include/header.jsp"%>

<style>
	body{
		font-family: "微软雅黑";
		background:white;
	}
	#header{
		position:relative;
	}
	#header img{
		width:100%;
		position:absolute;
	}
	#header .title{
		text-align: center;
		color:white;
		width: 103%;
	}
	#header .title h4{
		margin-top: 3%;
    	margin-bottom: 0;
    	height:25px;
	}
	#header .title p{
		margin: 0;
	}
	#header .personal{
		width:100%;
		position: absolute;
	    text-align: center;
	    margin-top: 25%;
	}
	#header .personal .name,#header .personal .phone{
		width: 46%;
	    height: 80px;
	    background: white;
	    display: inline-block;
	    border-radius: 3%;
	    text-align: center;
	    color:#3d4145;
	}
	#header .personal .name p:nth-child(1),#header .personal .phone p:nth-child(1){
		margin-bottom:0;
		font-size: 15px;
	}
	#header .personal .name p:nth-child(2),#header .personal .phone p:nth-child(2){
		margin:0;
		margin-top:3%;
		font-weight: 900;
		font-size: 15px;
	}
	h3{
		margin:0 auto;
		white-space:normal;
		width:300px;
		text-align:center;
		line-height:1.24rem;
		height:70px;
	 	overflow-y:auto;
	}

	#header .personal img{
		width:25%;
		position:relative;
		margin-left: 6%;
	}
	#header .personal .equipT{
		width:60%;
		display: inline-block;
		text-align: left;
		margin-left: 3%;
	}
	.content .productMsg .right{
		text-align:right;
	}
	.content .productMsg input{
		border: 0;
    	width: 55%;
	}
	.content .productMsg .row{
		margin: 5% 0;
	}
	#slider{
		overflow:scroll;
	}
	#slider .row{
		margin:0;
		padding:0;
		height:108px;
	}
	#slider .row p{
		font-size:0.85rem;
		margin:0;
		color: #3d4145;
	}
	#slider img {
    	width: 28%;
     	margin-top: 9%;
	}
	#slider .col-50{
		margin-left:-7%;
	}
	#slider .row .right{
		margin-left:15%;
	}
	#slider .row:last-of-type .dashe{
		border:0;
	}
	#slider .dashe {
        height: 80px;
    	width: 1px;
    	border: 1px dashed #485cfd;
    /* float: right; */
    	position: relative;
    /* margin-top: 44%; */
    	left: 12%;
	}
	.modal-inner{
		padding:0;
	}
</style>

<body style="font-family:'微软雅黑'">
<div id="header">
	<img src="<%=path%>/static/mobile/images/equipmentInformation/equiptBg.png">
	<div class="title">
		<h4>设备名称</h4>
		<p style="font-size: 0.7rem">设备编号: <span>1JKFNVCIJC123</span></p>
	</div>
	<div class="personal">
		<div class="name">
		    <img src="<%=path%>/static/mobile/images/equipmentInformation/model.png">
		    <div class="equipT">
		        <p>设备型号</p>
			    <p id="eqpMode">123456789</p>
		    </div>
			
		</div>
		<div class="phone">
		    <img src="<%=path%>/static/mobile/images/equipmentInformation/type.png">
		    <div class="equipT">
				<p>设备类型</p>
				<p id="eqpType">123456789</p>
			</div>
		</div>
	</div>
</div>
<div class="content" style="top: 26%;">
	<div class="content-padded grid-demo productMsg">
		<div class="row">
			<div class="col-50"><span>购买时间</span></div>
      		<div class="col-50 right"><input type="text" name="buyTime" readonly="readonly" placeholder="购买时间"></div>
		</div>
		<div class="row">
			<div class="col-50"><span>生产厂家</span></div>
      		<div class="col-50 right"><input type="text" name="manu" readonly="readonly" placeholder="生产厂家"></div>
		</div>
		<div class="row">
			<div class="col-50"><span>联系人</span></div>
      		<div class="col-50 right"><input type="text" name="linkman" readonly="readonly" placeholder="联系人"></div>
		</div>
		<div class="row">
			<div class="col-50"><span>出厂日期</span></div>
      		<div class="col-50 right"><input type="text" name="productionDate" readonly="readonly" placeholder="出厂日期"></div>
		</div>
		<div class="row">
			<div class="col-50"><span>购买价格</span></div>
      		<div class="col-50 right"><input type="text" name="eqpPrice" readonly="readonly" placeholder="购买价格"></div>
		</div>
		<div class="row">
			<div class="col-50"><span>设备可用</span></div>
      		<div class="col-50 right">
      			<label class="label-switch" style="width:50%">
	                <input id="switch" name="" type="checkbox">
	                <div class="checkbox"></div>
                </label>
            </div>
		</div>
	</div>
	
	<div style="display:table;width:50%"><img style="
    width: 32%;
    vertical-align: middle;
    margin-left: 50%;
    margin-bottom: 11%;
    " src="<%=path%>/static/mobile/images/equipmentInformation/userRecord.png"><span style="display: table-cell;vertical-align: middle;padding-left:0;">近期使用记录</span></div>
	<div id="slider">
		
		<div class="content-padded grid-demo infor">

		</div>
	</div>
	
	
</div>

<%@include file="/WEB-INF/views/mobile/include/footer.jsp"%>
<script type='text/javascript' src="<%=path%>/static/mobile/js/route.js" charset="utf-8"></script>
<script type='text/javascript' src="<%=path%>/static/mobile/js/myRoute.js" charset="utf-8"></script>

<script id="test" type="text/html">
<?for(var i=0;i<usedRecord.length;i++){?>
   	<div class="row">
		<div class="col-25" style="padding-left: 4%;margin-left:0">
			<img src="<%=path%>/static/mobile/images/equipmentInformation/circle.png">
			<div class="dashe"></div>
		</div>
		<div class="col-50" style="color:#485cfd">
			<p style="margin: 0;font-size: 0.85rem;color"><?=usedRecord[i].surTime?></p>
			
			<p><textarea rows="1" readonly="readonly" style="border:0;resize: none;" class="time"><?=usedRecord[i].projectName?></textarea></p>
		</div>
	    <div class="col-25 right">
			<p style="color:#485cfd"><?=usedRecord[i].username?></p>

		</div>
	</div>
<?}?>
</script>


<script>
// var data={
// 		info:[
// 		      {"data":"2016-10-21","time":"01:03:25","name":"实时化测绘服务平台","manager":"张扬","state":"使用设备"},
// 		      {"data":"2015-12-21","time":"03:03:25","name":"深圳范德萨","manager":"张中华","state":"设备维修"},
// 		      {"data":"2033-02-21","time":"04:03:25","name":"广州实时化","manager":"武科特","state":"设备闲置"},
// 		      {"data":"2016-05-21","time":"05:03:25","name":"割发代首务平台","manager":"齐艳霞","state":"使用设备"},
// 		      {"data":"2014-07-21","time":"06:03:25","name":"实时割发代首服发代首服发代首服发代首服务平台","manager":"孟伟鹏","state":"设备闲置"},
// 		      {"data":"2013-12-21","time":"07:03:25","name":"实更广泛的是化测台","manager":"阳阳","state":"设备维修"},
		      
// 		      ]
// }
getData();
function getData(){
	var url=window.location.href;
	url=url.split('?')[1];
	var param={'eqpCode':url};
	$.ajax({
		type:'post',
		url:webBasePath+'eqp/wechat/getEqpInfoByOne',
		data:param,
		success:function(data){
			if(data.code==200){
				readData(data);
				showList(data)
			}else{
				$.toast('获取设备信息失败，请联系开发人员');
			}
		}
	})
}
 function readData(data){
	    console.log(data);
		$('#eqpType').text(data.data.eqpInfo.eqpMode);
		$('#eqpMode').text(data.data.eqpInfo.eqpType.dictName);
		var allInput=$('.productMsg input');
		for(var i=0;i<allInput.length;i++){
			var name=allInput.eq(i).attr("name");
			console.log(data.data.eqpInfo[name])
			if(data.data.eqpInfo[name]!=null&&data.data.eqpInfo[name]!="null"){
				allInput.eq(i).val(data.data.eqpInfo[name]);
			}else{
				allInput.eq(i).val('暂无数据');
			}
		}
		var eqpStatus=data.data.eqpInfo.eqpStatus;
		if(eqpStatus==0){
			$('#switch').prop("checked",true);
		}else{
			$('#switch').prop("checked",false);
		}
 }
 
function showList(data){
	var html = template('test', data.data);
	$('.infor').html(html);
}

function select(){
	$('.label-switch').on('change',function(){
		if($('#switch').attr("checked")){
			alertMsg("不可用","可用");
			$('.color1').css('color','#EF6161');
			$('.color2').css('color','#5180E6');
		}else{
			alertMsg("可用","不可用");
			$('.color1').css('color','#5180E6');
			$('.color2').css('color','#EF6161');
		}
	})
}
select();
function alertMsg(msg1,msg2){
		    var modal = $.modal({
		      title: '<img style="width: 100%;margin-top: -17%;" src="'+webBasePath+'static/mobile/images/equipmentInformation/alertBg.png">'+
		      			'<p id="closes" style="position:  absolute;top: -22%;left: 89%; opacity: 0;"><a href="#" class="button">X</a></p>',
		      text: '<p style="font-size:0.75rem;margin:0;letter-spacing: 1px;">设备状态由<span class="color1">“'+msg1+'</span>改为<span class="color2">'+msg2+'</span></p>'+
		      		'<p style="color:#ccc;font-size:0.75rem;margin: 2%;letter-spacing: 1px;">请说明原因 (必填)</p>',
		      afterText:'<textarea rows="3" placeholder="请说明原因" style="resize:none;border-radius: 5%;border: 0;width: 85%;font-size:0.75rem"></textarea>',
		      buttons: [
		        {
		          text: '确定更改',
		          bold: true,
		          onClick: function () {
		            $.alert('Thanks! I know you like it!')
		          }
		        },
		      ]
		    })
		    $(document).off('click','#closes');
			  $(document).on('click','#closes',function(){
				    $('#switch').prop("checked")?$('#switch').prop("checked",false):$('#switch').prop("checked",true);
			    	$.closeModal();
			    })
}

</script>

  
</body>
</html>