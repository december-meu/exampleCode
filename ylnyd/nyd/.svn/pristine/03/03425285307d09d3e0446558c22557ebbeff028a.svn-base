<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="ctxStatic" value="${pageContext.request.contextPath}/static"/>
<%@ attribute name="pid" type="java.lang.String" required="false" description="父资源id"%>
<%@ attribute name="isSelectView" type="java.lang.String" required="false" description="是否选择组件"%>
<%@ attribute name="selectedIds" type="java.lang.String" required="false" description="已选id"%>
<%@ attribute name="resUrl" type="java.lang.String" required="false" description="已选id"%>
<%@ attribute name="excludeType" type="java.lang.String" required="false" description="依照节点类型排除规则"%>
<input type="hidden" value="${excludeType}" id="exclude_type"></input>
<input type="hidden" value="${selectedIds}" id="selectIds"></input>
<input type="hidden" value="${isSelectView}" id="select_flag"></input>
<input type="hidden" value="${resUrl}" id="res_url"></input>
<form class="form-horizontal">

	<div class="form-group">
		<div class="col-sm-12 col-xs-12">
			<input class="form-control" type="text" value="部门树列表" readonly="readonly">
		</div>
	</div>
</form>
<table id="dep_tree" style="width: 100%"></table>


<script type="text/javascript">
    $(function() {
	initDomEvent();
    });

    function initDomEvent() {
	initTreeView();
    }

    function initTreeView(pid) {
	var resUrl = "";
	if ($("#res_url").val() != "") {
	    resUrl = webPath + "/" + $("#res_url").val();
	} else {
	    resUrl = webPath + "/sys/dep/tree/json/common";
	}
	$.ajax({
	    url : resUrl,
	    data : {
	        pid : pid,
	        sortField : 'sortNum',
	        sortDir : 'asc'
	    },
	    type : "POST",
	    dataType : "json",
	    success : function(result) {
	        if (result.code == "200") {
		    var data = preProcess(result.data);
		    renderTree(data, "dep_tree");

	        } else {
		    layer.alert(result.msg);
	        }

	    },
	    error : function(error) {
	    }
	});
    }

    function preProcess(data) {
	var excludeType = $('#exclude_type').val();
	if (excludeType != "") {

	} else {
	    return data;
	}

    }
    function renderTree(data, viewId) {
	var options = {
	    color : "#333",
	    bootstrap2 : false,
	    showTags : true,
	    levels : 5,
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
	        if (typeof (onNodeSelected) == "function") {
		    onNodeSelected(node.id);
	        }

	    },
	    onNodeChecked : function(event, data) {
	        tree.onNodeChecked(data);
	    },
	    onNodeUnselected : function(event, data) {
	        // 	        console.log("nodeUnSelected==:" + currentNodeId);
	        // 	       console.log("node Click==:"+JSON.stringify(data));
	        // 获取当前节点对象
	        // var node = treeView.treeview('getNode', nodeid);

	    },

	    onNodeUnchecked : function(event, data) {

	        // tree.onNodeUnchecked(data);
	        // //console.log("===nodeUnChecked====" + data.text);
	    }
	};
	if ($('#select_flag').val() == 'true') {
	    var selectIds = $('#selectIds').val();
	    initDepBsTree(viewId, options, selectIds);
	} else {
	    $("#" + viewId).treeview(options);
	}
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

    function getSelectedNodeId() {
	var selectedNodes = $("#dep_tree").treeview('getSelected');
	if (selectedNodes.length > 0) {
	    return selectedNodes[0].id;
	} else {
	    return "";
	}
    }
    
    function initDepBsTree(treeId, options, selectIds) {
	    var ids = selectIds.split(",");
	    var data = options.data;
	    /*
	     * function initData(data) { $.each(data, function(i, node) { if
	     * ($.inArray(node.id, ids) != -1) { node.state.checked = true; if
	     * (node.nodes) { initData(node.nodes); } } }); }
	     */

	    options.multiSelect = true;
	    options.showCheckbox = true;
	    options.selectedBackColor="#ffffff00"
	    options.selectedColor="#333"

	    var tree = $('#' + treeId);
	    var nodeCheckedSilent = false;
	    
	    function nodeSelected(event,node){
		if (nodeCheckedSilent) {
		    return;
		}
		nodeCheckedSilent = true;
		checkAllParent(node);
		// checkAllSon(node);
		nodeCheckedSilent = false;
	    }
	    function nodeUnselected(event,node){
		if (nodeUncheckedSilent)
		    return;
		nodeUncheckedSilent = true;
		// uncheckAllParent(node);
		uncheckAllSon(node);
		nodeUncheckedSilent = false;
	    }
	    function nodeChecked(event, node) {
		if (nodeCheckedSilent) {
		    return;
		}
		nodeCheckedSilent = true;
// 		checkAllParent(node);
		 checkAllSon(node);
		nodeCheckedSilent = false;
	    }

	    var nodeUncheckedSilent = false;
	    function nodeUnchecked(event, node) {
		if (nodeUncheckedSilent)
		    return;
		nodeUncheckedSilent = true;
		// uncheckAllParent(node);
		uncheckAllSon(node);
		nodeUncheckedSilent = false;
	    }

	    // 选中全部父节点
	    function checkAllParent(node) {
		tree.treeview('checkNode', node.nodeId, {
		    silent : true
		});
		tree.treeview('selectNode', node.nodeId, {
		    silent : true
		});
		var parentNode = tree.treeview('getParent', node.nodeId);
		if (!("nodeId" in parentNode)) {
		    return;
		} else {
		    checkAllParent(parentNode);
		}
	    }
	    // 取消全部父节点
	    function uncheckAllParent(node) {
		tree.treeview('uncheckNode', node.nodeId, {
		    silent : true
		});
		tree.treeview('unselectNode', node.nodeId, {
		    silent : true
		});
		var siblings = tree.treeview('getSiblings', node.nodeId);
		var parentNode = tree.treeview('getParent', node.nodeId);
		if (!("nodeId" in parentNode)) {
		    return;
		}
		var isAllUnchecked = true; // 是否全部没选中
		for ( var i in siblings) {
		    if (siblings[i].state.checked) {
			isAllUnchecked = false;
			break;
		    }
		}
		if (isAllUnchecked) {
		    uncheckAllParent(parentNode);
		}

	    }

	    // 级联选中所有子节点
	    function checkAllSon(node) {
		tree.treeview('checkNode', node.nodeId, {
		    silent : true
		});
		if (node.nodes != null && node.nodes.length > 0) {
		    for ( var i in node.nodes) {
			checkAllSon(node.nodes[i]);
		    }
		}
	    }
	    // 级联取消所有子节点
	    function uncheckAllSon(node) {
		tree.treeview('uncheckNode', node.nodeId, {
		    silent : true
		});
		if (node.nodes != null && node.nodes.length > 0) {
		    for ( var i in node.nodes) {
			uncheckAllSon(node.nodes[i]);
		    }
		}
	    }
	    options.onNodeSelected=nodeSelected;
	    options.onNodeUnselected=nodeUnselected;
	    options.onNodeChecked = nodeChecked;
	    options.onNodeUnchecked = nodeUnchecked;
	    tree.treeview(options);

	    var nodes = tree.treeview('getEnabled');
//	    console.log("nodes=" + JSON.stringify(nodes));
//	    console.log("nodes=" + JSON.stringify(ids));
	    $.each(nodes, function(i, node) {
		if ($.inArray(node.id, ids) != -1) {
		    tree.treeview('selectNode', node, {
			silent : true
		    });
		}
	    });
	    bsTree.callback = function() {

		var selectNodes = tree.treeview('getEnabled');

		var resIds = "";
		for (var i = 0; i < selectNodes.length; i++) {
		    if(selectNodes[i].state.checked){
			resIds += selectNodes[i].id + ","
		    }
		}
		if(resIds.length>0){
		    resIds=resIds.substring(0,resIds.length-1);
		}
//		console.log("selectIds=" + resIds);
		return resIds;
	    }

	}
</script>