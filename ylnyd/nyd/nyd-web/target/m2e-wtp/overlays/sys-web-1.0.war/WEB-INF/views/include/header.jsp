<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=9,IE=10" />
<meta http-equiv="Expires" content="0">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Cache-Control" content="no-store">

<title>实时化测绘服务平台</title>
<meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
<meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">

<link rel="shortcut icon" href="favicon.ico">
<link href="${ctxStatic}/Hplus/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
<link href="${ctxStatic}/Hplus/css/plugins/bootstrap-table/bootstrap-table.min.css?v=3.3.6" rel="stylesheet">
<link href="${ctxStatic}/plugins/bootstrap/css/bootstrapValidator.css" rel="stylesheet">
<link href="${ctxStatic}/plugins/bootstrap/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
<link href="${ctxStatic}/plugins/bootstrap/css/bootstrap-treeview.min.css" rel="stylesheet">


<link href="${ctxStatic}/Hplus/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="${ctxStatic}/Hplus/css/animate.css" rel="stylesheet">
<link href="${ctxStatic}/Hplus/css/style.css?v=4.1.0" rel="stylesheet">
<link href="${ctxStatic}/Hplus/css/plugins/iCheck/custom.css" rel="stylesheet">
<link href="${ctxStatic}/Hplus/js/plugins/layer3.1.0/theme/default/layer.css">
<link href="${ctxStatic}/Plugin/My97DatePicker/4.8/skin/WdatePicker.css" rel="stylesheet" type="text/css" />
<%-- <link rel="stylesheet" href="${ctxStatic}/Plugin/ztree/3.5/css/zTreeStyle/zTreeStyle.css" type="text/css"></link> --%>
<link href="${ctxStatic}/common/css/customer.css" rel="stylesheet">

<script src="${ctxStatic}/Hplus/js/jquery.min.js?v=2.1.4"></script>
<script src="${ctxStatic}/Hplus/js/bootstrap.min.js?v=3.3.6"></script>
<script src="${ctxStatic}/common/js/bootstrap-common.js" type="text/javascript"></script>

<script src="${ctxStatic}/common/js/common.js" type="text/javascript"></script>


<script src="${ctxStatic}/Hplus/js/plugins/jeditable/jquery.jeditable.js"></script>
<script src="${ctxStatic}/Hplus/js/plugins/layer3.1.0/layer.js"></script>
<script src="${ctxStatic}/Hplus/js/plugins/layer/laydate/laydate.js"></script>
<!-- Data Tables -->
<script src="${ctxStatic}/Hplus/js/plugins/dataTables/jquery.dataTables.js"></script>
<%-- <script src="${ctxStatic}/Hplus/js/plugins/dataTables/dataTables.bootstrap.js"></script> --%>
<script src="${ctxStatic}/Hplus/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="${ctxStatic}/Hplus/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<script src="${ctxStatic}/plugins/bootstrap/js/bootstrapValidator.min.js"></script>
<script src="${ctxStatic}/plugins/bootstrap/js/bootstrapValidator-zh-CN.js"></script>
<script src="${ctxStatic}/plugins/bootstrap/js/bootstrap-datetimepicker.min.js"></script>
<script src="${ctxStatic}/plugins/bootstrap/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="${ctxStatic}/plugins/bootstrap/js/bootstrap-treeview.min.js"></script>



<!--引入CSS-->
<link rel="stylesheet" type="text/css" href="${ctxStatic}/plugins/webuploader-0.1.5/webuploader.css">
<!--引入JS-->
<script type="text/javascript" src="${ctxStatic}/plugins/webuploader-0.1.5/webuploader.js"></script>

<script type="text/javascript">
    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);
    var wechatType = {
        enterprise : 1,
        service : 2,
        openPlatform : 3
    };

    //根据传入的权限字符串判断当前用户是否有次权限;
    function _isPermited(permissionStr) {
	var permissionArray = _permissions.split(",");
	if ($.inArray(permissionStr, permissionArray) != -1) {
	    return true;
	} else {
	    return false;
	}
    }
    //根据传入的权限字符串判断当前用户是否有此角色;
    function _hasRole(roleCode) {
	var roleCodeArray = _roles.split(",")
	if ($.inArray(roleCode, roleCodeArray) != -1) {
	    return true;
	} else {
	    return false;
	}

    }
</script>


