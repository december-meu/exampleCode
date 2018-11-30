<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ attribute name="content" type="java.lang.String" required="false" description="消息内容"%>
<%@ attribute name="type" type="java.lang.String" description="消息类型：info、success、warning、error、loading"%>
<table id="userTrack_tree"></table>
<script type="text/javascript">

	$(function(){
	    initTreeView();
	});
	
    function initTreeView() {
	$.ajax({
	    url : webPath + "eqp/track/userTrackTree",
	    data : {
	        sortField : 'sortNum',
	        sortDir : 'asc'
	    },
	    type : "POST",
	    dataType : "json",
	    success : function(result) {
		    renderTree(result, "userTrack_tree");
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
	    levels : 5,
	    //multiSelect : false,
	     multiSelect: true,    //多选
	    selectable : true,
	    showBorder : false,
	    showCheckbox : false,
	    onhoverColor : "#eee",
	    data : data,

	    onNodeSelected : function(event, data) {

	        var nodes = $('#' + viewId).treeview('getSelected');
	        var node = nodes[1];
	        if (typeof (onItemNodeSelected) == "function") {
	            onItemNodeSelected(node.user_id);
	        }

	    },
	    onNodeChecked : function(event, data) {
	    },
	    onNodeUnselected : function(event, data) {
	    },

	    onNodeUnchecked : function(event, data) {

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

    function getSelectedNode() {
	var selectedNodes = $("#userTrack_tree").treeview('getSelected');
	if (selectedNodes.length > 0) {
	    return selectedNodes[0].id;
	} else {
	    return "";
	}
    }
    function getNodeWithChildrenIds(nodeId){
		
    }

</script>