/**
 * 获取bootstrapTable初始配置
 * 
 * @param url
 *                请求地址
 * @param toolbarId
 *                工具栏div id
 * @param columns
 *                列定义
 * @param queryParams
 *                参数函数
 * @param pagination
 *                是否分页
 */
function getBsTableOptions(url, toolbarId, columns, queryParams, pagiation, sort) {
//    console.log("pagiation=" + pagiation);
    var tableOptions = {
	url : url, // 请求后台的URL（*）
	method : 'post', // 请求方式（*）
	toolbar : "#" + toolbarId, // 工具按钮用哪个容器
	// toolbarAlign:"right",
	striped : true, // 是否显示行间隔色
	cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	pagination :("undefined" == typeof (pagiation) || null == pagiation)? true : pagiation, // 是否显示分页（*）
	sortable : false, // 是否启用排序
	sortOrder : "asc",
	queryParamsType : 'undefined',//
	contentType : "application/x-www-form-urlencoded",// Form Data
	// 格式参数才会被reqest.getParam方法获取到
	// ajaxOptions:{"contentType":'application/x-www-form-urlencoded;
	// charset=UTF-8'},
	queryParams : ("undefined" == typeof (queryParams) || null == queryParams)? getParams : queryParams,// 传递参数（*）
	sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
	pageNumber : 1, // 初始化加载第一页，默认第一页
	pageSize : 10, // 每页的记录行数（*）
	pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
	// search: true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
	// strictSearch: true,
	align:"center",
	showColumns : false, // 是否显示所有的列
	showRefresh : false, // 是否显示刷新按钮
	minimumCountColumns : 2, // 最少允许的列数
	clickToSelect : true, // 是否启用点击选中行
	height : '500', // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
	uniqueId : "id", // 每一行的唯一标识，一般为主键列
	showToggle : false, // 是否显示详细视图和列表视图的切换按钮
	cardView : false, // 是否显示详细视图
	detailView : false, // 是否显示父子表
	singleSelect : true,
	columns : columns,
	
    }
    function getParams(params) {
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	    pageSize : params.pageSize, // 页面大小
	    pageNumber : params.pageNumber, // 页码
	};

	if (sort && sort.field) {
	    temp.sortField = sort.field;
	}
	if (sort && sort.dir) {
	    temp.sortDir = sort.dir;
	}
	return temp;
    }

    return tableOptions;
}

function getFrameHeight(){
    var frameId = window.frameElement && window.frameElement.id || ''; 
}

/**
 * 如果没选或多选记录都返回false,否则返回true
 * 
 * @param rows
 *                选中的行
 * @return boolean
 * @since 1.0
 */
function isValidSelect(viewId) {
    var rows = $('#' + viewId).bootstrapTable('getAllSelections');
    if (rows.length == 0) {
	layer.alert("请选择一条数据！");
	return null;
    }
    if (rows.length > 1) {
	layer.alert("只能选择一条数据！");
	return null;
    }
    return rows[0]
}

/**
 * 自动调整表格列宽度
 * 
 * @param percent
 *                百分比
 * @return 列宽度百分比
 * @since 1.0
 */
function getWidth(percent) {
    // console.log("width"+parent.innerWidth);
    return 100;
    // return new Number(parent.innerWidth * percent); // 这里你可以自己做调整
}

/**
 * 如果没选或多选记录都返回false,否则返回true
 * 
 * @param rows
 *                选择的行数
 * @return boolean
 * @since 1.0
 */
function isDel(rows) {
    if (rows.length == 0) {
	showMsg(I18N.msg_no_sel_del_record);
	return false;
    } else if (rows.length > 1) {
	showMsg(I18N.msg_single_del_record);
	return false;
    } else {
	return true;
    }
}

function refreshOptions(tableId, attr, value) {
    var options = $('#' + tableId).bootstrapTable('getOptions');
    options[attr] = value;
    $('#' + tableId).bootstrapTable('refreshOptions', options);
}
function refreshOptionsByAttrMap(tableId, obj) {
    var options = $('#' + tableId).bootstrapTable('getOptions');
    var optionsNew = $.extend(options, obj);
    $('#' + tableId).bootstrapTable('refreshOptions', options);
}
$(function() {
    initSelect();
    initSearch();
});

