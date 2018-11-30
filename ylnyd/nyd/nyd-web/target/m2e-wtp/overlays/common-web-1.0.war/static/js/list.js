$(function(){
	 //changeColor(".nr_content table");
	 sort();
	 sortStatus();
});

$(function(){
	$("input:checkbox").icheck({
		checkboxClass : "icheckbox_minimal-grey",
		radioClass : "iradio_minimal-grey",
		increaseArea : "10%" // optional
	});
	$("input:radio").icheck({
		checkboxClass : "icheckbox_minimal-grey",
		radioClass : "iradio_minimal-grey",
		increaseArea : "10%" // optional
	});
     //sort();
     //sortStatus();
});


$(function(){
   $("input:checkbox[name='id']").bind("click", function(){
     if($("input:checkbox[name='chk']")[0].checked){
        $("input:checkbox[name='chk']").icheck('unchecked');
     }else if($("input:checkbox[name='id']:checked").size()==$("input:checkbox[name='id']").size()){
         if($("input:checkbox[name='chk']")[0].checked==false){
          $("input:checkbox[name='chk']").icheck('checked');
         }
     }
    });
});

//全选按钮是否选中
function checkBoxAll(){
	if($("input:checkbox[name='id']:checked").size()==$("input:checkbox[name='id']").size() && $("input:checkbox[name='id']:checked").size()!=0){
        if($("input:checkbox[name='chk']")[0].checked==false){
        	$("input:checkbox[name='chk']").icheck('checked');
    	}
	 }
}

/**
*翻页
**/
function jumpPage(page){
  $("#pageNumber").val(page);
  $("#mainForm").submit();
}

/**
*  全选
**/
function selectAllChk(obj){
	
	if(obj.checked){
		$("input:checkbox").icheck('checked');
	}else{
		$("input:checkbox").icheck('unchecked');
	}
}

/**
*排序
**/
function sort_bak(){
   $("[sort]").each(function(){
       $(this).children().addClass("sort_none");
       $(this).bind("click", function(){
          var sortField = $(this).attr("sort");
          var oldSortField = $("#sortField").val();
          if(sortField != oldSortField){
              $("#sortField").val(sortField);
              $("#sortDir").val("desc");//默认desc
          }else{
              var sortDir = $("#sortDir").val() == "DESC" ? "ASC" : "DESC";
              $("#sortDir").val(sortDir);
          }
          jumpPage("1");
       });
   });
}
function sort(){
   $("[sort]").each(function(){
       $(this).append("<i class=\"icon-sort pull-right pointer-gray\"></i>");
	   $(this).bind("click", function(){
          var sortField = $(this).attr("sort");
          var oldSortField = $("#sortField").val();
          if(sortField != oldSortField){
              $("#sortField").val(sortField);
              $("#sortDir").val("desc");//默认desc
          }else{
              var sortDir = $("#sortDir").val().toUpperCase() == "DESC" ? "ASC" : "DESC";
              $("#sortDir").val(sortDir);
          }
          jumpPage("1");
       });
   });
}

/**
*设置排序状态
**/
function sortStatus(){
	if($("#sortField").size()>0){
		var sortField = $("#sortField").val();
	   //var sortStyle = $("#sortDir").val() == "DESC" ? "sort_desc" : "sort_asc";
	   //$("[sort='"+sortField+"']").attr("class",sortStyle);
	   var sortStyle = $("#sortDir").val().toUpperCase() == "DESC" ? "<i class=\"icon-sort-down pull-right pointer-blue\"></i>" : "<i class=\"icon-sort-up pull-right pointer-blue\"></i>";
	   $("[sort='"+sortField+"']").children("i").remove();
	   $("[sort='"+sortField+"']").append(sortStyle);
    }
   
}

/**
*查询
**/
function search(){
  jumpPage("1");
}

/**
*设置查询条件
**/
function setFilter(obj){
  for(var i in obj){
    alert(i);
    alert(obj[i]);
  }
}

/**
*  批量删除js校验、提交函数
*  默认checkbox的id和name为：chk；
*  默认的删除映射路径为：delete(映射路径不包含前缀)
**/
function ondelete(){
  ondel();
}

function ondel(){
  var delAction = $("#delAction").val();
  var url ;
  if(typeof delAction != "undefined" && delAction != ""){
	  url = delAction;
  }else{
	  url = $("#mainForm").attr("action") + "/delete";
     
  }
  ondeleteByAction(url);
}



