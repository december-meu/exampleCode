var validator;
var codeValidatRule= {
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
            url : webPath + 'sys/dict/existcheck/code',
            message : '编码已存在！',
            delay : 1000
        }
    }
};
var nameRule= {
    //提示消息  
    message : '类别名称不能为空',
    //需要做的验证  
    validators : {
        //验证项  
        notEmpty : {
	        message : '字典名称不能为空'
        },
        remote : {
            type : 'POST',
            url : webPath + 'sys/dict/existcheck/name',
            message : '该名称已存在！',
            data: function(validator){  //自定义提交数据，默认为当前input name值
                return {
                    name : $('#name').val(),
                    typeId: $('#typeId').val()
                }
            },
            delay : 1000
        }
    }
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
	    //表单name  
	    name :nameRule,
	}
    };
    $("#inputForm").bootstrapValidator(vaildatorRule); //vaildatorRule 验证规则  
    //得到获取validator对象或实例  
    validator = $("#inputForm").data('bootstrapValidator');

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
	validator.removeField('name');
    } else {
	$('#inputForm input[name="code"]').removeAttr('readonly');
	validator.addField('code',codeValidatRule);
	validator.addField('name',nameRule);
    }

}
function initDomEvent() {
    $('#btnSubmit').click(function() {
	validator.validate();
	if (!validator.isValid()) {
	    return;
	}
	var data = $('#inputForm').serializeArray();
	var typeId=$('#typeId').val();
	console.log(JSON.stringify(data));
	$.ajax({
	    url : webPath + "/sys/dict/save",
	    data : data,
	    type : "POST",
	    dataType : "json",
	    success : function(result) {
		if (result.code == "200") {
		    parent.$("#dict_list").bootstrapTable('refresh', {
			silent : true,query:{typeId:typeId}
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
