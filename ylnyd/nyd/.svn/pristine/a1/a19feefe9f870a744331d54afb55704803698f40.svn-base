var validator;
var nameValidatRule={
        // 提示消息
        message : '名称不能为空',
        // 需要做的验证
        validators : {
            // 验证项
            notEmpty : {
                message : '角色名称不能为空'
            },
            remote : {
                type : 'POST',
                url : webPath + 'sys/role/existcheck/name',
                message : '该名称已存在！',
                delay : 1000
            }
        }
    };
var vaildatorRule = {
	message : '输入内容无效!',
	feedbackIcons : {
	    valid : 'glyphicon glyphicon-ok',
	    invalid : 'glyphicon glyphicon-remove',
	    validating : 'glyphicon glyphicon-refresh'
	},
	fields : {
	    // 表单name
	    name : nameValidatRule,
	    "type.id" : {
	        validators : {
//	            notEmpty : {
//	                message : "类型不能为空"
//	            },
	            callback : {
	        	message : "类型不能为空",
	                callback : function(value, validator) {

	                    if (!value||value == "") {
	                	
		                return false;
	                    } else {
		                return true;
	                    }

	                }
	            }
	        }

	    }
	}
};
function initValidator() {
  
    $("#inputForm").bootstrapValidator(vaildatorRule); // vaildatorRule 验证规则
    // 得到获取validator对象或实例
    validator = $("#inputForm").data('bootstrapValidator');

}

$(function() {
    initValidator();
    initForm();
    initDomEvent();
});
function initForm() {
    if ($('#inputForm input[name="id"]').val()!="") {
	console.log("id=" + $('#inputForm input[name="id"]').val());
//	$('#inputForm input[name="name"]').attr('readonly', 'readonly');
	validator.removeField('name');
    } else {
//	$('#inputForm input[name="name"]').removeAttr('readonly');
	validator.addField('name', nameValidatRule);
    }

}
function refreshValidator(){
    console.log("refresh ...");
    $("#inputForm").bootstrapValidator(vaildatorRule);
}

function initDomEvent() {
    $('#btnSubmit').click(function() {
	// 得到获取validator对象或实例
//	 $("#inputForm").bootstrapValidator(vaildatorRule); // vaildatorRule 验证规则
	validator = $("#inputForm").data('bootstrapValidator');
	validator.validate();
	if (!validator.isValid()) {
	    return;
	}
	var data = formtoJsonTrim('inputForm')
	console.log(JSON.stringify(data));
	$.ajax({
	    url : webPath + "/sys/role/save",
	    data : data,
	    type : "POST",
	    dataType : "json",
	    success : function(result) {
		if (result.code == "200") {
		    parent.$("#dataList").bootstrapTable('refresh', {
			silent : true,
		    });
		    parent.layer.closeAll();
		} else {
		    layer.alert(result.msg);
		}

	    },
	    error : function(error) {
		parent.layer.closeAll();
		layer.alert("请求出错！");
	    }
	});
    });
    /*
     * $('#btnStartProcess').click(function() { validator.validate(); if
     * (!validator.isValid()) { return; } var data = formtoJsonTrim('inputForm')
     * console.log(JSON.stringify(data)); $.ajax({ url : webPath +
     * "/sys/role/process/start", data : data, type : "POST", dataType : "json",
     * success : function(result) { if (result.code == "200") { if(resutl.msg){
     * layer.alert(result.msg); } } else { if(result.msg)
     * layer.alert(result.msg); } }, error : function(error) {
     * parent.layer.closeAll(); layer.alert("请求出错！"); } }); });
     */

}
