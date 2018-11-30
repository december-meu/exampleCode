<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ taglib prefix="wfl" tagdir="/WEB-INF/tags/wfl"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<style type="text/css">
.searchForm td {
	font-size: 0.6rem;
}

.td_label {
	direction: rtl;
}
</style>
</head>
<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="row">
			<div class="col-sm-12 animated fadeInRight">

				<form id="searchForm" class="form-horizontal">
					<div class="form-group">
						<div class="col-sm-2 col-xs-2">
							<input type="text" class="form-control" id="search-name" name="initiatorName" placeholder="申请人" value="">
						</div> 
<!-- 						<div class="col-sm-2 col-xs-2"> -->
<!-- 							<select class="form-control" data-options="required:false" id="isCheckout" name="processorType" panelHeight="auto"> -->
<!-- 								<option value="0" selected>参与方式</option> -->
<!-- 								<option value="1">发起人</option> -->
<!-- 								<option value="2">参与人</option> -->
<!-- 							</select> -->
<!-- 						</div> -->
						<wfl:categorySelect contentClass="col-sm-2 col-xs-2" disableLabel="true" wrapped="false"></wfl:categorySelect>
						<div class="col-sm-2">
							<button id="btn_search" type="button" class="btn btn-info dd-btn-search" data-form="searchForm" data-table="dataList">查询</button>
							<button id="btn_reset" type="button" class="btn btn-danger dd-btn-reset clear-hidden" data-form="searchForm" data-table="dataList">重置</button>
						</div>
					</div>
				</form>
				<div id="toolbar">
