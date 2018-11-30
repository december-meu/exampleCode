<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
</head>
<body>
	<div class="wrapper wrapper-content">

		<form id="inputForm" class="form-horizontal">

				<input type="hidden" name="userId" id = "userId" value="${!empty user?user.id:''}" />


	
			<div class="form-group">
				<label for="account" class="col-sm-3 col-xs-3 text-right">账号:</label>
				<div class="col-sm-9 col-xs-9">
					<input type="text" class="form-control" id="account" value="${!empty user?user.account:''}">
				</div>
			</div>
			<shiro:authenticated>
				<div class="form-group">
					<label for="password" class="col-sm-3 col-xs-3 text-right">请输入新密码:</label>
					<div class="col-sm-9 col-xs-9">
						<input type="text" class="form-control" id="password" name="password" value="">
					</div>
				</div>
				<div class="form-group">
					<label for="_password" class="col-sm-3 col-xs-3 text-right">再次输入确认:</label>
					<div class="col-sm-9 col-xs-9">
						<input type="text" class="form-control" id="_password" name="_password" value="">
					</div>
				</div>
			</shiro:authenticated>
			<div class="form-group">
				<div class="col-sm-offset-1 col-xs-offset-1  col-sm-2 col-xs-offset-2">
					<button id="btnSubmit" type="button" class="btn btn-success pull-right" >提交</button>
				</div>
			</div>
		</form>
	</div>

	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	<script>
	
	
	var validator;
	
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
		    password : {
		        validators : {
		            notEmpty : {
			        message : '密码不能为空'
		            },
		            regexp : {
		                regexp : /^[A-Za-z0-9_\-]+$/,
		                message : '账号只能包含数字、字母、下划线或连字符！'
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
	$(function(){
	    initValidator();
	});
	 $('#btnSubmit').click(function() {
		validator.validate();
		if (!validator.isValid()) {
		    return;
		}
		var password=$('#password').val();
		var userId = $('#userId').val()
		$.ajax({
		    url : webPath + "/sys/user/password/update",
		    data : {password:password,userId:userId},
		    type : "POST",
		    dataType : "json",
		    success : function(result) {
			if (result.code == "200") {
			  layer.msg('操作成功', {
              icon : 1,
              time : 1500
        // 2秒关闭（如果不配置，默认是3秒）
        }, function() {
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
			layer.alert("请求出错！");
		    }
		});
	    });
	
	
	</script>

</body>

</html>
