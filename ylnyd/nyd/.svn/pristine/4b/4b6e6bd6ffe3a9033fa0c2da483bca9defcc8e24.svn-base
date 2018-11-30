var sexType={}
$.ajax({
	url:webPath+"sys/dict/list/all",
	type:"post",
	async:false,
	data:{typeCode: "type-sex"},
	success:function(data){
		console.log(data)
		for(var i=0;i<data.length;i++){
			sexType[data[i].id]=data[i].name;
		}
	}
})
$(function() {
	
	
	
  // 1.初始化Table
  var mainList = new MainList();
  mainList.Init();

  // 2.初始化Button的点击事件
  var oButtonInit = new ButtonInit();
  oButtonInit.Init();



});
function queryCallback(data){
	var depId=$('#dep-tree-Select-id').val();
//	data["filter_EQ_organization.id"]=$('#org-select-Select option[selected="selected"]').val();
	if(depId==""){
		data["depId"]="0";
		return data;
	}else{
		 data["depId"]=depId;
	}
	return data;
}
function onDepSelected(inputId, val) {
  $('#' + inputId).attr("name", "depId");
  // $('#' + inputId).attr("name", "filter_EQ_department.id");
  var depId = $('#' + inputId).val();

  // console.log("changeId=" + depId);
}

function refreshList(resId) {
  $('#dataList').bootstrapTable('refresh');
  $('#selectedList').bootstrapTable('refresh');
}

function refreshValidator() {
  if (isSelectForm) {
    $("#search-type").siblings('select').first().find(":contains('内部员工')").first().attr("selected", true);
    // $("#search-type").siblings('select').first().find("option[value='8ad03944634f6ecc01634f708c900001']").first().attr("selected",
    // true);
    // $("#search-type-Select").find("option[text='内部员工']").first().attr("selected",
    // true);
    var data = formtoJsonTrim('searchForm');
   
    $('#dataList').bootstrapTable('refresh', {
      query : data
    });
    $('#dataList').bootstrapTable('refresh', {
        query : data
      });
    $("#search-type").parent('div').hide();
  }
}

