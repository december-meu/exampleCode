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
function getBsTableOptions(url, toolbarId, columns, queryParams, pagiation, sort, height) {

    // console.log("pagiation=" + pagiation);
    var tableOptions = {
	url : url, // 请求后台的URL（*）
	method : 'post', // 请求方式（*）
	toolbar : "#" + toolbarId, // 工具按钮用哪个容器
	// toolbarAlign:"right",
	striped : true, // 是否显示行间隔色
	cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	pagination : ("undefined" == typeof (pagiation) || null == pagiation) ? true : pagiation, // 是否显示分页（*）
	sortable : false, // 是否启用排序
	sortOrder : "asc",
	queryParamsType : 'undefined',//
	contentType : "application/x-www-form-urlencoded",// Form Data
	// 格式参数才会被reqest.getParam方法获取到
	// ajaxOptions:{"contentType":'application/x-www-form-urlencoded;
	// charset=UTF-8'},
	queryParams : ("undefined" == typeof (queryParams) || null == queryParams) ? getParams : queryParams,// 传递参数（*）
	sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
	pageNumber : 1, // 初始化加载第一页，默认第一页
	pageSize : 20, // 每页的记录行数（*）
	pageList : [ 10, 25, 50, 100, "ALL" ], // 可供选择的每页的行数（*）
	// search: true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
	// strictSearch: true,
	align : "center",
	showColumns : false, // 是否显示所有的列
	showRefresh : false, // 是否显示刷新按钮
	minimumCountColumns : 2, // 最少允许的列数
	clickToSelect : true, // 是否启用点击选中行
// height : !height ? '650' : height, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
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
	var data = formtoJsonTrim('searchForm');
	if (data) {
	    temp = $.extend(temp, data);
	}
	return temp;
    }

    return tableOptions;
}

function getBsTreeTableOptions(url, toolbarId, columns, queryParams, pagiation, sort, height) {

    // console.log("pagiation=" + pagiation);
    var tableOptions = {
	url : url, // 请求后台的URL（*）
	method : 'post', // 请求方式（*）
	treeView : true,// 是否开启树视图
	class: 'table table-hover table-bordered',
	treeId :"id",// id字段
	treeField : "name",// 展示树的字段
	parentId : "parentId", // 关联父节点的字段
	toolbar : "#" + toolbarId, // 工具按钮用哪个容器
	striped : true, // 是否显示行间隔色
	cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	pagination : false, // 是否显示分页（*）
	sortable : false, // 是否启用排序
	sortOrder : "asc",
	queryParamsType : 'undefined',//
	contentType : "application/x-www-form-urlencoded",// Form Data
	queryParams : ("undefined" == typeof (queryParams) || null == queryParams) ? getParams : queryParams,// 传递参数（*）
	pageNumber : 1, // 初始化加载第一页，默认第一页
	align : "center",
	showColumns : false, // 是否显示所有的列
	showRefresh : false, // 是否显示刷新按钮
	minimumCountColumns : 2, // 最少允许的列数
	clickToSelect : true, // 是否启用点击选中行
//	height : !height ? '650' : height, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
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
	var data = formtoJsonTrim('searchForm');
	if (data) {
	    temp = $.extend(temp, data);
	}
	return temp;
    }

    return tableOptions;
}


function getFrameHeight() {
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
    initAutocomplete();
    initZTree();

});

function initAutocomplete() {
    $('form').attr('autocomplete', 'off');
    $('input').attr('autocomplete', 'off');

    $('table.test').on('load-success.bs.table', function() {
	var _this = $(this);
	var tools = _this.parents('.bootstrap-table').find('.fixed-table-toolbar');
	tools.find('.pull-right').addClass('customerTools');
    });
}

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
	    if (typeof (queryCallback) == "function") {
		data = queryCallback(data);
	    }
	    data.pageNumber = 1;
	    _table.bootstrapTable("refresh", {
		query : data
	    });
	    _table.bootstrapTable('refreshOptions', {
		pageNumber : 1
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
	    if ($(this).hasClass('clear-hidden')) {
		_form.find('input').not('.fixed').val("");
	    } else {
		_form.find('input').not('.fixed').not('input[type="hidden"]').val("");
	    }
	    _form.find('select').not('.fixed').val("");
	    var data = formtoJsonTrim(formId);
	    if (typeof (resetCallback) == "function") {
		data = resetCallback(data);
	    }
	    data.pageNumber = 1;
	    _table.bootstrapTable("refresh", {
		query : data
	    });
	    _table.bootstrapTable('refreshOptions', {
		pageNumber : 1
	    });

	});

    });
}