function initSearch() {
    $('.dd-btn-search').each(function(i, elm) {
	var _this = $(elm);
	var _form, _table
	_this.click(function() {
	    var test = $(this).attr('data-test');
	    if (typeof (test) == "undefined") {
		console.log("test is undefined");
	    }
	    var formId = $(this).attr('data-from');
	    var tableId = $(this).attr('data-table');
	    if (typeof (formId) == "undefined") {
		_form = _this.parents('form').first();
		formId = _form.attr('id');
	    } else {
		_form = $('#' + formId);
	    }
	    if (typeof (tableId) == "undefined") {
		tableId = "dataList";// 默认tableid
	    }
	    _table = $("#" + tableId);
	    var data = formtoJsonTrim(formId);
	    _table.bootstrapTable("refresh", {
		query : data
	    });

	});

    });
    $('.dd-btn-reset').each(function(i, elm) {
	var _this = $(elm);
	var _form, _table
	_this.click(function() {
	    var test = $(this).attr('data-test');
	    if (typeof (test) == "undefined") {
		console.log("test is undefined");
	    }
	    var formId = $(this).attr('data-from');
	    var tableId = $(this).attr('data-table');
	    if (typeof (formId) == "undefined") {
		_form = _this.parents('form').first();
		formId = _form.attr('id');
	    } else {
		_form = $('#' + formId);
	    }
	    if (typeof (tableId) == "undefined") {
		_table = $('#dataList');// 默认tableid
	    } else {
		_table = $("#" + tableId);
	    }
	    if($(this).hasClass('clear-hidden')){
		 _form.find('input').val("");
	    }else{		
		_form.find('input').not('input[type="hidden"]').val("");
	    }
	    _form.find('select').val("");
	    var data = formtoJsonTrim(formId);
	    _table.bootstrapTable("refresh", {
		query : data
	    });

	});

    });
}

function initSelectById(domId){
	var _this = $("#"+domId);
	var _name = _this.attr('name');
	var _id = _this.attr('id') + '-Select';
	var _refid = _this.attr('refid');
	var _thisvalue = _this.val();
	var _msg = _this.attr('msg') == undefined ? "" : _this.attr('msg');
	// checked="checked"
	var _queryparam=_this.attr("queryparam");
	var option = strToJson(_this.attr('data-option'));
	if (option != undefined && option != "") {
	    var _parameter={};
	    if(undefined == _queryparam){		
		_parameter = option['parameter'];
	    }else{
		_parameter=strToJson(_queryparam);
	    }
	    var _url = option['url'];
	    var _text = option['textField'];
	    var _value = option['valueField'];
	    var _disabled = option["disabled"];

	    _this.attr('boxname="' + _name + '"');
	    _this.removeAttr('name');
	    _this.removeClass('customSelect');
	    _this.hide();

	    $.ajax({
		url : _url,
		data : _parameter,
		type : "post",
		dataType : "json",
		success : function(result) {
		    var html = "";
		    html += _this.prop('outerHTML');
		    html += '<select class="form-control" name="' + _name + '" id="' + _id + '"';
		    if (_disabled != undefined && (_disabled || _disabled == 'true')) {
			html += ' disabled ="' + _disabled + '"';
		    }
		    html += '>\n';
		    html += '<option value=""';
		    if (_thisvalue == "") {
			html += ' selected="selected"';
		    }
		    html += '>请选择' + _msg + '</option>\n';
		    for (var i = 0; i < result.length; i++) {
			var obj = result[i];
			html += '<option value="' + obj[_value] + '"';
			if (_thisvalue != "") {
			    if (_thisvalue == obj[_value]) {
				html += ' selected="selected"';
			    }
			}
			html += '>' + obj[_text] + '</option>\n';
		    }
		    html += '</select>\n';
		    var _p = _this.parent();
		    _p.html(html);
		    _p.find('select[name="' + _name + '"]').data('customSelectData', result);

		    if (undefined != _refid) {
			$('#' + _id).on('change', function() {

			    cascadeSelect(_refid, $('#' + _id).val());
			})
		    }

		},
		error : function(error) {
		}

	    });
	}
}

