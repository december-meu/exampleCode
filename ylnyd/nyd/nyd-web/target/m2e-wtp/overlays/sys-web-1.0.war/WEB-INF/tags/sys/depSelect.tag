<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ attribute name="depId" type="java.lang.String" required="false" description="部门id"%>
<%@ attribute name="depname" type="java.lang.String" required="false" description="部门名称"%>
<%@ attribute name="disabled" type="java.lang.String" required="false" description="不显示机构"%>
<%@ attribute name="contentClass" type="java.lang.String" required="false" description="bootstra栅格控制,如col-xs-* "%>
<%@ attribute name="disableLabel" type="java.lang.Boolean" required="false" description="是否显示表单标签"%>
<%@ attribute name="wrapped" type="java.lang.String" required="false" description="外层是否需要 form-group,取值：Y：是 ,N:不是"%>
<%@ attribute name="orgClass" type="java.lang.String" required="false" description="控制机构表单的css类"%>
<%@ attribute name="orgLabel" type="java.lang.String" required="false" description="控制机构表单的便签名"%>
<!-- 引用该tag时,相应的js文件中可以通过以下方法获得机构和部门id;
 depId: onDepInited(depInputId);//组件初始化时，执行
 		onDepSelected(inputId,depId)//选择部门时执行
 orgId: getOrgSelected();//随时获取选择的orgId -->

<c:choose>
	<c:when test="${wrapped=='N'}">
		<div class="${empty contentClass?'col-sm-10 col-xs-10':contentClass} ${!empty orgClass?orgClass:''}">
			<input type="text" class="form-control ${empty orgClass?'':orgClass}" id="org-select" msg="组织机构" placeholder="名称" value="" refid="dep-tree-Select"
				data-option="{url:'${ctx}/sys/org/list/all',textField:'name',valueField:'id',disabled:'${disabled}'}">
		</div>

		<div class="${empty contentClass?'col-sm-10 col-xs-10':contentClass}">
			<input style="background-color: #fff" id="dep-tree-Select" type="text" class="form-control dd-dropdown-tree" readonly="readonly" data-tree-href="${ctx}/sys/dep/tree" data-tree-view="dep-tree"
				id="input-department" placeholder="请选择部门"> <input type="hidden" id="dep-tree-Select-id" value="${depId}">
		</div>
		<div id="dep-tree" style="display: none;"></div>
	</c:when>
	<c:otherwise>
		<div class="form-group ${orgClass=='hidden'?orgClass:''}">
			<c:if test="${!disableLabel||disableLabel==false}">
				<label for="org-select" class="col-sm-2 col-xs-2 text-left">机构:</label>
			</c:if>
			<div class="${empty contentClass?'col-sm-10 col-xs-10':contentClass}">
				<input type="text" class="form-control ${empty orgClass?'':orgClass}" id="org-select" msg="组织机构" placeholder="名称" value="" refid="dep-tree-Select"
					data-option="{url:'${ctx}/sys/org/list/all',textField:'name',valueField:'id',disabled:'${disabled}'}">
			</div>
		</div>
		<div class="form-group">
			<c:if test="${!disableLabel||disableLabel==false}">
				<label for="input-department" class="col-sm-2 col-xs-2 text-left">${!empty orgLabel?orgLabel:"部门"}</label>
			</c:if>
			<div class="${empty contentClass?'col-sm-10 col-xs-10':contentClass}">
				<input style="background-color: #fff" id="dep-tree-Select" type="text" class="form-control dd-dropdown-tree" readonly="readonly" data-tree-href="${ctx}/sys/dep/tree" data-tree-view="dep-tree"
					id="input-department" placeholder="请选择部门"> <input type="hidden" id="dep-tree-Select-id" value="${depId}">
			</div>
			<div id="dep-tree" style="display: none;"></div>
		</div>
	</c:otherwise>
</c:choose>

<!-- <table id="dep_tree"></table> -->


