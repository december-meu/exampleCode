var validator;
var codeValidatRule = {
    message : '无效的编码',
    validators : {
        notEmpty : {
	    message : '编码不能为空!'
        },
        regexp : {
            regexp : /^[A-Z0-9_\-]+$/,
            message : '编码只能包含数字、大写字母、下划线或连字符！'
        },
        remote : {
            type : 'POST',
            url : webPath + 'sys/org/existcheck/code',
            message : '编码已存在！',
            data:{
            	id: function () {
                    return $('#id').val()
                },
                code: function () {
                    return $('#code').val();
                }
            },
            delay : 1000
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
    if ($('#inputForm input[name="id"]').val() != "") {
	$('#inputForm input[name="code"]').attr('readonly', 'readonly');
	validator.removeField('code');
    } else {
	$('#inputForm input[name="code"]').removeAttr('readonly');
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
function initDomEvent() {
    $('#btnSubmit').click(function() {
	validator.validate();
	if (!validator.isValid()) {
	    return;
	}
	var data = formtoJsonTrim('inputForm')
	console.log(JSON.stringify(data));
	$.ajax({
	    url : webPath + "/sys/org/save",
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
	excluded : [':disabled'],
	feedbackIcons : {
	    valid : 'glyphicon glyphicon-ok',
	    invalid : 'glyphicon glyphicon-remove',
	    validating : 'glyphicon glyphicon-refresh'
	},
	fields : {
		code:codeValidatRule,
		typeId : {
				 validators : {
					 notEmpty : {
			            message : '机构类型不能为空'
			           }
			        }
               },
	    name : {
	        validators : {
	            // 验证项
	            notEmpty : {
		        message : '机构名称不能为空'
	            },
	            remote : {
	                type : 'POST',
	                url : webPath + 'sys/org/existcheck/name',
	                message : '机构名称已存在！',
	                data:{
	                	id: function () {
                            return $('#id').val()
                        },
                        name: function () {
                            return $('#name').val();
                        }
	                },
	                delay : 1000
	            }
	        }
	    }
	}
    };
    $("#inputForm").bootstrapValidator(vaildatorRule); // vaildatorRule 验证规则
    // 得到获取validator对象或实例
    validator = $("#inputForm").data('bootstrapValidator');

}