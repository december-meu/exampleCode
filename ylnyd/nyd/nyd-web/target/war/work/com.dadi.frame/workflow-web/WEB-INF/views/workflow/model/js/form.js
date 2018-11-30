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
            regexp : /^[A-Za-z_\-\d]+$/,
            message : '编码只能包含大写字母、下划线或连字符！'
        }
    }
};

$(function() {
//    initValidator();
    initForm();
    initDomEvent();
});
function initForm() {
    if ($('#inputForm input[name="id"]').val() != "") {
	$('#inputForm input[name="code"]').attr('readonly', 'readonly');
	validator.removeField('code');
    } else {
	$('#inputForm input[name="code"]').removeAttr('readonly');
	var id = $('#inputForm input[name="code"]').attr('id');
	var prefix = $('#inputForm input[name="code"]').val();
	if (prefix != "") {
	    setCaret(id, prefix.length);
	}
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
    });

}
function post(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    temp.target="_self";
    temp.style.display = "none";
    for (var x in PARAMS) {
      var opt = document.createElement("textarea");
      opt.name = x;
      opt.value = PARAMS[x];
      // alert(opt.name)
      temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
  }


function closeActivitDesigner(){
    
    console.log("close designer==========");
}
function initDomEvent() {
    $('#btnSubmit').click(function() {
	validator.validate();
	if (!validator.isValid()) {
	    return;
	}
	var dataList=parent.$("#dataList");
	var data = formtoJsonTrim('inputForm')
	var editUrl= webPath+"pages/modeler.html?modelId=" + data.id;
	console.log(JSON.stringify(data));
	if(data.id){
		parent.layer.open({
			type: 2,
			title:false,
			closeBtn:0,
			shade: [0.5, "#000", true],
			shade: [0],
			area: ["100%", "100%"],
			anim: 2,
			content: [editUrl, "no"]
			,end: function(){ 
			    console.log("close event==========");
			    // 右上角关闭回调
			    dataList.bootstrapTable('refresh', {
				silent : true,
			    });   
			}
		})
	    
	    
	    
	    
	    
// window.open(webPath+"pages/modeler.html?modelId=" + data.id);
	    return
	}
	
	parent.layer.closeAll();
// post( webPath + "/process/model/create", data);
	
	var createUrl= webPath + "/process/model/create?name="+data.name+"&key="+data.key+"&category="+data.category;
	

	parent.layer.open({
		type: 2,
		title:false,
		closeBtn:0,
		shade: [0.5, "#000", true],
		shade: [0],
		area: ["100%", "100%"],
		anim: 2,
		content: [createUrl, "no"]
		,end: function(){ 
		    console.log("close event==========");
		    // 右上角关闭回调
		    dataList.bootstrapTable('refresh', {
			silent : true,
		    });   
		}
	})
// $('#inputForm').attr('action', webPath + "/process/model/create");
// $('#inputForm').submit();
// $.ajax({
// url : webPath + "/process/model/create",
// data : data,
// type : "POST",
// dataType : "json",
// async:false,
// success : function(result) {
// if (result.code == "200") {
// parent.layer.closeAll();
// } else {
// layer.alert(result.msg);
// }
//
// },
// error : function(error) {
// layer.alert("请求出错！");
// }
// });
    });
}

    var vaildatorRule = {
	message : '输入内容无效!',
	excluded : [':disabled'],
	feedbackIcons : {
	    valid : 'glyphicon glyphicon-ok',
	    invalid : 'glyphicon glyphicon-remove',
	    validating : 'glyphicon glyphicon-refresh'
	},
	fields : {
	    category:{
		// 提示消息
	        message : '流程模型类别不能为空',
	        // 需要做的验证
	        validators : {
	            callback: {
	        	message: '流程模型类别不能为空',
	        	callback: function(value, validator) {
	        		console.log("validator11=="+value);
	        	     if (value == "") {
	        	            return false;
	        	         } else {
	        	            return true;
	        	          }
	        	
	        	        }
	            }
	        	     
	        }
	    },
	    // 表单name
	    key : codeValidatRule,
	    name : {
	        // 提示消息
	        message : '模型名称不能为空',
	        // 需要做的验证
	        validators : {
	            // 验证项
	            notEmpty : {
		        message : '模型名称不能为空'
	            },
	        }
	    }
	}

    };
    
    $("#inputForm").bootstrapValidator(vaildatorRule); // vaildatorRule 验证规则
    function	onDepSelected(){
    	validateAgain("inputForm", "category");
    }
    function validateAgain(formid, keyname) {
        $('#' + formid).data("bootstrapValidator").updateStatus(keyname, "NOT_VALIDATED", null);
        $('#' + formid).data("bootstrapValidator").validateField(keyname);
    }
    // 得到获取validator对象或实例
    validator = $("#inputForm").data('bootstrapValidator');


