<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ attribute name="labelClass" type="java.lang.String" required="false" description="标签名css类"%>
<%@ attribute name="contentClass" type="java.lang.String" required="false" description="内容css类"%>
<%@ attribute name="disableLabel" type="java.lang.Boolean" required="false" description="内容css类"%>
<%@ attribute name="wrapped" type="java.lang.String" required="false" description="内容css类"%>
<%@ attribute name="dropdownHeight" type="java.lang.String" required="false" description="内容css类"%>
<%@ attribute name="type" type="java.lang.String" description="消息类型：info、success、warning、error、loading"%>

<c:choose>
	<c:when test="${!empty wrapped&&wrapped=='false'}">
		<div class="${empty contentClass?'col-sm-10 col-xs-10':contentClass}">
			<input id="category-tree-Select" type="text" class="form-control dd-dropdown-tree" readonly="readonly" data-tree-href="${ctx}/process/category/tree" data-tree-view="category-tree"
				id="input-categoryartment" placeholder="流程类别"> <input type="hidden" name="category" id="category-tree-Select-id" value="${categoryId}">
		</div>
		<div id="category-tree" style="display: none;"></div>
	</c:when>
	<c:otherwise>
		<div class="form-group">
			<c:if test="${empty disableLabel||disableLabel!=true}">
				<label for="input-categoryartment" class="${empty labelClass?'col-sm-2 col-xs-2 text-left':labelClass}">类别</label>
			</c:if>
			<div class="${empty contentClass?'col-sm-10 col-xs-10':contentClass}">
				<input id="category-tree-Select" type="text" class="form-control dd-dropdown-tree" readonly="readonly" data-tree-href="${ctx}/process/category/tree" data-tree-view="category-tree"
					id="input-categoryartment" placeholder="流程类别"> <input type="hidden" name="category" id="category-tree-Select-id" value="${categoryId}">
			</div>
			<div id="category-tree" style="display: none;"></div>
		</div>
		<table id="categroy_tree"></table>
	</c:otherwise>

</c:choose>
<input type="hidden" id="dropdownHeight" value="${empty dropdownHeight?300: dropdownHeight}"></input>


<script type="text/javascript">
    $(function() {
	var dom = document.getElementById("category-tree-Select");
	initTreeSelect(dom);
	initTagEvent();
    });

    function initTagEvent() {
	$(document).delegate(".dd-dropdown-tree", "click", function() {
	    console.log("click");
	    var viewId = $(this).attr("data-tree-view");
	    //		var href=$(this).attr("data-tree-href");
	    if ($(this).hasClass("show-view")) {
		$("#" + viewId).hide();
		$(this).removeClass("show-view");
	    } else {
		$("#" + viewId).show();
		$(this).addClass("show-view");
		// 		initTreeSelect(this);
	    }
	});

    }

    function initTreeSelect(dom) {
	var href = $(dom).attr("data-tree-href");
	var posting = $.post(href, {}, function(resp) {
	    console.log("tree data ok");
	    initTreeView(dom, resp);
	});
    }
    function initTreeView(dom, data) {
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
	initDepSelectVal(dom);
    }
    function initDepSelectVal(dom) {
	var categoryid = $('#category-tree-Select-id').val();
	console.log("categoryid=" + categoryid);
	if ('' != categoryid) {
	    $(dom).val("${categoryname}");
	    $("#" + dom.id + "-id").val(categoryid);
	    $("#" + dom.id + "-id").attr("name", "category");
	}
    }
    function getHostHeight(dom, viewId) {
	var height = $('#dropdownHeight').val();
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
	    height : height,
	    overflow : "auto",
	    "z-index" : 999
	}).appendTo($(offsetParent)).show();
	// 	$(dom).addClass("show-view");
	$("#" + viewId).hide();
	$("#" + viewId).removeClass("show-view");
    }
</script>