<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<link rel="stylesheet" href="${ctxStatic}/common/css/prjForm.css">
<link rel="stylesheet" href="${ctxStatic}/common/js/bootstrap-fileinput/css/fileinput.css">
<link href="${ctx}/views/nyd/prj/css/form.css" rel="stylesheet">
<link href="${ctxStatic}/openlayers/css/ol.css" type="text/css" rel="stylesheet">
<link href="${ctxStatic}/layui/css/layui.css" type="text/css" rel="stylesheet">
<link href="${ctxStatic}/layui/myicon/iconfont.css" type="text/css" rel="stylesheet" >
<link href="${ctx}/views/nyd/prj/css/mapmeasuretool.css" rel="stylesheet">
<link href="${ctx}/views/nyd/prj/css/mappopover.css" rel="stylesheet">
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content" style="height: 100%">
	<ul class="nav nav-tabs" id="navUl">
		<li role="presentation" class="active"><a href="javascript:;"><i style="font-size: 14px"
				class="glyphicon glyphicon-globe"></i> 地图数据</a></li>
		<li role="presentation"><a href="javascript:;"><i style="font-size: 14px"
				class="glyphicon glyphicon-credit-card"></i> 项目信息</a></li>
	</ul>
	<div id="divmap">
		<div class="divChange" style="height: 100%">
			<div style="padding-bottom: 20px;">
				<!-- <a href="javascript:;" class="btn btn-primary"><i style="font-size: 14px" class="glyphicon glyphicon-plus"></i>加载界址点</a> -->
			</div>
			<div id="mapContent" style="height:100%;">

				<ul id="chooseMap">
					<li>
						<div class="div1">
							<label for="rad1"> <input type="checkbox" id="rad1" name="rads" checked="checked"></label>
						</div>
						<div class="div2">土地利用规划图</div>
					</li>
					<li>
						<div class="div1">
							<label for="rad2"> <input type="checkbox" id="rad2" name="rads"></label>
						</div>
						<div class="div2">土地利用现状图</div>
					</li>
					<li>
						<div class="div1">
							<label for="rad3"> <input type="checkbox" id="rad3" name="rads" checked="checked"></label>
						</div>
						<div class="div2">项目用地平面图</div>
					</li>
				</ul>
				<div id="mapMain">
					<div id="map">
						<input type="hidden" id="xmydlocate"  value="<c:out value='${landList[0].geom}'/>">
						<div class="layui-btn-group">
        						<button class="layui-btn" id="mt_goback"><i class="layui-icon layui-icon-refresh"></i>重置</button>
        						<button class="layui-btn" id="mt_zoomin"><i class="iconfont icon-fangda"></i>放大</button>
						        <button class="layui-btn" id="mt_zoomout"><i class="iconfont icon-suoxiao"></i>缩小</button>
						        <button class="layui-btn" id="mt_length"><i class="iconfont icon-chizi"></i>距离</button>
						        <button class="layui-btn" id="mt_area"><i class="iconfont icon-mianji"></i>面积</button>
						        <button class="layui-btn" id="mt_clear"><i class="layui-icon layui-icon-delete"></i>删除</button>
						        <button class="layui-btn" id="mt_query"><i class="layui-icon layui-icon-about"></i>属性</button>
						        <button class="layui-btn" id="mt_locate"><i class="layui-icon layui-icon-location"></i>定位</button>
    					</div>
					</div>
				</div>
			</div>

		</div>
		<div class="divChange" style="display: none; clear: both;">
			<form id="tableFather" class="form-horizontal">
				<input id='prjId' value='${prjInfo.id }' type="hidden" name="id"></input>
				<div style="overflow: hidden; padding-bottom: 12px;">
					<h4 class="fl">基本信息</h4>
					<!-- <a href="javascript:;" id="saveMsgBtn" class="btn btn-primary pull-right">保存</a> -->
				</div>

				<table id="prjTable" class="table">
					<tr>
						<td colspan="2" class="bolder">申请人</td>
						<td colspan="5"><div class="form-group">
								<input type="text" name="applier" class="form-control" value="${prjInfo.applier}">
							</div></td>
						<td colspan="3" class="bolder">农业生产项目名称</td>
						<td colspan="2"><div class="form-group">
								<input type="text" name="prjName" class="form-control" value="${prjInfo.prjName}">
							</div></td>
					</tr>
					<tr>
						<td colspan="2" class="bolder">项目负责人</td>
						<td colspan="5"><div class="form-group">
								<input type="text" name="prjLeader" class="form-control" value="${prjInfo.prjLeader}">
							</div></td>
						<td colspan="3" class="bolder">身份证号码</td>
						<td colspan="2"><div class="form-group">
								<input type="text" name="idcard" class="form-control" value="${prjInfo.idcard}">
							</div></td>
					</tr>
					<tr>
						<td colspan="2" class="bolder">联系电话</td>
						<td colspan="5"><div class="form-group">
								<input type="tel" name="phone" class="form-control" value="${prjInfo.phone}">
							</div></td>
						<td colspan="3" class="bolder">土地座落</td>
						<td colspan="2"><div class="form-group">
								<input type="text" name="location" class="form-control" value="${prjInfo.location}">
							</div></td>
					</tr>
					<tr>
						<td colspan="2" class="bolder">备案类型</td>
						<td colspan="5">
							<div class="form-group">
								<input id="role_type2" class="customRadio " name="recordType.id"
									value="${!empty prjInfo.recordType?prjInfo.recordType.id:'' }"
									data-option="{url:'${ctx}/sys/dict/list/all',textField:'name',valueField:'id',parameter:{typeCode:'type-case'}}"></input>
							</div>
						</td>
						<td colspan="3" class="bolder">设施用地四至位置</td>
						<td colspan="2"><div class="form-group">
								<input type="text" name="boundary" class="form-control" value="${prjInfo.boundary}">
							</div></td>
					</tr>
					<tr>
						<td colspan="2" class="bolder">项目开始时间</td>
						<td colspan="5"><div class="form-group">
								<input type="text" readonly name="prjStartTime" class="form-control date-icon" id="prjStartTime"
									value='<fmt:formatDate type="date"  value="${prjInfo.prjStartTime}" />'>
							</div></td>
						<td colspan="3" class="bolder">项目结束时间</td>
						<td colspan="2"><div class="form-group">
								<input type="text" readonly name="prjEndTime" class="form-control date-icon" id="prjEndTime"
									value='<fmt:formatDate type="date" value="${prjInfo.prjEndTime}" />'>
							</div></td>
					</tr>
					<tr>
						<td rowspan="12" class="bolder w110">拟建设施类型</td>
						<td rowspan="4" class="bolder w130">生产设施</td>
						<td colspan="8" class="bolder">具体分类</td>
						<td class="bolder">是否附有复垦还耕承诺书</td>
						<td class="bolder">总面积</td>
					</tr>
					<tr>
						<td colspan="6">农用地</td>
						<td rowspan="2">建设用地</td>
						<td rowspan="2">末利用地</td>
						<td rowspan="3">
							<!-- <label> <input type="radio" name="prodYonDoc" >有</label>&nbsp;
				  		<label> <input type="radio" name="prodYonDoc" >无</label> -->

							<div class="form-group">
								<input class="customYON" value="${prjInfo.prodYonDoc }" id="" name="prodYonDoc" data-option="{type:'radio'}">
							</div>
						</td>
						<td rowspan="3">
							<div class="form-group">
								<input type="text" class="form-control" id="scMoney" name="prodTotalArea" value="${prjInfo.prodTotalArea }">
							</div>
						</td>
					</tr>
					<tr>
						<td class="w60"></td>
						<td>耕地</td>
						<td>园地</td>
						<td>林地</td>
						<td>其他</td>
						<td>其中:基本农田</td>
					</tr>
					<tr>
						<td class="bolder w60">小计</td>
						<td><div class="form-group">
								<input type="number" step="0.01" class="shengchanCash form-control" name="prodFarmland"
									value="${prjInfo.prodFarmland }">
							</div></td>
						<td><div class="form-group">
								<input type="text" class="shengchanCash form-control" name="prodGarden" value="${prjInfo.prodGarden }">
							</div></td>
						<td><div class="form-group">
								<input type="text" class="shengchanCash form-control" name="prodWoodland" value="${prjInfo.prodWoodland }">
							</div></td>
						<td><div class="form-group">
								<input type="text" class="shengchanCash form-control" name="prodOther" value="${prjInfo.prodOther }">
							</div></td>
						<td><div class="form-group">
								<input type="text" class="shengchanCash form-control" name="prodBaseLand" value="${prjInfo.prodBaseLand }">
							</div></td>
						<td><div class="form-group">
								<input type="text" class="shengchanCash form-control" name="prodConstructLand"
									value="${prjInfo.prodConstructLand }">
							</div></td>
						<td><div class="form-group">
								<input type="text" class="shengchanCash form-control" name="prodUnusedLand" value="${prjInfo.prodUnusedLand }">
							</div></td>
					</tr>
					<tr>
						<td rowspan="4" class="bolder w130">附属设施</td>
						<td colspan="8" class="bolder">具体分类</td>
						<td class="bolder">是否附有复垦还耕承诺书</td>
						<td class="bolder">总面积</td>
					</tr>
					<tr>
						<td colspan="6">农用地</td>
						<td rowspan="2">建设用地</td>
						<td rowspan="2">末利用地</td>
						<td rowspan="3">


							<div class="form-group">
								<input class="customYON" value="${prjInfo.attachYonDoc }" id="" name="attachYonDoc" data-option="{type:'radio'}">
							</div>
						</td>
						<td rowspan="3">
							<div class="form-group">
								<input type="text" id="fsscMoney" class="form-control" name="attachTotalArea"
									value="${prjInfo.attachTotalArea }">
							</div>
						</td>
					</tr>
					<tr>
						<td class="w60"></td>
						<td>耕地</td>
						<td>园地</td>
						<td>林地</td>
						<td colspan="2">其他</td>
					</tr>
					<tr>
						<td class="bolder w60">小计</td>
						<td><div class="form-group">
								<input type="text" name="attachFarmland" class="form-control fsscCash" value="${prjInfo.attachFarmland}">
							</div></td>
						<td><div class="form-group">
								<input type="text" name="attachGarden" class="form-control fsscCash" value="${prjInfo.attachGarden}">
							</div></td>
						<td><div class="form-group">
								<input type="text" name="attachWookland" class="form-control fsscCash" value="${prjInfo.attachWookland}">
							</div></td>
						<td colspan="2"><div class="form-group">
								<input type="text" name="attachOther" class="form-control fsscCash" value="${prjInfo.attachOther}">
							</div></td>
						<td><div class="form-group">
								<input type="text" name="attachConstructLand" class="form-control fsscCash"
									value="${prjInfo.attachConstructLand}">
							</div></td>
						<td><div class="form-group">
								<input type="text" name="attachUnusedLand" class="form-control fsscCash" value="${prjInfo.attachUnusedLand}">
							</div></td>
					</tr>

					<tr>
						<td rowspan="4" class="bolder w130">配套设施</td>
						<td colspan="8" class="bolder">具体分类</td>
						<td class="bolder">是否附有复垦还耕承诺书，占用基本农田的是否有补充更低和补划方案</td>
						<td class="bolder">总面积</td>
					</tr>
					<tr>
						<td colspan="6">农用地</td>
						<td rowspan="2">建设用地</td>
						<td rowspan="2">末利用地</td>
						<td rowspan="3">

							<div class="form-group">
								<input class="customYON" value="${prjInfo.assortTotalDoc }" id="" name="assortTotalDoc"
									data-option="{type:'radio'}">
							</div>
						</td>
						<td rowspan="3">
							<div class="form-group">
								<input type="text" class="form-control" id="ptMoney" name="accortArea" value="${prjInfo.accortArea}">
							</div>
						</td>
					</tr>
					<tr>
						<td class="w60"></td>
						<td>耕地</td>
						<td>园地</td>
						<td>林地</td>
						<td colspan="2">其他</td>
					</tr>
					<tr>
						<td class="bolder w60">小计</td>
						<td><div class="form-group">
								<input type="text" name="asortFarmland" class="form-control ptCash" value="${prjInfo.asortFarmland}">
							</div></td>
						<td><div class="form-group">
								<input type="text" name="assortGarden" class="form-control ptCash" value="${prjInfo.assortGarden}">
							</div></td>
						<td><div class="form-group">
								<input type="text" name="assortWoodland" class="form-control ptCash" value="${prjInfo.assortWoodland}">
							</div></td>
						<td colspan="2"><div class="form-group">
								<input name="assortOther" type="text" class="form-control ptCash" value="${prjInfo.assortOther}">
							</div></td>
						<td><div class="form-group">
								<input type="text" name="assortConstruct" class="form-control ptCash" value="${prjInfo.assortConstruct}">
							</div></td>
						<td><div class="form-group">
								<input type="text" name="assortUnused" class="form-control ptCash" value="${prjInfo.assortUnused}">
							</div></td>
					</tr>
				</table>
			</form>
			<div style="overflow: hidden; padding-bottom: 12px;">
				<h4 class="fl">附件信息</h4>
			</div>
			<table id="tableBs"></table>

		</div>
	</div>
</div>
<div id="outerdiv" style="position:fixed;top:0;left:0;background:rgba(0,0,0,0.7);z-index:2;width:100%;height:100%;display:none;"><div id="innerdiv" style="position:absolute;"><img id="bigimg" style="border:5px solid #fff;" src="" /></div></div>  
<%@include file="/WEB-INF/views/include/footer.jsp"%>
<script type="text/javascript" src="${ctx}/views/nyd/prj/js/show_form.js"></script>
<script type='text/javascript' src="${ctxStatic}/common/js/bootstrap-fileinput/js/fileinput.js"></script>
<script type='text/javascript' src="${ctxStatic}/openlayers/build/ol.js"></script>
<script type="text/javascript" src="${ctxStatic}/layui/layui.js"></script>
<script type="text/javascript" src="${ctx}/views/nyd/prj/js/proj4.js"></script>
<script type="text/javascript" src="${ctx}/views/nyd/prj/js/prjmap.js"></script>
</body>

</html>
