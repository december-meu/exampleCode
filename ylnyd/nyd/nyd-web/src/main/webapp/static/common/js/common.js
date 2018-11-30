function mMap() {
    this.elements = new Array();

    this.size = function() {
	return this.elements.length;
    }

    this.isEmpty = function() {
	return (this.elements.length < 1);
    }

    this.clear = function() {
	this.elements = new Array();
    }

    this.put = function(_key, _value) {
	this.elements.push({
	    key : _key,
	    value : _value
	});
    }

    this.remove = function(_key) {
	var bln = false;
	try {
	    for (i = 0; i < this.elements.length; i++) {
		if (this.elements[i].key == _key) {
		    this.elements.splice(i, 1);
		    return true;
		}
	    }
	} catch (e) {
	    bln = false;
	}
	return bln;
    }

    this.remove = function() {
	var bln = false;
	try {

	    this.elements.slice(0, this.elements.length);

	} catch (e) {
	    bln = false;
	}
	return bln;
    }

    this.get = function(_key) {
	try {
	    for (i = 0; i < this.elements.length; i++) {
		if (this.elements[i].key == _key) {
		    return this.elements[i].value;
		}
	    }
	} catch (e) {
	    return null;
	}
    }

    this.element = function(_index) {
	if (_index < 0 || _index >= this.elements.length) {
	    return null;
	}
	return this.elements[_index];
    }

    this.containsKey = function(_key) {
	var bln = false;
	try {
	    for (i = 0; i < this.elements.length; i++) {
		if (this.elements[i].key == _key) {
		    bln = true;
		}
	    }
	} catch (e) {
	    bln = false;
	}
	return bln;
    }

    this.containsValue = function(_value) {
	var bln = false;
	try {
	    for (i = 0; i < this.elements.length; i++) {
		if (this.elements[i].value == _value) {
		    bln = true;
		}
	    }
	} catch (e) {
	    bln = false;
	}
	return bln;
    }

    this.values = function() {
	var arr = new Array();
	for (i = 0; i < this.elements.length; i++) {
	    arr.push(this.elements[i].value);
	}
	return arr;
    }

    this.keys = function() {
	var arr = new Array();
	for (i = 0; i < this.elements.length; i++) {
	    arr.push(this.elements[i].key);
	}
	return arr;
    }
}
/**
 * 数字格式化
 * 
 */
function formatNumber(number, scale) {
    if (isNaN(number)) {
	return "0.00";
    }
    number = Math.abs(number); // 取绝对值
    return (number.toFixed(scale)); // 保留两位小数

}
function formatNum(number) {
    return formatNumber(number, 2);
}

/**
 * 字符串去空格
 * 
 * @param str
 * @returns
 */
function trim(str) {
    str = "" + str;
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function isValidStr(str) {
    return (str != null && trim(str) != '' && str != 'undefined' && str != 'null');
}

/**
 * 克隆js对象
 * 
 * @param obj
 * @returns {Clone}
 */
function cloneObj(obj) {
    function Clone() {
    }
    Clone.prototype = obj;
    var o = new Clone();
    for ( var a in o) {
	if (typeof o[a] == "object") {
	    o[a] = clone3(o[a]);
	}
    }
    return o;
}
function cloneVal(obj) {
    var o;
    switch (typeof obj) {
    case 'undefined':
	break;
    case 'string':
	o = obj + '';
	break;
    case 'number':
	o = obj - 0;
	break;
    case 'boolean':
	o = obj;
	break;
    case 'object':
	if (obj === null) {
	    o = null;
	} else {
	    if (obj instanceof Array) {
		o = [];
		for (var i = 0, len = obj.length; i < len; i++) {
		    o.push(cloneVal(obj[i]));
		}
	    } else {
		o = {};
		for ( var k in obj) {
		    o[k] = cloneVal(obj[k]);
		}
	    }
	}
	break;
    default:
	o = obj;
	break;
    }
    return o;
}
/**
 * 表单转为json数据
 * 
 * @param formid
 * @returns {___anonymous129_130}
 */
function formtoJsonTrim(formid) {
    var form = $("#" + formid);
    var array = form.serializeArray();
    var obj = {};
    $.each(array, function() {

	if (obj[this.name]) {
	    if (!obj[this.name].push) {
		obj[this.name] = [ obj[this.name] ];
	    }
	    if (this.value && this.value != "") {
		obj[this.name].push(this.value);
	    }
	} else {
	    if (this.value && this.value != "") {

		if (this.name == 'code') {
		    var prefix = form.find('input[name=code]').first().parent('div').find('.input-group-addon').first().text();
		    // console.log("perfix"+prefix);
		    if (prefix != "") {
			obj[this.name] = prefix + this.value;
		    } else {
			obj[this.name] = this.value;
		    }
		} else {

		    obj[this.name] = this.value;
		}

	    }
	}
    });
    return obj;
}

function layershow(title, content, width, height, success, yes, cancel) {

    if (!content) {
	return layer.alert("弹出框无内容！")
    }
    layer.open({
	type : 2,
	title : title ? title : "",
	shade : [ 0.5, '#000', true ],
	area : [ width, height ],
	yes : yes,
	cancel : cancel,
	content : content, // iframe的url，no代表不显示滚动条
	success : success ? success : function(layero, index) {
	    if ($(document.body).height() < 740) {
		layer.style(index, {
		    width : width,
		    height : "440"
		});
		$('#layui-layer' + index).css({
		    position : 'absolute',
		    left : ($(window).width() - $('.layui-layer').outerWidth()) / 2,
		    top : 0
		});
	    }
	}
    });
}

// 计算天数差的函数，通用  
function dateDiff(sDate1, sDate2) { // sDate1和sDate2是xxxx-xx-xx格式  
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) // 转换为xx-xx-xxxx格式  
    aDate = sDate2.split("-")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24) // 把相差的毫秒数转换为天数  
    return iDays
}
