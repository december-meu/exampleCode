<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="ctxStatic" value="${pageContext.request.contextPath}/static" />
<%@ attribute name="content" type="java.lang.String" required="false" description="消息内容"%>
<%@ attribute name="type" type="java.lang.String" description="消息类型：info、success、warning、error、loading"%>
<%@ attribute name="filter" type="java.lang.String" required="false" description="是否根据登录人过滤"%>
<form id="org-select-form" class="form-horizontal">

	<div class="form-group">
		<!-- 		<label for="org_select" class="col-sm-2 col-xs-2 text-left">机构:</label> -->
		<div class="col-sm-12 col-xs-12">
			<input type="text" class="form-control" id="org_select" msg="组织机构" name="filter_LIKE_organization.id" placeholder="名称" value=""
				data-option="{url:'${ctx}/sys/org/list/all',textField:'name',valueField:'id'}">
		</div>
	</div>
</form>
<div style="height: 750px; overflow-y: auto;">
	<table id="dep_tree"></table>
</div>
<input type="hidden" id="filter_flag" value="${empty filter?'0':'1'}">
<script type="text/javascript">
    $(function() {
	initOrgSelct();
	initDomEvent();
    });

    function initOrgSelct() {
	//     $('.customSelect').each(function(i, k) {
	var _this = $('#org_select');
	var _name = _this.attr('name');
	var _id = _this.attr('id') + '-Select';
	var _refid = _this.attr('refid');
	var _msg = _this.attr('msg') == undefined ? "" : _this.attr('msg');
	// checked="checked"
	var option = strToJson(_this.attr('data-option'));
	if (option != undefined && option != "") {
	    var _parameter = option['parameter'];
	    var _url = option['url'];
	    var _text = option['textField'];
	    var _value = option['valueField'];
	    var _disabled = option["disabled"];

	    _this.attr('boxname="' + _name + '"');
	    _this.removeAttr('name');
	    _this.removeClass('customSelect');
	    _this.hide();

	    $.ajax({
	        url : _url,
	        data : _parameter,
	        type : "post",
	        dataType : "json",
	        success : function(result) {
		    var html = "";
		    html += _this.prop('outerHTML');
		    html += '<select class="form-control" name="' + _name + '" id="' + _id + '"';
		    if (_disabled != undefined && (_disabled || _disabled == 'true')) {
		        html += ' disabled ="' + _disabled + '"';
		    }
		    html += '>\n';
		    html += '<option value=""';
		    
		    html += '>请选择' + _msg + '</option>\n';
		    for (var i = 0; i < result.length; i++) {
		        var obj = result[i];
		        html += '<option value="' + obj[_value] + '"';
		        if (obj.isDefault && 1 == obj.isDefault) {
			    html += ' selected="selected"';
		        }
		        html += '>' + obj[_text] + '</option>\n';
		    }
		    html += '</select>\n';
		    var _p = _this.parent();
		    _p.html(html);
		    _p.find('select[name="' + _name + '"]').data('customSelectData', result);

		    if (undefined != _refid) {
		        $('#' + _id).on('change', function() {

			    cascadeSelect(_refid, $('#' + _id).val());
		        })
		    }
		    var orgId = $('#' + _id).children('option:selected').val();
		    console.log("orgId=" + orgId);
		    initTreeView(orgId);

	        },
	        error : function(error) {
	        }

	    });
	}
	// });
    }

    function initDomEvent() {
	$(document).on('change', '#org_select-Select', function() {
	    console.log("changed！");
	    var orgId = $(this).children('option:selected').val();
	    initTreeView(orgId);
	    if (typeof (onOrgChanged) == "function") {
		onOrgChanged(orgId);
	    }

	})

    }

    function initTreeView(orgId) {
	var data = {
	    orgId : orgId,
	    filtered : true,
	    sortField : 'sortNum',
	    sortDir : 'asc'
	};
	var filter=$('#filter_flag').val();
	if(filter=='1'){
	    data.filtered=true;
	}else{
	    data.filtered=false;	    
	}

	$.ajax({
	    url : webPath + "/sys/dep/tree",
	    data :data,
	    type : "POST",
	    dataType : "json",
	    success : function(result) {
	        if (result.code == "200") {

		    renderTree(result.data, "dep_tree");

	        } else {
		    layer.alert(result.msg);
	        }

	    },
	    error : function(error) {
	    }
	});
    }
    function renderTree(data, viewId) {
	var options = {
	    color : "#333",
	    bootstrap2 : false,
	    showTags : true,
	    levels : 2,
	    multiSelect : false,
	    selectable : true,
	    showBorder : false,
	    showCheckbox : false,
	    onhoverColor : "#eee",
	    //	backColor : "#fff",
	    data : data,

	    onNodeSelected : function(event, data) {

	        var nodes = $('#' + viewId).treeview('getSelected');
	        var node = nodes[0];
	        if (typeof (onDepNodeSelected) == "function") {
		    onDepNodeSelected(node.id, node.code);
	        }

	    },
	    onNodeChecked : function(event, data) {
	        // tree.onNodeChecked(data);
	    },
	    onNodeUnselected : function(event, data) {
	        // console.log("nodeUnSelected==:" + currentNodeId);
	        // //console.log("node Click==:"+JSON.stringify(data));
	        // 获取当前节点对象
	        // var node = treeView.treeview('getNode', nodeid);

	    },

	    onNodeUnchecked : function(event, data) {

	        // tree.onNodeUnchecked(data);
	        // //console.log("===nodeUnChecked====" + data.text);
	    }
	};
	$("#" + viewId).treeview(options);
	if (data && data.length > 0) {
	    // 选中第一条 nodeId 为0 data-nodeId属性的值
	    $("#" + viewId).treeview('selectNode', 0, {
		silent : true
	    });
	}
	var selectedNodes = $("#" + viewId).treeview('getSelected');
	if (selectedNodes.length > 0) {
	    currentDepId = selectedNodes[0].id;
	}

    }

    function getSelectedDep() {
	var selectedNodes = $("#dep_tree").treeview('getSelected');
	if (selectedNodes.length > 0) {
	    return selectedNodes[0].id;
	} else {
	    return "";
	}
    }
    function getSeletedOrg() {
	return $("#org_select-Select").children('option:selected').val();
    }
</script>