SPA_RESOLVE_INIT = function(transition){	
		var data={};
		var html = template("newruzhi",data);
//			console.log("html="+html);
		$('#content-main').html(html);
		function submitMessage(){
			$("#submit").off("click");
			$("#submit").on("click",function(){
//////////////////////////////////////////////////老版本//////////////////////////////////////////////
/*				
				$("#wechatUserId").val("");
				$("#idcard").val("");
				$("#account").val("");
				$("#phone").val("");
				$("#oldUserId").val("");
				    var sel=$('#flagUserr').find('option:selected').text();
					var name=$("#userName").val();
					var dep=$("#department").val();
				console.log(sel+","+name+","+dep);
			    if(sel=="请选择"||name==''||name==null||dep==''||dep==null){
			    	
			    	 if(sel=='请选择'){
				    	 $("#flagUserr").css("border-color","red");
				     }
			    	 if(name==''||name==null){
				    	 $("#userName").css("border-color","red");
				     }
			    	 if(dep==''||dep==null){
				    	 $("#department").css("border-color","red");
				     }
			     }else{
			    	
			    	 var flagUserrNum=$('#flagUserr option:selected').val();
			    	 console.log(flagUserrNum);
			    	 $("#flagUserr").css("border-color","#e5e6e7");
			    	 $("#userName").css("border-color","#e5e6e7");
			    	 $("#department").css("border-color","#e5e6e7");
			    	 $("#necessary").css("border-color","white")
			    	 if(flagUserrNum==0){
			    		 $("#account").attr("readonly","readonly");
			    		 $("#departmentId").attr("readonly","readonly");
			    		 $("#phone").attr("readonly","readonly");
			    		 $("#wechatUserId").attr("readonly","readonly");
			    		 $("#oldUserId").attr("readonly","readonly");
			    		 $("#idcard").attr("readonly","readonly");
				    	 var params={};
				    	 params.userName=name;
				    	 params.flagUser=flagUserrNum;
				    	 params.department=dep;
//				    	 console.log(params.flagUserr);
				    	
				    	 var posting = $.post(webBasePath + "userbase/oldUser", params, function(data) {
				    		 console.log(data);
				    		 if(data.code==200){
				    			 var account=data.data.account;
				    			 var departmentId=$("#departmentId").val();
				    			 var phone=data.data.phone;
				    			 var wechatUserId=data.data.wechatUserId;
				    			 var oldUserId=data.data.oldUserId;
				    			 var idcard=data.data.idcard;
// 				    			 var department=data.data.department;
				    			 $("#account").val(account);
				    			
				    			 $("#departmentId").val(departmentId);
				    			
				    			 $("#phone").val(phone);
				    			
				    			 $("#wechatUserId").val(wechatUserId);
				    			
				    			 $("#oldUserId").val(oldUserId);
				    			
				    			 $("#idcard").val(idcard);
				    			
// 				    			 $("#department").val(department);
				    		
				    		 }else{
				    			 $("#conText").text("请求失败！");
				    			 $("#alert").modal();
				    		 }
			    	 })
			     }else if(flagUserrNum==10||flagUserrNum==20){
			    	 $("#account").removeAttr("readonly");
		    		 $("#departmentId").removeAttr("readonly");
		    		 $("#phone").removeAttr("readonly");
		    		 $("#wechatUserId").attr("readonly","readonly");
		    		 $("#oldUserId").removeAttr("readonly");
		    		 $("#idcard").removeAttr("readonly");
			    	 var params={};
			    	 params.userName=name;
			    	 params.flagUser=flagUserrNum;
			    	 params.deparmentId=$("#departmentId").val();
			    	 console.log(params.deparmentId+","+params.flagUser+","+params.userName);
			    	 var posting = $.post(webBasePath + "userbase/oldUser", params, function(data) {
			    		 console.log(data);
			    		 if(data.code==200){
			    			 $("#wechatUserId").val(data.data.wechatUserId);
			    		 }else{
			    			 $("#conText").text("请求失败！");
			    			 $("#alert").modal();
			    		 }
			    	 })
			     }
			     }
			*/
				
//////////////////////////////////////////////////新版本//////////////////////////////////////////////				
//				$("#wechatUserId").val("");
//				$("#idCard").val("");
//				$("#account").val("");
//				$("#oldUserId").val("");
				var cellPhone=$('#cellPhone').val();
				//alert(cellPhone);
			    if(cellPhone==''){
				    $("#cellPhone").css("border-color","red");
			     }else{
			    	 $("#cellPhone").css("border-color","#e5e6e7");
			    	 $("#necessary").css("border-color","white")
				    	 var params={};
				    	 params.cellPhone=cellPhone;
				    	 var posting = $.post(webBasePath + "userbase/newUser", params, function(data) {
				    		 console.log('----------------查询结果---------------');
				    		 console.log(data);
				    		 
				    		 if(data.code==200){
				    			 console.log('----------------ajax返回值---------------');
				    			 console.log(data);
				    			 var account=data.data.account;
				    			 var department=data.data.department;;
				    			 var phone=data.data.phone;
				    			 var wechatUserId=data.data.wechatUserId;
				    			 var dwebUserId=data.data.dwebUserId;
				    			 var idcard=data.data.idcard;
				    			 var typeName = data.data.typeName;
				    			 var departmentId = data.data.departmentId;
				    			 var flagUser = data.data.flagUser;
				    			 $("#account").val(account);
				    			 $("#userName").val(data.data.userName)
				    			 $("#department").val(department);
				    			 $("#departmentId").val(departmentId);
				    			 $("#phone").val(phone);
				    			 $("#wechatUserId").val(wechatUserId);
				    			 $("#dwebUserId").val(dwebUserId);
				    			 $("#idCard").val(idcard);
				    			 $("#typeName").val(typeName);
				    			 $("#newFlagUser").val(flagUser);
				    		 }else{
				    			 $("#conText").text("请求失败！");
				    			 $("#alert").modal();
				    		 }
			    	 })
			     }
			})
		}
		submitMessage();
		
		function getDepartmentId(){
			
			$.post(webBasePath+"userbase/orglist/d",function(data1){
				console.log(data1);
				if(data1.code==200){
                   var lis='';
					for(var i=1;i<data1.data.length;i++){
						var info=data1.data[i]
						lis+='<li><a data-id="'+info.id+'" class="btn btn-primary" href="#">'+info.name+'</a></li>'
					}
				}else{
					 $("#conText").text("获取部门信息失败！");
	    			 $("#alert").modal();
				
				}
				if($('#bumen').length==0){
					var st=$("<div id='bumen'><ul id='bumenul'></ul></div>");
					$('body').append(st)
					$("#bumen #bumenul").append(lis)
					$('#bumenul li a').css({"width":"100px","height":"50px","float":"left","margin-left":"5px","margin-bottom":"5px","line-height":"50px","text-align":"center"})
					$('#bumenul li a').on("click",function(){
						dataId=$(this).data("id");
						console.log(dataId);
						$("#departmentId").val(dataId);
						$("input[name=bumen]").val($(this).html());
						layer.close(layer.index);
					})
				}
				        $("input[name=bumen]").off('focus');
						$("input[name=bumen]").on('focus',function(){
						$("input[name=bumen]").val('')
						layer.open({
							  type: 1,
							  title:'部门',
							  content: $('#bumenul'),
							  skin: 'demo-class',
							  closeBtn:2,
							  area:"500px",
							  shade:false
							});
					})
				
				
			})
		}
////////////////////////////////////////////////////////2018-06-01号Dweb上线后弃用////////////////////////////////////////////////////////	
//		addMsg()
//		function addMsg(){
//			$("#addMsg").off("click");
//			$("#addMsg").on("click",function(){
////				console.log(acc,idc,pho)
//					console.log(1)
//					var params={};
//					var sel=$('#flagUserr option:selected').val();
//					if(sel==0){
//						params.wechatUserId=$("#wechatUserId").val();
//						params.flagUser=sel;
//						params.userName=$("#userName").val();
//						params.idcard=$("#idcard").val();
//						params.account=$("#account").val();
//						params.phone=$("#phone").val();
//						params.departmentId=$("#departmentId").val();
//						params.department=$("#department").val();
//						params.oldUserId=$("#oldUserId").val();
//						console.log(params.deparmentId);
//						var index = layer.load(1, {
//							  shade: [0.5,'#000'] //0.1透明度的白色背景
//							});
//						var posting = $.post(webBasePath + "userbase/hr/add", params, function(data) {
//							console.log(data);
//							if(data.code==200){
//								layer.close(index);
//								$("#conText").text(data.msg);
//								$("#alert").modal();
//								$("#wechatUserId").val("");
//								$("#userName").val("");
//								$("#idcard").val("");
//								$("#account").val("");
//								$("#phone").val("");
//								$("#departmentId").val("");
//								$("#department").val("");
//								$("#oldUserId").val("");
//							}else{
//								layer.close(index);
//								$("#conText").text(data.msg);
//				    			 $("#alert").modal();
//							}
//						})
//					}else if(sel==10||sel==20){
//						params.wechatUserId=$("#wechatUserId").val();
//						params.flagUser=sel;
//						params.userName=$("#name").val();
//						params.idcard=$("#idcard").val();
//						params.account=$("#account").val();
//						params.phone=$("#phone").val();
//						params.departmentId=$("#departmentId").val();
//						params.department=$("#department").val();
//						var index = layer.load(1, {
//							  shade: [0.5,'#000'] //0.1透明度的白色背景
//							});
//						var posting = $.post(webBasePath + "userbase/hr/add", params, function(data) {
//							console.log(data);
//							if(data.code==200){
//								layer.close(index);
//								$("#conText").text(data.msg);
//								$("#alert").modal();
//								$("#wechatUserId").val("");
//								$("#userName").val("");
//								$("#idcard").val("");
//								$("#account").val("");
//								$("#phone").val("");
//								$("#departmentId").val("");
//								$("#department").val("");
//							}else{
//								layer.close(index);
//								$("#conText").text(data.msg);
//				    			 $("#alert").modal();
//							}
//						})
//					}
//			})
//		}
////////////////////////////////////////////////////////2018-06-01号Dweb上线后开始使用////////////////////////////////////////////////////////		
		//2018-05-28与dweb同步使用
		addMsgNew();
		function addMsgNew(){
			$("#addMsgNew").off("click");
			$("#addMsgNew").on("click",function(){
			var params={};
				params.wechatUserId = $("#wechatUserId").val();
				params.flagUser = $('#newFlagUser').val();
				params.userName = $("#userName").val();
				params.idcard = $("#idcard").val();
				params.account = $("#account").val();
				params.phone = $("#cellPhone").val();
				params.departmentId = $("#departmentId").val();
				params.department = $("#department").val();
				params.dwebUserId = $("#dwebUserId").val();
				var index = layer.load(1, {shade: [0.5,'#000']});
				var posting = $.post(webBasePath + "userbase/hr/add", params, function(data){
					if(data.code==200){
						layer.close(index);
						$("#conText").text(data.msg);
						$("#alert").modal();
						$("#wechatUserId").val("");
						$("#userName").val("");
						$("#idcard").val("");
						$("#account").val("");
						$("#cellPhone").val("");
						$("#departmentId").val("");
						$("#department").val("");
						$("#dwebUserId").val("");
						$('#newFlagUser').val("");
					}else{
						layer.close(index);
						$("#conText").text(data.msg);
		    			 $("#alert").modal();
					}
				});
			});
		}

//		$("#cellPhone").blur(function(){
//			var ph=$(this).val();
//			var re = /^[0-9]+.?[0-9]*$/;
//			if(!re.test(ph)){
//				alertError("#cellPhone");
////							pho=false;
//			}else{
//				$("#addMsgNew").removeClass("disabled");
//				$("#cellPhone").css("border-color","#e5e6e7");
////							pho=true;
//			}
//		})
			
			
//      function alertError(id){
//    	    $("#conText").text("输入格式有误，请重新输入");
//			$("#alert").modal();
//			$(id).val("");
//			$(id).css("border-color","red");
//			$("#addMsgNew").addClass("disabled");
////			    			$('#addMsg').unbind("click"); //移除click
//      }
	                  
	  function edit_message(){
		  var url = window.location.href;
		  url=url.slice(58);
		  console.log(url);
	  }
	  edit_message();
}
//
//
