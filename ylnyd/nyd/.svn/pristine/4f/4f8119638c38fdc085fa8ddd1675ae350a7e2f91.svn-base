var validator;
var codeValidatRule = {
    // 提示消息
    message : '无效的编码',
    // 需要做的验证
    validators : {
        // 验证项
        notEmpty : {
	    message : '编码不能为空!'
        },
        regexp : {
            regexp : /^[A-Z0-9_\-]+$/,
            message : '编码只能包含数字、大写字母、下划线或连字符！'
        },
        remote : {
            type : 'POST',
            url : webPath + 'sys/dep/existcheck/code',
            data : {
	        orgId : function() {
	            return getSeletedOrg();
	        }
            },
            message : '编码已存在！',
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
	    code : codeValidatRule,
	    name : {
	        // 提示消息
	        message : '名称不能为空',
	        // 需要做的验证
	        validators : {
	            // 验证项
	            notEmpty : {
		        message : '名称不能为空'
	            },
	        }
	    },
	    typeId : {
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
function refreshValidator(){
    console.log("refresh ...");
    $("#inputForm").bootstrapValidator(vaildatorRule);
    initForm();
}


$(function() {
     initValidator();
    initForm();
    initDomEvent();
});
function initForm() {
    if ($('#inputForm input[name="id"]').val() != "") {
	$('#inputForm input[name="code"]').attr('readonly', 'readonly');
	validator.removeField('code');
    } else {
	$('#inputForm input[name="code"]').removeAttr('readonly');
//	var id = $('#inputForm input[name="code"]').attr('id');
//	var prefix = $('#inputForm input[name="code"]').val();
//	if (prefix != "") {
//	    setCaret(id, prefix.length);
//	}
	validator.addField('code', codeValidatRule);
    }

    $(".form_datetime").datetimepicker({
	format : "yyyy-mm-dd",
	autoclose : 1,
	todayBtn : true,
	todayHighlight : true,
	showMeridian : true,
	pickerPosition : "bottom-left",
	language : 'zh-CN',// 中文，需要引用zh-CN.js包
	startView : 2,// 月视图
	minView : 2
    // 日期时间选择器所能够提供的最精确的时间选择视图
    })

}

function onDepInited(depInputId) {
    console.log("dep init");
    $('#' + depInputId).attr("name", "pid");
}
function onDepSelected(inputId, val) {
    $('#' + inputId).attr("name", "pid");
    var depId = $('#' + inputId).val();
    console.log("changeId=" + depId);
    // if ($("#position_select-Select") != undefined) {
    // $('#position_select').attr("name", "posId");
    //
    // }
    // $('#position_select').attr("queryparam", "{depId:'" + depId + "'}")
    // initSelectById("position_select");

}

function setCaret(id, pos) {
    var textbox = document.getElementById(id);

    if (textbox.createTextRange) {
	var r = textbox.createTextRange();
	r.collapse(true);
	r.moveStart('character', pos);
	r.select();
    } else {
	textbox.setSelectionRange(0, pos);
	textbox.focus();
    }

}

function initDomEvent() {
    $('#btnSubmit').click(function() {
	// 得到获取validator对象或实例
	$("#inputForm").bootstrapValidator(vaildatorRule); // vaildatorRule
							    // 验证规则
	validator = $("#inputForm").data('bootstrapValidator');
	validator.validate();
	if (!validator.isValid()) {
	    return;
	}
	var data = formtoJsonTrim('inputForm')
	var orgId = getSeletedOrg();
	data["orgId"] = orgId;
	console.log(JSON.stringify(data));
	$.ajax({
	    url : webPath + "/sys/dep/save",
	    data : data,
	    type : "POST",
	    dataType : "json",
	    success : function(result) {
		if (result.code == "200") {
		    parent.$("#dataList").bootstrapTable('refresh', {
			silent : true,
		    });
		    parent.initTreeView(orgId);
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
}
