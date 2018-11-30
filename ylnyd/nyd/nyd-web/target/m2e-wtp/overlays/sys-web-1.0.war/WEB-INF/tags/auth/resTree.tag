<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
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
			<input class="form-control" type="text" value="资源树列表" readonly="readonly">
		</div>
	</div>
</form>
<table id="res_tree" style="width: 100%"></table>


<script type="text/javascript">
    $(function() {
	initDomEvent();
    });

    function initDomEvent() {
	initTreeView();
    }

    function initTreeView(pid) {
	var resUrl="";
	if($("#res_url").val()!=""){	    
		resUrl=webPath+"/"+$("#res_url").val();
	}else{
	    resUrl=webPath + "/sys/res/tree";
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
			var data=preProcess(result.data);
		    renderTree(data, "res_tree");

	        } else {
		    layer.alert(result.msg);
	        }

	    },
	    error : function(error) {
	    }
	});
    }
    
    function preProcess(data){
		var excludeType=$('#exclude_type').val();
		if(excludeType!=""){
		    
		    
		    
		}else{
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
	if ($('#select_flag').val()=='true') {
	    var selectIds=$('#selectIds').val();
	    initBsTree(viewId, options,selectIds);
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
	var selectedNodes = $("#res_tree").treeview('getSelected');
	if (selectedNodes.length > 0) {
	    return selectedNodes[0].id;
	} else {
	    return "";
	}
    }
</script>