function initSelect() {
    $('.customSelect').each(function(i, k) {
	var _this = $(k);
	var _name = _this.attr('name');
	var _id = _this.attr('id') + '-Select';
	var _refid = _this.attr('refid');
	var _thisvalue = _this.val();
	var _msg = _this.attr('msg') == undefined ? "" : _this.attr('msg');
	// checked="checked"
	var option = strToJson(_this.attr('data-option'));
	if (option != undefined && option != "") {
	    var _parameter = option['parameter'];
	    var _url = option['url'];
	    var _text = option['textField'];
	    var _value = option['valueField'];
	    var _disabled = option["disabled"];

	    _this.attr('boxname="' + _name + '"');
	    _this.removeAttr('name');
	    _this.removeClass('customSelect');
	    _this.hide();

	    $.ajax({
		url : _url,
		data : _parameter,
		type : "post",
		dataType : "json",
		success : function(result) {
		    var html = "";
		    html += _this.prop('outerHTML');
		    html += '<select class="form-control" name="' + _name + '" id="' + _id + '"';
		    if (_disabled != undefined && (_disabled || _disabled == 'true')) {
			html += ' disabled ="' + _disabled + '"';
		    }
		    html += '>\n';
		    html += '<option value=""';
		    if (_thisvalue == "") {
			html += ' selected="selected"';
		    }
		    html += '>请选择' + _msg + '</option>\n';
		    for (var i = 0; i < result.length; i++) {
			var obj = result[i];
			html += '<option value="' + obj[_value] + '"';
			if (_thisvalue != "") {
			    if (_thisvalue == obj[_value]) {
				html += ' selected="selected"';
			    }
			}
			html += '>' + obj[_text] + '</option>\n';
		    }
		    html += '</select>\n';
		    var _p = _this.parent();
		    _p.html(html);
		    _p.find('select[name="' + _name + '"]').data('customSelectData', result);

		    if (undefined != _refid) {
			$('#' + _id).on('change', function() {

			    cascadeSelect(_refid, $('#' + _id).val());
			})
		    }

		},
		error : function(error) {
		}

	    });
	}
    });
}

function strToJson(str) {
    if (str == undefined || str == "") {
	return null;
    }
    var json = eval('(' + str + ')');
    return json;
}
/**
 * bootStrapTable扩展
 */
var bsTable = {
    selectionIds : [],
    singleSelect:false,
    initTable : function(tableId, options,isSingleSelect) {
	var self = this;
	options.maintainSelected = true;
	if(isSingleSelect){	    
	    options.singleSelect = isSingleSelect;
	}else{
	    options.singleSelect = self.singleSelect;	    
	}
	options.responseHandler = responseHandler;
	options.onLoadSuccess = loadSuccess;
	$('#' + tableId).bootstrapTable(options);

	$('#' + tableId).on('check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table', function(e, rows) {
	    var ids = $.map(!$.isArray(rows) ? [ rows ] : rows, function(row) {
		return row.id;
	    });
	    func = $.inArray(e.type, [ 'check', 'check-all' ]) > -1 ? '_union' : '_difference';
	    self.selectionIds = self[func](self.selectionIds, ids);
	});
    },
    _union : function(array, ids) {
	$.each(ids, function(i, id) {
	    if ($.inArray(id, array) == -1) {
		array[array.length] = id;
	    }
	});
	return array;
    },
    _difference : function(array, ids) {
	$.each(ids, function(i, id) {
	    var index = $.inArray(id, array);
	    if (index != -1) {
		array.splice(index, 1);
	    }
	});
	return array;
    }
}
function loadSuccess(data) {
    for (var i = 0; i < data.length; i++) {
//	console.log("data=" + data[i]);
    }
}
function responseHandler(res) {
    var self = this;
    $.each(res.rows, function(i, row) {
//	console.log("selectionIds=" + bsTable.selectionIds);
	row.checkStatus = $.inArray(row.id, bsTable.selectionIds) != -1; // 判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true
    });
//    console.log("rows="+JSON.stringify(res.rows));
    return res;
}

var bsTree = {};