<script type="text/javascript">
    $(function() {
	_initOrgSelct();
	initTagEvent();
    });

    function _initOrgSelct() {
	//     $('.customSelect').each(function(i, k) {
	var _this = $('#org-select');
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
		    html += '<select class="form-control ${empty orgClass?'':orgClass}"  id="' + _id + '"';
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
		        // 		        $('#' + _id).on('change', function() {

		        // 			    cascadeSelect(_refid, $('#' + _id).val());
		        // 		        })
		        var treeDom = document.getElementById(_refid);
		        initTreeSelect(treeDom);
		    }
		    var orgId = $('#' + _id).children('option:selected').val();
		    console.log("orgId=" + orgId);
		    if(typeof(refreshValidator)=="function"){
			refreshValidator();
		    }

	        },
	        error : function(error) {
	        }

	    });
	}
	// });
    }
    function getSeletedOrg() {
	return $("#org-select-Select").children('option:selected').val();
    }

    function initTagEvent() {
	$(document).on('change', '#org-select-Select', function() {
	    console.log("changed！");
	    var orgId = $(this).children('option:selected').val();
	    // 	    initTreeView(orgId);
	    // 		if(orgId==""){
	    // 		   $("#dep-tree-Select").attr("disabled", true);
	    // 		}else{
	    // 		   $("#dep-tree-Select").attr("disabled", false);		    
	    // 		}
	    var dom = document.getElementById('dep-tree-Select');
	    var viewId = $(dom).attr("data-tree-view");
	    if ($(dom).hasClass('show-view')) {
		$("#" + viewId).hide();
		$(dom).removeClass('show-view');
	    }
	    $('#dep-tree-Select-id').val("");
	    initTreeSelect(dom);
	    if (typeof (onOrgChanged) == "function") {
		onOrgChanged(orgId);
	    }

	});
	$(document).delegate(".dd-dropdown-tree", "click", function(e) {
	    console.log("click");
	    var orgId = getSeletedOrg()
	    console.log("click orgid=" + orgId);
	    var viewId = $(this).attr("data-tree-view");
	    //		var href=$(this).attr("data-tree-href");
	    if ($(this).hasClass("show-view")) {
		$("#" + viewId).hide();
		$(this).removeClass("show-view");
	    } else {
		if (orgId == "") {
		    layer.alert("请先选择组织机构！");
		    return;
		}
		$("#" + viewId).show();
		$(this).addClass("show-view");
		// 		initTreeSelect(this);
	    }
	    e.stopPropagation();
	});
	/* $(document).delegate(".dd-dropdown-tree", "mouseleave", function() {
	    var viewId = $(this).attr("data-tree-view");
	    //		var href=$(this).attr("data-tree-href");
	    if ($(this).hasClass("show-view")) {
		$("#" + viewId).hide();
		$(this).removeClass("show-view");
	    }
	}); */
	$(document).click( function() {
	    var viewId = $('#dep-tree-Select').attr("data-tree-view");
	    if ($('#dep-tree-Select').hasClass("show-view")) {
		$("#" + viewId).hide();
		$('#dep-tree-Select').removeClass("show-view");
	    }
	});

    }

    function initTreeSelect(dom) {
	var href = $(dom).attr("data-tree-href");
	var orgId = getSeletedOrg();
	var posting = $.post(href, {
	    orgId : orgId
	}, function(resp) {
	    console.log("tree data ok");
	    if (resp && resp.code == 200)
		initSelectTreeView(dom, resp.data);
	});
    }
    function initSelectTreeView(dom, data) {
	var viewId = $(dom).attr("data-tree-view");

	var href = $(dom).attr("data-tree-href");
	var options = {
	    color : "#428bca",
	    backColor : '#ffffff',
	    onhoverColor : '#3c3c3c',
	    bootstrap2 : false,
	    showTags : true,
	    levels : 5,
	    multiSelect : false,
	    selectable : true,
	    showCheckbox : false,
	    checkedIcon : "glyphicon glyphicon-check",
	    data : data,
	    onNodeSelected : function(event, data) {
	        console.log("nodeSelected==" + data);
	        $(dom).val(data.text);
	        $("#" + dom.id + "-id").val(data.id);
	        if (typeof (onDepSelected) == 'function') {
		    onDepSelected(dom.id + "-id", data.id);
	        }
	        $("#" + viewId).hide();
	        $(dom).removeClass("show-view");
	        $("#" + viewId).treeview('unselectNode', data.nodeId)
	    },
	    onNodeChecked : function(event, data) {
	        console.log("===nodeChecked====" + JSON.stringify(data));
	        //				$(dom).val(data.text);
	        //				$("#"+dom.id+"-id").val(data.id);			
	        //				$("#"+viewId).hide();
	        //				$(dom).removeClass("show-view");
	    },
	    onNodeUnselected : function(event, data) {

	        console.log("===nodeUnSelected====" + data.text);
	    },
	    onNodeUnchecked : function(event, data) {

	        console.log("===nodeUnChecked====" + data.text);
	    },
	    onLoadSuccess : function(event, data) {
	        console.log(JSON.stringify("data==" + data));

	    }
	};
	$("#" + viewId).treeview(options);
	
	getHostHeight(dom, viewId);
	initDepSelectVal(dom,viewId);

	if (typeof (onDepSelectInit) == 'function') {
	    onDepSelectInit();
	}
    }
    function initDepSelectVal(dom,viewId) {
	var depid = $('#dep-tree-Select-id').val();
	console.log("depid=" + depid);
// 	alert(''!= depid);
	if (''!= depid) {
	    $(dom).val("${depname}");
	    $("#" + dom.id + "-id").val(depid);
	    $("#" + dom.id + "-id").attr("name", "department.id");
	} else {
	    var data=$("#"+viewId).treeview('getNode',0);
// 	    $("#" + dom.id + "-id").val("");
	    $(dom).val(data.text);
	    $("#" + dom.id + "-id").val(data.id);
	    $("#" + dom.id + "-id").attr("name", "department.id");    
	}
	//初始化部门 input 的name
	if (typeof (onDepInited) == "function") {
	    onDepInited(dom.id + "-id");
	}
    }
    function getHostHeight(dom, viewId) {
	var div = dom;
	var offsetHeight = div.offsetHeight;
	var offsetWidth = div.offsetWidth;
	//	        console.log('offsetHeight: ' + offsetHeight );
	//	        console.log('offsetWidth: ' + offsetWidth );
	var offsetLeft = div.offsetLeft;
	var offsetTop = div.offsetTop;
	//	        console.log('offsetLeft: ' + offsetLeft );
	//	        console.log('offsetTop: ' + offsetTop );
	var offsetParent = div.offsetParent;
	console.log('offsetParent: ' + offsetParent.clientHeight);
	$('#' + viewId).css({
	    position : "absolute",
	    left : offsetLeft,
	    top : offsetTop + offsetHeight,
	    width : offsetWidth,
	    height : 300,
	    overflow : "auto",
	    "z-index" : 999
	}).appendTo($(offsetParent)).show();
	// 	$(dom).addClass("show-view");
	$("#" + viewId).hide();
	$("#" + viewId).removeClass("show-view");
    }
    
    function resizeDepSelect(){
      var dom=document.getElementById("dep-tree-Select");
      getHostHeight(dom, "dep-tree");
    }
    
    // 获取选择的部门信息
    function getSelectedDep() {
		return {
		    depId : $("#dep-tree-Select-id").val(depId),
		    depName : $("#dep-tree-Select").val(depName)
		};
    }
    
    // 设置选择的部门
    function setSelectedDep(depId, depName) {
	    $("#dep-tree-Select").val(depName);
	    $("#dep-tree-Select-id").val(depId);
    }
</script>