function sendAjax(type, url, params) {
    var res = '';
    var index;
    $.ajax({
	type : type,
	url : webPath + url,
	data : params,
	async : false,
	beforeSend : function() {
	    index = layer.load(1, {
		shade : [ 0.5, '#fff' ]
	    // 0.1透明度的白色背景
	    });
	},
	success : function(data) {
	    if (data == '') {
		layer.msg('请求出错,请刷新页面');
	    } else {
		res = data;
	    }
	},
	error : function(data) {
	    layer.msg('请求出错');
	},
	complete : function() {
	    layer.close(index);
	}
    })
    return res;
}

function initSelectById(domId) {
    var _this = $("#" + domId);
    var _name = _this.attr('name');
    var _id = _this.attr('id') + '-Select';
    var _refid = _this.attr('refid');
    var _thisvalue = _this.val();
    var _msg = _this.attr('msg') == undefined ? "" : _this.attr('msg');
    // checked="checked"
    var _queryparam = _this.attr("queryparam");
    var option = strToJson(_this.attr('data-option'));
    if (option != undefined && option != "") {
	var _parameter = {};
	if (undefined == _queryparam) {
	    _parameter = option['parameter'];
	} else {
	    _parameter = strToJson(_queryparam);
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
    $('.customSelectInput').each(function(i, k) {
	var _this = $(k);
	var _name = _this.attr('name');
	var _id = _this.attr('id') + '-Select';
	var _refid = _this.attr('refid');
	var _thisvalue = _this.val();
	var _msg = _this.attr('msg') == undefined ? "" : _this.attr('msg');
	var _condition = _this.attr('condition');
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
	    _this.removeClass('customSelectInput').removeClass('form-control');
	    var _class = _this.attr('class');
	    _this.hide();

	    $.ajax({
		url : _url,
		data : _parameter,
		type : "post",
		dataType : "json",
		success : function(result) {
		    var _thisvaluename = _thisvalue;
		    var html = "";
		    html += _this.prop('outerHTML');
		    html += '<input type="hidden" class="selectinputvalue" name="' + _name + '" value="' + _thisvalue + '">';
		    var datahtml = '<ul class="selectinputdata" name="' + _name + '_text_select_data" style="display:none;">\n';
		    for (var i = 0; i < result.length; i++) {
			var obj = result[i];
			datahtml += '<li class="selectinputdatali" data-value="' + obj[_value] + '" data-name="' + obj[_text] + '"';
			if (_thisvalue != "") {
			    if (_thisvalue == obj[_value]) {
				_thisvaluename = obj[_text];
			    }
			}

			datahtml += '>' + obj[_text] + '</li>\n';

		    }
		    datahtml += '</ul>\n';
		    var namehtml = '<input class="form-control selectinputname" name="' + _name + '_text_select_name" value="' + _thisvaluename + '">';
		    html += namehtml;
		    html += datahtml;

		    var _p = _this.parent();
		    _p.html(html);

		    if (typeof (refreshValidator) == "function") {
			refreshValidator();
		    }

		},
		error : function(error) {
		}

	    });
	}
    });

    var selectinputdatalistate = false;
    $('body').on('focus', '.selectinputname', function() {
	var _this = $(this);
	var _width = _this.outerWidth();
	var _parent = _this.parent();
	var _selectinputdata = _parent.find('.selectinputdata');
	var datas = _selectinputdata.find('li');
	if (datas.length > 0) {
	    _selectinputdata.show().width(_width - 2);
	    selectinputdatalistate = false;
	}

    }).on('blur', '.selectinputname', function() {
	console.log(selectinputdatalistate)
	if (!selectinputdatalistate)
	    $(this).parent().find('.selectinputdata').hide();
    }).on('mouseover ', '.selectinputdatali', function() {
	selectinputdatalistate = true;
    }).on('click', '.selectinputdatali', function() {
	var _this = $(this);
	var _parent = _this.parent().parent();
	_parent.find('.selectinputname').val(_this.attr('data-name'));
	_parent.find('.selectinputvalue').val(_this.attr('data-value'));
	_parent.find('.selectinputdata').hide();
    }).on('input propertychange','.selectinputname',function(){
	var _this = $(this);
	var _parent = _this.parent();
	_parent.find('.selectinputvalue').val(_this.val());
    });;
    
    $('.customSelect').each(function(i, k) {
	var _this = $(k);
	var _name = _this.attr('name');
	var _id = _this.attr('id') + '-Select';
	var _refid = _this.attr('refid');
	var _thisvalue = _this.val();
	var _msg = _this.attr('msg') == undefined ? "" : _this.attr('msg');
	var _condition = _this.attr('condition');
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
	    var _class = _this.attr('class');
	    _this.hide();

	    $.ajax({
		url : _url,
		data : _parameter,
		type : "post",
		dataType : "json",
		success : function(result) {
		    var html = "";
		    html += _this.prop('outerHTML');
		    html += '<select class="form-control"  class="' + _class + '" name="' + _name + '" id="' + _id + '"';
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
			if (_condition != undefined) {
			    html += ' data-condition="' + obj[_condition] + '"';
			}
			html += '>' + obj[_text] + '</option>\n';

		    }
		    html += '</select>\n';
		    var _p = _this.parent();
		    _p.html(html);
		    _p.find('select[name="' + _name + '"]').data('customSelectData', result);

		    for (var i = 0; i < result.length; i++) {
			var obj = result[i];
			_p.find('select[name="' + _name + '"] option[value="' + obj[_value] + '"]').data('rowdata', obj);
		    }

		    $('#' + _id).on('change', function() {
			if (typeof (customSelectChange) == "function") {
			    customSelectChange(_id);
			}
		    })
		    if (undefined != _refid) {
			$('#' + _id).on('change', function() {

			    cascadeSelect(_refid, $('#' + _id).val());
			})
		    }
		    if (typeof (refreshValidator) == "function") {
			refreshValidator();
		    }

		},
		error : function(error) {
		}

	    });
	}
    });

    $('.customRadio').each(function(i, k) {
	var _this = $(k);
	var _name = _this.attr('name');
	var _thisvalue = _this.val();
	var _condition = _this.attr('condition');
	var option = strToJson(_this.attr('data-option'));
	if (option != undefined && option != "") {
	    var _parameter = option['parameter'];
	    var _url = option['url'];
	    var _text = option['textField'];
	    var _value = option['valueField'];
	    var _disabled = option["disabled"];

	    _this.attr('boxname="' + _name + '"');
	    _this.removeAttr('name');
	    _this.removeClass('customRadio').removeClass('form-control');
	    var _class = _this.attr('class');
	    _this.hide();

	    $.ajax({
		url : _url,
		data : _parameter,
		type : "post",
		dataType : "json",
		success : function(result) {
		    var html = '';
		    html += _this.prop('outerHTML');
		    for (var i = 0; i < result.length; i++) {
			var obj = result[i];
			html += '<label class="customLabel">\n';
			html += '<input type="radio" data-index="' + i + '" class="' + _class + '" name="' + _name + '" value="' + obj[_value] + '"';
			// if (i == 0 && _thisvalue == "") {
			// html += ' checked="true"';
			// } else
			if (_thisvalue == obj[_value]) {
			    html += ' checked="true"';
			}
			if (_disabled != undefined && (_disabled || _disabled == 'true')) {
			    html += ' disabled ="' + _disabled + '"';
			}
			if (_condition != undefined) {
			    html += ' data-condition="' + obj[_condition] + '"';
			}
			html += '>&nbsp;&nbsp;' + obj[_text] + '</label>';
		    }
		    html += '';

		    _this.parent().html(html);

		},
		error : function(error) {
		}

	    });
	}
    });

    $('.customCheckBox').each(function(i, k) {
	var _this = $(k);
	var _name = _this.attr('name');
	var _thisvalue = _this.val();
	var _condition = _this.attr('condition');
	var option = strToJson(_this.attr('data-option'));
	if (option != undefined && option != "") {
	    var _parameter = option['parameter'];
	    var _url = option['url'];
	    var _text = option['textField'];
	    var _value = option['valueField'];
	    var _disabled = option["disabled"];

	    _this.attr('boxname="' + _name + '"');
	    _this.removeAttr('name');
	    _this.removeClass('customCheckBox').removeClass('form-control');
	    var _class = _this.attr('class');
	    _this.hide();

	    $.ajax({
		url : _url,
		data : _parameter,
		type : "post",
		dataType : "json",
		success : function(result) {
		    var html = '';
		    html += _this.prop('outerHTML');
		    for (var i = 0; i < result.length; i++) {
			var obj = result[i];
			html += '<label class="customLabel">\n';
			html += '<input type="checkbox" data-index="' + i + '" class="' + _class + '" name="' + _name + '" value="' + obj[_value] + '"';
			var _values = _thisvalue.split(",");
			for (var j = 0; j < _values.length; j++) {
			    if (_values[j] == obj[_value]) {
				html += ' checked="true"';
			    }
			}
			if (_disabled != undefined && (_disabled || _disabled == 'true')) {
			    html += ' disabled ="' + _disabled + '"';
			}
			if (_condition != undefined) {
			    html += ' data-condition="' + obj[_condition] + '"';
			}
			html += '>&nbsp;&nbsp;' + obj[_text] + '</label>';
		    }
		    html += '';

		    _this.parent().html(html);

		},
		error : function(error) {
		}

	    });
	}
    });
    var yon_json = [ {
	"name" : "是",
	"value" : "1"
    }, {
	"name" : "否",
	"value" : "0"
    } ];

    $('.customYON').each(function(i, k) {
	var _this = $(k);
	var _name = _this.attr('name');
	var _thisvalue = _this.val();
	var option = strToJson(_this.attr('data-option'));
	if (option != undefined && option != "") {
	    var _type = option['type'];
	    var _disabled = option["disabled"];

	    _this.attr('boxname="' + _name + '"');
	    _this.removeAttr('name');
	    _this.removeClass('customYON');
	    _this.hide();

	    var html = '';
	    html += _this.prop('outerHTML');
	    if (_type == 'select') {
		html += '<select class="form-control" name="' + _name + '" ';
		if (_disabled != undefined && (_disabled || _disabled == 'true')) {
		    html += ' disabled ="' + _disabled + '"';
		}
		html += '>\n';
		html += '<option value=""';
		if (_thisvalue == "") {
		    html += ' selected="selected"';
		}
		html += '>请选择</option>\n';
		for (var i = 0; i < yon_json.length; i++) {
		    var obj = yon_json[i];
		    html += '<option value="' + obj["value"] + '"' + ' data-rowdata=\'' + obj + '\'';
		    if (_thisvalue != "") {
			if (_thisvalue == obj["value"]) {
			    html += ' selected="selected"';
			}
		    }
		    html += '>' + obj["name"] + '</option>\n';

		}
		html += '</select>\n';
	    } else if (_type == 'checkBox') {
		for (var i = 0; i < yon_json.length; i++) {
		    var obj = yon_json[i];
		    html += '<label class="customLabel">\n';
		    html += '<input type="checkbox" name="' + _name + '" value="' + obj["value"] + '"';
		    if (_thisvalue == obj["value"]) {
			html += ' checked="true"';
		    }
		    if (_disabled != undefined && (_disabled || _disabled == 'true')) {
			html += ' disabled ="' + _disabled + '"';
		    }
		    html += '>&nbsp;&nbsp;' + obj["name"] + '</label>';
		}
	    } else if (_type == 'radio') {
		for (var i = 0; i < yon_json.length; i++) {
		    var obj = yon_json[i];
		    html += '<label class="customLabel">\n';
		    html += '<input type="radio" name="' + _name + '" value="' + obj["value"] + '"';
		    if (_thisvalue == obj["value"]) {
			html += ' checked="true"';
		    }
		    if (_disabled != undefined && (_disabled || _disabled == 'true')) {
			html += ' disabled ="' + _disabled + '"';
		    }
		    html += '>&nbsp;&nbsp;' + obj["name"] + '</label>';
		}
	    } else {
		html += '<input type="text" name="' + _name + '" value="' + _thisvalue + '"';
		if (_disabled != undefined && (_disabled || _disabled == 'true')) {
		    html += ' disabled ="' + _disabled + '"';
		}
		html += '>';
	    }
	    html += '';
	    _this.parent().html(html);

	}
    });

}