var callback = function() {
  return bsTable.selectionIds;
}
var nameSelectCallback = function() {
  return bsTable.selectionNames;
}
var MainList = function() {
  var mainList = new Object();
  var url = webPath + 'sys/user/list';
  var columnOnly = [{
	  field : 'username',
	  title : '姓名'
  }];
  var columns = [ {
    checkbox : true
  }, {
    field : 'id',
    visible : false,
    title : "id",
  }, {
    field : 'username',
    title : '姓名'
  }, {
    // field : 'type.name',
    title : '类型',

    formatter : function(value, row, index) {
      if (row.type) {
        return row.type.name;
      } else {
        return "";
      }
    }
  }, {
    field : 'account',
    title : '账号'
  }, {
    field : 'sex',
    title : '性别',
   formatter : function(value, row, index) {
	   return sexType[value]
   }
  }, {
    field : 'cellphone',
    title : '手机'
  }, {
    field : 'email',
    title : '邮箱'
  } ];

  columnsSelect = [ {
    field : 'checkStatus',
    checkbox : true
  }, {
    field : 'id',
    visible : false,
    title : "id",
  }, {
    // field : 'type.name',
    title : '类型',

    formatter : function(value, row, index) {
      if (row.type) {
        return row.type.name;
      } else {
        return "";
      }
    }
  }, {
    field : 'username',
    title : '姓名'
  }, {
    field : 'cellphone',
    title : '手机号'
  } ];

  mainList.Init = function() {
    var options = getBsTableOptions(url, "toolbar", columns,  mainList.queryParams, null);
    var optionOnly = getBsTableOptions(url, "toolbar", columnOnly,  mainList.queryParamOnly, null);
    optionOnly.pageList = [];
	optionOnly.pageSize = 9999;
    options.onLoadSuccess = function(data) { // 加载成功时执行
      if (data.msg) {
        layer.msg(data.msg);
      }
    }, options.onLoadError = function(data) {
      "load error" + JSON.stringify(data)
      if (data.code == 417) {
        console.log("load error" + JSON.stringify(data));
        layer.alert("抱歉权限不足");
      }
//      $('#table').bootstrapTable('removeAll');
    };

    if (!isSelectForm) {
      $('#dataList').bootstrapTable(options);
      $('#selectedList').bootstrapTable(optionOnly);
    } else {
      var options1 = getBsTableOptions(url, "toolbar", columns, mainList.queryParams, null,null,440);
      var optionOnly1 = getBsTableOptions(url, "toolbar", columnOnly, mainList.queryParamOnly, null,null,440);
      optionOnly1.pageList = [];
      optionOnly1.pageSize = 9999;
      var userIds = $('#userIds').val();
      if (userIds != "") {
        bsTable.selectionIds = userIds.split(",")
        // console.log("selectionIds=" + bsTable.selectionIds);
      }
      options1.columns = columnsSelect;
      if (isSingleSelect) {
        bsTable.initTable("dataList", options1, true);
        bsTable.initTable("selectedList", optionOnly1, true);
      } else {
        bsTable.initTable("dataList", options1);
        bsTable.initTable("selectedList", optionOnly1);
      }
     
    }

  }
  // 得到查询的参数
  mainList.queryParams = function(params) {
    var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
      pageSize : params.pageSize, // 页面大小
      pageNumber : params.pageNumber, // 页码
    };
    var superiorId = $('#superiorId').val();
    if (superiorId != "") {
      temp["filter_NE_id"] = superiorId;
    }
    var typeId = $("#search-type-Select").find("option:selected").val();
    temp["filter_LIKE_type.id"] = typeId;
    temp.sortField = "createDate";
    temp.sortDir = "desc";
    return temp;
  };
  mainList.queryParamOnly = function(params) {
	    var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	      pageSize : params.pageSize, // 页面大小
	      pageNumber : params.pageNumber, // 页码
	    };
	    var userIds = $('#userIds').val();
	    if(userIds != ""){
	    	temp["filter_IN_id"] = userIds;
	    }else{
	    	temp["filter_IN_id"] = "-1";
	    }
	    var superiorId = $('#superiorId').val();
	    if (superiorId != "") {
	      temp["filter_NE_id"] = superiorId;
	    }
	    var typeId = $("#search-type-Select").find("option:selected").val();
	    temp["filter_LIKE_type.id"] = typeId;
	    temp.sortField = "createDate";
	    temp.sortDir = "desc";
	    return temp;
	  };
  return mainList;
};
/**
 * 初始按钮事件
 */
