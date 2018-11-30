/*!
 * =====================================================
 * SUI Mobile - http://m.sui.taobao.org/
 *
 * =====================================================
 */
// jshint ignore: start
+function($){

$.smConfig.rawCitiesData = [
    {
        "name":"招投标",
        "sub":[
            {
                "name":"搜集招投标信息"
            },
            {
                "name":"报名购买标书"
            },
            {
                "name":"标书评审"
            },
            {
                "name":"保证金",
                "sub":[{
                    "name":"缴纳"
                },{
                	"name":"退还"

                }]

            },
            {
                "name":"开具证明"
            },
            {
                "name":"标书",
                "sub":[{
                	"name":"编写"
                },{
                	"name":"检测"
                }]
            },
            {
                "name":"打印封装"
            },
            {
                "name":"原件准备"
            },
            {
                "name":"投标"
            },
            {
                "name":"中标服务费缴纳"
            },
            {
                "name":"标书模板编写"
            }
        ],
        "type":0
    },
    {
        "name":"合同",
        "sub":[
            {
                "name":"请选择",
                "sub":[

                ]
            },
            {
                "name":"编制"
            },
            {
                "name":"审核"
            },
            {
                "name":"签订"
            },
            {
                "name":"统计",  
                "sub":[{
                	"name":"制定月度收款计划"
                },{
                	"name":"统计月度收款"
                }]
            }]
    },
    {
        "name":"方案预算",
        "sub":[
            {
                "name":"请选择"
            },{
            	"name":"编写预算"
            },{
            	"name":"预算审核"
            },{
            	"name":"交底会"
            },{
            	"name":"协调会"
            },{
            	"name":"任务书下达"
            },{
            	"name":"项目跟踪"
            },{
            	"name":"处理客户投诉"
            },
            {
                "name":"其他"
            }
        ],
        "type":0
    },  
    {
        "name":"采购",
        "sub":[
            {
                "name":"请选择"
            },{
            	"name":"物品采购"
            },{
            	"name":"采购合同",
            	"sub":[ {
                    "name":"编制"
                },
                {
                    "name":"审核"
                },
                {
                    "name":"签订"
                },{
                	"name":"统计"
                }
            	 ]
            },{
            	"name":"供应商考核备案统计"
            }
        ],
        "type":0
    },
];

}(Zepto);
// jshint ignore: end

/* jshint unused:false*/

+ function($) {
    "use strict";
    var format = function(data) {
        var result = [];
        for(var i=0;i<data.length;i++) {
            var d = data[i];
            if(d.name === "请选择") continue;
            result.push(d.name);
        }
        if(result.length) return result;
        return [""];
    };

    var sub = function(data) {
        if(!data.sub) return [""];
        return format(data.sub);
    };

    var getCities = function(d) {
        for(var i=0;i< raw.length;i++) {
            if(raw[i].name === d) return sub(raw[i]);
        }
        return [""];
    };

    var getDistricts = function(p, c) {
        for(var i=0;i< raw.length;i++) {
            if(raw[i].name === p) {
                for(var j=0;j< raw[i].sub.length;j++) {
                    if(raw[i].sub[j].name === c) {
                        return sub(raw[i].sub[j]);
                    }
                }
            }
        }
        return [""];
    };

    var raw = $.smConfig.rawCitiesData;
    var provinces = raw.map(function(d) {
        return d.name;
    });
    var initCities = sub(raw[0]);
    var initDistricts = [""];

    var currentProvince = provinces[0];
    var currentCity = initCities[0];
    var currentDistrict = initDistricts[0];

    var t;
    var defaults = {

        cssClass: "city-picker",
        rotateEffect: false,  //为了性能

        onChange: function (picker, values, displayValues) {
            var newProvince = picker.cols[0].value;
            var newCity;
            if(newProvince !== currentProvince) {
                // 如果Province变化，节流以提高reRender性能
                clearTimeout(t);

                t = setTimeout(function(){
                    var newCities = getCities(newProvince);
                    newCity = newCities[0];
                    var newDistricts = getDistricts(newProvince, newCity);
                    picker.cols[1].replaceValues(newCities);
                    picker.cols[2].replaceValues(newDistricts);
                    currentProvince = newProvince;
                    currentCity = newCity;
                    picker.updateValue();
                }, 200);
                return;
            }
            newCity = picker.cols[1].value;
            if(newCity !== currentCity) {
                picker.cols[2].replaceValues(getDistricts(newProvince, newCity));
                currentCity = newCity;
                picker.updateValue();
            }
        },

        cols: [
        {
            textAlign: 'center',
            values: provinces,
            cssClass: "col-province"
        },
        {
            textAlign: 'center',
            values: initCities,
            cssClass: "col-city"
        },
        {
            textAlign: 'center',
            values: initDistricts,
            cssClass: "col-district"
        }
        ]
    };

    $.fn.taskPicker = function(params) {
        return this.each(function() {
            if(!this) return;
            var p = $.extend(defaults, params);
            //计算value
            if (p.value) {
                $(this).val(p.value.join(' '));
            } else {
                var val = $(this).val();
                val && (p.value = val.split(' '));
            }

            if (p.value) {
                //p.value = val.split(" ");
                if(p.value[0]) {
                    currentProvince = p.value[0];
                    p.cols[1].values = getCities(p.value[0]);
                }
                if(p.value[1]) {
                    currentCity = p.value[1];
                    p.cols[2].values = getDistricts(p.value[0], p.value[1]);
                } else {
                    p.cols[2].values = getDistricts(p.value[0], p.cols[1].values[0]);
                }
                !p.value[2] && (p.value[2] = '');
                currentDistrict = p.value[2];
            }
            $(this).picker(p);
        });
    };

}(Zepto);
