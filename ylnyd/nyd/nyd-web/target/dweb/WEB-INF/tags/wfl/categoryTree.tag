<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="ctxStatic" value="${pageContext.request.contextPath}/static" />
<%  
  String basePath = request.getContextPath();  
  String rootPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();
  String path = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath+"/";
  String domainPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/";
%> 
<%@ attribute name="content" type="java.lang.String" required="false" description="内容"%>
<%@ attribute name="filter" type="java.lang.Integer" required="false" description="是否根据"%>
<%@ attribute name="type" type="java.lang.String" description="消息类型：info、success、warning、error、loading"%>
<table id="category_tree"></table>
<input type="hidden" id="category_filter" value="${filter}"/>
<script type="text/javascript">
	var category={};
	$(function(){
	    initTreeView();
	});
    function initTreeView(nodeId) {
	var data={
	        sortField : 'sortNum',
	        sortDir : 'asc',
	    };
	
	if($('#category_filter').val()==1){		    
		data.filter=1;
	}
	$.ajax({
	    url : "<%=path%>/process/category/tree",
	    data : data,
	    type : "POST",
	    dataType : "json",
	    success : function(result) {
		    renderTree(result, "category_tree",nodeId);
// 	        if (result.code == "200") {
// 		    renderTree(result.data, "category_tree");
// 	        } else {
// 		    layer.alert(result.msg);
// 	        }
	    },
	    error : function(error) {
	    }
	});
    }
    function renderTree(baseData, viewId,nodeId) {
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
	    data : baseData,

	    onNodeSelected : function(event, data) {
	        var nodes = $('#' + viewId).treeview('getSelected');
	        var node = nodes[0];
	        if (typeof (onItemNodeSelected) == "function") {
	            
	            onItemNodeSelected(node.id);
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
	$("#" + viewId).treeview("expandAll",{levels: 1,
		silent : true
	    });
	
	if(nodeId!="undefined"&&nodeId!=null){
	    $("#" + viewId).treeview('selectNode', Number(nodeId), {
		silent : true
	    });
	    $("#" + viewId).treeview('expandNode',Number(nodeId), {levels: 1,
		silent : true
	    });
	    
	}else if (baseData && baseData.length > 0) {
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
	var selectedNodes = $("#category_tree").treeview('getSelected');
	if (selectedNodes.length > 0) {
	    return selectedNodes[0].id;
	} else {
	    return "";
	}
    }
    function getSelectedCategoryNodeId(){
		var nodeid=$("#category_tree ul li.node-selected").attr('data-nodeid')
		return nodeid;
    }

</script>