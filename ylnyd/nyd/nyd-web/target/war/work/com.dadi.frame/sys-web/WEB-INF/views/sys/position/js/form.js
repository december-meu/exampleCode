var validator;
var pagenumber=parent.$("#pagenumber").val()
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
var vaildatorRule={}
function initValidator() {
     vaildatorRule = {
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
	            callback : {
	            	message : '类别名称不能重复!',
	            	callback:function(value, validator) {
	            		var flag=false
	            		$.ajax({
	            		    url : webPath + "sys/position/existcheck/name",
	            		    data : {id:$('#id').val(),name:$('#name').val()},
	            		    async : false,
	            		    type : "POST",
	            		    dataType : "json",
	            		    success:function(data){
	            		    	console.log(data)
	            		    	flag= data.valid
	            		    	}
	            		    })
	            		    return flag
	            	}
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
    if ($('#inputForm input[name="id"]').val()) {
	console.log("id="+$('#inputForm input[name="id"]').val() );
	$('#inputForm input[name="code"]').attr('readonly', 'readonly');
	validator.removeField('code');
    } else {
	$('#inputForm input[name="code"]').removeAttr('readonly');
	validator.addField('code', codeValidatRule);
    }

    // $(".form_datetime").datetimepicker({
    // format : "yyyy-mm-dd",
    // weekStart : 1,
    // todayBtn : 1,
    // autoclose : 1,
    // todayHighlight : 1,
    // startView : 2,
    // forceParse : 0,
    // showMeridian : 1,
    // language : 'zh-CN',// 中文，需要引用zh-CN.js包
    // minView : 2
    // // 日期时间选择器所能够提供的最精确的时间选择视图
    // });
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
	console.log(112)
	if (!validator.isValid()) {
	    return;
	}
	var data = formtoJsonTrim('inputForm')
	console.log(JSON.stringify(data));
	$.ajax({
	    url : webPath + "/sys/position/save",
	    data : data,
	    type : "POST",
	    dataType : "json",
	    success : function(result) {
	    	console.log(112)
		if (result.code == "200") {
		    var depId=$('#dep_id').val();
		    parent.refreshList(depId,pagenumber);
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
