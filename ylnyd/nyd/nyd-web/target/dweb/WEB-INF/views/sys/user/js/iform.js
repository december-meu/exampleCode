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
      "cellphone" : {
        // 提示消息
        message : '电话不能为空'
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
      url : webPath + "/sys/user/update/cellphone",
      data : data,
      type : "POST",
      dataType : "json",
      success : function(result) {
        if (result.code == "200") {
          // parent.$("#dataList").bootstrapTable('refresh', {
          // silent : true,
          // });
          layer.msg('操作成功', {
            icon : 1,
            time : 1500
          // 2秒关闭（如果不配置，默认是3秒）
          }, function() {
          parent.refreshList();
          parent.layer.closeAll();
          });
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
