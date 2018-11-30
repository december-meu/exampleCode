<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ taglib prefix="wfl" tagdir="/WEB-INF/tags/wfl"%>
<!DOCTYPE html>
<html>
<head>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<title>参与流程查询</title>
<style type="text/css">
.searchForm td {
	font-size: 0.6rem;
}

.td_label {
	direction: rtl;
}

.textbox.combo {
	width: 100px;
}
/* .fff{ */
/* 	background:#fff!important */
/* } */
</style>
</head>
<body class="gray-bg">

	<div class="wrapper wrapper-content">
		<div class="row">
			<div class="col-sm-12 col-md-12 animated fadeInRight">

				<form id="searchForm" class="form-horizontal">
					<div class="form-group">
						<div class="col-sm-9 col-xs-9">
							<div class="col-sm-2 col-xs-2" style="padding-left: 0px">
								<input type="text" class="form-control" id="search-name" name="initiatorName" placeholder="申请人" value="">
							</div>
							<div class="col-sm-2 col-xs-2">
								<input placeholder="开始日期" class="laydate-icon form-control layer-date" readonly="readonly" style="background-color: white;" id="startTime" name="startTime">
							</div>
							<div class="col-sm-2 col-xs-2">
								<input placeholder="结束日期" class="laydate-icon form-control layer-date" readonly="readonly" style="background-color: white;" id="endTime" name="endTime">
							</div>

							<div class="col-sm-2 col-xs-2">
								<select class="form-control" data-options="required:false,width:100" id="isFinished" name="isFinished">
									<option value="">申请状态</option>
									<option value="1">已完成</option>
									<option value="0">流转中</option>
								</select>
							</div>


							<div id="process-involves" class="col-sm-2 col-xs-2">
								<select id="involve-select" class="form-control" data-options="required:false" name="processorType" panelHeight="auto">
									<!--  <option value="" selected>相关参与</option> -->
                                                                        <option value=""  selected>参与人</option>
									<option value="1">发起人</option>
                                                                        <!-- <option value="2">审批人</option>指审批过的流程 -->
								</select>
							</div>
							<wfl:categorySelect contentClass="col-sm-2 col-xs-2 fff" disableLabel="true" wrapped="false"></wfl:categorySelect>
						</div>
						<div class="col-sm-3 col-xs-3">
							<div class="col-sm-10">
								<button id="btn_search" type="button" class="btn btn-info dd-btn-search" data-form="searchForm" data-table="dataList">查询</button>
								<button id="btn_reset" type="button" class="btn btn-danger dd-btn-reset clear-hidden" data-form="searchForm" data-table="dataList">重置</button>
							</div>
						</div>
					</div>
				</form>
				<div id="toolbar">
					<!-- 					<button id="btn_test" type="button" class="btn btn-primary"> -->
					<!-- 						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>测试 -->
					<!-- 					</button> -->
					<!-- 					<button id="btn_edit" type="button" class="btn btn-primary"> -->
					<!-- 						<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改 -->
					<!-- 					</button> -->
					<!-- 					<button id="btn_delete" type="button" class="btn btn-danger"> -->
					<!-- 						<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除 -->
					<!-- 					</button> -->
				</div>
				<table id="dataList"></table>
			</div>
		</div>
	</div>
	<script type="text/javascript">
	
	$(function(){
	    if(_hasRole("zhglb")){
			$("#involve-select").append('<option value="3" data-key="Dimission,Dimission-fzgs_syb,Regular,Regular-fzgs_syb,Leave-yg,Leave-bmzg,Leave-kfq,Leave-xzzj,Leave-zjl,Leave-zlgh">人事相关</option>');
			/* $('#searchForm').append("<input type='hidden' name='processKey' value='Dimission,Regular'></input>"); */
// 			$('#searchForm').append("<input type='hidden' id='processKey'  name='processKey' value='Dimission,Regular'></input>");
	    }else if(_hasRole("sjznzxzg")){
			$("#involve-select").append('<option value="3" data-key="Dimission,Dimission-fzgs_syb">离职相关</option>');
			/* $('#searchForm').append("<input type='hidden' name='processKey' value='Dimission,Regular'></input>"); */
// 			$('#searchForm').append("<input type='hidden' id='processKey' name='processKey' value='Dimission'></input>");
	    }
	    
	    $('#involve-select').change(function(){
			var val=$(this).val();
			if(val=='3'){		    
			    var keys=$(this).find("option:selected").attr('data-key');
			    $('#searchForm').append("<input type='hidden' id='processKey' name='processKey' value='"+keys+"'></input>");
			}else{

			    if($('#processKey').length>0){		
			    $('#processKey').remove();
			    }
			}
			
	    });
	    
	    
	});
	
	
	// 	    //外部js调用
        //         laydate({
        //             elem: '#hello', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
        //             event: 'focus' //响应事件。如果没有传入event，则按照默认的click
        //         });

        //日期范围限制
        var start = {
            elem : '#startTime',
            format : 'YYYY/MM/DD',
//             min : laydate.now(), //设定最小日期为当前日期
            max : '2099-06-16 23:59:59', //最大日期
//            istime : true,
            istoday : false,
            choose : function(datas) {
// 	        end.min = datas; //开始日选好后，重置结束日的最小日期
	        end.start = datas //将结束日的初始值设定为开始日
            }
        };
        var end = {
            elem : '#endTime',
            format : 'YYYY/MM/DD',
//             min : laydate.now(),
            max : '2099-06-16 23:59:59',
//            istime : true,
            istoday : false,
            choose : function(datas) {
	        start.max = datas; //结束日选好后，重置开始日的最大日期
            }
        };
        laydate(start);
        laydate(end);

        var mainTypeId = "${reimburse.mainTypeId}";
        initGrid();
        // 	var posting = $.post(webBasePath + 'fin/journal/process/task',
        // 			{"ids":ids}, function(data) {
        // 		$('#dataList').datagrid('reload');
        // 		showMsg(data.msg);
        // 	});

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
	            if(row.initator){
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
	        title : '创建时间',
	        align : 'center',
	        sortable : false

	    } , {
	        field : 'endTime',
	        title : '完成时间',
	        align : 'center',
	        sortable : false,
	        hidden : true
	    },  
	    {
	        field : 'taskName',
	        title : '当前节点',
	        align : 'center',

	    // 				hidden : true
	    }, {
        field : '_op',
        title : '操作',
        align : 'center',

        formatter : function(value, row, index) {
            return "<a href='javascript:;' onclick=detaillist('" + row.proDefKey + "','" + row.proInstanceId + "')>查看明细</a>"
        }

    } ] ];
	    var url = webPath + 'process/task/search/list';
	    $("#dataList").bootstrapTable(getBsTableOptions(url, "toolbar", columns, null, null));
        }

        /**
         * 查看明细
         */
        function detaillist(proDefKey, processInstanceId) {
	    // 			console.log("rowData="+rowData);
	    // 			var rows = $('#dataList').datagrid('getSelections');
	    //	data = JSON.stringify(rows);
	    //	alert(rows[0].id);
	    // 			var id = rowData.id;
	    // 			var taskId=rowData.taskId;
	    console.log("idkey:" + proDefKey + ",processInsatanceId=" + processInstanceId);
	    var fromPage = 2;
	    if (proDefKey != null) {
	        layer.open({
	            type : 2,
	            title : null,
	            shade : [ 0.5, '#000', true ],
	            closeBtn: 0, //不显示关闭按钮
	            shade : [ 0 ],
	            area : [ '100%', '100%' ],
	            // offset: 'rb', //右下角弹出
	            // time: 2000, //2秒后自动关闭
	            anim : 2,
// 	            content : [ webPath+"process/task/search/detail/" + processInstanceId,, 'no' ], // iframe的url，no代表不显示滚动条
	            content : [ webPath+"process/task/detail?sourcePage=2&processInstanceId=" + processInstanceId+"&proDefKey="+proDefKey ], // iframe的url，no代表不显示滚动条

	            cancel : function() {
		        //右上角关闭回调
	            },
	            end : function() { // 此处用于演示

	            }
	        });
	    }
        }
        
    </script>
</body>
</html>