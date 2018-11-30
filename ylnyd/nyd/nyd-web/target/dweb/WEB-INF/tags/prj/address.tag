<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ attribute name="province" type="java.lang.String" required="false" description="省名称"%>
<%@ attribute name="city" type="java.lang.String" required="false" description="市名称"%>
<%@ attribute name="hascounty" type="java.lang.String" required="false" description="是否包含县"%>
<%@ attribute name="disabled" type="java.lang.String" required="false" description="是否有效"%>
<%@ attribute name="contentClass" type="java.lang.String" required="false" description="bootstra栅格控制,如col-xs-* "%>

<div style="overflow-y: auto;">
	<div class="${empty contentClass?'col-sm-10 col-xs-10':contentClass}">
		<input type="text" class="form-control" id="province" name="province" value="${province}" refid="city" 
			data-option="{textField:'name',valueField:'adcode',disabled:'${disabled}'}">
	</div>

	<div class="${empty contentClass?'col-sm-10 col-xs-10':contentClass}">
		<input type="text" class="form-control" id="city" name="city" value="${city}" <c:if test="${hascounty=='true'}">refid="county" </c:if>
			data-option="{textField:'name',valueField:'adcode',disabled:'${disabled}'}">
	</div>
	
	<c:if test="${hascounty=='true'}">
		<div class="${empty contentClass?'col-sm-10 col-xs-10':contentClass}">
			<input type="text" class="form-control" id="county" name="county" value=""
				data-option="{textField:'name',valueField:'adcode',disabled:'${disabled}'}">
		</div>
	</c:if>
</div>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="ctxStatic" value="${pageContext.request.contextPath}/static" />
<script type="text/javascript" src="${ctx}/static/common/js/region.js"></script>
<script type="text/javascript">
$(function() {
	generateSelect("province", region.districts)
});

function generateSelect(inputId, result) {
    var _this = $("#" + inputId);
	var _name = inputId;//_this.attr('name');
	var _id = _this.attr('id') + '-Select';
	var _refid = _this.attr('refid');
	var _thisvalue = _this.val();
	var _msg = _this.attr('msg') == undefined ? "" : _this.attr('msg');

	var option = strToJson(_this.attr('data-option'));
    var _text = option['textField'];
    var _value = option['valueField'];
	var _disabled = option["disabled"];
	
    _this.attr('boxname="' + _name + '"');
    _this.removeAttr('name');
    _this.hide();
    
    var html = "";
    html += _this.prop('outerHTML');
    html += '<select class="form-control" name="' + _name + '" id="' + _id + '"';
    if (_disabled != undefined && (_disabled || _disabled == 'true')) {
		html += ' disabled ="' + _disabled + '"';
    }
    html += '>\n';
    html += '<option value=""';
    if (_thisvalue == "") {
		html += ' selected="selected"';
    }
    html += '>请选择' + _msg + '</option>\n';
    for (var i = 0; i < result.length; i++) {
		var obj = result[i];
		html += '<option value="' + obj[_value] + '"';
		if (_thisvalue != "") {
	    	if (_thisvalue == obj[_value]) {
				html += ' selected="selected"';
	    	}
		}
		html += '>' + obj[_text] + '</option>\n';
    }
    html += '</select>\n';
    
    var _p = _this.parent();
    _p.html(html);
    _p.find('select[name="' + _name + '"]').data('customSelectData', result);

	$('#' + _id).on('change', function() {
	    if (undefined != _refid) {
		    var index = $(this).get(0).selectedIndex;
		    if (index == 0) {
				generateSelect(_refid, []);
		    }
		    else {
			    generateSelect(_refid, result[index - 1].districts);
		    }
	    }
	    else {
			if(typeof(addressSelected)=="function"){
				var provinceId = $("#province-Select option:selected").val();
				var provinceName = $("#province-Select option:selected").text();
				var cityId = $("#city-Select option:selected").val();
				var cityName = $("#city-Select option:selected").text();
				var countyId = $("#county-Select option:selected").val();
				var countyName = $("#county-Select option:selected").text();
				addressSelected(provinceId, provinceName, cityId, cityName,countyId,countyName);
			}
	    }
	});
    
    if(typeof(refreshValidator)=="function"){
		refreshValidator();
    } 
    
    $('#' + _id).change();
}
</script>