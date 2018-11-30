var validator;
var codeValidatRule = {
    //提示消息  
    message : '无效的编码',
    //需要做的验证  
    validators : {
        //验证项  
        notEmpty : {
	    message : '编码不能为空!'
        },
        regexp : {
            regexp : /^[A-Za-z0-9_\-]+$/,
            message : '编码只能包含数字、字母、下划线或连字符！'
        },
        remote : {
            type : 'POST',
            url : webPath + 'sys/group/existcheck/name',
            message : '此名称已存在！',
            delay : 1000
        }
    }
};

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
	    name : {
	        // 提示消息
	        message : '组名不能为空',
	        // 需要做的验证
	        remote : {
	            type : 'POST',
	            url : webPath + 'sys/group/existcheck/name',
	            message : '此名称已存在！',
	            delay : 1000
	        }
	    }
	}

    };
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

}

function initDomEvent() {
    $('#btnSubmit').click(function() {
	validator.validate();
	if (!validator.isValid()) {
	    return;
	}
	var data = formtoJsonTrim('inputForm')
	console.log(JSON.stringify(data));
	$.ajax({
	    url : webPath + "/sys/group/save",
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
