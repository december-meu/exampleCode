<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>

<div style="height: 750px; overflow-y: auto;">
	<table id="st_tree"></table>
</div>

<script type="text/javascript">
var selectedNode;

$(function() {
    initTreeView();
});

function initTreeView() {
	var data = {
	    sortField : 'sortNum',
	    sortDir : 'asc'
	};

	$.ajax({
	    url : webPath + "/prj/schemeTemplate/tree",
	    data :data,
	    type : "POST",
	    dataType : "json",
	    success : function(result) {
			if (result.code == "200") {
			    renderTree(result.data.rows, "st_tree");
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
	        selectedNode = nodes[0];
	        if (typeof (onTemplateNodeSelected) == "function") {
	            onTemplateNodeSelected(selectedNode.id);
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
	    var selectedNodeId = (typeof(selectedNode) == 'undefined' || selectedNode == null) ? 0 : selectedNode.nodeId;
	    $("#" + viewId).treeview('selectNode', selectedNodeId, {
			silent : true
	    });
	    $("#" + viewId).treeview('expandAll',selectedNodeId);
	}
}

function getSelectedNode() {
	var nodes = $("#st_tree").treeview('getSelected');
	if (nodes.length > 0) {
	    return nodes[0];
	} else {
	    return "";
	}
}
</script>