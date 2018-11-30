


SPA_RESOLVE_INIT = function(transition){
//	$.post(webBasePath+"/department/hr/local/tree",function(data1){
//		console.log(data1);
//	})

	
	$.post(webBasePath+"/department/hr/local/tree",function(data1){
//		console.log(data1.data);
//		console.log(data1.data[0]);
//		console.log(data1);
	
			var aa='<div class="Dtitle">人力资源</div>'+
			'<div style="width:100%;"><div class="ibox-content fl">'+      
			'<ul class="tree">'+
	                '<li><a  id="Dli1" href="javascript:;"><i class="glyphicon glyphicon-minus"></i>西安大地测绘人员组</a>'+
	                    '<ul id="asd" class="ztree">'+
	                    '</ul>'+
	            '</li>'+
	        '</ul>'+
	        '</div>'+
	       '<div id="toolbar" class="btn-group">'+
	        '<button id="addRow" type="button" class="btn btn-success">'+
	        '<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增成员'+
	        '</button>'+
	       ' <button id="btn_edit" type="button" class="btn btn-warning">'+
	       ' <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改'+
	        '</button>'+
	        
	       ' <button  id="btn_delete" type="button" class="btn btn-danger">'+
	       ' <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除'+
	       ' </button>'+
	       ' <button id="xxsousuo" type="button" class="btn btn-info">'+
	       ' <span  class="glyphicon glyphicon-search" aria-hidden="true"></span>详细查询'+
	       ' </button>'+
	      
	       ' <button id="bunn"  type="button" class="btn btn-primary">'+
	       ' <span class="glyphicon glyphicon-search" aria-hidden="true"></span>姓名查询'+
	       ' </button>'+
	       '<input id="textContent" class="form-control" type="text" style="display:inline-block;width:90px;border:1px solid #000" >'+
	       ' <button id="birthday"  type="button" class="btn btn-primary">'+
	       ' <span class="glyphicon glyphicon-search" aria-hidden="true"></span>生日查询'+
	       ' </button>'+
	       '<input id="textContent1" class="form-control" type="text" style="display:inline-block;width:90px;border:1px solid #000" >'+
	        '</div><div id="layer_sousuo"></div>'+
	        ' <button id="reset"  type="button" class="btn btn-primary">'+
		       ' <span class="glyphicon glyphicon-search" aria-hidden="true"></span>重置'+
		       ' </button>'+
	       '<table style="float:left;" id="table_bs"></table>'+
	        '</div></div>'+
	        
			 '<div class="modal fade" id="alert-every" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
			    '<div class="modal-dialog">'+
			        '<div class="modal-content alert-every">'+
			            '<div class="modal-header">'+
			                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
			                '<h4 class="modal-title" id="myModalLabel">温馨提示：</h4>'+
			            '</div>'+
			            '<div class="modal-body" id="con-Text">'+
			            '</div>'+
			            '<div class="modal-footer">'+
			                '<button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>'+
			               
			            '</div>'+
			        '</div>'+
			    '</div>'+
			'</div>'+
//	////////////////////////////////////请在此处添加弹窗    ////////////////////////////////////////////////////////////////////
			 '<div class="modal fade" id="alert-del" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
			    '<div class="modal-dialog">'+
			        '<div class="modal-content alert-every">'+
			            '<div class="modal-header">'+
			                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
			                '<h4 class="modal-title" id="myModalLabel">温馨提示：</h4>'+
			            '</div>'+
			            '<div class="modal-body">'+
			            	'<p>确定删除吗？</p>'+
			            '</div>'+
			            '<div class="modal-footer">'+
			                '<button type="button" class="btn btn-primary" id="sure_delete" data-dismiss="modal">确定</button>'+
			                '<button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>'+
			               
			            '</div>'+
			        '</div>'+
			    '</div>'+
			'</div>'+
			
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
			
			
			
			
			'<div class="modal fade" id="success-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
		    '<div class="modal-dialog">'+
		      '  <div class="modal-content alert-edit" style="width: 1232px;margin-left: -320px">'+
		            '<div class="modal-header">'+
		                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
		                '<h4 class="modal-title" id="myModalLabel">温馨提示：</h4>'+
		            '</div>'+
		            '<div class="modal-body">'+
		            '<div class="container">'+
					'<div class="panel panel-default">'+
						'<div class="panel-heading">'+
						    '<input type="button" id="addMsg" class="btn btn-success" data-dismiss="modal" value="更新">'+
						    '<input type="button" class="btn btn-danger" data-dismiss="modal" value="取消">'+
						'</div>'+
						'<div class="panel-body">'+
							'<div class="panel panel-success">'+
								'<div class="panel-heading">基本信息</div>'+
								'<div class="panel-body">'+
								'<div class="container">'+
										'<div class="row">'+
										
											'<div class="col-sm-3" id="necessary">'+
												'<form class="form-horizontal" role="form">'+
													'<div class="form-group">'+
														'<label  class="col-sm-4" style="margin-top:5px">员工状态</label>'+
														'<div class="col-sm-8">'+
														'<form role="form">'+
														'<div class="form-group">'+
															'<select name="zhengshi" id="flagUser" disabled="disabled" class="form-control sm">'+
						                                    '<option disabled="disabled" selected="selected">请选择</option>'+
						                                    '<option value="0">正式</option>'+
						                                   ' <option value="10">实习</option>'+
					                                   ' <option value="20">临聘</option>'+
						                               '</select>'+
						                               '<span class="clarm" style="color:red;display:none">正式员工不可修改!</span>'+
						                              ' </div>'+
						                              ' </form>'+
														'</div>'+
													'</div>'+
												'</form>'+
												'<form class="form-horizontal" role="form">'+
													'<div class="form-group">'+
														'<label for="userName" class="col-sm-3">姓名</label>'+
														'<div class="col-sm-9">'+
															'<input type="text" class="form-control input-sm" id="userName" readonly="readonly">'+
															'<input type="hidden" id="oldUserId">'+
															'<input type="hidden" id="userId">'+
														'</div>'+
														
													'</div>'+
												'</form>'+
												'<form class="form-horizontal" role="form">'+
													'<div class="form-group">'+
														'<label for="department" class="col-sm-3">部门</label>'+
														'<div class="col-sm-9">'+
															'<input type="text" name="bumen" class="form-control input-sm" id="department" readonly="readonly">'+
															'<input type="hidden" class="form-control input-sm" id="departmentId" readonly="readonly">'+
															
														'</div>'+
													
													'</div>'+
												'</form>'+
											
											'</div>'+
											'<div class="col-sm-3" >'+
												'<form class="form-horizontal" role="form">'+
													'<div class="form-group">'+
														'<label for="account" class="col-sm-4" style="margin-top:5px">系统账号</label>'+
														'<div class="col-sm-8">'+
															'<input type="text" class="form-control input-sm" id="account" readonly="readonly">'+
														'</div>'+
													'</div>'+
												'</form>'+
												'<form class="form-horizontal" role="form">'+
													'<div class="form-group">'+
														'<label for="idcard" class="col-sm-4">身份证号</label>'+
														'<div class="col-sm-8">'+
															'<input type="text" class="form-control input-sm" id="idcard" readonly="readonly">'+
														'</div>'+
													'</div>'+
												'</form>'+
												'<form class="form-horizontal" role="form">'+
													'<div class="form-group">'+
														'<label for="phone" class="col-sm-4">联系电话</label>'+
														'<div class="col-sm-8">'+
															'<input type="text" class="form-control input-sm" id="phone" readonly="readonly">'+
														'</div>'+
													'</div>'+
												'</form>'+
											'</div>'+
										
											'<div class="col-sm-3">'+
												'<form class="form-horizontal" role="form">'+
													'<div class="form-group">'+
														'<label for="password" class="col-sm-4" style="margin-top:5px">密码(默认)</label>'+
														'<div class="col-sm-8">'+
															'<input type="text" class="form-control input-sm" id="password" value="1234" readonly="readonly">'+
														'</div>'+
													'</div>'+
												'</form>'+
											
												'<form class="form-horizontal" role="form">'+
													'<div class="form-group">'+
														'<label for="wechatUserId" class="col-sm-4">工号</label>'+
														'<div class="col-sm-8">'+
															'<input type="text" class="form-control input-sm" id="wechatUserId" readonly="readonly">'+
														'</div>'+
													'</div>'+
												'</form>'+
											
											
										'	</div>'+
										
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
                      ' </div>'+
		           ' </div>'+
		            '<div class="modal-footer">'+
		                '<button type="button" class="btn btn-primary closes" data-dismiss="modal">关闭</button>'+
		               
	            '</div>'+
		        '</div><!-- /.modal-content -->'+
		    '</div><!-- /.modal -->'+
		    '<div id="bbbbb" style="display:none">'+
			'</div>'+
		'</div>';
		
		
		
		
		
		
		
		
		
//		
//		'<div class="modal fade" id="wechat-situation" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
//	    '<div class="modal-dialog">'+
//	      '  <div class="modal-content">'+
//	      	'<div class="modal-body">'+
//	          '<h style="color:#5cb85c" id ="wechat-situation-wechatuserid"></h>'+
//	          '<h style="color:#5cb85c" id ="wechat-situation-serviceopenid"></h>'+
//	          '<h style="color:#5cb85c" id ="wechat-situation-unionid"></h>'+
//	          '</div>'+
//	        '</div><!-- /.modal-content -->'+
//	    '</div><!-- /.modal -->'+
//	    '</div>';
//		
//			
//			
			


			$('#content-main').html(aa)
			var setting = {
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					onClick: onClick
				}
			};
				 
					var	zTreeObj = $.fn.zTree.init($("#asd"), setting, data1);
				
					function onClick(event, treeId, treeNode, clickFlag) {
						 departmentId=treeNode.id
						 $("#table_bs").bootstrapTable('refresh',{queryParams:{departmentId:departmentId,userName:$("#textContent").val()}});//改变参数
					}

				
			
			$('#Dli1').on('click',function(e){
					departmentId=""
				$("#table_bs").bootstrapTable('refresh')
//				location.href=webBasePath+'userbase/login#/listperson'
			})
		  	$('#asd').on('click','.toggleson',function(){
		  		$('.ulss').toggle()
		  		$(this).find('i').toggleClass('glyphicon-minus glyphicon-plus')
		  	})
  	
  	
  	$("#toolbar input").css({"float":"left"})
  
  		 var departmentId='';
//  		 var textContent=$("#textContent").val()
		var datestart=''
		var dateend=''
  		var TableInit = function () {
  		 var oTableInit = new Object();
  		 //初始化Table
  		 oTableInit.Init = function () {
  		  $('#table_bs').bootstrapTable('destroy').bootstrapTable({
  		 url: webBasePath+"userbase/userPager/d", //请求后台的URL（*）
  		 method: 'post', //请求方式（*）
  		 dataType:'json',
  		 toolbar: '#toolbar', //工具按钮用哪个容器
  		 striped: false, //是否显示行间隔色
  		 cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
  		 pagination: true, //是否显示分页（*）
  		 sortable: false, //是否启用排序
  		 contentType: "application/x-www-form-urlencoded",
  		 sortOrder: "asc", //排序方式
//  		 queryParams: oTableInit.queryParams,//传递参数（*）
  		queryParams: function queryParams(params) {   //设置查询参数
  		
            var param = {
              //这里是在ajax发送请求的时候设置一些参数 params有什么东西，自己看看源码就知道了
              page: params.pageNumber,
              rows: params.pageSize,
              departmentId:departmentId,
              userName:$("#textContent").val(),
              idcardMon:$("#textContent1").val()
//              ,
//              beginTime:datestart+' 00:00:00',
//              closeTime:dateend+' 23:59:59',
//              flagUser:0
            };
//        	console.log(param)
            return param;
          },
  		 queryParamsType :'undefined',
  		 sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
  		 pageNumber:1, //初始化加载第一页，默认第一页
  		 pageSize: 10, //每页的记录行数（*）
  		 pageList: [10, 20, 30, 40], //可供选择的每页的行数（*）
  		 search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
  		 strictSearch: true,
  		 showColumns: true, //是否显示所有的列
  		 showRefresh: true, //是否显示刷新按钮
  		 minimumCountColumns: 2, //最少允许的列数
  		 clickToSelect: true, //是否启用点击选中行
  		 height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
  		 width:500,
  		 useCurrentPage:true,
//  		 uniqueId: "ID", //每一行的唯一标识，一般为主键列
  		 idField:'id',
  		 responseHandler: oTableInit.responseHandler,
  		 showToggle:true, //是否显示详细视图和列表视图的切换按钮
  		 cardView: false, //是否显示详细视图
  		 detailView: false, //是否显示父子表
  		 paginationPreText: '上一页',
         paginationNextText: '下一页',
         onPageChange:function(number, size){
        	 oTableInit.pageNumber=number
        	 oTableInit.pageSize=size

        	 console.log(oTableInit.pageNumber)
        	  console.log(oTableInit.pageSize)
         },
//         onDblClickRow:function(row,$el){
//        	 var id=row.id
//        	location.href=webBasePath+'userbase/login#/xxxx?'+id 
//        	 
//         },
  		 columns: [{
  		 checkbox: true
  		 }, {
  		 field: 'id',
  		 title: '序号'
  		 }, {
  		 field: 'userName',
  		 title: '姓名'
//  			,
//  		 formatter: function(value, row, index) {  // value:field的值,row:行数据，用row.createdDtm找发起时间字段,index:行下标
//            return '<a style="text-decoration:underline;" href="'+webBasePath+'userbase/login#/xxxx?'+row.id+' ">'+value+'</a>'
//         },
  		 }, {
  		 field: 'department',
  		 title: '部门',
  		 search:true
  		 },
  		{
  		 field: 'phone',
  		 title: '电话'
  		 }, {
  	  		 field: 'idcard',
  	  		 title: '身份证号'
  	  	}, 
  		{
  	  		 field: 'idcard',
  	  		 title: '出生日期',
  	  		 formatter: function(value, row, index) {  // value:field的值,row:行数据，用row.createdDtm找发起时间字段,index:行下标
  	  			 var birthday = value.substring(6,14);
  	            return birthday;
  	         },
  	  	}, 
  		{
  		 field: 'wechatUserId',
  		 title: '企业号',
  		formatter : function(value, row, index) {
  			var showStr = "";
  			var wechatUserId = value;
  			var serviceOpenId = row.serviceOpenId;
  			if(serviceOpenId==null||serviceOpenId==null||serviceOpenId=="null"){
  				serviceOpenId = "未关注";
  			}
  			var unionId = row.unionId;
			if(row.wechatUserId != null){
				showStr = "<h style='color:#5cb85c' >企业号</h>";
			}else{
				showStr = "<i style='color:#999' >企业号></i>";
			}
			if(row.serviceOpenId != null){
				showStr += "<br><h style='color:#5cb85c' >服务号</h>";
			}else{
				showStr += "<br><i style='color:#999' >服务号</i>";
			}
			if(row.unionId != null){
				showStr += "<br><h style='color:#5cb85c' >开放平台</h>";
			}else{
				showStr += "<br><i style='color:#999' >开放平台</i>";
			}
			return '<a href="javascript:void(0);" onclick="getWeChatSituation(\'' + wechatUserId + '\',\'' + serviceOpenId + '\',\'' + unionId + '\')"> ' + showStr + '</a>';
		}
  		 }
//  	  	,
//  		{
//  		 field: 'serviceOpenId',
//  		 title: '服务号'
//  		 },
//  		{
//  		 field: 'unionId',
//  		 title: '开放平台'
//  		 }
  		]
  		 });
  		 };
  		
//  		responseHandler加载服务器数据之前的处理程序，可以用来格式化数据。
//  		参数：res为从服务器请求到的数据。
  		oTableInit.responseHandler = function (res) { 
  		    if (res) {
  		        return {
  		            "rows" : res.rows,
  		            "total" : res.total
  		        };
  		    } else {
  		        return {
  		            "rows" : [],
  		            "total" : 0
  		        };
  		    }
  		}
  		 return oTableInit;
  		};
  		
  		 
  		var ButtonInit = function () {
  		 var oInit = new Object();
  		 var postdata = {};
  		 
  		 oInit.Init = function () {
  		 //初始化页面上面的按钮事件
  		 //部门搜索
//		  	$('#asd').on("click","li",function(e){
//				e.stopPropagation();
//				 departmentId=$(this).data("id")
//				 $("#table_bs").bootstrapTable('refresh',{queryParams:{departmentId:departmentId,userName:$("#textContent").val()}});//改变参数
//			})
//						//搜索名字按钮
			$("#bunn").on('click',function(){
//	    			e.stopproPation()
					departmentId='';
	    			if($("#textContent").val().trim()==''){
	    				alert( "搜索不可为空")
	     					 return;
	    			}else {
	    				$("#table_bs").bootstrapTable('refresh',{queryParams:{departmentId:departmentId,userName:$("#textContent").val()}});//改变参数
	        			}
	    		})
    		   $("#birthday").on('click',function(){
//	    			e.stopproPation()
					departmentId='';
	    			if($("#textContent1").val().trim()==''){
	    				alert( "搜索不可为空")
	     					 return;
	    			}else {
	    				$("#table_bs").bootstrapTable('refresh',{queryParams:{departmentId:departmentId,idcardMon:$("#textContent1").val()}});//改变参数
	    				
	        			}
	    		})
	    		 $("#reset").on('click',function(){
	    			 $("#textContent").val("");
	    			 $("#textContent1").val("");
	    			 $("#table_bs").bootstrapTable('refresh',{queryParams:{departmentId:"",userName:"",idcardMon:""}});
		    				
		        			
		    		})
	    		//新增成员
	    		$('#addRow').on('click',function(){
	    			location.href=webBasePath+'userbase/login#/ruzhi'
	    		})
	    		//详细搜索
	    			$('#xxsousuo').on('click',function(e){
	    				e.stopPropagation()
	    				departmentId='';
	    					var data={};
							var html = template("layer_sousuo1", data);
							$('#layer_sousuo').html(html);
								layer.open({
								  type: 1,
								  title:['搜索',"color:#0064B6","font-weight:bolder"],
								  content: $('#layer_sousuo'),
								  skin: 'demo-class',
								  closeBtn:2,
								  area:'800px',
								  shade:false
								});
								setTimeout(function(){
									laydate({
								        elem: '#ruzhiriqi',
								        event: 'focus',
								        choose: function(date){ //选择好日期的回调
								        	datestart=date
								        }
								    })
								    laydate({
								        elem: '#jiezhiriqi',
								        event: 'focus',
								        choose: function(date){ //选择好日期的回调
								        	dateend=date
								        }
								    })
								},30)	
//								console.log($('#queding').val())
								$('#queding').on('click',function(){
									$("#table_bs").bootstrapTable('refresh',{queryParams:{
										departmentId:departmentId,
										userName:$("#textContent").val(),
										beginTime:datestart+' 00:00:00',
										closeTime:dateend+' 23:59:59'
										}
									});
									 datestart='';
									 dateend='';
								})

									
						    	
	    		})
  		   };
  		 
  		 return oInit;
  		};
  	
  		$(function () {
  	  		 
  	  		 //1.初始化Table
  	  		 var oTable = new TableInit();
  	  		 oTable.Init();
  	  		 
  	  		 //2.初始化Button的点击事件
  	  		 var oButtonInit = new ButtonInit();
  	  		 oButtonInit.Init();
  	  		 
  	  		});
  	$('.bootstrap-table').css({'overflow':'hidden'})

    //   删除所选行 
  	function resource_delete(){
  		$("#btn_delete").on("click",function(){
  	     	 var tt=$('#table_bs').bootstrapTable('getSelections');
  	     	 if(tt.length==0){
  	     		 $("#con-Text").text("请选择删除行！");
  	     		 $("#alert-every").modal();
  	     		 return;
  	     	 }else if(tt.length==1){
  	     		$('#alert-del').modal();
  	     		$('#sure_delete').on('click',function(){
  	  	     		 var param={};
  	  	     		 param.id=tt[0].id;
  	  	     		 var posting = $.post(webBasePath + 'user/delete',param, function(data) {
  	  	     			$("#con-Text").text(data.msg);
  	  	              	$("#alert-every").modal();
  	  	              $("#table_bs").bootstrapTable('refresh');
  	  	              })
  	     		})

  	     	 }else if(tt.length>1){
  	     		$("#con-Text").text("请逐行删除！");
  	    		 $("#alert-every").modal();
  	     	 }
  	     	 
  		})
  		
    };	
  	
    resource_delete();
	    		
	    function choose_type(){
	    	$("#content-main").off("click",'#btn_edit');
	    	$("#content-main").on("click",'#btn_edit',function(){
//	    	    var urlPrm="";
	    		var tt=$('#table_bs').bootstrapTable('getSelections');
	    		if(tt.length==0){
	    			 $("#con-Text").text("请选择修改行！");
	  	     		 $("#alert-every").modal();
	  	   
	  	     		 return;
	    		}else if(tt.length==1){
	    			console.log(tt);
	    			 var account=tt[0].account;
	    			 var departmentId=tt[0].departmentId;
	    			 var phone=tt[0].phone;
	    			 var wechatUserId=tt[0].wechatUserId;
	    			 var oldUserId=tt[0].oldUserId;
	    			 var userId=tt[0].id; 
	    			 var idcard=tt[0].idcard;
		    		 var department=tt[0].department;
		    		 var userName=tt[0].userName;
		    		 var flagUser=tt[0].flagUser;
		    		 $("#account").val(account);
	    			 $("#departmentId").val(departmentId);
	    			 $("#phone").val(phone);
	    			 $("#wechatUserId").val(wechatUserId);
	    			 $("#oldUserId").val(oldUserId);
	    			 $("#userId").val(userId);
	    			 $("#idcard").val(idcard);
	    			 $("#department").val(department);
	    			 $("#userName").val(userName);
	    			 $("#flagUser").val(flagUser);
	    			 
	    			 if(flagUser==0){
	    				 $("#flagUser").find("option[text='正式']").attr("selected",true);
	    			 }else if(flagUser==10){
	    				 $("#flagUser").find("option[text='实习']").attr("selected",true);
	    			 }else if(flagUser==20){
	    				 $("#flagUser").find("option[text='临聘']").attr("selected",true);
	    			 }
	    			 var userid=tt[0].id
	 	    	     var aa='<input type="button" class="btn btn-success" id="edit-department" value="修改部门" style="margin-left: 58px" data-dismiss="modal">'+
	 	    	            '<input type="button" class="btn btn-success" id="edit-phone" value="修改联系方式" style="margin-left: 58px" data-dismiss="modal">'+
	 	    	            '<input type="button" class="btn btn-success" id="edit-flagUser" value="修改工作状态" style="margin-left: 58px" data-dismiss="modal">'
	 	    		     $("#con-Text").html(aa);
	    			 
	    			 $("#alert-every").modal();
	    			 console.log($("#alert-every").html())
	    			  $("#edit-department").off("click");
	    			 $("#edit-department").on("click",function(){
	    			 edit_department();
	    				});
	    			 $("#edit-phone").off("click");
	    			 $("#edit-phone").on("click",function(){
	    			 edit_phone();
	    			 });
	    			 $("#edit-flagUser").off("click");
	    			 $("#edit-flagUser").on("click",function(){
	    			 edit_flaguser();
	    			 });
	    		}
	    	})
	    }		
	    
	    choose_type();	
	      function edit_department(){
	    		$("#department").removeAttr("readonly");
	    		$("#phone").attr("readonly","readonly");
	    		$("#userName").attr("readonly","readonly");
	    		$("#flagUser").attr("disabled","disabled");
	    		$("#department").css("border-color","blue");
	    		$("#phone").css("border-color","#e5e6e7");
	    		$("#flagUser").css("border-color","#e5e6e7");
	    		getDepartmentId();
	    		$("#success-delete").modal();
	    		$("#content-main").off("click","#addMsg");
	    		$("#content-main").on("click","#addMsg",function(){
	    			var userId=$("#userId").val();
		    		var departmentId=$("#departmentId").val();
		    		var params={};
		    		params.userId=userId;
		    		params.departmentId=departmentId;
		    		console.log(params.userId+","+params.departmentId);
		    		var posting = $.post(webBasePath + 'userbase/update/department',params, function(data) {
		    			if(data==""||data==null){
		    				$("#con-Text").text("没有返回值！");
			  	     		$("#alert-every").modal();
		    			}else{
		    				$("#con-Text").text(data.msg);
			  	     		$("#alert-every").modal();
			  	    		$("#table_bs").bootstrapTable('refresh');
		    			}
		    		})
		    	})
	    
	      }
	      function edit_phone(){
	    	  
		    		$("#userName").attr("readonly","readonly");
		    		$("#phone").removeAttr("readonly");
		    		$("#department").attr("readonly","readonly");
		    		$("#flagUser").attr("disabled","disabled");
		    		$("#phone").css("border-color","blue");
		    		$("#department").css("border-color","#e5e6e7");
		    		$("#flagUser").css("border-color","#e5e6e7");
		    		$("#success-delete").modal();
		    		$("#content-main").off("click","#addMsg");
		    		$("#content-main").on("click","#addMsg",function(){
		    			var userId=$("#userId").val();
			    		var phone=$("#phone").val();
			    		var params={};
			    		params.userId=userId;
			    		params.phone=phone;
			    		console.log(params.userId+",phone="+params.phone);
			    		var posting = $.post(webBasePath + 'userbase/update/phone',params, function(data) {
			    			if(data==""||data==null){
			    				$("#con-Text").text("没有返回值！");
				  	     		$("#alert-every").modal();
			    			}else{
			    				$("#con-Text").text(data.msg);
				  	     		$("#alert-every").modal();
				  	     		$("#table_bs").bootstrapTable('refresh');
				  	     		
			    			}
			    			
			    		})
			    	})
		    
	    	  
	      }
	      function edit_flaguser(){
	    	  

		    		$("#phone").attr("readonly","readonly");
		    		$("#department").attr("readonly","readonly");
		    		$("#userName").removeAttr("readonly");
		    	//	$("#userName").val("");
		    		var f=$("#flagUser").find("option:selected").text();
		    		if(f=="正式"){
		    			$(".clarm").css("display","block");
		    		}else{
		    			$(".clarm").css("display","none");
		    			$("#flagUser").removeAttr("disabled","disabled");
		    		}
		    		$("#flagUser").css("border-color","blue");
		    		$("#department").css("border-color","#e5e6e7");
		    		$("#phone").css("border-color","#e5e6e7");
		    		$("#success-delete").modal();
		    		$("#addMsg").one("click",function(){
		    			var userId=$("#userId").val();
			    		var hrUserName=$("#userName").val();
			    		var params={};
			    		params.userId=userId;
			    		params.hrUserName=hrUserName;
			    		console.log(params.userId+",hrUserName="+params.hrUserName);
			    		var posting = $.post(webBasePath + 'userbase/update/comuser',params, function(data) {
			    			if(data==""||data==null){
			    				$("#con-Text").text("没有返回值！");
				  	     		$("#alert-every").modal();
			    			}else{
			    				$("#con-Text").text(data.msg);
				  	     		$("#alert-every").modal();
				  	    		$("#table_bs").bootstrapTable('refresh');
				  	    	
			    			}
			    			
			    		})
			    
		    	})
	      }
	    	function getDepartmentId(){
	    		$(".bumenul").html('');
	    		var st=$("<div class='bumen'><ul class='bumenul'></ul></div>");
					$.post(webBasePath+"userbase/orglist/d",function(data1){
						if(data1.code==200){
						$(".bumenul").html('');
		                   var lis='';
							for(var i=1;i<data1.data.length;i++){
								var info=data1.data[i]
								lis+='<li><a data-id="'+info.id+'" class="btn btn-primary" href="#">'+info.name+'</a></li>'
							}

						}else{
							 $("#conText").text("获取部门信息失败！");
			    			 $("#alert").modal();
						
						}
						$('.bumen').remove();
						
						$('body').append(st)
						$(".bumen .bumenul").html(lis)
						$('.bumenul li a').css({"width":"100px","height":"50px","float":"left","margin-left":"5px","margin-bottom":"5px","line-height":"50px","text-align":"center"})
						        $("input[name=bumen]").off('focus');
								$("input[name=bumen]").on('focus',function(){
								$("input[name=bumen]").val('')
								layer.open({
									  type: 1,
									  title:'部门',
									  content: $('.bumenul'),
									  skin: 'demo-class',
									  closeBtn:2,
									  area:"500px",
									  shade:false
									});
							})
						$('.bumenul li a').off("click");
						$('.bumenul li a').on("click",function(){
								dataId=$(this).data("id");
								console.log(dataId);
								$("#departmentId").val(dataId);
								$("input[name=bumen]").val($(this).html());
//								$('.demo-class').css('display','none');
								layer.close(layer.index);
							})
					})
	    	
				
			}
////////////////////////////////////////////////////////////////////////////测试树形部门结构//////////////////////////////////////////////////////////////////////////////////////
	    	
	    	function departmentTree(){
	    		var st=$("<div class='bumen'><ul class='bumenul'></ul></div>");
				$.post(webBasePath+"department/hr/local/tree",function(data){
					for(var i=0;i<data.length;i++){
						if(data[i].children&&data[i].children.length>0){
							
						}
					}
				})
	    	}
	    	

		
	  	
});
}
function getWeChatSituation( wechatUserId,serviceOpenId, unionId){
//	e.preventDefault(); 
//	$("#wechat-situation-wechatuserid").text("企业号："+wechatUserId);
//	$("#wechat-situation-serviceopenid").text("服务号："+serviceOpenId);
//	$("#wechat-situation-unionid").text("开放平台："+unionId);
//	$("#wechat-situation").modal();
	$("#con-Text").html('<h1>企业号：'+wechatUserId+'</h1>'+
						'<h1>服务号：'+serviceOpenId+'</h1>'+
						'<h1>开放平台：'+unionId+'</h1>'
						);
		 $("#alert-every").modal();
	
}
