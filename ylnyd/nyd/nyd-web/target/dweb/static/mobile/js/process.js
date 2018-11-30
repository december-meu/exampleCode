$(function() {
	initBtns();
})
function initBtns() {

			var isAssign = $('#taskAssign').val();
			// 			console.log("isAssign:" + isAssign);
			if (isValidStr(isAssign)) {
				$('#assign').show();
				$('#candidate').hide();
				$('#assignHint').text("待办理");
			} else {
				$('#assign').hide();
				$('#candidate').show();
				$('#assignHint').text("待签收");

			}
		}
function claim(taskId, userId) {
//	alert("mobile/common/");
	var params = {};
	var posting = $.get(webBasePath + 'fin/reimburse/process/task/claim/'
			+ taskId, params, function(data) {
		// 			$('#dataList').datagrid('reload');
		// 			closeDialog();
		if (data.code == 200) {
			var userId = data.data;
			// 							console.log("assign:" + userId);
			$('#taskAssign').val(userId);
			initBtns();
			// 					closeWindow();
			history.go(0);
		}
	});
	posting.fail(function(data) {
		showErrorWindow(data);
	});

}

function jumpM(backOrForword, taskId) {
	// 			var taskId = $('#taskId').val();
		    $.modal({
		      text: '<ul style="margin:0;padding:0">'+
						'<li style="list-style-type:none">'+
							'<div class="item-content">'+
								'<div class="item-inner">'+
									'<div class="item-input">'+
										'<div class="item-title label">批注:</div>'+
										'<textarea placeholder="特殊事项说明" id="comment" name="comment" style="width:93%;resize:none"></textarea>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</li>'+
					'</ul>',
		      buttons: [
		        {
		          text: '确认',
		          onClick: function() {
		        		var comment = $('#comment').val();
		        		// 			console.log(comment)
		        		if (!isValidStr(comment)) {
		        			comment = "blank";
		        		}
		        		if (comment == 'blank') {
		        			showMsg("请先输入驳回意见！");
		        			return;
		        		}
		        		var param = encodeURI(encodeURI(comment));
		        		var url = webBasePath +'/process/task/activitis/' + backOrForword + "/" + taskId
		        				+ "/m?comment=" + param;
//		        		$.router.load(url);
//		        		console.log(url)
		        		window.location.href=url;
		          }
		        },
		        {
		          text: '取消',
		          onClick: function() {
		          }
		        }
		      ]
		    })
}

function rollbackSingle(taskId) {
	
	
    $.modal({
	      text: '<ul style="margin:0;padding:0">'+
					'<li style="list-style-type:none">'+
						'<div class="item-content">'+
							'<div class="item-inner">'+
								'<div class="item-input">'+
									'<div class="item-title label">批注:</div>'+
									'<textarea placeholder="特殊事项说明" id="comment" name="comment" style="width:93%;resize:none"></textarea>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</li>'+
				'</ul>',
	      buttons: [
	        {
	          text: '确认',
	          onClick: function() {
	        	    var comment = $('#comment').val();
	        	    // console.log(comment)
	        	    if (!isValidStr(comment)) {
	        		showMsg("请先输入驳回意见！");
	        	    }
	        	    if (comment == 'blank') {
	        		showMsg("请先输入驳回意见！");
	        		return;
	        	    }
	        	    params = {
	        		keys : 'comment,reject',
	        		values : comment + ",true",
	        		types : 'S,S'
	        	    }
	        	    var posting = $.post(webPath + 'process/task/rollback/' + taskId + "/m", params, function(result) {
	        		if (result.code == "200") {
//	        		    parent.$("#dataList").bootstrapTable('refresh', {
//	        			silent : true,
//	        		    });
//	        		    parent.layer.closeAll();
	        			$.alert(result.msg,function(){
	        				$.router.back(true);
	        			})
	        			
	        		} else {
	        		    $.alert(result.msg);
	        		}
	        	    });
	        	    posting.fail = function(data) {
	        		if (data.msg) {
	        		    $.alert(result.msg);
	        		} else {
	        		    $.alert("操作失败！");
	        		}
	        	    };
	          }
	        },
	        {
	          text: '取消',
	          onClick: function() {
	          }
	        }
	      ]
	    })
}







$(document).off('click', '.more-actions');
$(document).on(
		'click',
		'.more-actions',
		function() {

			var proInstanceId = $('#processInstace_id').val();
			var buttons1 = [
					{
						text : '请选择',
						label : true
					},
					{
						text : '查看流程图',
						bold : true,
						color : 'success',
						onClick : function() {
							// 		            $.alert("你选择了“退出“");
							$.router.load(webBasePath+"process/viewPage/"
									+ proInstanceId + "/m?type=image");
							// 					 history.go(0);
						}
					}
			// 		        ,
			// 		        {
			// 		          text: '清kogn',
			// 		          onClick: function() {
			// 		            $.alert("你选择了“买入“");
			// 		          }
			// 		        }
			];
			var buttons2 = [ {
				text : '取消',
				bg : 'danger'
			} ];

			if ($('#current-user').length > 0) {
				var btnVisit = {

					text : '查看流程图',
					bold : true,
					onClick : function() {
						//		 		            $.alert("你选择了“退出“");
						$.router.load(webBasePath+"process/task/viewPage/"
								+ proInstanceId + "/m?type=xml");
						//		 					 history.go(0);
					}
				};
				buttons1.push(btnVisit);
			}

			var groups = [ buttons1, buttons2 ];
			$.actions(groups);
		});

function complete(op) {

	// 			var taskKey = $('#task-key').val();
	// 			if (!isValidStr(taskKey)) {
	// 				// 				alert("ol");
	// 				taskKey = "0";
	// 			}
	// 			if(taskKey=='kjsh'){
	// 			}

	var taskId = $('#taskId').val();
	var comment = $('#comment').val();
	// 			console.log(comment)
	if (!isValidStr(comment)) {
		comment = "blank";
	}

	var params = {};
	switch (op) {
	case "approve":
		params = {
			keys : 'outcome,comment,reject',
			values : 'true,' + comment + ",false",
			types : 'S,S,S'
		}
		break;
	case "reject":
		if (comment == 'blank') {
			showMsg("请先输入驳回意见！");
			return;
		}
		params = {
			keys : 'outcome,comment,reject',
			values : 'false,' + comment + ',true',
			types : 'S,S,S'
		}
		break;
	case "submit":

		params = {
			keys : 'comment,reject',
			values : comment + ',fasle',
			types : 'S,S,S'
		}
		break;
	case "reApply":
		params = {
			keys : 'outcome,comment,reject',
			values : 'true,' + comment + ',false',
			types : 'S,S,S'
		}
		break;
	case "end":
		params = {
			keys : 'outcome,comment,reject',
			values : 'false,' + comment + ',false',
			types : 'S,S,S'
		}
		break;

	default:
		break;
	}
	var posting = $.post(webBasePath + 'process/task/complete/' + taskId, params,
			function(data) {
				// 			$('#dataList').datagrid('reload');
				// 			closeDialog();
				if (data.msg) {
					$.alert(data.msg, function() {
					       
						$.router.back(true);

					})
					// 								$.closeModal();

				}
			});
	posting.fail = function(data) {
		shoMsg(data);
	};

}
//	initBtns();
//$(function(){
//})