/**
*  批量删除js校验、提交函数
*  默认checkbox的id和name为：chk；
*  参数：action 为删除映射路径为(映射路径不包含前缀)
**/
function ondeleteByAction(action){
  ondeleteByCheckId("chk",action);
}

/**
*  批量删除js校验、提交函数
*  参数：checkAllId 为checkbox的id
*  参数：action 为删除映射路径为(映射路径不包含前缀)
**/
function ondeleteByCheckId(checkAllId,action){
	var chk =$("input:checked");
	var isOrg=$("#isOrg").val();
	var isDic=$("#isDic").val();
	
	if(chk.length == 0){
		//cAlert('请选择需要删除的记录！');
		cAlert($.i18n.prop('list.js.checkDelete'));
	}else if(chk.length == 1 && $(chk[0]).attr("id") == checkAllId){
		cAlert($.i18n.prop('list.js.noDeleteRecord'));
	}else{
		//true 参数 没什么作用
		if(isOrg=="true"){
			//cConfirm($.i18n.prop('list.js.confirmDeleteOrg'),function(){
				$("#mainForm").attr("action",action);
				$("#mainForm").submit();
			//});
		}else if(isDic=="true"){
			cConfirm($.i18n.prop('list.js.confirmDeleteDictionaries'),function(){
				$("#mainForm").attr("action",action);
				$("#mainForm").submit();
			});			
		}else{
			cConfirm($.i18n.prop('list.js.confirmDelete'),function(){
				//$("#mainForm").attr("method",action);
				//var ac = $("#mainForm").attr("action") + "/" +action;
				$("#mainForm").attr("action",action);
				$("#mainForm").submit();
			});
		}
	}
}

/*
 * 启用
 */
function onenable(){
	  var enableAction = $("#enableAction").val();
	  var url ;
	  if(typeof enableAction != "undefined" && enableAction != ""){
	     url = enableAction;
	  }else{
	     url = $("#mainForm").attr("action") + "/enable";
	  }
	  onenableByCheckId("chk",url);
}

function onenableByCheckId(checkAllId,action){
	var chk =$("input:checked");
	
	if(chk.length == 0){
		cAlert('请选择需要启用的记录！');
	}else if(chk.length == 1 && $(chk[0]).attr("id") == checkAllId){
		cAlert('没有要启用的记录！');
	}else{
		cConfirm('确定启用选中的记录？',function(){
			$("#mainForm").attr("action",action);
			$("#mainForm").submit();
		   });
	}
}

/*
 * 停用
 */
function ondisable(){
	var disableAction = $("#disableAction").val();
	var url ;
	if(typeof disableAction != "undefined" && disableAction != ""){
		url = disableAction;
	}else{
		url = $("#mainForm").attr("action") + "/disable";
	}
	ondisableByCheckId("chk",url);
}

function ondisableByCheckId(checkAllId,action){
	var chk =$("input:checked");
	
	if(chk.length == 0){
		cAlert('请选择需要禁用的记录！');
	}else if(chk.length == 1 && $(chk[0]).attr("id") == checkAllId){
		cAlert('没有要禁用的记录！');
	}else{
	cConfirm('确定禁用选中的记录？',function(){
		$("#mainForm").attr("action",action);
		$("#mainForm").submit();
	   });
    }
}		




function deleteById(id){
  var delAction = $("#delAction").val();
  var url ;
  if(typeof delAction != "undefined" && delAction != ""){
     url = delAction;
  }else{
     url = $("#mainForm").attr("action") + "/delete";
  }
  ondeleteOneById(id,url);
}
 
function ondeleteOneById(id,action){
	var isOrg=$("#isOrg").val();
	var isDic=$("#isDic").val();
		//true 参数 没什么作用
		if(isOrg=="true"){
			cConfirm($.i18n.prop('list.js.confirmDeleteOrg'),function(){
			     initSubmitData(id);
				$("#mainForm").attr("action",action);
				$("#mainForm").submit();
			});
		}else if(isDic=="true"){
			cConfirm($.i18n.prop('list.js.confirmDeleteDictionaries'),function(){
			    initSubmitData(id);
				$("#mainForm").attr("action",action);
				$("#mainForm").submit();
			});			
		}else{
			cConfirm($.i18n.prop('list.js.confirmDelete'),function(){
			    initSubmitData(id);
				$("#mainForm").attr("action",action);
				$("#mainForm").submit();
			});
		}
}


function initSubmitData(id){
    $("input:checked").each(function(){
  	    $(this).icheck('unchecked');
    });
    $("#mainForm").prepend("<input type='hidden' value="+id+"  name='id' id='id'/>");
}