<!-- 					<button id="btn_test" type="button" class="btn btn-primary"> -->
<!-- 						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>测试 -->
<!-- 					</button> -->
				</div>
				<table id="dataList"></table>
			</div>
		</div>
	</div>

	<script type="text/javascript">
	$(function() {
	    initGrid();
        });
        function initGrid() {
	    // 		alert("ok");
	    var columns = [ [ {
	        field : 'id',
	        checkbox : true
	    }, {
	        field : 'initator',
	        title : '申请人',
	        align : 'center',

	        sortable : false,
	        formatter : function(value, row, index) {
	            if (row.initator) {
		        return row.initator.username;
	            } else {
		        return "";
	            }

	        }

	    }, {
	        field : 'processName',
	        title : '流程名称',
	        align : 'center',

	        sortable : false

	    }, {
	        field : 'startTime',
	        title : '发起时间',
	        align : 'center',

	        sortable : false

	    }, {
	        field : 'isSuspended',
	        title : '流程状态',
	        align : 'center',

	        sortable : false,
	        styler : function(value, rowData, rowIndex) {
	            if (value == 0) {
		        return 'background-color:#ffee66;color:red;';
	            }
	        },
	        formatter : function(value, row, index) {
	            if (value == true) {
		        return "挂起";
	            } else {
		        if (row.isFinished) {
		            return "结束";
		        } else {
		            return "流转";
		        }
	            }

	        }

	    }, {
	        field : 'taskName',
	        title : '当前节点',
	        align : 'center',

	    // 				hidden : true
	    },/*  {
	        field : 'createDate',
	        title : '创建时间',
	        align : 'center',

	        sortable : false

	    }
	    , {
	        field : 'editDate',
	        title : '编辑时间',
	        align : 'center',

	        sortable : false,
	        hidden : true

	    } */ 
	    {
        field : '_op',
        title : '操作',
        align : 'center',
        formatter : function(value, row, index) {
            return "<a href='javascript:void(0);' onclick=detaillist('" + row.proDefKey + "','" + row.taskId + "')>任务办理</a>"
        }

    }
	    ] ];

	    var toolbar = [ {
	        id : 'btnAdd',
	        text : '报账测试',
	        iconCls : 'icon-add',
	        handler : function() {
	            startBorrowProcess();
	        }
	    } ];
	    var url = webPath + 'process/task/todo/list';
	    $("#dataList").bootstrapTable(getBsTableOptions(url, "toolbar", columns, null, null));

	    /* 	$('#dataList').datagrid({
	    		method : 'post',
	    		height : 'auto',
	    		// 			idField : 'id',
	    		nowrap : false,
	    		striped : true,
	    		title : '报账单明细列表',
	    		fitColumns : true,
	    		sortName : 'id',
	    		sortOrder : 'desc',
	    		url : webBasePath + 'process/task/todo/list',
	    		queryParams : {},
	    		loadMsg : I18N.msg_loading,
	    		pageList : [ 5, 10, 15, 20 ],
	    		pagination : true,
	    		rownumbers : true,
	    		columns : columns,
	    		toolbar : toolbar,
	    		//仅点击复选框可选中行
	    		checkOnSelect : false,
	    		onBeforeLoad : function(param) {

	    		},
	    		onLoadSuccess : function(data) {
	    			//							alert(data.tatal);
	    			// 							showEmptyDataTip(data, "dataList");s
	    			$('#dataList').datagrid('clearSelections'); // 一定要加上这一句，要不然datagrid会记住之前的选择状态，删除时会出问题

	    		},
	    		onLoadError : function(data) {
	    			showErrorWindow(data);
	    		},
	    		onDblClickRow : function(rowIndex, rowData) {
	    			//				        	 $(this).datagrid('unselectRow', rowIndex);
	    			// 					var id = rowData.id;
	    			// 					var taskId=rowData.taskId;
	    			detaillist(rowData.id, rowData.taskId);
	    		}

	    	}); */
        }

        /**
         * 查看明细账
         */
        function detaillist(proDefKey, taskId) {
	    console.log("pk:" + proDefKey);
	    if (taskId != null) {
	        layer.open({
	            type : 2,
	            closeBtn:0,
	            title : null,
	            shade : [ 0.5, '#000', true ],
	            // closeBtn: 0, //不显示关闭按钮
	            shade : [ 0 ],
	            area : [ '100%', '100%' ],
	            // offset: 'rb', //右下角弹出
	            // time: 2000, //2秒后自动关闭
	            anim : 2,
// 	            content : [ webPath+"/process/task/todo/detail/"+ taskId, 'no' ], // iframe的url，no代表不显示滚动条
	            content : [ webPath+"/process/task/detail?sourcePage=1&taskId="+ taskId+"&proDefKey="+proDefKey ], // iframe的url，no代表不显示滚动条

	            cancel : function() {
		        //右上角关闭回调
	            },
	            end : function() { // 此处用于演示

	            }
	        });
	    }

        }

        function startBorrowProcess() {
	    var option = {
	        title : '查看明细',
	        href : 'fin/borrow/addborrowPage',
	        width : 400,

	        modal : true,
	        method : 'post',
	        iconCls : 'icon-edit',
	        height : 300,
	        onLoad : function() {
	            //				$("#dataForm").form('load', rows[0]);
	            //				$("#confirmPwd").val(rows[0].loginPassword);
	        },
	        onDestroy : function() {
	            $('#dataList').datagrid('reload');
	        },
	        buttons : [ {
	            text : I18N.save,
	            iconCls : 'icon-save',
	            handler : function() {
	                save();
	            }
	        }, {
	            text : I18N.close,
	            iconCls : 'icon-cancel',
	            handler : function() {
	                closeTempDialog();
	            }
	        } ]

	    }
	    showTempDialog(option);

        }

        function query() {
	    var params = formtoJsonTrim("searchForm");
	    console.log("params=" + JSON.stringify(params));
	    var queryParams = $('#dataList').datagrid('options').queryParams;
	    $.extend(queryParams, params);
	    $('#dataList').datagrid('load');
        }

        function reset() {
	    var queryParams = $('#dataList').datagrid('options').queryParams;
	    $("#searchForm").form("reset");
	    queryParams = {};
	    $('#dataList').datagrid('load', queryParams);
        }
    </script>
</body>
</html>