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
            regexp : /^[A-Za-z0-9_\-]+$/,
            message : '编码只能包含数字、字母、下划线或连字符！'
        },
        remote : {
            type : 'POST',
            url : webPath + 'sys/dep/existcheck/code',
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
            regexp : /^1(3|4|5|7|8)\d{9}$/,
            message : '不是正确的手机号码!'
        },
        remote : {
            type : 'POST',
            url : webPath + 'sys/user/existcheck/phone',
            message : '该手机号码已使用！',
            delay : 1000,
            data : function(validator) {
	        return {
	            phone : $('[name="user.cellphone"]').val(),
	        };
            }
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
	    code : codeValidatRule,
	    name : {
	        // 提示消息
	        message : '类别名称不能为空',
	        // 需要做的验证
	        validators : {
	            // 验证项
	            notEmpty : {
		        message : '类别名称不能为空'
	            },
	        }
	    },
	    "user.cellphone" : phoneValidatRule,
	    "posiiton.id" : {
	        // 提示消息
	        message : '岗位不能为空',
	        // 需要做的验证
	        validators : {
	            // 验证项
	            notEmpty : {
		        message : '岗位名称不能为空'
	            },
	        }
	    },
	    "department.id" : {
	        // 提示消息
	        message : '部门不能为空',
	        // 需要做的验证
	        validators : {
	            // 验证项
	            notEmpty : {
		        message : '部门不能为空'
	            },
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

function onDepSelected(inputId, val) {
    $('#' + inputId).attr("name", "depId");
    var depId = $('#' + inputId).val();
    console.log("changeId=" + depId);
    if ($("#position_select-Select") != undefined) {
	$('#position_select').attr("name", "posId");

    }
    $('#position_select').attr("queryparam", "{depId:'" + depId + "'}")
    initSelectById("position_select");

}

function onDepSelectInit() {
    $('#position_select').attr("queryparam", "{depId:''}");
    initSelectById("position_select");
}
function initForm() {
    
    if ($('#inputForm input[name="userId"]').val()) {
	   initSelectById("position_select");
    } else {
	$('#inputForm input[name="user.cellphone"]').removeAttr('readonly');
	validator.addField('user.cellphone', codeValidatRule);
    }
}
function initDomEvent() {
    $('#btnSubmit').click(function() {
	if('#')
	
	
	validator.validate();
	if (!validator.isValid()) {
	    return;
	}
	var data = formtoJsonTrim('inputForm')
	console.log(JSON.stringify(data));

	// data['user.account'] = data['user.cellphone'];
	var orgId = getSeletedOrg();
	data['orgId'] = orgId;

	$.ajax({
	    url : webPath + "/sys/user/update/orgInfo",
	    data : data,
	    type : "POST",
	    dataType : "json",
	    success : function(result) {
		if (result.code == "200") {
		  layer.msg('修改成功', {
        icon : 1,
        time : 1500
      // 2秒关闭（如果不配置，默认是3秒）
      }, function() {
        parent.refreshList();
        parent.layer.closeAll();
      });
		    // parent.$("#dataList").bootstrapTable('refresh', {
		    // silent : true,
		    // });
		    
		} else {
		    layer.alert(result.msg);
		}
	    },
	    error : function(error) {
	      layer.msg('修改失败', {
	        icon : 5,
	        time : 1500
	      // 2秒关闭（如果不配置，默认是3秒）
	      }, function() {
	        parent.layer.closeAll();
	      });
	    }
	});
    });
}