function initBsTree(treeId, options, selectIds) {
    var ids = selectIds.split(",");
    var data = options.data;
    /*
     * function initData(data) { $.each(data, function(i, node) { if
     * ($.inArray(node.id, ids) != -1) { node.state.checked = true; if
     * (node.nodes) { initData(node.nodes); } } }); }
     */

    options.multiSelect = true;
    options.showCheckbox = true;
    options.selectedBackColor="#ffffff00"
    options.selectedColor="#333"

    var tree = $('#' + treeId);
    var nodeCheckedSilent = false;
    
    function nodeSelected(event,node){
	if (nodeCheckedSilent) {
	    return;
	}
	nodeCheckedSilent = true;
	checkAllParent(node);
	// checkAllSon(node);
	nodeCheckedSilent = false;
    }
    function nodeUnselected(event,node){
	if (nodeUncheckedSilent)
	    return;
	nodeUncheckedSilent = true;
	// uncheckAllParent(node);
	uncheckAllSon(node);
	nodeUncheckedSilent = false;
    }
    function nodeChecked(event, node) {
	if (nodeCheckedSilent) {
	    return;
	}
	nodeCheckedSilent = true;
	checkAllParent(node);
	// checkAllSon(node);
	nodeCheckedSilent = false;
    }

    var nodeUncheckedSilent = false;
    function nodeUnchecked(event, node) {
	if (nodeUncheckedSilent)
	    return;
	nodeUncheckedSilent = true;
	// uncheckAllParent(node);
	uncheckAllSon(node);
	nodeUncheckedSilent = false;
    }

    // 选中全部父节点
    function checkAllParent(node) {
	tree.treeview('checkNode', node.nodeId, {
	    silent : true
	});
	tree.treeview('selectNode', node.nodeId, {
	    silent : true
	});
	var parentNode = tree.treeview('getParent', node.nodeId);
	if (!("nodeId" in parentNode)) {
	    return;
	} else {
	    checkAllParent(parentNode);
	}
    }
    // 取消全部父节点
    function uncheckAllParent(node) {
	tree.treeview('uncheckNode', node.nodeId, {
	    silent : true
	});
	tree.treeview('unselectNode', node.nodeId, {
	    silent : true
	});
	var siblings = tree.treeview('getSiblings', node.nodeId);
	var parentNode = tree.treeview('getParent', node.nodeId);
	if (!("nodeId" in parentNode)) {
	    return;
	}
	var isAllUnchecked = true; // 是否全部没选中
	for ( var i in siblings) {
	    if (siblings[i].state.checked) {
		isAllUnchecked = false;
		break;
	    }
	}
	if (isAllUnchecked) {
	    uncheckAllParent(parentNode);
	}

    }

    // 级联选中所有子节点
    function checkAllSon(node) {
	tree.treeview('checkNode', node.nodeId, {
	    silent : true
	});
	if (node.nodes != null && node.nodes.length > 0) {
	    for ( var i in node.nodes) {
		checkAllSon(node.nodes[i]);
	    }
	}
    }
    // 级联取消所有子节点
    function uncheckAllSon(node) {
	tree.treeview('uncheckNode', node.nodeId, {
	    silent : true
	});
	if (node.nodes != null && node.nodes.length > 0) {
	    for ( var i in node.nodes) {
		uncheckAllSon(node.nodes[i]);
	    }
	}
    }
    options.onNodeSelected=nodeSelected;
    options.onNodeUnselected=nodeUnselected;
    options.onNodeChecked = nodeChecked;
    options.onNodeUnchecked = nodeUnchecked;
    tree.treeview(options);

    var nodes = tree.treeview('getEnabled');
//    console.log("nodes=" + JSON.stringify(nodes));
//    console.log("nodes=" + JSON.stringify(ids));
    $.each(nodes, function(i, node) {
	if ($.inArray(node.id, ids) != -1) {
	    tree.treeview('selectNode', node, {
		silent : true
	    });
	}
    });
    bsTree.callback = function() {

	var selectNodes = tree.treeview('getEnabled');

	var resIds = "";
	for (var i = 0; i < selectNodes.length; i++) {
	    if(selectNodes[i].state.checked){
		resIds += selectNodes[i].id + ","
	    }
	}
	if(resIds.length>0){
	    resIds=resIds.substring(0,resIds.length-1);
	}
//	console.log("selectIds=" + resIds);
	return resIds;
    }

}
