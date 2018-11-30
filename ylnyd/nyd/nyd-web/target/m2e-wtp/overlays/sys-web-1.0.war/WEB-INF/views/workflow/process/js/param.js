$(function() {
    // initValidator();
    // initForm();
    initDomEvent();
});
function initForm() {

}
function callback() {
    var proDefKey = $('#proDefKey').val();
    var data = formtoJsonTrim('inputForm')
    data.proDefKey = proDefKey;
    return data;

}
function initDomEvent() {
    $('#btnSubmit').click(function() {
//	validator.validate();
//	if (!validator.isValid()) {
//	    return;
//	}
	var proDefKey = $('#proDefKey').val();
	var data = formtoJsonTrim('inputForm')
	data.proDefKey = proDefKey;
	console.log(JSON.stringify(data));
	$.ajax({
	    url : webPath + "/process/manager/param/set",
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
