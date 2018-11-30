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
        }
    }
};
function  refreshValidator(){
	if ($("#inputForm").data('bootstrapValidator')) {
		$("#inputForm").data('bootstrapValidator').destroy();
		$('#inputForm').data('bootstrapValidator', null);
	}
	initValidator();
}
$(function() {
    initValidator();
    initForm();
    initDomEvent();
});
function initForm() {
   
}


function onDepInited(depInputId){
    console.log("dep init");
    $('#' + depInputId).attr("name", "pid");
}
function onDepSelected(inputId, val) {
    $('#' + inputId).attr("name", "pid");
    var depId = $('#' + inputId).val();
    console.log("changeId=" + depId);
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
	validator.validate();
	if (!validator.isValid()) {
	    return;
	}
	var data = formtoJsonTrim('inputForm');
	$.ajax({
	    url : webPath + "/sys/admOrg/save",
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
}
function initValidator() {
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
	    typeId : {
	        message : '类型不能为空',
	        validators : {
	            notEmpty : {
		        message : '类型不能为空'
	            },
	        }
	    },
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
	    }
	}
	
    };
    $("#inputForm").bootstrapValidator(vaildatorRule); // vaildatorRule 验证规则
    // 得到获取validator对象或实例
    validator = $("#inputForm").data('bootstrapValidator');

}