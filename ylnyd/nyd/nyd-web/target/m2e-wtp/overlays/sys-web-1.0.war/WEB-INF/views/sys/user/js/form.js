var validator;
var codeValidatRule = {
    // 提示消息
    message : '无效的编码',
    // 需要做的验证
    validators : {
        // 验证项
        notEmpty : {
	    message : '账号不能为空!'
        },
        regexp : {
            regexp : /^[A-Za-z0-9_\-]+$/,
            message : '账号只能包含数字、字母、下划线或连字符！'
        },
        remote : {
            type : 'POST',
            url : webPath + 'sys/user/existcheck/account',
            message : '编码已存在！',
            delay : 1000
        }
    }
};
var phoneValidatRule = {
    // 提示消息
    message : '无效的手机号',
    // 需要做的验证
    validators : {
        // 验证项
        notEmpty : {
	    message : '手机号不能为空!'
        },
        regexp : {
            regexp : /^1(3|4|5|7|8|9)\d{9}$/,
            message : '不是正确的手机号码!'
        },
        remote : {
            type : 'POST',
            url : webPath + 'sys/user/existcheck/phone',
            message : '编码已存在！',
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
	    account : codeValidatRule,
	    cellphone : phoneValidatRule,
	    // 表单name
	    username : {
	        // 提示消息
	        message : '不能为空',
	        // 需要做的验证
	        validators : {
	            // 验证项
	            notEmpty : {
		        message : '姓名名称不能为空'
	            },
	        }
	    },

	    password : {
	        validators : {
	            notEmpty : {
		        message : '密码不能为空'
	            },
	            different : {
	                field : 'account',
	                message : '密码不能与账号相同'
	            }
	        }
	    },
	    _password : {
	        validators : {
	            notEmpty : {
		        message : '确认密码不能为空'
	            },
	            identical : {
	                field : 'password',
	                message : '两次密码输入不一致'
	            },
	            different : {
	                field : 'username',
	                message : '密码不能与账号相同'
	            }
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
    if ($('#inputForm input[name="id"]').val() != "") {
	$('#inputForm input[name="account"]').attr('readonly', 'readonly');
	$('#inputForm input[name="cellphone"]').attr('readonly', 'readonly');
	validator.removeField('account');
	validator.removeField('cellphone');
    } else {
	$('#inputForm input[name="account"]').removeAttr('readonly');
	validator.addField('account',codeValidatRule);
    }

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
	    url : webPath + "/sys/user/save",
	    data : data,
	    type : "POST",
	    dataType : "json",
	    success : function(result) {
		if (result.code == "200") {
      layer.msg('操作成功', {
        icon : 1,
        time : 1500
      // 2秒关闭（如果不配置，默认是3秒）
      }, function() {
		    parent.$("#dataList").bootstrapTable('refresh', {
			silent : true,
		    });
		    parent.layer.closeAll();
		})
		} else {
		  layer.msg(result.msg, {
        icon : 5,
        time : 1500
      // 2秒关闭（如果不配置，默认是3秒）
      }, function() {
      })
		}

	    },
	    error : function(error) {
		parent.layer.closeAll();
		layer.alert("请求出错！");
	    }
	});
    });
}
