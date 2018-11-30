<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<%@include file="/pages/common/taglibs.jsp"%>
<%@include file="/pages/common/header.jsp"%>


<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

<title></title>

<style>

body,iframe,html{
	margin:0;
	padding:0;
	overflow:hidden;
}
iframe{
	width:100%;
	height:100%;
}
</style>


</head>

<body>
	<iframe name="aaa" id="aaa" src=""></iframe>
</body>
<script type="text/javascript">
var url=window.location.href;
url=url.split('&');
$('iframe').attr('src',url[1]);
// var wid=$(window).width();
// var heig=$(window).height();
// $('iframe').css('height',heig);
// $('iframe').css('width',wid);
$('title').text(decodeURI(url[2]));


var myDate = new Date();//获取系统当前时间
 
setInterval(function(){
	 var min=myDate.getMinutes();
	  console.log(min);
	  if(min==10||min==40){
		  history.go(0);
	  }
},10000);


</script>
</html>