function strToJson(str) {
    if (str == undefined || str == "") {
	return null;
    }
    var json = eval('(' + str + ')');
    // console.log('json');
    // console.log(json);
    return json;
}
/**
 * bootStrapTable扩展
 */
var bsTable = {
    selectionIds : [],
    selectionNames : [],
    singleSelect : false,
    initTable : function(tableId, options, isSingleSelect) {
	var self = this;
	options.maintainSelected = true;
	if (isSingleSelect) {
	    self.singleSelect = true;
	    options.singleSelect = isSingleSelect;
	} else {
	    self.singleSelect = false;
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
	if (bsTable.singleSelect) {
	    array.length = 0;
	}
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
	// console.log("data=" + data[i]);
    }
}
function responseHandler(res) {
    var self = this;
    $.each(res.rows, function(i, row) {
	// console.log("selectionIds=" + bsTable.selectionIds);
	row.checkStatus = $.inArray(row.id, bsTable.selectionIds) != -1; // 判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true
    });
    // console.log("rows="+JSON.stringify(res.rows));
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
    options.selectedBackColor = "#ffffff00"
    options.selectedColor = "#333"

    var tree = $('#' + treeId);
    var nodeCheckedSilent = false;

    function nodeSelected(event, node) {
	if (nodeCheckedSilent) {
	    return;
	}
	nodeCheckedSilent = true;
	checkAllParent(node);
	// checkAllSon(node);
	nodeCheckedSilent = false;
    }
    function nodeUnselected(event, node) {
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
	checkAllSon(node);
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
    options.onNodeSelected = nodeSelected;
    options.onNodeUnselected = nodeUnselected;
    options.onNodeChecked = nodeChecked;
    options.onNodeUnchecked = nodeUnchecked;
    tree.treeview(options);

    var nodes = tree.treeview('getEnabled');
    // console.log("nodes=" + JSON.stringify(nodes));
    // console.log("nodes=" + JSON.stringify(ids));
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
	    if (selectNodes[i].state.checked) {
		resIds += selectNodes[i].id + ","
	    }
	}
	if (resIds.length > 0) {
	    resIds = resIds.substring(0, resIds.length - 1);
	}
	// console.log("selectIds=" + resIds);
	return resIds;
    }

}
// 根据身份证号获取性别、年龄、出生日期
function getIdCardMsg(idCard) {
    var data = {};
    if (idCard.length == 15) {
	data.birthday = '19' + idCard.substring(6, 8) + "-" + idCard.substring(8, 10) + "-" + idCard.substring(10, 12);
	// 获取性别
	if (parseInt(idCard.substr(14, 1)) % 2 == 1) {
	    data.sex = "男"
	} else {
	    data.sex = "女"
	}
	// 获取年龄
	var myDate = new Date();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	var age = myDate.getFullYear() - ('19' + idCard.substring(6, 8) - 1);
	if (idCard.substring(10, 12) < month || idCard.substring(10, 12) == month && idCard.substring(12, 14) <= day) {
	    age++;
	}
	data.age = age;
    } else if (idCard.length == 18) {
	data.birthday = idCard.substring(6, 10) + "-" + idCard.substring(10, 12) + "-" + idCard.substring(12, 14);
	// 获取性别
	if (parseInt(idCard.substr(16, 1)) % 2 == 1) {
	    data.sex = "男"
	} else {
	    data.sex = "女"
	}
	// 获取年龄
	var myDate = new Date();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	var age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
	if (idCard.substring(10, 12) < month || idCard.substring(10, 12) == month && idCard.substring(12, 14) <= day) {
	    age++;
	}
	data.age = age;
    }

    return data;
}
function initZTree() {
    $('body').on('mouseover ', '.ztree li a', function() {
	$('li').removeClass('hover');
	$(this).parent().addClass('hover');
    }).on('mouseout', 'a', function() {
	$('li').removeClass('hover');
    });
    $('body').on('click ', '.ztree li a', function() {
	$('li').removeClass('clicker');
	$(this).parent().addClass('clicker');
    });
}