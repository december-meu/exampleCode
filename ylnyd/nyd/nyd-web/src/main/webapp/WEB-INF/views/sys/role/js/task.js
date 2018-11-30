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
            url : webPath + 'sys/role/existcheck/code',
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
	    // 表单name
	    name : {
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
	console.log("id=" + $('#inputForm input[name="id"]').val());
	$('#inputForm input[name="code"]').attr('readonly', 'readonly');
	validator.removeField('code');
    } else {
	$('#inputForm input[name="code"]').removeAttr('readonly');
	validator.addField('code', codeValidatRule);
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
    $('#btnStartProcess').click(function() {
	validator.validate();
	if (!validator.isValid()) {
	    return;
	}
	var data = formtoJsonTrim('inputForm');
	var proDefKey = $('#proDefKey').val();
	var businessName = $('#businessName').val();
	console.log(JSON.stringify(data));
	$.ajax({
	    url : webPath + "/sys/role/save",
	    data : data,
	    type : "POST",
	    dataType : "json",
	    success : function(result) {
		if (result.code == "200") {
		   /* $.ajax({
		        url : webPath + "/process/task/start/" + proDefKey + "/" + businessName+"_"+result.data.id,
		        type : "POST",
		        dataType : "json",
		        success : function(result) {
			    if (result.code == "200") {
			        parent.parent.layer.closeAll();
			        top.layer.alert("已成功发起申请!");
			    }
		        }
		    });*/
		    var businessKey=businessName+"_"+result.data.id;
//		    var dasy=
		    startProcess(proDefKey,businessKey)
		} else {
		    if (result.msg)
			layer.alert(result.msg);
		}

	    },
	    error : function(error) {
		parent.layer.closeAll();
		layer.alert("请求出错！");
	    }
	});
    });
    /**
     * 发起申请
     * proDefKey:流程定义key
     * businessKey:业务关联字段,由businessname_+业务数据id构成
     * vaiable，形如 
     * {keys:'a,b,c',
     * 	values:'1,2,3',
     * 	types:'I,I,I'//I代表Integer.class
     * 	}
     * 	S(String.class), I(Integer.class), L(Long.class), F(Float.class), N(Double.class), D(Date.class), SD(java.sql.Date.class), B(
            Boolean.class);
     */
    function startProcess(proDefKey,busisnessKey,variable){
	
	$.ajax({
	        url : webPath + "/process/task/start/" + proDefKey + "/" + busisnessKey,
	        type : "POST",
	        data :{variable:variable},
	        dataType : "json",
	        success : function(result) {
		    if (result.code == "200") {
		        parent.parent.layer.closeAll();
		        top.layer.alert("已成功发起申请!");
		    }else{
			 top.layer.alert("发起申请失败!");
		    }
	        }
	    });
    }

}