var ButtonInit = function() {
  var oInit = new Object();
  var postdata = {};

  oInit.Init = function() {
    // 初始化页面上面的按钮事件

    $('#btn_add').click(function() {
      layer.open({
        type : 2,
        title : "添加用户",
        shade : [ 0.5, '#000', true ],
        shade : [ 0 ],
        area : [ '500px', '500px' ],
        anim : 2,
        content : [ webPath + 'sys/user/form' ], // iframe的url，no代表不显示滚动条
        end : function() { // 此处用于演示

        }
      });

    });
    $('#btn_edit').click(function() {
      console.log("click");
      var rows = $('#dataList').bootstrapTable('getAllSelections');
      if (rows.length == 0) {
        layer.alert("请选择一条数据！");
        return;
      }
      if (rows.length > 1) {
        layer.alert("只能选择一条数据！");
        return;
      }
      var id = rows[0].id;
      layer.open({
        type : 2,
        title : "修改用户",
        shade : [ 0.5, '#000', true ],
        // closeBtn: 0, //不显示关闭按钮
        shade : [ 0 ],
        area : [ '500px', '400px' ],
        // offset: 'rb', //右下角弹出
        // time: 2000, //2秒后自动关闭
        anim : 2,
        content : [ webPath + 'sys/user/form?id=' + id, 'no' ], // iframe的url，no代表不显示滚动条
        end : function() { // 此处用于演示

        }
      });

    });
    $('#btn_setOrgInfo').click(function() {
      console.log("click");
      var rows = $('#dataList').bootstrapTable('getAllSelections');
      if (rows.length == 0) {
        layer.alert("请选择一条数据！");
        return;
      }
      if (rows.length > 1) {
        layer.alert("只能选择一条数据！");
        return;
      }
      var id = rows[0].id;
      layer.open({
        type : 2,
        title : "修改用户",
        shade : [ 0.5, '#000', true ],
        // closeBtn: 0, //不显示关闭按钮
        shade : [ 0 ],
        area : [ '700px', '550px' ],
        // offset: 'rb', //右下角弹出
        // time: 2000, //2秒后自动关闭
        anim : 2,
        content : [ webPath + 'sys/user/update/orgInfo?id=' + id, 'no' ], // iframe的url，no代表不显示滚动条
        end : function() { // 此处用于演示

        }
      });

    });
    $('#btn_updatePhone').click(function() {
      console.log("click");
      var rows = $('#dataList').bootstrapTable('getAllSelections');
      if (rows.length == 0) {
        layer.alert("请选择一条数据！");
        return;
      }
      if (rows.length > 1) {
        layer.alert("只能选择一条数据！");
        return;
      }
      var id = rows[0].id;
      layer.open({
        type : 2,
        title : "修改用户",
        shade : [ 0.5, '#000', true ],
        // closeBtn: 0, //不显示关闭按钮
        shade : [ 0 ],
        area : [ '500px', '300px' ],
        // offset: 'rb', //右下角弹出
        // time: 2000, //2秒后自动关闭
        anim : 2,
        content : [ webPath + 'sys/user/update/cellphone?id=' + id, 'no' ], // iframe的url，no代表不显示滚动条

      });

    });

    $("#btn_delete").click(function() {
      var rows = $('#dataList').bootstrapTable('getAllSelections');
      if (rows.length == 0) {
        layer.alert("请选择一条数据！");
        return;
      }
      if (rows.length > 1) {
        layer.alert("只能选择一条数据！");
        return;
      }
      console.log("rows=" + JSON.stringify(rows));
      data = {
        id : rows[0].id
      };
      layer.confirm('确定删除吗?', {
        icon : 3,
        title : '提示'
      }, function(index) {
        // //////
        var ajax = $.ajax({
          url : webPath + "/sys/user/delete",
          data : data,
          type : "POST",
          dataType : "json",
          success : function(result) {
            if (result.code == "200") {
              $("#dataList").bootstrapTable('refresh', {
                silent : true
              });
            } else {
              layer.alert(result.msg);
            }
          },
          error : function(error) {
            layer.alert("请求出错！");
          }
        });
        layer.close(index);
      });
    });
    /**
     * 分配角色
     */
    $("#btn_setRole").click(function() {
      var rows = $('#dataList').bootstrapTable('getAllSelections');
      if (rows.length == 0) {
        layer.alert("请选择一条数据！");
        return;
      }
      if (rows.length > 1) {
        layer.alert("只能选择一条数据！");
        return;
      }
      var id = rows[0].id;
      layer.open({
        type : 2,
        title : "分配角色",
        shade : [ 0.5, '#000', true ],
        // closeBtn: 0, //不显示关闭按钮
        shade : [ 0 ],
        area : [ '80%', '80%' ],
        // offset: 'rb', //右下角弹出
        // time: 2000, //2秒后自动关闭
        anim : 2,
        content : [ webPath + 'sys/user/role/select?id=' + id ], // iframe的url，no代表不显示滚动条
        btn : [ '确定', '关闭' ],
        yes : function(index) {
          // 当点击‘确定’按钮的时候，获取弹出层返回的值
          var res = window["layui-layer-iframe" + index].callback();
          var roleIds = res.join();
          // 打印返回的值，看是否有我们想返回的值。
          console.log(roleIds);
          var data = {
            userId : id,
            roleIds : roleIds
          }
          $.ajax({
            url : webPath + "/sys/user/role/set",
            data : data,
            type : "POST",
            dataType : "json",
            success : function(result) {
              if (result.code == "200") {
                layer.msg('操作成功', {
                  icon : 1,
                  time : 1500
                }, function() {
                  $("#dataList").bootstrapTable('refresh', {
                    silent : true
                  });
                  layer.close(index);
                })
              } else {
                layer.msg(result.msg, {
                  icon : 5,
                  time : 1500
                }, function() {
                })
              }
            },
            error : function(error) {
              // 最后关闭弹出层
              layer.close(index);
              layer.alert("请求出错！");
            }
          });

          // 最后关闭弹出层
          layer.close(index);
        },
        cancel : function() {
          // 右上角关闭回调
        },
        end : function() { // 此处用于演示

        }
      });

    });

    function layershow(title,content,width,height,success,yes){
    	
    	if(!content){
    		return layer.alert("content未填写")
    	}
    	layer.open({
            type : 2,
            title : title?title:"",
            shade :[ 0.5, '#000', true ],
            area : [width,height],
            yes:yes,
            content : content, // iframe的url，no代表不显示滚动条
            success:success?success:function(layero,index){
                if($(document.body).height()<740){
                    layer.style(index,{
                          width:width,	
                          height:"440"
                      });
                    $('#layui-layer'+index).css({
                        position:'absolute', 
                        left: ($(window).width() - $('.layui-layer').outerWidth())/2, 
                        top:0
                    });
//                    console.log(layeropenindex)
                      }    ;
            }

          });
    }
    
    
    /**
     * 设置下属
     */
    $("#btn_setSubordinate").click(function() {
 
      var rows = $('#dataList').bootstrapTable('getAllSelections');
      if (rows.length == 0) {
        layer.alert("请选择一条数据！");
        return;
      }
      if (rows.length > 1) {
        layer.alert("只能选择一条数据！");
        return;
      }
      var id = rows[0].id;
      layer.open({
          type : 2,
          title : "设置下属",
          shade : [ 0.5, '#000', true ],
          // closeBtn: 0, //不显示关闭按钮
          shade : [ 0 ],
          area : [ '80%', '80%' ],
          // offset: 'rb', //右下角弹出
          // time: 2000, //2秒后自动关闭
          anim : 2,
          content : [ webPath + 'sys/user/sub/select?superiorId=' + id], // iframe的url，no代表不显示滚动条
          btn : [ '确定', '关闭' ],
          yes : function(index) {
            // 当点击‘确定’按钮的时候，获取弹出层返回的值
            var res = window["layui-layer-iframe" + index].callback();
            var roleIds = res.join();
            // 打印返回的值，看是否有我们想返回的值。
            var data = {
        		superiorId : id,
                userIds : roleIds
            }
            $.ajax({
              url : webPath + "/sys/user/sub/set",
              data : data,
              type : "POST",
              dataType : "json",
              success : function(result) {
                if (result.code == "200") {
                  layer.msg('操作成功', {
                    icon : 1,
                    time : 1500
                  }, function() {
                    $("#dataList").bootstrapTable('refresh', {
                      silent : true
                    });
                    layer.close(index);
                  })
                } else {
                  layer.msg(result.msg, {
                    icon : 5,
                    time : 1500
                  }, function() {
                  })
                }
              },
              error : function(error) {
                // 最后关闭弹出层
                layer.close(index);
                layer.alert("请求出错！");
              }
            });
            // 最后关闭弹出层
            layer.close(index);
          },
          cancel : function() {
            // 右上角关闭回调
          },
          end : function() { // 此处用于演示

          }
        });
    });
    
    //修改密码
    $('#btn_editPassword').click(function() {
      console.log("click");
      var rows = $('#dataList').bootstrapTable('getAllSelections');
      if (rows.length == 0) {
        layer.alert("请选择一条数据！");
        return;
      }
      if (rows.length > 1) {
        layer.alert("只能选择一条数据！");
        return;
      }
      var id = rows[0].id;
      layer.open({
        type : 2,
        title : "修改密码",
        shade : [ 0.5, '#000', true ],
        // closeBtn: 0, //不显示关闭按钮
        shade : [ 0 ],
        area : [ '500px', '300px' ],
        // offset: 'rb', //右下角弹出
        // time: 2000, //2秒后自动关闭
        anim : 2,
        content : [ webPath + 'sys/user/update/OtherPassword?userId=' + id, 'no' ], // iframe的url，no代表不显示滚动条
        end : function() { // 此处用于演示
        }
      });

    });

  };

  return oInit;
}




